const languages = window.electronAPI.getLanguages();

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
    for (const language of languages) {
      document.querySelector(`.${language}.output`).innerText = " Loading...";
      window.electronAPI
        .getGPT([
          {
            role: "system",
            content: `你是一个词典，用户会不断发送${input_language}词汇，你要把它翻译成${language}，并附上词源和读音`,
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
  console.log(selected_lang);
}
