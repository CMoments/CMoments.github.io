---
title: project🏛️：Toxic-Content-Detection
date: 2025-11-28 13:32:17
tags:
---


# Benchmarking-RAG-in-Multimodal-Toxicity-Detection
衡量模型在"规则引导"的多模态有害内容检测——面向海量规则的多模态内容合规性检索与判断
核心任务：造一个检测系统完成检测任务。
衡量模型在"规则引导"的多模态有害内容检测——面向海量规则的多模态内容合规性检索与判断
核心任务：造一个检测系统完成检测任务。
其中，检测任务是指：
给定一张图片以及大量的规则，判断这张图片是否符合任意一条规则，如符合，则这张图片是有害的，否则，这张图片是无害的。

- [**Method**](#method)
- [**Experiment**](#experiment)
    - [**E1-E4**](#e1)
      验证了“端到端多模态大模型”在此任务上的能力与局限（判断准，但规则检索不准，且存在幻觉）。
    - [**E5-E7**](#e5)
      引出解决方案——使用RAG。并进行了技术选型和可行性验证。
    - [**E8-E15**](#e8)
      进行系统的消融实验和分析，探索了不同知识库组织方式、数据规模、提示工程等的影响。
- [**Implementation**](#implementation)
    - [**数据处理**](#数据处理)
    - [**并发编程**](#并发编程)
    - [**存储**](#存储)
    - [**网络请求**](#网络请求)
    - [**面向对象**](#面向对象)
    - [**工具**](#工具)
# **Method**

开展一项实验工作，遵循以下几个步骤。

- **确定实验目标**

- **了解数据集**

- **实验设计**

- **实验结果分析与方案调整**

在这次实验中，实验目标(待确定的难点)：

1. 给定一张有害图片，以及这张图片违反的groundtruth规则，模型能不能根据groundtruth规则去准确判断？
2. 给定一张有害图片，以及所有的规则（规则很多），模型能不能准确判断？

# **Experiment**

可以通过到huggingface上的数据集卡片[Multimodal-Toxicity-Detection-TestDataset](https://huggingface.co/datasets/DDHHXX/Multimodal-Toxicity-Detection-TestDataset)，或者E1-E5中的部分代码先对实验数据集进行统计分析和了解。

### E1:
给定一张有害图片，以及这张图片违反的groundtruth规则，
模型能不能根据groundtruth规则去准确判断？
模型能不能精准地找到这张图片违反的groundtruth规则。

给多模态模型提供违规的规则列表由随机选择的199/1999个四级规则和目标图片违反的规则打乱构成。
让多模态模型判断图片是否违规，根据allowed/disallowed计算判断的准确率。


#### 实验设置
多模态模型：qwen-vl-plus
规则列表长度：200/2000
prompt：
```plaintext
#Task
Act as a real content moderator, given the rule list, please moderate the input image and output the moderation result (Allowed or Disallowed), as well as its voilated rule.
# Rule list:
{rules}
# Output format:
<answer>Allowed or Disallowed</answer>
<rule>content of Violated rule</rule>
<number>number of Violated rule</number>
```

#### 实验结果：
**200 rule list**
```cmd
Total images: 497, Disallowed images: 492
Accuracy: 98.99%
```
```cmd
Total images: 497, Disallowed images: 497
Accuracy: 100.00%
Disallow Rule Match Accuracy: 40.44%
```
**2000 rule list**
```cmd
Total images: 2652, Disallowed images: 2534
Accuracy: 95.55%
Disallow Rule Match Accuracy: 69.27%
```
#### 实验结果分析

模型对判断是否违反规则的准确率非常高，但是计算Disallow Rule Match Accuracy结果反常，检查实验代码没有发现错误。
这里考虑是受到了数据质量和抽样方式的影响，考虑再进行一次实验，这次实验前先清晰数据，确保一个四级规则一定对应一个四级标签。
抽样方式选择先从所有数据记录中抽样3000条作为LIST_POOL，然后再抽取其中数据构造规则列表，且规则列表中的规则顺序要进行打乱。
固定随机数种子，方便实验结果可重复。

受限于实验数据。现在的数据集全是违规图片，是违规集。对于违规图片有对应的disallow_rule，没有负例集，无法知道模型的“误杀率”有多高。
### E2
#### 实验结果

**200 rule list**
```cmd
Total images: 198, Disallowed images: 197
Accuracy: 99.49%
Disallow Rule Match Accuracy: 82.32%
```


**2000 rule list**
```cmd
Total images: 198, Disallowed images: 197
Accuracy: 99.49%
Disallow Rule Match Accuracy: 14.14%
```
#### 实验结果分析
2000条规则列表的情况下模型找到对应规则的准确率更低，这个实验结果较为合理。
但是disallow的准确率太高了，分析原因还是这个数据集的图片内容容易违规，考虑找一个比较良善的数据集。

### E3：
选择coco数据集：https://cocodataset.org/#download
2017 Val Image [5K/1GB]

给定一张有害图片，以及这张图片违反的groundtruth规则，
模型能不能根据groundtruth规则去准确判断？
模型能不能精准地找到这张图片违反的groundtruth规则。

给多模态模型提供违规的规则列表由随机选择的199/1999个四级规则和目标图片违反的规则打乱构成。
让多模态模型判断图片是否违规，根据allowed/disallowed计算判断的准确率。


#### 实验设置
多模态模型：qwen-vl-plus
规则列表长度：200/2000
实验数据量：300
prompt：
```plaintext
#Task
Act as a real content moderator, given the rule list, please moderate the input image and output the moderation result (Allowed or Disallowed), as well as its voilated rule.
# Rule list:
{rules}
# Output format:
<answer>Allowed or Disallowed</answer>
<rule>content of Violated rule</rule>
<number>number of Violated rule</number>
```

#### 实验结果
**200 rule list**
Total images: 297, Disallowed images: 35
Accuracy: 88.22%
**2000 rule list**
Total images: 291, Disallowed images: 38
Accuracy: 86.94%

#### 实验结果分析
coco数据集中的数据太过良善，考虑再重复一次E2，保存200个含有200条规则列表的txt文本，根据这个规则生成一组图片数据。再重复实验。
这组新数据集在dataset/disallow_rule_list_test

### E4：
小规模重复实验，进行人工核验。
让模型返回规则列表，在列表中匹配。
#### 实验结果(人工检查原数据)
见docs文件夹：
- mismatch_log
跑了60条数据，去除符合的和部分异常的，这里有36条对比了模型返回的disallow_rule和原有的disallow_rule连带图片的样本。检查即使找到的不是原来的，是否也不符合rule：
28 False：找到的disallow_rule不合理
7 Ambiguous：模棱两可，数据集本身不合适或无法有效人工标准
1 True：找到的disallow_rule合理

#### 实验结果(人工检查新数据)
**None-Thinking mode**
Total images: 197, Disallowed images: 81, Allowed images: 116
Accuracy: 58.88%

**Thinking mode**
Total images: 196, Disallowed images: 74, Allowed images: 122
Accuracy: 62.24%

- mismatch_log_benign
检查发现模型对这组新数据的判断全部错误，
- mismatch_log_benign_10
降低到10条规则：
Total images: 197, Disallowed images: 44, Allowed images: 153
Accuracy: 77.66%
也无法判断。模型不理解这次图片的内容。
- mismatch_log_benign_1
降低到一条规则：
Total images: 197, Disallowed images: 9, Allowed images: 188
Accuracy: 95.43%
检查误判的九条数据情况，确认都是误判。

- mismatch_log_benign_1_OK
修复了一个代码问题，重复mismatch_log_benign_1的实验。


#### 实验结果分析
能感觉到生成图片的时候模型尝试去理解规避disallow_rule。但是跟人类理解它的方式不太一样。
旧的数据存在大量类似规则，同一张图片违反规则列表里边的多条规则。
这组新的实验数据也太不符合常理，图片数据质量有问题。

### E5
因为拥有的实验测试数据的质量存在影响，这次修改prompt，让模型返回规则列表，在列表中找是否包含目标disallow rule。
#### 实验设置
多模态模型：qwen-vl-plus
规则列表长度：200/
实验数据量：200
prompt：
```plaintext
**Task**
Act as a real content moderator. Given the rule list and an image description,
please consider the image description and the rule list,
and determine the rules that are most likely to be violated by the image.
Then output the narrowed rule list to 200 pieces, and return the index number list.

**Output format:**
<list>[number1, number2, ..., number200]</list>
```
#### 实验结果
total Images Processed: 85
Correctly Filtered Images: 0
Filtering Accuracy: 0.00%
#### 实验结果分析
200份数据，剩下的不是超时就是模型拒绝回答。所有的规则筛选全部失败了。
这里还遗漏了个问题，prompt里边告诉模型给了description，实际又没有给模型提供description。

考虑当前的模型对检测准确率已经达到很高的水平，但由于大模型自身特点，并不擅长在大量文本中检索具体的规则完成事实核查任务，且存在幻觉问题严重。现有的RAG大多是文本检测，而双模态RAG依赖训练数据，且这个任务需要模型对图片内容和文本语境都有深入的理解，训练双模特RAG不太适合完成这个任务。
因此，使用qwen-vl给图片生成描述，然后用图片描述替换图片，用LightRAG进行实验。

### E6
生成图片描述为RAG准备数据。
```plaintext
#Task
Act as a real content moderator. You are given a rule list and an image. The image is disallowed if it violates any of the rules.

You need generate a textual description about the image. The description needs help to check the compliance of the image against the input rules.

# Rule List:
{rules}
  # Output format:
 <description></description>
```
然后是对LightRAG系统的学习和调查，高度模块化的RAG系统，提供可用的前后端以及API，有多个模式进行检索。在这个应用场景下该如何设置分块大小？如何选择检索模式？如何确定如何输入数据？
可以直接使用前端web界面进行使用，也可以使用前端的api发起http请求进行使用，或者使用LightRAG core，将源代码作为python库进行使用，这种方式最为灵活且适于科研与二次开发。

经过两天尝试后，虽然可以调用LightRAG的源代码进行实验，但是为了方便考虑，使用前端API进行实验。


#### 实验设置
LightRAG
RAG语言模型：qwen-flash
RAG嵌入模型：text-embedding-v4

实验数据量：200
构造如图所示的数据，然后在前端向LightRAG进行提问。

<div style="display: flex; gap: 10px; justify-content: center;">
<img src="/images/2026-1-23-6.png" alt="" width="400" height="300">
<img src="/images/2026-1-23-7.png" alt="" width="400" height="300">
</div>

按照560个三级标签将2000条规则列表拆成540个小文件，上传到LightRAG进行提问：

<div style="display: flex; gap: 10px; justify-content: center;">
<img src="/images/2026-1-23-8.png" alt="" width="400" height="300">
<img src="/images/2026-1-23-9.png" alt="" width="400" height="300">
</div>


#### 实验结果分析

效果还算可以，但是RAG处理的速度太慢了，进行一条数据的实验要花1-2小时，不可以接受。
500K的文本长度已经远超了RAG的设计文本处理长度，选择拆分成多个小文件，并部署Redis数据库进行存储。
部署三个Redis，选择三个端口，在服务器上同时部署三组RAG。
实现层面，之前需要重复地为每次实验写准备数据的代码，每次进行查找都需要遍历大量文件文件，这里采用sqlite3将实验数据处理成数据库，方便各级标签的查找，应对灵活的实验安排。图片通过查到的路径在本地进行读取。


### E7
这次实验又抽了200条数据准备进行检测，但是这次构造的2000条数据(未去重)的规则列表被qwen-vl过滤，于是去除图片生成描述的prompt中的规则列表。
使用三级标签组织四级规则：分成560个小文件进行上传作为RAG的知识库
使用三级标签组织四级规则，但将三级标签内容替换为"rules"：分成560个小文件进行上传作为RAG的知识库
对比实验测试三级标签对结果的影响。
#### 实验设置
多模态模型：qwen-vl-plus
规则列表长度：2000
实验数据量：200
prompt：
```plaintext
#Task
You need generate a description about the image. The description should be objective, comprehesive, while being as concise as possible. The description needs help to check whether the image contains disallowed content.
# Output format:
<answer>Allowed or Disallowed</answer>
<rule>content of Violated rule</rule>
<number>number of Violated rule</number>
```
#### 实验结果
**正常实验**
Matched Reference Content in Manufacturer_Symbols.json under category Manufacturer Symbols and key Ammunition Manufacturer Symbols
100%|█████████████████████████████████████████████████████████████| 200/200 [09:27<00:00,  2.84s/it] 
Total Results Processed: 195
Total Matches Found: 150
Match Rate: 76.92%
**消融实验**
100%|████████████████████████████████████████████████████████████████████████████████| 200/200 [24:18<00:00,  7.29s/it] 
Total Results Processed: 195
Total Matches Found: 90
Match Rate: 46.15%

#### 实验结果分析
三级标签能够对LightRAG检索判断效果进行提升。使用naive模式，调用rag api进行检索，在返回的references里边搜索答案，匹配效果良好。




### E8
回顾E4中的实验，因为这里实验中的规则和图片都变了，重现E4实验可以更好地对比RAG的结果。
Total images: 196, Disallowed images: 74, Allowed images: 122
Accuracy: 62.24%
Total images: 197, Disallowed images: 44, Allowed images: 153
Accuracy: 77.66%
Total images: 197, Disallowed images: 9, Allowed images: 188
Accuracy: 95.43%

原本这次实验准备使用qwen-vl-plus进行推理，但是这批数据与原来那批不同，构造的规则列表因为违规全部被模型过滤。
替代方式：使用图片描述替换图片，还是使用规则列表，但不使用多模态模型，使用文本推理模型qwen-flash。
#### 实验设置
多模态模型：qwen-flash
规则列表长度：200/2000
实验数据量：200
prompt：
```plaintext
#Task
Act as a real content moderator, given the rule list, please moderate the input image and output the moderation result (Allowed or Disallowed), as well as its violated rule.
If allowed, please output "Allowed",and the number of violated rule is 0.
if disallowed, please output "Disallowed", and the number of violated rule.
# Rule list:
{rules}
# Output format:
<answer>Allowed or Disallowed</answer>
<number>number of Violated rule</number>
```
#### 实验结果
Processing images: 100%|███████████████████████████████| 200/200 [18:38<00:00,  5.59s/it]
Total queries: 200, Successful match: 53
Match Rate: 53/200 = 26.5%

### E9
#### 实验设置
LightRAG
RAG语言模型：qwen-flash
RAG嵌入模型：text-embedding-v4
实验数据量：200
规则列表长度：2000

之前结果显示使用RAG效果很好，为了再次确认，将上传文件按数字命名(避免之前可能存在的信息泄露)，重复进行A,B两组对比实验。
A组,B组都按照三级标签组织文件。A组文件中没有三级标签，只有"rule"，B组有二级标签和三级标签。

#### 实验结果
**A组**
100%|███████████████████████████████████████████████████████████████████████████| 200/200 [25:52<00:00,  7.76s/it] 
Total Results Processed: 195
Total Matches Found: 140
Match Rate: 71.79%

**B组**
100%|███████████████████████████████████████████████████████| 200/200 [23:53<00:00,  7.17s/it]
Total Results Processed: 195
Total Matches Found: 156
Match Rate: 80.00%

#### 实验结果分析
排除了一些实验方案上可能的干扰，初步认为LightRAG在这个场景下有效。
为了进一步确认，扩大数据量，优化抽样方式，设计更规范的对比方案。

### E10
之前使用LightRAG检索的时候直接上传了图片描述作为prompt，这样是不合理的。
这次要添加和直接使用多模态大模型保持基本一致的prompt，并扩大单组数据量到500，并使用txt格式组织文件进行尝试。
1: 包含二级标签、三级标签、四级标签、四级规则 （按照二级标签组织文件）
2: 包含三级标签、四级标签、四级规则 （按照三级标签组织文件）
3: 相同数量的文件，所有四级标签、四级规则

<img src="/images/2026-1-23-10.jpg" alt="" width="400" height="300">

#### 实验设置
LightRAG
RAG语言模型：qwen-flash
RAG嵌入模型：text-embedding-v4
实验数据量：500
规则列表长度：2000

prompt:
```plaintext
# Task
Act as a real content moderator, given the categories and moderation rules, if the image description violates any of the rules, the image should be disallowed.

Please moderate the image description and output the moderation result (Allowed or Disallowed), as well as its violated rules.
If allowed, please output "Allowed", and leave the violated rules empty. If disallowed, please output "Disallowed" as well as its violated rules.

Image Description:
{image_description}

# Output format:
<answer>Allowed or Disallowed</answer>
<violated rules>the violated rules</violated rules>
```

#### 实验结果
**实验1**
100%|█████████████████████████████████████████████████████████████████████████████| 500/500 [49:24<00:00,  5.93s/it]
Total Results Processed: 500
Total Matches Found: 292
Match Rate: 58.40%
所有结果已保存到 exp1-ans.json，共 500 条记录
**实验2**
100%|███████████████████████████████████████████████████████████████████████████| 500/500 [1:36:52<00:00, 11.63s/it]
Total Results Processed: 500
Total Matches Found: 305
Match Rate: 61.00%
所有结果已保存到 exp2-ans.json，共 500 条记录
**实验3**
█████████████████████████████████████████████████████████████████████████| 500/500 [2:51:30<00:00, 20.58s/it]
Total Results Processed: 500
Total Matches Found: 303
Match Rate: 60.60%
所有结果已保存到 exp3-ans.json，共 500 条记录

#### 实验结果分析
准确率显著降低了，而且各级标签对结果的影响不明显，造成这个结果的原因可能是修改了给RAG的prompt，也可能是将之前的json格式变成了txt。
为了确认这个，重复实验，给RAG直接用图片描述作为prompt：
实验一：
Total Results Processed: 477
Total Matches Found: 297
Match Rate: 62.26%
所有结果已保存到 exp1-ans.json，共 477 条记录
实验二：
Total Results Processed: 477
Total Matches Found: 298
Match Rate: 62.47%
所有结果已保存到 exp1-ans.json，共 477 条记录
实验三：
Total Results Processed: 477
Total Matches Found: 319
Match Rate: 66.88%
所有结果已保存到 exp1-ans.json，共 477 条记录

说明是文件格式的问题，txt格式不如json格式能够有效展现规则的层级关系，被LightRAG利用KG进行判断。



### E11
将E10中给RAG的知识库数据重新用json格式组织，进行三组对比实验：
A组：
{二级标签:{三级标签:{四级标签:四级规则}}}
B组：
{三级标签:{四级标签:四级规则}}
C组:
{ 四级标签:四级规则}

#### 实验设置
LightRAG
RAG语言模型：qwen-flash
RAG嵌入模型：text-embedding-v4
实验数据量：500
规则列表长度：2000
#### 实验结果

100%|██████████████████████████| 500/500 [1:01:26<00:00,  7.37s/it]
Total Results Processed: 477
Total Matches Found: 306
Match Rate: 64.15%
所有结果已保存到 exp1-ans.json，共 477 条记录
███████████████████████████████████████████████████████████████████████████████100%|██████████████████████████████████████████████████████████████████████████████████| 500/500 [59:36<00:00,  7.15s/it]
Total Results Processed: 477
Total Matches Found: 305
Match Rate: 63.94%
所有结果已保存到 exp2-ans.json，共 477 条记录
██████████████████████████| 500/500 [1:00:20<00:00,  7.24s/it]
Total Results Processed: 477
Total Matches Found: 311
Match Rate: 65.20%
所有结果已保存到 exp3-ans.json，共 477 条记录
#### 实验结果分析
可以确定标签层级对预测结果的影响不大，但是这次准确率又发生了下降，怀疑是抽到的数据不同和抽样方式导致的。
### E12
保持和之前一样的抽样方式，保持和E11一样的消融实验方式，进行重复实验

A组：
Match Rate：80.08%
B组：
Match Rate：79.04%
C组：
Match Rate：80.08%

**核查返回references**
A 组 top 5: 
Total items processed: 477
Total matches found: 295
Match Rate: 61.84%
B 组 top 5: 
Total items processed: 477
Total matches found: 289
Match Rate: 60.59%
C 组 top 5: 
Total items processed: 477
Total matches found: 293
Match Rate: 61.43%
Experiments-RAG>

**核查返回references**
A 组 top 10: 
Total items processed: 477
Total matches found: 329
Match Rate: 68.97%
B 组 top 10: 
Total items processed: 477
Total matches found: 331
Match Rate: 69.39%
C 组 top 10: 
Total items processed: 477
Total matches found: 339
Match Rate: 71.07%
#### 实验结果
确认抽样方式差异和数据不同会对结果造成明显影响，确认LightRAG能够对这个任务场景提升性能。
确认RAG按照相关程度由高到低返回references，预测结果集中在top5。

### E13
还是使用之前的500条数据做准确率预测，但是构建2000条规则列表的剩下1500条数据重新抽取。
重复实验。对比新旧知识库对结果的影响。

100%|██████████████████████████████████████████████████████████████████████████| 500/500 [1:00:56<00:00,  7.31s/it]
Total Results Processed: 477
Total Matches Found: 392
Match Rate: 82.18%
所有结果已保存到 expA-ans.json，共 477 条记录

### E14
全量数据，将12W条数据的规则组织整理，全部作为RAG知识库。
新的实验：
100%|███████████████████████████████████████████████████████████████████████████████| 500/500 [1:06:35<00:00,  7.99s/it]
Total Results Processed: 486
Total Matches Found: 393
Match Rate: 80.86%
#### 实验结果分析
确认之前的实验数据量已经有足够代表性，实验结果可信。
### E15
全量数据，让LightRAG仅预测一条规则进行返回。
#### 实验结果
总计处理图片数量: 477
遇到400错误的图片数量: 30
被判定为Allowed的图片数量: 9
匹配成功的图片数量: 85
匹配成功率: 19.41%
总数: 438
三级规则匹配正确总数: 178
40.6%

总数: 438
二级规则匹配正确总数: 238
54.3%

人工核查结果:/docs/E15info.pdf

#### 实验结果分析
RAG给出的预测规则要么和答案规则一样都很有道理，要么都没道理(图片内容影响)。
判断disallow的准确率挺高
就算让人工判断，同一张图片在数百条规则里都有理由违背好多条的，所以应该是合理的


# **Implementation**
### **数据处理**
这个数据规模不大不小，刚好能够体现反复读取大量文件造成的开销，以及使用数据库组织实验数据的必要性——你无需再消耗大量注意力关注如何为每次实验准备数据。
这个数据中的标签组织方式参差不齐，刚好适合综合地练习灵活使用列表，字典，元组，集合这样的数据结构，在统计和处理二元关系时，理解不同数据结构的特点以及设计缘由，并尝试使用更多数据结构高效、正确地解决问题。eg：collections库中的counters和defaultdict
- [Python `collections` 官方文档](https://docs.python.org/3/library/collections.html)

### **并发编程**
这也是一个练习并发编程的好机会，对于这种IO密集型任务，多进程的方式不再适合，如何使用多线程实现并发？通过这套实验可以练习使用concurrent.futures中的线程池快速、简洁地实现并行发起api请求，并找出最佳实践的api请求并发数。同时，尝试理解异步编程，这个场景最适合使用异步编程——协程的方式实现并发。此外，为了正确实现并发，这里还需要考虑加锁的问题E6。
- [Python `concurrent.futures` 官方文档](https://docs.python.org/3/library/concurrent.futures.html)
- [Python `asyncio` 官方文档](https://docs.python.org/3/library/asyncio.html)

### **存储**
你的数据集由大量`元数据`(标签，规则……)和`图片`组成，选择一套高效，易用的存储方案，能够让你的实验代码简洁，可扩展，当实验规模扩大或者实验方案忽然调整时能够灵活调整。
对象存储(OSS)+关系型数据库(sqlite3)非常适合这个场景。这也是现代架构的常见方式。
这套数据给了你一个机会去思考组织数据，经历过复杂，繁琐的多次数据组织过程，你会理解到现有的python数据结构工具不足以支持你很好地完成实验，从实践中体会到数据库带来的极大便利。
- [Python `sqlite3` 官方文档](https://docs.python.org/3/library/sqlite3.html)
- [阿里云:对象存储](https://help.aliyun.com/zh/oss/?spm=5176.21213303.J_ZGek9Blx07Hclc3Ddt9dg.3.4e162f3dtce4Tv&scm=20140722.S_card@@%E4%BA%A7%E5%93%81@@218843.S_new~UND~card.ID_card@@%E4%BA%A7%E5%93%81@@218843-RL_oss-LOC_2024SPSearchCard-OR_ser-PAR1_213e36d017555704468352853e62cc-V_4-RE_new6-P0_0-P1_0)

### **网络请求**
通常，使用request库发起HTTP网络请求。而向不同的大模型发起请求有不同的规范。但它们都基于REST API，RESTFUL API是对HTTP协议的封装，在典型的前后端架构中非常常见，这也是本次实验使用最多的接口。你的OSS和大模型请求以及E15中使用的有道翻译接口都是这类API，实际上是在POST请求的基础上自动添加了Bearer字段用于鉴权。
本次实验中你可以尝试练习使用各种各样不同的RESTFUL API(openai API,dashboard api……)
可以练习使用OpenAI的新一代接口response API(2025.3)，是对chat.complete的升级替代，加入了很多agent的功能封装。

实现多模态模型的文件上传有三种方式，提供可访问的链接，使用本地路径上传，使用本地图片的Base64编码上传。
在E1-E4中使用了OSS，但是OSS上传后存在少数文件丢失的问题，后续还是采用了本地路径上传。

- [阿里云百炼文件上传](https://help.aliyun.com/zh/model-studio/vision#d987f8de5395x)
- [`requests` 库官方文档](https://requests.readthedocs.io/en/latest/)
- [MDN: REST API 入门](https://developer.mozilla.org/zh-CN/docs/Glossary/REST)
- [OpenAI API 参考文档](https://platform.openai.com/docs/api-reference)
- [qwen API](https://help.aliyun.com/zh/model-studio/qwen-api-reference?spm=a2c4g.11186623.0.0.1edd1dafwvlS0t)

### **面向对象**
代码组织规范是一种交流方式，和未来的你进行高效沟通，实现项目可扩展性。
本次项目中的代码组织方式属于面向过程的模块化：
- 面向过程的模块化：以功能为中心组织模块，模块之间共享函数。
- 面向对象的模块化：以数据和行为的集合（对象）为中心组织模块，模块之间共享类。
实验中模块化的实现方式就是将不同功能类别的函数放入不同的文件，把文件当作工具包用。
这是面向过程的，因为当我考虑完成一个实验目标时，我的找到对应流程的函数：生成数据的函数，发请求的函数，统计结果的函数……
这次实验任务已经能够体现这种方式的不便，后续当数据规模进一步扩大，实验设计方案更加复杂，复杂的方案同时也是一个练习过渡到面向对象编程的机会。
在模块化基础上：
多个关系密切的模块应该组织成一个包，以便于维护和使用。这项技术能有效避免名字空间冲突。创建一个名字为包名字的文件夹并在该文件夹下创建一个`__init__.py` 文件，这样就定义了一个包。
- [Python 官方教程：类](https://docs.python.org/3/tutorial/classes.html)


### **工具**
大多数时候，项目做不下去还是因为工具不够高效，耽误了太多时间。实验能够锻炼你熟练使用各种工具的能力：使用Linux服务器完成实验环境搭建，使用Docker复现项目，配置python环境，调试python代码……这些任务依赖对git,Linux Bash Shell,docker command,ssh,pip,apt-get,vim,python debugger等底层工具，以及Vscode这类的集成开发环境的使用。
- [Git 官方文档](https://git-scm.com/doc)
- [Docker 命令行参考](https://docs.docker.com/engine/reference/commandline/cli/)
- [VSCode 官方文档](https://code.visualstudio.com/docs)
- [Python 调试器 (`pdb`)](https://docs.python.org/3/library/pdb.html)

