---
title: "分享应用程序"
keywords: get started, setup, orientation, quickstart, intro, concepts, containers, docker desktop, docker hub, sharing
redirect_from:
  - /get-started/part3/
description: Sharing your image you built for your example application so you can run it else where and other developers can use it
---

现在您已经构建了一个镜像，您可以共享它。要共享 Docker 镜像，您必须使用 Docker Registry 。默认 Registry 是 Docker Hub，您使用的所有镜像都来自该 Registry。

> **Docker ID**
>
> Docker ID 允许您访问 Docker Hub，它是世界上最大的容器镜像库和社区。如果你还没有可以免费创建 [Docker ID](https://hub.docker.com/signup)。

## 创建一个仓库

要推送镜像，您首先需要在 Docker Hub 上创建一个存储库。

1. [注册](https://www.docker.com/pricing?utm_source=docker&utm_medium=webreferral&utm_campaign=docs_driven_upgrade) 或者登录到 [Docker Hub](https://hub.docker.com)。

2. 选择 **创建仓库** 按钮。

3. 仓库名称可以使用 `getting-started`。确保可见性 Visibility 设置为 `Public`。

   > **私有仓库**
   >
   > 您是否知道 Docker 提供私有存储库，允许您将内容限制为特定用户或团队？查看 [Docker 定价](https://www.docker.com/pricing?utm_source=docker&utm_medium=webreferral&utm_campaign=docs_driven_upgrade) 上的详细信息。

4. 选择 **创建** 按钮。

如果您查看下图，可以看到一个示例 Docker 命令。此命令将推送到此存储库。

![Docker command with push example](images/push-command.png)

## 推送镜像

1. 在命令行中，尝试运行您在 Docker Hub 上看到的推送命令。请注意，您的命令将使用您的命名空间，而不是“docker”。

   ```plaintext
   $ docker push docker/getting-started
   # 推送指的是推送到 [docker.io/docker/getting-started]
   # 本地不存在带有标签的图像：docker/getting-started
   ```

   为什么会失败？ push 命令正在查找名为 docker/get-start 的镜像，但没有找到。如果您运行 docker image ls，您也不会看到一个。

   要解决这个问题，您需要使用 “tag” 命令把你构建的现有镜像以赋予它另一个名称。

2. 使用 `docker login -u YOUR-USER-NAME` 登录 Docker Hub。

3. 使用 `docker tag` 命令给 `getting-started` 镜像一个新名称。确保把 `YOUR-USER-NAME` 替换为你自己的 Docker ID。

   ```console
   $ docker tag getting-started YOUR-USER-NAME/getting-started
   ```

   要了解有关 `docker tag` 命令的更多信息，请参阅 [docker tag](../engine/reference/commandline/tag.md)。

4. 现在再次尝试您的推送命令。如果您从 Docker Hub 复制值，您可以删除 `tagname` 部分，因为您没有在图像名称中添加 tag。如果您不指定 tag，Docker 将使用名为 `latest` 的标签。

   ```console
   $ docker push YOUR-USER-NAME/getting-started
   ```

# 在新实例上运行镜像

现在您的镜像已经构建并推送到注册表中，请尝试在从未下载过此容器镜像的全新实例上运行应用程序。为此，您将使用 Play with Docker。

> **注意**
>
> Play with Docker 使用 amd64 平台。如果您使用的是带有 Apple Silicon 的基于 ARM 的 Mac，则需要重建镜像以与 Play with Docker 兼容，并将新镜像推送到您的存储库。
>
> 要为 amd64 平台构建镜像，请使用 `--platform` 标志。
>
> ```console
> $ docker build --platform linux/amd64 -t YOUR-USER-NAME/getting-started .
> ```
>
> Docker buildx 还支持构建多平台镜像。要了解更多信息，请参阅[多平台镜像](../build/building/multi-platform.md)。

1. 打开浏览器访问 [Play with Docker](https://labs.play-with-docker.com/)。

2. 选择 **登录** ，在下拉框里选择 **docker** 。

3. 连接您的 Docker Hub 帐户。

4. 登录后，选择左侧栏上的 **添加新实例 ADD NEW INSTANCE**选项。如果您没有看到它，请将浏览器变宽一点。几秒钟后，浏览器中将打开一个终端窗口。
   ![Play with Docker add new instance](images/pwd-add-new-instance.png)

5. 在终端中，启动新推送的应用程序。

   ```console
   $ docker run -dp 3000:3000 YOUR-USER-NAME/getting-started
   ```

   您应该会看到镜像被拉下来并最终启动。

6. 出现 3000 徽章时选择它，您应该会看到包含您修改的应用程序。如果 3000 徽章没有显示，您可以在 **打开端口 Open Port** 按钮上选择并输入 3000。

## 下一步

在本节中，您学习了如何通过将镜像推送到注册表来共享镜像。然后，您转到一个全新的实例，并能够运行新推送的镜像。这在 CI 管道中很常见，管道将创建镜像并将其推送到注册表，然后正式生产环境可以使用最新版本的镜像。

现在您可以回到上一节末尾注意到的内容。提醒一下，您注意到当您重新启动应用程序时，您丢失了所有待办事项列表项。这显然不是一个很好的用户体验，所以接下来您将学习如何在重新启动时持久化数据。

[持久化数据库](05_persisting_data.md)。
