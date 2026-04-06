---
title: Project🏛️：OpenSSL-provider
date: 2025-12-09 11:17:26
tags:
---

<img src="/images/2026-1-23-5.png" alt="" >

# OpenSSL Provider
OpenSSL的工作原理可以通过provider来介绍。
在这里OpenSSL core作为前端，调用底层加密能力进行签名，证书生成……完成高层应用开发者API需求
而OpenSSL provider作为后端，为OpenSSL提供加密原语。这个provider可以多态地调用硬件加密卡的能力，引入新加密算法，进行硬件加速……

这样设计是为了将密码原语的实现与OpenSSL库解耦。即使更换了实现方式，也不用重新编译整个库。
灵活方便，可扩展。

<div class="pdf-container">
  <iframe src="/js/pdfjs/web/viewer.html?file=/pdf/OSSL_provider.pdf" width="100%" height="600px"></iframe>
</div>

在构建这样的底层组件的时候会遇到许多问题，为了保证其高可用性、跨平台、以及强大的兼容能力。

举其中一个例子：多线程与多进程问题
通常不会多进程与多线程混用。因为线程是没有堆栈空间的，如果在多线程的基础上多进程，新开的进程如何由操作系统管理？
还会出现更多的问题，比如说，fork()之后，旧的进程中的资源；句柄、锁……都会失效。需要在新的进程中重建，这还会导致很可观的性能开销。
这个例子记录了在OpenSSL Provider中处理这个问题的方法，同时，也引出了现代B-S架构的设计缘由。

<iframe src="../../../../nodeppt/多线程与多进程安全/多线程与多进程安全.html" width="100%" height="500" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"></iframe>




# Pre-Work SDF/SKF SDK

<div class="pdf-container">
  <iframe src="/js/pdfjs/web/viewer.html?file=/pdf/RelatedWork.pdf" width="100%" height="600px"></iframe>
</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0;">
  <img src="/images/2026-1-23-1.jpg" alt="图片1" style="width: 100%;">
  <img src="/images/2026-1-23-2.jpg" alt="图片2" style="width: 100%;">
  <img src="/images/2026-1-23-3.jpg" alt="图片3" style="width: 100%;">
  <img src="/images/2026-1-23-4.jpg" alt="图片4" style="width: 100%;">
</div>


# Personal Experience

<iframe src="../../../../nodeppt/my-introduce/my-introduce.html" width="100%" height="500" name="topFrame" scrolling="yes" noresize="noresize" frameborder="0" id="topFrame"></iframe>
