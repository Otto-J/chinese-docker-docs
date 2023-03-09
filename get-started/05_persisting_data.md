---
title: "持久化数据库"
keywords: get started, setup, orientation, quickstart, intro, concepts, containers, docker desktop
description: Making our DB persistent in our application
---

如果您没有注意到，每次启动容器时，我们的待办事项列表都会被清除干净。这是为什么呢？让我们深入了解容器是如何工作的。

# 容器的文件系统

当一个容器运行时，它使用镜像中的各个层作为其文件系统。每个容器也有自己的“临时空间”（scratch space）来创建/更新/删除文件。任何更改都不会在另一个容器中看到，即使它们使用相同的镜像。

## 在实践中看到这一点

为了看到这一点，我们将启动两个容器并在每个容器中创建一个文件。您将看到在一个容器中创建的文件在另一个容器中不可用。

1. 启动一个 `ubuntu` 容器，它将创建一个名为 `/data.txt` 的文件，随机数在 1 到 10000 之间。

   ```console
   $ docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"
   ```

   如果您对该命令感到好奇，这里做个解释：我们将启动一个 bash shell 并调用两个命令（为什么我们有 `&&`）。第一部分选择一个随机数并将其写入 `/data.txt`.第二个命令只是观察一个文件以保持容器运行。

2. 验证您是否可以通过访问容器中的终端来查看输出。为此，请转到 Docker Desktop 中的 **容器 Containers** ，将鼠标悬停在运行 `ubuntu` 镜像的容器上，然后选择**显示容器操作 Show container actions**菜单。从下拉框中，选择 **在终端中打开 Open in terminal**。

   您将看到一个终端正在 Ubuntu 容器中运行 shell。运行以下命令以查看 /`data.txt` 文件的内容。之后再次关闭此终端。

   ```console
   $ cat /data.txt
   ```

   如果您更喜欢命令行，您可以使用 `docker exec` 命令来执行相同的操作。您需要获取容器的 ID（使用 `docker ps` 获取）并使用以下命令获取内容。

   ```console
   $ docker exec <container-id> cat /data.txt
   ```

   你应该看到一个随机数字！

3. 现在，让我们启动另一个 `ubuntu` 容器（相同的镜像），我们会看到我们没有相同的文件。

   ```console
   $ docker run -it ubuntu ls /
   ```

   看！那里没有 `data.txt` 文件！那是因为它仅被写入第一个容器的暂存空间。

4. 继续使用 `docker rm -f <container-id>` 命令删除第一个容器。

## 容器数据卷

在前面的实验中，我们看到每个容器每次启动时都从镜像定义开始。虽然容器可以创建、更新和删除文件，但当容器被删除并且所有更改都隔离到该容器时，这些更改会丢失。有了数据卷，我们可以改变这一切。

[数据卷 Volumes](../storage/volumes.md)提供了将容器的特定文件系统路径连接回主机的能力。如果容器中的目录被挂载，该目录中的更改也会在主机上看到。如果我们在容器重新启动时挂载相同的目录，我们会看到相同的文件。

卷有两种主要类型。我们最终会同时使用两者，但我们将从卷挂载开始。

## 保留待办事项数据

默认情况下，todo 应用程序将其数据存储在容器文件系统中 `/etc/todos/todo.db` 的 SQLite 数据库中。如果您不熟悉 SQLite，不用担心！它只是一个关系数据库，其中所有数据都存储在一个文件中。虽然这对于大型应用程序来说不是最好的，但它适用于小型演示。稍后我们将讨论将其切换到不同的数据库引擎。

由于数据库是单个文件，如果我们可以在主机上持久化该文件并使其可用于下一个容器，它应该能够从最后一个停止的地方继续。通过创建一个卷并将其附加（通常称为“挂载”）到存储数据的目录，我们可以持久化数据。当我们的容器写入 `todo.db` 文件时，它将持久化到卷中的主机。

如前所述，我们将使用卷挂载。将卷挂载视为不透明的数据桶。Docker 完全管理卷，包括它存储在磁盘上的位置。您只需要记住卷的名称。

1. 使用 `docker volume create` 命令创建卷。

   ```console
   $ docker volume create todo-db
   ```

2. 在仪表板中再次停止并删除待办事项应用容器（或使用 `docker rm -f <id>`），因为它仍在运行而不使用持久卷。

3. 启动待办事项应用程序容器，但添加 `--mount` 选项以指定卷挂载。我们将为卷命名，并将其挂载到容器中的 `/etc/todos`，这将捕获在路径上创建的所有文件。

   ```console
   $ docker run -dp 3000:3000 --mount type=volume,src=todo-db,target=/etc/todos getting-started
   ```

4. 容器启动后，打开应用程序并将一些项目添加到您的待办事项列表中。

   ![Items added to todo list](images/items-added.png)

5. 停止并删除待办事项应用程序的容器。使用仪表板或 `docker ps` 获取 ID，然后 `docker rm -f <id>` 将其删除。

6. 使用上面的相同命令启动一个新容器。

7. 打开应用程序。您应该会看到您的物品仍在您的列表中！

8. 完成对列表的签出后，请继续并移除容器。

恭喜！您现在已经学会了如何持久化数据！

## 深入理解 volume

很多人经常问“当我使用卷时，Docker 将我的数据存储在哪里？”如果你想知道，你可以使用 `docker volume inspect` 命令。

```console
$ docker volume inspect todo-db
[
    {
        "CreatedAt": "2019-09-26T02:18:36Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/todo-db/_data",
        "Name": "todo-db",
        "Options": {},
        "Scope": "local"
    }
]
```

`挂载点Mountpoint` 是磁盘上存储数据的实际位置。请注意，在大多数机器上，您需要具有 root 访问权限才能从主机访问此目录。但是，这就是它所在的位置！

> **直接在 Docker Desktop 上访问卷数据**
>
> 在 Docker Desktop 中运行时，Docker 命令实际上是在您机器上的小型 VM 中运行的。如果您想查看挂载点目录的实际内容，则需要查看该 VM 的内部。

## 下一步

在这一点上，你有一个功能正常的应用程序，可以在重启中幸存下来！你可以向你的投资者展示它，希望他们能抓住你的愿景！

但是，您之前看到为每次更改重建镜像需要相当多的时间。一定有更好的方法来进行更改，对吧？使用挂在绑定（之前暗示过），有更好的方法！

[Use bind mounts](06_bind_mounts.md)
