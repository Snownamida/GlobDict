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
        `你是一个词典，用户会不断发送${input_language}词汇，你要把它翻译成${language}，并附上词源和读音。注意回答的时候要用${user_lang}回答`
      );
      document.querySelector(`.${language}.output`).innerText = " Loading...";
      window.electronAPI
        .getGPT([
          {
            role: "system",
            content: `用户会发送一个${input_language}词汇，你要把它翻译成${language}，并附上词源和读音。回答的时候要用${user_lang}回答`,
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
