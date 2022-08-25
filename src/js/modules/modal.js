function modal(triggerOpenBtnSelector, modalElSelector) {
  const triggerOpenBtns = document.querySelectorAll(triggerOpenBtnSelector);
  const modalEl = document.querySelector(modalElSelector);

  triggerOpenBtns.forEach(triggerEl => {
    triggerEl.addEventListener("click", () => {
      modalEl.style.display = "block";
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

export default modal;