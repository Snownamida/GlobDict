const languages_config = window.electronAPI.getLanguagesConfig();
const selected_languages = window.electronAPI.getSelectedLanguages();
let user_lang = window.electronAPI.getInitialUserLang();

document.querySelector(".translate-button").onclick = translate;
const lang_select = document.querySelector("select.lang-select");
lang_select.onchange = () => changeUserLang(lang_select.value);

function translate() {
  input_language = window.electronAPI.getInputLanguage();
  let input;
  if (
    input_language &&
    (input = document.querySelector(`.${input_language}.input`).value)
  ) {
    for (const language of selected_languages) {
      console.log(
        languages_config[user_lang].prompt(
          languages_config[user_lang].languages[input_language]
            .native_lang_name,
          languages_config[user_lang].languages[language].native_lang_name
        )
      );
      document.querySelector(`.${language}.output`).innerText = " Loading...";
      window.electronAPI
        .getGPT([
          {
            role: "system",
            content: languages_config[user_lang].prompt(
              languages_config[user_lang].languages[input_language]
                .native_lang_name,
              languages_config[user_lang].languages[language].native_lang_name
            ),
          },
          {
            role: "user",
            content: `${input}`,
          },
        ])
        .then(response => {
          console.log(response);
          document.querySelector(`.${language}.output`).innerHTML = response;
        });
    }
  } else document.getElementById("output").innerText = "请输入要翻译的词!";
}

function changeUserLang(selected_lang) {
  user_lang = selected_lang;

  for (const language of selected_languages) {
    document.querySelector(`label.${language}`).innerText =
      languages_config[user_lang].languages[language].native_lang_name;
  }
}
