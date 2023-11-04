const { contextBridge, ipcRenderer } = require("electron");

const initial_user_lang = "汉语";
const selected_languages = ["日语", "英语", "法语", "汉语", "越南语", "俄语"];
const languages_config = {
  日语: {
    user_lang: "日语",
    lang_in_lang: "日本語",
    languages: {
      日语: { native_lang_name: "日本語" },
      英语: { native_lang_name: "英語" },
      法语: { native_lang_name: "フランス語" },
      汉语: { native_lang_name: "中国語" },
      越南语: { native_lang_name: "ベトナム語" },
      俄语: { native_lang_name: "ロシア語" },
    },
  },
  英语: {
    user_lang: "英语",
    lang_in_lang: "English",
    languages: {
      日语: { native_lang_name: "Japanese" },
      英语: { native_lang_name: "English" },
      法语: { native_lang_name: "French" },
      汉语: { native_lang_name: "Chinese" },
      越南语: { native_lang_name: "Vietnamese" },
      俄语: { native_lang_name: "Russian" },
    },
  },
  法语: {
    user_lang: "法语",
    lang_in_lang: "Français",
    languages: {
      日语: { native_lang_name: "Japonais" },
      英语: { native_lang_name: "Anglais" },
      法语: { native_lang_name: "Français" },
      汉语: { native_lang_name: "Chinois" },
      越南语: { native_lang_name: "Vietnamien" },
      俄语: { native_lang_name: "Russe" },
    },
  },
  汉语: {
    user_lang: "汉语",
    lang_in_lang: "中文",
    languages: {
      日语: { native_lang_name: "日语" },
      英语: { native_lang_name: "英语" },
      法语: { native_lang_name: "法语" },
      汉语: { native_lang_name: "汉语" },
      越南语: { native_lang_name: "越南语" },
      俄语: { native_lang_name: "俄语" },
    },
  },
  越南语: {
    user_lang: "越南语",
    lang_in_lang: "Tiếng Việt",
    languages: {
      日语: { native_lang_name: "Tiếng Nhật" },
      英语: { native_lang_name: "Tiếng Anh" },
      法语: { native_lang_name: "Tiếng Pháp" },
      汉语: { native_lang_name: "Tiếng Trung" },
      越南语: { native_lang_name: "Tiếng Việt" },
      俄语: { native_lang_name: "Tiếng Nga" },
    },
  },
  俄语: {
    user_lang: "俄语",
    lang_in_lang: "русский",
    languages: {
      日语: { native_lang_name: "Японский" },
      英语: { native_lang_name: "Английский" },
      法语: { native_lang_name: "Французский" },
      汉语: { native_lang_name: "Китайский" },
      越南语: { native_lang_name: "Вьетнамский" },
      俄语: { native_lang_name: "Русский" },
    },
  },
};

let input_language = null;

contextBridge.exposeInMainWorld("electronAPI", {
  getGPT: (messages, model = "gpt-3.5-turbo") =>
    ipcRenderer.invoke("get-GPT", messages, model),
  getLanguagesConfig: () => languages_config,
  getSelectedLanguages: () => selected_languages,
  getInitialUserLang: () => initial_user_lang,
  getInputLanguage: () => input_language,
});

window.addEventListener("DOMContentLoaded", () => {
  const translator = document.querySelector(".translator ");
  const lang_select = document.querySelector("select.lang-select");

  for (const language of selected_languages) {
    lang_select.insertAdjacentHTML(
      "beforeend",
      `<option value=${language} class=${language}>${languages_config[language].lang_in_lang}</option>`
    );
    translator.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="col-md-2 col-3 text-center order-1">
        <label class="form-label form-label-lg ${language}">${languages_config[initial_user_lang].languages[language].native_lang_name}</label>
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
  document.querySelector(`option.${initial_user_lang}`).selected = true;

  //更改输入框背景颜色
  for (const language of selected_languages) {
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
