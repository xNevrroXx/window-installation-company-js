import feedbackForm from "./feedbackForm";
import modals, {activateModal} from "./modals";

function calcFeedbackForm(url) {
  const firstStageForm = {
      selector: ".popup_calc",
      getInputFields: function() {
        return {
          getInputsSizes: () => document.querySelectorAll(`${this.selector} input`),
          getTypesBalconies: () => document.querySelectorAll(`${this.selector} .balcon_icons_img`)
        };
      },
      getToNextStageBtn: function() {
        return document.querySelector(`${this.selector} .button.popup_calc_button`);
      }
    },
    secondStageForm = {
      selector: ".popup_calc_profile",
      getInputFields: function() {
        return {
          getSelectGlazing: () => {
            return document.querySelector(`${this.selector} select[name="view_glazing"]`);
          },
          getCheckboxWarm: () => {
            return document.querySelector(`${this.selector} input[name="warm_glazing"]`);
          },
          getCheckboxCold: () => {
            return document.querySelector(`${this.selector} input[name="cold_glazing"]`);
          }
        }
      },
      getToNextStageBtn: function() {
        return document.querySelector(`${this.selector} .button.popup_calc_profile_button`);
      }
    },
    lastStageForm = {
      selector: ".popup_calc_end",
    };
  const dataFeedback = {};
  let validateErrors = {};

  modals(".popup_calc_btn", ".popup_calc", "block", function() {
    firstStageForm.getInputFields().getTypesBalconies().forEach(typeBalcony => {
      if(typeBalcony.classList.contains("do_image_more")) {
        dataFeedback["typeBalcony"] = typeBalcony.getAttribute("alt");
      }

      typeBalcony.addEventListener("click", () => {
        setTimeout(() => { // wait until tab module change activity class
          firstStageForm.getInputFields().getTypesBalconies().forEach(newActiveTypeBalcony => {
            if(newActiveTypeBalcony.classList.contains("do_image_more")) {
              dataFeedback["typeBalcony"] = newActiveTypeBalcony.querySelector("img").getAttribute("alt");
            }
          })
        }, 0);
      })
    })
    firstStageForm.getInputFields().getInputsSizes().forEach(inputEl => {
      inputEl.addEventListener("change", function() {
        dataFeedback[this.name] = this.value.trim();
      })
    });
    firstStageForm.getToNextStageBtn().addEventListener("click", function() {
      const fields = ["width", "height"];

      validateErrors = {};
      for (const field of fields) {
        if(!dataFeedback[field]) {
          validateErrors[field] = {
            message: "Обязательное поле для ввода"
          };
        }
        else if(/^\d+$/.test(dataFeedback[field]) === false) {
          validateErrors[field] = {
            message: "Требуется числовое значение"
          };
        }
      }

      if(Object.keys(validateErrors).length === 0) {
        activateModal(".popup_calc_profile", secondStageFunc);
      }
      else {
        firstStageForm.getInputFields().forEach(inputEl => {
          inputEl.style.borderColor = Object.keys(validateErrors).includes(inputEl.name) ? "red" : null;
        })
      }
    });
  });

  function secondStageFunc() {
    dataFeedback["view_glazing"] = secondStageForm.getInputFields().getSelectGlazing().value;
    document.querySelector(firstStageForm.selector).style.display = "none";

    secondStageForm.getInputFields().getSelectGlazing().addEventListener("change", function() {
      dataFeedback["view_glazing"] = this.value;
    })
    secondStageForm.getInputFields().getCheckboxCold().addEventListener("change", function() {
      if(dataFeedback["warm_glazing"])
        dataFeedback["warm_glazing"] = false;

      dataFeedback[this.name] = this.value;
    });
    secondStageForm.getInputFields().getCheckboxWarm().addEventListener("change", function() {
      if(dataFeedback["cold_glazing"])
        dataFeedback["cold_glazing"] = false;

      dataFeedback[this.name] = this.value;
    });

    secondStageForm.getToNextStageBtn().addEventListener("click", function() {
      validateErrors = {};

      if(!dataFeedback["cold_glazing"] && !dataFeedback["warm_glazing"]) {
        validateErrors["type_glazing"] = "Выберите один из вариантов";
      }

      if(Object.keys(validateErrors).length === 0) {
        activateModal(lastStageForm.selector, () => {
          document.querySelector(secondStageForm.selector).style.display = "none";
        });
        feedbackForm(`${lastStageForm.selector} form`, url, dataFeedback);
      }
      else {
        document.querySelector(`${secondStageForm.selector} #warm`).style.borderColor = "red";
        document.querySelector(`${secondStageForm.selector} #cold`).style.borderColor = "red";
        secondStageForm.getToNextStageBtn().before(createErrorEl(validateErrors["type_glazing"]));
      }
    });
  }
}

function createErrorEl(text, className = "error") {
  const errorEl = document.createElement("div");
  errorEl.className = className;
  errorEl.textContent = text;

  return errorEl;
}

export default calcFeedbackForm;