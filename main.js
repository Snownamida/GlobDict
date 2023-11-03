const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const OpenAI = require("openai");

const openai = new OpenAI();

async function handleGetGPT(event, messages, model) {
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: model,
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1024,
    height: 792,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      icon: path.join(__dirname, "icon.jpg"),
    },
  });

  win.loadFile("index.html");
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  ipcMain.handle("get-GPT", handleGetGPT);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
