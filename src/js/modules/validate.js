import Schema from 'validate';

const validateSchema = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: 2 },
    message: {
      required: "Обязательное поле",
      length:  "Минимум 2 символа"
    }
  },
  phone: {
    type: String,
    required: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    message: {
      required: "Обязательное поле",
      match: "Неверный номер телефона"
    }
  }
});
  // name: string().required("Обязательное поле").min(2, "Минимум 2 символа"),
  // phone: string().required("Обязательное поле"), "Неверный номер телефона")


function tryValidate(formEl) {
  const nameField = formEl.querySelector("input[name='user_name']");
  const phoneField = formEl.querySelector("input[name='user_phone']");

  resetErrorValidate();

  const formData = new FormData(formEl);
  const visibleData = {};
  for (const [name, value] of formData) {
    visibleData[name] = value;
  }

  const errors = validateSchema.validate({
      name: visibleData["user_name"],
      phone: visibleData["user_phone"]
    })

  const customErrorObj = {};
  for (const error of errors) {
    customErrorObj[error.path] = error.message;
  }

  if (Object.keys(customErrorObj).length !== 0) {
    if (customErrorObj["name"]) {
      const errorEl = document.createElement("div");
      errorEl.className = "error";
      errorEl.textContent = customErrorObj["name"];

      nameField.after(errorEl);
      nameField.classList.add("form_input_error")
    }
    if (customErrorObj["phone"]) {
      const errorEl = document.createElement("div");
      errorEl.className = "error";
      errorEl.textContent = customErrorObj["phone"];


      phoneField.after(errorEl);
      phoneField.classList.add("form_input_error")
    }

    return -1;
  }

  return 1;

  function resetErrorValidate() {
    formEl.querySelectorAll(".error").forEach(errorEl => {
      errorEl.remove();
    })
    nameField.classList.remove("form_input_error");
    phoneField.classList.remove("form_input_error");
  }
}

export default tryValidate;