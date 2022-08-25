import tryValidate from "./validate";


function feedbackForm(formSelector, url) { // отправляет только поля с тегом "input"
  const formElems = document.querySelectorAll(formSelector);

  formElems.forEach(formEl => {
    formEl.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(formEl);

      if (tryValidate(formEl) === 1) {
        // отправка данных и reset формы.
        fetch(url, {method: "POST", body: formData, headers: {"Content-type": "application/json"}})
          .then(response => console.log(response));
      }
    })
  })
}

export default feedbackForm;