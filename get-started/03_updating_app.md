---
title: "更新应用程序"
keywords: get started, setup, orientation, quickstart, intro, concepts, containers, docker desktop
description: Making changes to our example learning application
---

在 [part 2](./02_our_app.md) 中，您容器化了一个待办事项应用程序。在这一部分中，您将更新应用程序和容器映像。您还将学习如何停止和删除容器。

## 更新源代码

在以下步骤中，您将在没有任何待办事项列表项时将“empty text”更改为“You have no todo items yet! Add one above!”

1. 在 `src/static/js/app.js` 文件中， 更新第 56 行以使用新的空文本。

   ```text
   ...
   <p className="text-center">No items yet! Add one above!</p>// [!code --]
   <p className="text-center">You have no todo items yet! Add one above!</p>// [!code ++]
   ...
   ```

2. 使用您在 [part 2](./02_our_app.md/#build-the-apps-container-image) 中使用的相同 `docker build` 命令构建映像的更新版本。

   ```console
   $ docker build -t getting-started .
   ```

3. 使用更新的代码启动一个新容器。

   ```console
   $ docker run -dp 3000:3000 getting-started
   ```

您可能会看到这样的错误（ID 会不同）：

```console
docker: Error response from daemon: driver failed programming external connectivity on endpoint laughing_burnell
(bb242b2ca4d67eba76e79474fb36bb5125708ebdabd7f45c8eaf16caaabde9dd): Bind for 0.0.0.0:3000 failed: port is already allocated.
```

发生错误是因为您无法在旧容器仍在运行时启动新容器。原因是旧容器已经在使用主机的端口 3000，并且机器上只有一个进程（包括容器）可以监听特定端口。要解决此问题，您需要删除旧容器。

## 删除旧容器

要删除容器，您首先需要停止它。一旦它停止，您就可以将其删除。您可以使用 CLI 或 Docker Desktop 的图形界面删除旧容器。选择您最熟悉的选项。

- [CLI](#CLI)
- [Docker Desktop](#gui)

### CLI

### 通过 CLI 移除容器

1. 使用`docker ps`命令获取容器的 ID。

   ```console
   $ docker ps
   ```

2. 使用`docker stop`命令停止容器。将`<the-corer-id>`替换为`docker ps`中的 ID。

   ```console
   $ docker stop <the-container-id>
   ```

3. 容器停止后，您可以使用`docker rm`命令将其删除。

   ```console
   $ docker rm <the-container-id>
   ```

> **注意**
>
> 您可以通过将 `force` 标志添加到 `docker rm` 命令来在单个命令中停止和删除容器。例如：`docker rm -f <the-corer-id>`

### gui

### 使用 Docker Desktop 删除容器

1. 打开 Docker Desktop 到**Containers**视图。
2. 为要删除的旧容器选择 **Actions** 列下的垃圾桶图标。
3. 在确认对话框中，选择 **Delete forever**。

### 启动更新的应用容器

1. 现在，使用 `docker run`命令启动更新后的应用程序。

```console
$ docker run -dp 3000:3000 getting-started
```

2. 刷新浏览器 [http://localhost:3000](http://localhost:3000) 你会看到更新的文本。

![Updated application with updated empty text](images/todo-list-updated-empty-text.png)

## 后续步骤

虽然您能够构建更新，但您可能已经注意到两件事：

- 您的待办事项列表中的所有现有项目都消失了！这不是一个很好的应用程序！您很快就会解决这个问题。
- 如此小的更改涉及很多步骤。在接下来的部分中，您将学习如何查看代码更新，而无需在每次进行更改时重建和启动新容器。

在讨论持久性之前，您将了解如何与他人共享这些镜像。

[分享应用程序](04_sharing_app.md)
