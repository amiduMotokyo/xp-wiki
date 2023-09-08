# 如何开始创作

## 1、github desktop环节

这是共创的基础，再麻烦也得啃下来。

### 1-1、注册并登录gitee账号

为什么是gitee而不是github？因为github要翻墙，麻烦。

在官网注册并登录即可：<a href="https://gitee.com/" target="_blank">https://gitee.com/</a>

### 1-2、下载并安装github desktop

从官网上下载即可：<a href="https://desktop.github.com" target="_blank">https://desktop.github.com</a>

下完了按照步骤进行安装，安装完毕后你桌面应该会多出这样一个图标：

[![pPyUF6H.png](https://s1.ax1x.com/2023/09/07/pPyUF6H.png)](https://imgse.com/i/pPyUF6H)

打开软件，在软件中登录你的gitee账号。

### 1-3、获得仓库授权

找带TG要xp wiki仓库的授权，这样你才能修改xp wiki。

### 1-4、克隆xp wiki到你的本地计算机

回到github desktop软件，左上角file下拉框里选择clone repository，弹出的界面长这样：

[![pP61ASA.png](https://s1.ax1x.com/2023/09/08/pP61ASA.png)](https://imgse.com/i/pP61ASA)

在URL栏目下，输入xp wiki的网址：https://gitee.com/MRWork/xp-wiki.git

然后选一个本地计算机地址，点clone，等待克隆完成即可。

克隆完了你应该可以在你之前选的本地计算机地址中看到新增的文件夹：

[![pP61QYQ.png](https://s1.ax1x.com/2023/09/08/pP61QYQ.png)](https://imgse.com/i/pP61QYQ)

### 1-5、找到你的创作缓冲区分区，开始创作

进docs/temp目录，找到你自己的分区，在该文件夹下新建文件，开始创作吧！

哦对了，创作前先回到说明页面，看一眼创作注意事项，以防世界毁灭。

## 2、vscode环节

vscode提供了一个良好的代码编写环境，由于wiki采用markdown以及mkdocs编写，因此强烈建议整一个。

### 2-1、下载并安装vscode

这一步还是百度吧，操作并不复杂，因为大家都懂的一些原因，一些细节不方便写在这种大家都能看到的文档里。

### 2-2、使用vscode进行创作

安装完vscode后，回到该目录下：

[![pP61QYQ.png](https://s1.ax1x.com/2023/09/08/pP61QYQ.png)](https://imgse.com/i/pP61QYQ)

右键mkdocs.yml，选打开方式，打开方式里面选vscode。

打开vscode后，左上角“文件”下拉框里选“打开文件夹”，选择刚才mkdocs.yml所在的文件夹（大概率名字叫xp-wiki）。

接下来就可以开始创作了。vscode环境下可以打开.md文件并染色，可以更加清晰地展示创作内容。

## 3、markdown环节

如果你一直使用txt或者word文档进行创作，那么加入wiki时就需要花很多无意义的时间处理格式问题。为了减少你的创作内容躺在创作缓冲区里吃灰的概率，建议学习一手markdown以及mkdocs的使用方法。

### 3-1、安装python

安装教程网址：<a href="https://jingyan.baidu.com/article/1612d5008e2eb8a30e1eeed4.html" target="_blank">https://jingyan.baidu.com/article/1612d5008e2eb8a30e1eeed4.html</a>

### 3-2、安装mkdocs与material

左下角开始，搜索“cmd”，打开命令提示符窗口，输入：

pip install --upgrade pip

回车，等待安装完成。

接下来安装mkdocs，输入：

pip install mkdocs

回车，等待安装完成。

接下来确认mkdocs是否安装完成，输入：

mkdocs --version

接下来安装mkdocs material，输入：

pip install mkdocs-material

使用下面的命令测试是否安装成功：

mkdocs -h

### 3-3、测试markdown效果

进行完以上操作后，你就可以一边确认markdown效果，一边进行创作了。

回到该目录下：

[![pP61QYQ.png](https://s1.ax1x.com/2023/09/08/pP61QYQ.png)](https://imgse.com/i/pP61QYQ)

运行serve快捷指令.bat。

弹出的命令提示符窗口中，最后应该有一行：

Serving on http://127.0.0.1:8000/

后面那个http网址可能会略有不同，以你弹出的那个为主，复制到你的浏览器中。

然后你就可以看到你修改后wiki的预览了。

找到你要修改的文件，一边修改一边查看效果吧！

### 3-4、mkdocs显示效果教程

mkdocs自带了一些方便的显示效果，使用何种提示符可以触发何种效果，可自行上网查看教程。

一般来说，照抄已有的文档中的提示符以及格式即可。


