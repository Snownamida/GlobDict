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
    translator.insertAdjacentHTML(
      "afterbegin",
      `<div class="col-lg-3 order-1">
        <div class="row align-items-center">
          <div class="col-auto text-center">
            <label class="form-label form-label-lg ${language}">${language}</label>
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control form-control-lg ${language} input"
            />
          </div>
        </div>
      </div>
      
      <div class="col-lg-9 col-12 order-3 order-lg-1">
          <textarea class="form-control ${language} output" rows="3"></textarea >
      </div>
`
    );
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
