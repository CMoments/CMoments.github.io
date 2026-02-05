---
title: News🤩：OpenSSL
date: 2026-01-23 09:45:36
tags:
---

[**Blog & News**](https://openssl-corporation.org/post/)
[**Events & Webinars**](https://openssl-corporation.org/events/)

# 携手 Entrust，OpenSSL 启用硬件级代码签名并布局后量子安全

[**The OpenSSL Corporation Strengthens Code Signing Security with Entrust nShield HSMs**](https://openssl-corporation.org/post/2025-09-08-entrust-ossl-pr/)
> September 8, 2025 
> OpenSSL 公司宣布将采用 Entrust 的 nShield 5c 硬件安全模块（HSM） 来构建其生产代码签名系统，以增强软件发布的安全性。此举旨在通过 FIPS 140-3 认证 的 HSM 建立可信的代码签名根，防止代码被篡改或伪造，从而维护全球依赖 OpenSSL 的数十亿通信系统的安全。
> 

双方长期在标准制定方面合作，近期还共同推动了经典与后量子混合算法的标准化。OpenSSL 选择 Entrust 不仅出于其对传统加密的成熟支持，也因其具备向后量子密码学平滑过渡的能力。nShield 5c 已支持包括 ML-KEM、SLH-DSA、ML-DSA 在内的 NIST 后量子算法，可应对未来量子计算带来的安全挑战。

双方高管均强调，此次合作将为 OpenSSL 提供硬件级信任根和量子安全的代码签名路径，确保当前与未来的代码安全。



# OpenSSL 3.6 Release Announcement (Latest now)
[Release Announcement for OpenSSL 3.6.0](https://openssl-library.org/post/2025-10-01-3.6-release-announcement/)
OpenSSL 3.6.0 版本发布公告-2025年10月1日  

OpenSSL 3.6 的最终版本现已发布。我们谨向所有为 OpenSSL 3.6 版本做出贡献的人员表示感谢，没有你们的付出，OpenSSL 库将无法实现。
……
- **新增后量子密码（PQC）支持**
- 新增 **LMS 签名验证** 功能（遵循 **SP 800-208** 标准），在 FIPS 及默认提供程序中均可用，标志着向后量子密码学迁移的关键一步。

- **编译器要求升级**
- 不再支持仅符合 **ANSI-C 标准**的编译环境，现要求编译器必须支持 **C99 特性**，这可能影响部分老旧系统的升级与兼容性。
……
下一版本 **OpenSSL 4.0** 计划于 **2026年4月** 发布。敬请关注我们的 **GitHub**、**OpenSSL 社区** 及 **博客** 获取最新动态。


# OpenSSL引入了对后量子密码（PQC）算法的支持
[OpenSSL 3.5 Final Release](https://openssl-corporation.org/post/2025-04-08-openssl-35-final-release/)
2025年4月8日

This release adds the following new features:
……
- Support for PQC algorithms (ML-KEM, ML-DSA and SLH-DSA)
……
