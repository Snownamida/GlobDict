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
