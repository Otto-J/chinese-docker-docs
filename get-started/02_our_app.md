---
title: "容器化一个应用"
keywords: get started, setup, orientation, quickstart, intro, concepts, containers, docker desktop
redirect_from:
  - /get-started/part2/
description: Containerize and run a simple application to learn Docker
---

在本指南的其余部分，您将使用在 Node.js 中运行的简单待办事项列表管理器。如果您不熟悉 Node.js，请不要担心。本指南不需要 JavaScript 经验。

要完成本指南，您需要以下内容：

- 本地运行的 Docker。按照说明 [下载并安装 Docker](../get-docker.md)。
- 准备 [Git 客户端](https://git-scm.com/downloads).
- 准备 IDE 或者文本编辑器，推荐使用 [Visual Studio Code](https://code.visualstudio.com/)`。
- [对容器和镜像的概念理解](../get-started/overview.md/#docker-objects)。

## 获取应用源码

在运行应用程序之前，您需要将应用程序源代码放到您的机器上。

1. 使用以下命令克隆 [入门存储库](https://github.com/docker/getting-started/tree/master)：

   ```console
   $ git clone https://github.com/docker/getting-started.git
   ```

2.查看克隆存储库的内容。在 `get-start/app` 目录中，您应该会看到 `package.json` 和两个子目录（`src` 和 `spec`）。

![Screenshot of Visual Studio Code opened with the app loaded](images/ide-screenshot.png)

## 构建应用的容器镜像

为了构建 [容器映像](../get-started/overview.md/#docker-objects)，您需要使用 `Dockerfile`。Dockerfile 只是一个没有文件扩展名的基于文本的文件。Dockerfile 包含 Docker 用来创建容器镜像的指令脚本。

1. 在与 `package.json` 文件相同的 `app` 目录中，创建一个名为 `Dockerfile` 的文件。您可以使用以下命令根据您的操作系统创建 Dockerfile。

- [Mac / Linux](#mac-linux)
- [Windows](#Windows)

### mac-linux

在终端中，运行下面列出的以下命令。

将目录更改为 `app` 目录。将 `/path/to/app` 替换为 `getting-started/app` 目录的路径。

```console
$ cd /path/to/app
```

创建一个名为 `Dockerfile` 的空文件。

```console
$ touch Dockerfile
```

### Windows

在 Windows 命令提示符中，运行下面列出的以下命令。

将目录更改为 `app` 目录。将 `\path\to\app` 替换为 `getting-started\app` 目录的路径。

```console
$ cd \path\to\app
```

创建一个名为 `Dockerfile` 的空文件。

```console
$ type nul > Dockerfile
```

2. 使用文本编辑器或代码编辑器，将以下内容添加到 Dockerfile：

   ```dockerfile
   # syntax=docker/dockerfile:1

   FROM node:18-alpine
   WORKDIR /app
   COPY . .
   RUN yarn install --production
   CMD ["node", "src/index.js"]
   EXPOSE 3000
   ```

   > **注意**
   >
   > 在 Dockerfile 示例中选择一条指令以了解有关该指令的更多信息。

3. 使用以下命令构建容器映像：

在终端中，将目录更改为 `getting-started/app` 目录。将 `/path/to/app` 替换为 `getting-started/app` 目录的路径。

```console
$ cd /path/to/app
```

构建容器镜像。

```console
$ docker build -t getting-started .
```

`docker build`命令使用 Dockerfile 构建一个新的容器映像。您可能已经注意到 Docker 下载了很多“图层”。这是因为您指示构建器要基于 `node:18-alpine` 。但是，由于您的机器上没有它，Docker 需要下载映像。

Docker 下载映像后，Dockerfile 中的指令会复制到您的应用程序中，并使用 `yarn` 安装应用程序的依赖项。`CMD` 指令指定从此映像启动容器时要运行的默认命令。

最后，`-t` 标志标记您的镜像。将其简单地视为最终镜像的人类可读名称。由于您将镜像命名为 `getting-started`，因此您可以在运行容器时引用该镜像。

在 `docker build` 命令的末尾使用 `.` 告诉 Docker 它应该在当前目录中查找 `Dockerfile`。

## 启动应用容器

现在您有了一个映像，您可以在 [容器](../get-started/overview.md/#docker-objects) 中运行应用程序。为此，您将使用 `docker run` 命令。

1. 使用 `docker run` 命令启动容器并指定刚刚创建的映像的名称：

   ```console
   $ docker run -dp 3000:3000 getting-started
   ```

   您可以使用 `-d` 标志以分离模式（在后台）运行新容器。您还可以使用 `-p` 标志创建主机端口 3000 到容器端口 3000 之间的映射。如果没有端口映射，您将无法访问应用程序。

2. 几秒后，打开浏览器访问 [http://localhost:3000](http://localhost:3000)。你可以看到应用启动了。

   ![Empty todo list](images/todo-list-empty.png)

3. 继续添加一两个项目，看看它是否按您的预期工作。您可以将项目标记为完整并删除项目。您的前端正在成功地将项目存储在后端。

此时，您应该有一个正在运行的待办事项列表管理器，其中包含一些项目，全部由您构建。

如果您快速查看 Docker 仪表板，您应该会看到至少一个正在 `getting-started` 映像和端口 3000 运行的容器。

![Docker Dashboard with tutorial and app containers running](images/dashboard-two-containers.png)

# 后续步骤

在这个简短的部分中，您了解了有关创建 Dockerfile 以构建容器映像的基础知识。构建映像后，您启动了一个容器并看到了正在运行的应用程序。

接下来，您将对您的应用程序进行修改，并学习如何使用新映像更新正在运行的应用程序。在此过程中，您将学习一些其他有用的命令。

[更新应用程序](03_updating_app.md)
