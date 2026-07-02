[English](Readme.md) | **中文**

# GlobDict

一个基于 ChatGPT 的多语言词典。

输入一个语言的词汇，GlobDict 会**同时**把它翻译成所有支持的其他语言，并附上每个词的**词源和读音**。界面语言本身也可切换，你可以用自己最习惯的语言来使用它。

![演示](./demo.gif)

## 功能特性

- **一次翻译成多种语言**——输入一个词，即可同时得到所有支持语言的结果。
- **不只是翻译**——每个结果都附带该词的词源简介和读音。
- **界面语言可切换**——整个界面会随你选择的语言而变化。
- **跨平台桌面应用**——基于 Electron 构建（Windows / macOS / Linux）。

支持语言：日语、英语、法语、汉语、越南语、俄语。

## 安装方法

1. 从 [releases](https://github.com/Snownamida/GlobDict/releases) 下载软件。
2. 去 [OpenAI 官网](https://platform.openai.com/account/api-keys)申请 API Key。

   注意，你的 OpenAI 的 API 账户里应有余额。即此软件不是免费的，但不是给我钱而是给 OpenAI。
3. 将 API Key 添加为环境变量 `OPENAI_API_KEY`（见下文）。

### Windows

```cmd
setx OPENAI_API_KEY "your-api-key-here"
```

### macOS

编辑 `~/.bash_profile` 或者 `~/.zshrc` 文件，在文件的最下方新增一行：

```zsh
export OPENAI_API_KEY='your-api-key-here'
```

然后输入命令 `source ~/.bash_profile` 或 `source ~/.zshrc` 来更新。

## 开发

基于 Electron、Bootstrap 与 OpenAI SDK 构建。

```bash
npm install
npm start          # 启动应用（electron-forge）
npm run make       # 构建可分发的安装包
```

## 许可证

[MIT](./LICENSE.txt) © Snownamida
