import tryValidate from "./validate";


function feedbackForm(formSelector, url) { // отправляет только поля с тегом "input"
  const formElems = document.querySelectorAll(formSelector);
  let lastFocusElement = null;

  document.addEventListener("click", (event) => {
    lastFocusElement = event.target;
  })
  formElems.forEach(formEl => {
    formEl.addEventListener("click", function(event) {
      const target = event.target;

      if(target.tagName === "INPUT" && target.selectionStart < 2) {
        console.log(true)
        setTimeout(function(){ target.selectionStart = target.selectionEnd = 10000; }, 0);
      }
    })
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new URLSearchParams(new FormData(formEl));
      const obj = {};
      for (const [name, value] of formData) {
        obj[name] = value;
      }

      if (tryValidate(formEl)) {
        // отправка данных и reset формы.
        fetch(url, {method: "POST", body: formData})
          .then(() => formEl.reset())
          .catch(error => console.log(error));
      }
    })
  })
}

export default feedbackForm;