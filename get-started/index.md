---
title: "概览"
keywords: docker basics, how to start a docker container, container settings, setup docker, how to setup docker, setting up docker, docker container guide, how to get started with docker
description: Get started with the Docker basics in this comprehensive overview, You'll learn about containers, images, and how to containerize your first application.
redirect_from:
  - /engine/getstarted-voting-app/
  - /engine/getstarted-voting-app/cleanup/
  - /engine/getstarted-voting-app/create-swarm/
  - /engine/getstarted-voting-app/customize-app/
  - /engine/getstarted-voting-app/deploy-app/
  - /engine/getstarted-voting-app/node-setup/
  - /engine/getstarted-voting-app/test-drive/
  - /engine/getstarted/
  - /engine/getstarted/last_page/
  - /engine/getstarted/step_five/
  - /engine/getstarted/step_four/
  - /engine/getstarted/step_one/
  - /engine/getstarted/step_six/
  - /engine/getstarted/step_three/
  - /engine/getstarted/step_two/
  - /engine/quickstart/
  - /engine/tutorials/
  - /engine/tutorials/dockerimages/
  - /engine/tutorials/dockerizing/
  - /engine/tutorials/usingdocker/
  - /engine/userguide/containers/dockerimages/
  - /engine/userguide/dockerimages/
  - /engine/userguide/intro/
  - /get-started/part1/
  - /get-started/part5/
  - /get-started/part6/
  - /getstarted/
  - /getting-started/
  - /learn/
  - /linux/last_page/
  - /linux/started/
  - /linux/step_four/
  - /linux/step_one/
  - /linux/step_six/
  - /linux/step_three/
  - /linux/step_two/
  - /mac/last_page/
  - /mac/started/
  - /mac/step_four/
  - /mac/step_one/
  - /mac/step_six/
  - /mac/step_three/
  - /mac/step_two/
  - /userguide/dockerimages/
  - /userguide/dockerrepos/
  - /windows/last_page/
  - /windows/started/
  - /windows/step_four/
  - /windows/step_one/
  - /windows/step_six/
  - /windows/step_three/
  - /windows/step_two/
---

欢迎！我们很高兴您想学习 Docker。

本指南包含有关如何开始使用 Docker 的分步说明。您将在本指南中学习和做的一些事情是：

- 将映像作为容器构建和运行
- 使用 Docker Hub 共享镜像
- 使用带有数据库的多个容器部署 Docker 应用程序
- 使用 Docker Compose 运行应用程序

在阅读指南的一部分之前，您应该了解容器 container 和镜像 image。

# 什么是容器 container？

简而言之，容器是您机器上的沙盒进程 `sandboxed process`，与主机上的所有其他进程隔离。这种隔离利用 [内核命名空间和 cgroup](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504)，这些特性已经 Linux 很长时间了。Docker 致力于使这些功能平易近人且易于使用。总而言之，容器：

- 是镜像的可运行实例。您可以使用 DockerAPI 或 CLI 创建、启动、停止、移动或删除容器。
- 可以在本地机器、虚拟机上运行或部署到云端。
- 是可移植的（可以在任何操作系统上运行）。
- 与其他容器隔离并运行自己的软件、二进制文件和配置。

# 什么是容器镜像？

运行容器时，它使用一个隔离的文件系统。这个自定义文件系统由容器映像提供。由于映像包含容器的文件系统，它必须包含运行应用程序所需的一切——所有依赖项、配置、脚本、二进制文件等。映像还包含容器的其他配置，如环境变量、要运行的默认命令和其他元数据。

稍后，您将在本指南中更深入地研究镜像，涵盖分层、最佳实践等主题。

> **注意**
>
> 如果您熟悉 `chroot`，请将容器视为 `chroot` 的扩展版本。文件系统只是来自镜像。但是，容器增加了额外的隔离，而仅使用 chroot 时不可用。

# 后续步骤

在本节中，您了解了容器和镜像。

在下一节中，您将容器化您的第一个应用程序。

[容器化应用程序](./02_our_app.md)
