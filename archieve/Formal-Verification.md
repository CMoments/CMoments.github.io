---
title: Archieve📓：Formal-Verification
date: 1970-01-01 14:54:56
tags:
---

# 密码实现安全-形式化验证

<div class="pdf-container">
  <iframe src="/js/pdfjs/web/viewer.html?file=/pdf/密码实现安全形式化验证.pdf" width="100%" height="600px"></iframe>
</div>

<div style="display: flex; gap: 10px; justify-content: center;">
<img src="/images/2026-1-23-11.jpg" alt="" width="400" height="300">
<img src="/images/2026-1-23-12.jpg" alt="" width="400" height="300">
</div>



# openHiTLS密码库ML-DSA算法实现正确性验证 

1.建立 ML-DSA 算法的形式化规范模型（参考 NIST FIPS 203 标准）。
2.从 openHiTLS 源码中抽取 ML-DSA 关键函数
3.使用 SAW、Cryptol或 Coq/Isabelle 等形式化验证工具，建立实现与规范之间的函数级等价性证明。
4.保证在所有有效输入下，C 实现与规范模型产生等价的输出结果。
交付件：
1.适配源码，测试代码
2.API文档，安装配置手册，使用示例代码。


# openHiTLS密码库ML-KEM算法实现正确性验证 #79


1.建立 ML-KEM 算法的形式化规范模型（参考 NIST FIPS 203 标准）。
2.从 openHiTLS 源码中抽取 ML-KEM 关键函数（如 KeyGen、Encaps、Decaps）。
3.使用 SAW、Cryptol或 Coq/Isabelle 等形式化验证工具，建立实现与规范之间的函数级等价性证明。
4.保证在所有有效输入下，C 实现与规范模型产生等价的输出结果。

## 交付件：
1.适配源码，测试代码
2.API文档，安装配置手册，使用示例代码。