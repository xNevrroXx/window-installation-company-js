import {v4 as uuidv4} from "uuid";
import tryValidate from "./validate";


function feedbackForm(formSelector, url) { // отправляет только поля с тегом "input"
  const formElems = document.querySelectorAll(formSelector);

  formElems.forEach(formEl => {
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
          .then(response => response.json())
          .then(data => console.log(data))
      }
    })
  })
}

export default feedbackForm;