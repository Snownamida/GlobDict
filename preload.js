const { contextBridge, ipcRenderer } = require("electron");

const selected_languages = ["日语", "英语", "法语", "汉语", "越南语", "俄语"];
const languages_config = {
  日语: {
    user_lang: "日语",
    lang_in_lang: "日本語",
    languages: [
      "日本語",
      "英語",
      "フランス語",
      "中国語",
      "ベトナム語",
      "ロシア語",
    ],
  },
  英语: {
    user_lang: "英语",
    lang_in_lang: "English",
    languages: [
      "Japanese",
      "English",
      "French",
      "Chinese",
      "Vietnamese",
      "Russian",
    ],
  },
  法语: {
    user_lang: "法语",
    lang_in_lang: "Français",
    languages: [
      "Japonais",
      "Anglais",
      "Français",
      "Chinois",
      "Vietnamien",
      "Russe",
    ],
  },
  汉语: {
    user_lang: "汉语",
    lang_in_lang: "中文",
    languages: ["日语", "英语", "法语", "汉语", "越南语", "俄语"],
  },
  越南语: {
    user_lang: "越南语",
    lang_in_lang: "Tiếng Việt",
    languages: [
      "Tiếng Nhật",
      "Tiếng Anh",
      "Tiếng Pháp",
      "Tiếng Trung",
      "Tiếng Việt",
      "Tiếng Nga",
    ],
  },
  俄语: {
    user_lang: "俄语",
    lang_in_lang: "русский",
    languages: [
      "Японский",
      "Английский",
      "Французский",
      "Китайский",
      "Вьетнамский",
      "Русский",
    ],
  },
};
let input_language = null;

contextBridge.exposeInMainWorld("electronAPI", {
  getGPT: (messages, model = "gpt-3.5-turbo") =>
    ipcRenderer.invoke("get-GPT", messages, model),
  getLanguagesConfig: () => languages_config,
  getInputLanguage: () => input_language,
});

window.addEventListener("DOMContentLoaded", () => {
  const translator = document.querySelector(".translator ");
  const lang_select = document.querySelector("select.lang-select");

  for (const language of selected_languages) {
    lang_select.insertAdjacentHTML(
      "beforeend",
      `<option value=${language}>${languages_config[language].lang_in_lang}</option>`
    );
    translator.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="col-md-2 col-3 text-center order-1">
        <label class="form-label form-label-lg ${language}">${language}</label>
      </div>

      <div class="col-md-2 col-9 order-1">
        <input
          type="text"
          class="form-control form-control-lg ${language} input"
        />
      </div>
      
      <div class="col-md-8 col-12 order-3 order-md-1">
          <textarea class="form-control ${language} output" rows="3"></textarea >
      </div>
`
    );
  }

  for (const language of languages_config.汉语.languages) {
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
