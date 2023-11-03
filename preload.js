const { contextBridge, ipcRenderer } = require("electron");

const languages = ["日语", "英语", "法语", "汉语", "越南语", "俄语"];
let input_language = null;

contextBridge.exposeInMainWorld("electronAPI", {
  getGPT: (messages, model = "gpt-3.5-turbo") =>
    ipcRenderer.invoke("get-GPT", messages, model),
  getLanguages: () => languages,
  getInputLanguage: () => input_language,
});

window.addEventListener("DOMContentLoaded", () => {
  const translator = document.querySelector(".translator ");
  for (const language of languages) {
    translator.innerHTML += `
    <div class="row gx-3 gy-2 my-3 align-items-center ${language}">
        <div class="col-lg-1 col-auto text-center">
            <label class="form-label form-label-lg ${language}">${language}</label>
        </div>
        <div class="col-lg-2 col">
            <input type="text" class="form-control form-control-lg ${language} input" />
        </div>
        <div class="col-lg">
            <textarea class="form-control ${language} output" rows="3"></textarea >
        </div>
    </div>
`;
  }

  for (const language of languages) {
    document.querySelector(`.${language}.input`).onfocus = event => {
      if (input_language)
        document.querySelector(
          `.${input_language}.input`
        ).style.backgroundColor = "field";
      input_language = language;
      document.querySelector(`.${input_language}.input`).style.backgroundColor =
        "var(--bs-danger-bg-subtle)";
    };
    document
      .querySelector(`.${language}.input`)
      .addEventListener("keydown", event => {
        if (event.keyCode === 13)
          document.querySelector(".translate-button").click();
      });
  }
});
