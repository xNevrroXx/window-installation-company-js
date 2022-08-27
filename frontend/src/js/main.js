import modals from "./modules/modals";
import feedbackForm from "./modules/feedbackForm";
import setMaskPhoneNumber from "./modules/maskInput";
import activateTabs from "./modules/tabs";
import calcFeedbackForm from "./modules/calcFeedbackForm";

export const urlServer = "http://localhost:9999/feedbacks";

window.addEventListener("DOMContentLoaded", () => {
  // modals
  modals(".popup_engineer_btn", ".popup_engineer");
  modals(".phone_link", ".popup");

  // feedback forms
  setMaskPhoneNumber();
  feedbackForm(".form:not(.form_end)", urlServer);
  calcFeedbackForm( urlServer);

  // tabs
  const triggerContentMatchObj1 = {
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
  activateTabs("section.glazing", triggerContentMatchObj1);

  const triggerContentMatchObj2 = {
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
  activateTabs(".popup_calc", triggerContentMatchObj2, 0, "do_image_more", "calc");

  const triggerContentMatchObj3 = {
    internal: {
      trigger: ".internal_link",
      content: ".decoration_content > .row > .internal"
    },
    external: {
      trigger: ".external_link",
      content: ".decoration_content > .row > .external"
    },
    rising: {
      trigger: ".rising_link",
      content: ".decoration_content > .row > .rising"
    },
    roof: {
      trigger: ".roof_link",
      content: ".decoration_content > .row > .roof"
    },
  }
  activateTabs("section.decoration", triggerContentMatchObj3, 0, "after_click")
})