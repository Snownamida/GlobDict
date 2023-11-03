# GlobDict

一个基于 ChatGPT 的多语言词典

## 安装方法

下载 release 里的软件

去 OpenAI 官网申请 API Key

添加`OPENAI_API_KEY`到环境变量

### Windows

```
setx OPENAI_API_KEY "your-api-key-here"
```

### MacOS

编辑 `~/.bash_profile` 或者 `~/.zshrc` 文件

在文件的最下方新增一行

```
export OPENAI_API_KEY='your-api-key-here'
```

输入命令`source ~/.bash_profile` 或 `source ~/.zshrc`来更新
