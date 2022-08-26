import modal from "./modules/modal";
import feedbackForm from "./modules/feedbackForm";
import setMaskPhoneNumber from "./modules/maskInput";

window.addEventListener("DOMContentLoaded", () => {
  modal(".popup_engineer_btn", ".popup_engineer");
  modal(".phone_link", ".popup");

  setMaskPhoneNumber();
  feedbackForm(".form", "http://localhost:3000/feedbacks"); // todo add URL for posting
})