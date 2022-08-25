import modal from "./modules/modal";
import feedbackForm from "./modules/feedbackForm";

window.addEventListener("DOMContentLoaded", () => {
  modal(".popup_engineer_btn", ".popup_engineer");
  modal(".phone_link", ".popup");

  feedbackForm(".form", "SOME-URL"); // todo add URL for posting
})