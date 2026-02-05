---
title: Archieve📓：OpenHiTLS-provider
date: 1970-01-01 14:51:24
tags:
---



# 基于openHiTLS下的抗量子计算provider设计与实现：自适应敏捷迁移下的openHiTLS应用 


本课题旨在基于openHiTLS开源密码库已支持的国产抗量子算法（特别是SCloud+），封装一个标准Provider，完成该算法Provider与openSSL 3.5的调通验证，并交付完整的设计方案与交互演示示例。通过本课题的研究，将为国产抗量子密码算法的实际应用提供技术参考，推动其在行业中的规模化部署，增强我国在量子计算时代的数字安全能力。

# 开发设计环节： Provider架构设计
基于OpenSSL 3.5的Provider机制，设计一个可插拔的抗量子算法Provider，基于openHiTLS已实现的SCloud+及其他国产抗量子算法，实现可与openSSL 3.5调通的provider模块：
模块化架构：采用分层模块化设计，将Provider划分为算法接口层、核心功能层和硬件适配层。算法接口层负责与OpenSSL核心的交互，遵循OQS Provider的接口规范。

# 多算法支持框架：设计灵活的算法注册与发现机制，使Provider能够同时支持SCloud+、ML-KEM、ML-DSA等多种抗量子算法。
# 开发验证环节：集成验证
将开发的Provider与OpenSSL 3.5进行集成测试，验证其功能正确性和稳定性：
- TLS连接验证：构建基于SCloud+算法的TLS 1.3通信环境，包括：
- 证书体系：使用SCloud+算法生成CA证书、服务器证书和私钥，构建完整的证书链。
- 服务端配置：配置OpenSSL 3.5服务端，使用SCloud+ Provider进行密钥协商和身份验证。

# 客户端配置：配置OpenSSL 3.5客户端，通过SCloud+ Provider与服务端建立安全连接。

- 连接测试：验证TLS握手过程是否成功，确认使用的密码套件和密钥协商算法符合预期。
- 功能与性能测试：对集成后的系统进行全面测试：
- 功能测试：通过密码算法向量测试和跨平台交叉测试，验证SCloud+算法在OpenSSL 3.5环境中的基本功能正确性