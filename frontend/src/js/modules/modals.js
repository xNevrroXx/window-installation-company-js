function modals(triggerOpenBtnSelector, modalSelector, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}) {
  const triggerOpenBtns = document.querySelectorAll(triggerOpenBtnSelector);
  const modalEl = document.querySelector(modalSelector);

  triggerOpenBtns.forEach(triggerEl => {
    triggerEl.addEventListener("click", () => {
      additionalFunctionOnOpen();
      modalEl.style.display = activeDisplayTypeStyle;
    })
  })

  modalEl.addEventListener("click", (event) => {
    const target = event.target;
    if(
      target.tagName === "STRONG" ||
      (target.tagName === "BUTTON" && target.classList.contains("popup_close")) ||
      target === event.currentTarget
    ) {
      modalEl.style.display = "none";
    }
  })
}

function activateModal(modalSelector, activeDisplayTypeStyle = "block", additionalFunctionOnOpen = () => {}, additionalFunctionOnClose = () => {}) {
  const modalEl = document.querySelector(modalSelector);

  modalEl.style.display = activeDisplayTypeStyle;
  additionalFunctionOnOpen();

  modalEl.addEventListener("click", (event) => {
    const target = event.target;
    if(
      target.tagName === "STRONG" ||
      (target.tagName === "BUTTON" && target.classList.contains("popup_close")) ||
      target === event.currentTarget
    ) {
      modalEl.style.display = "none";
      additionalFunctionOnClose();
    }
  })
}

export default modals;
export {activateModal};