const languages = window.electronAPI.getLanguages();

document.querySelector(".translate-button").onclick = translate;

function translate() {
  input_language = window.electronAPI.getInputLanguage();
  let input;
  if (
    input_language &&
    (input = document.querySelector(`.${input_language}.input`).value)
  ) {
    for (const language of languages) {
      console.log(`请把这个${input_language}词汇"${input}"翻译成${language}`);
      document.querySelector(`.${language}.output`).innerText = " Loading...";
      window.electronAPI
        .getGPT(`把这个${input_language}词汇"${input}"翻译成${language}`)
        .then(response => {
          console.log(response);
          document.querySelector(`.${language}.output`).innerHTML = response;
        });
    }
  } else document.getElementById("output").innerText = "请输入要翻译的词!";
}
