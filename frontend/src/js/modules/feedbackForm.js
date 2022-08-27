import tryValidate from "./validate";

function feedbackForm(formSelector, url, extraData = {}) { // отправляет только поля с тегом "input"
  const formElems = document.querySelectorAll(formSelector);
  let lastFocusElement = null;

  document.addEventListener("click", (event) => {
    lastFocusElement = event.target;
  })
  formElems.forEach(formEl => {
    formEl.addEventListener("click", function(event) {
      const target = event.target;

      if(target.tagName === "INPUT" && target.selectionStart < 2) {
        setTimeout(function(){ target.selectionStart = target.selectionEnd = 10000; }, 0);
      }
    })
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(formEl);

      if(Object.keys(extraData).length) {
        for (const key in extraData) {
          formData.append(key, extraData[key]);
        }
      }

      if (tryValidate(formEl)) {
        fetch(url, {method: "POST", body: new URLSearchParams(formData)})
          .then(data => data.json())
          .then(json => console.log(json))
          .then(() => formEl.reset())
          .catch(error => console.log(error));
      }
    })
  })
}

export default feedbackForm;