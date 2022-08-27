import modals from "./modules/modals";
import feedbackForm from "./modules/feedbackForm";
import setMaskPhoneNumber from "./modules/maskInput";
import activateTabs from "./modules/tabs";
import calcFeedbackForm from "./modules/calcFeedbackForm";

export const urlServer = "http://localhost:9999/feedbacks";

window.addEventListener("DOMContentLoaded", () => {
  modals(".popup_engineer_btn", ".popup_engineer");
  modals(".phone_link", ".popup");

  setMaskPhoneNumber();
  feedbackForm(".form:not(.form_end)", urlServer);

  const triggerContentMatchObj = {
    tree: {
      trigger: "[data-type-glazing='tree']",
      content: ".glazing_content.tree"
    },
    aluminium: {
      trigger: "[data-type-glazing='aluminium']",
      content: ".glazing_content.aluminium"
    },
    plastic: {
      trigger: "[data-type-glazing='plastic']",
      content: ".glazing_content.plastic"
    },
    french: {
      trigger: "[data-type-glazing='french']",
      content: ".glazing_content.french"
    },
    rise: {
      trigger: "[data-type-glazing='rise']",
      content: ".glazing_content.rise"
    },
  }
  activateTabs("section.glazing", triggerContentMatchObj);

  const triggerContentMatchObjIcons = {
    1: {
      trigger: '[src="assets/img/modal_calc/balkon/ba_01.png"]',
      content: '[src="assets/img/modal_calc/balkon/type1.png"]'
    },
    2: {
      trigger: '[src="assets/img/modal_calc/balkon/ba_02.png"]',
      content: '[src="assets/img/modal_calc/balkon/type2.png"]'
    },
    3: {
      trigger: '[src="assets/img/modal_calc/balkon/ba_03.png"]',
      content: '[src="assets/img/modal_calc/balkon/type3.png"]'
    },
    4: {
      trigger: '[src="assets/img/modal_calc/balkon/ba_04.png"]',
      content: '[src="assets/img/modal_calc/balkon/type4.png"]'
    }
  };
  activateTabs(".popup_calc", triggerContentMatchObjIcons, 0, "do_image_more", "calc");

  calcFeedbackForm( urlServer);
})