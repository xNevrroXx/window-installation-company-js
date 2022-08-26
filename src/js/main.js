import modal from "./modules/modal";
import feedbackForm from "./modules/feedbackForm";
import setMaskPhoneNumber from "./modules/maskInput";
import activateTabs from "./modules/tabs";

window.addEventListener("DOMContentLoaded", () => {
  modal(".popup_engineer_btn", ".popup_engineer");
  modal(".phone_link", ".popup");

  setMaskPhoneNumber();
  feedbackForm(".form", "http://localhost:3000/feedbacks");

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
})