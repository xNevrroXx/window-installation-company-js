import modals, {activateModal} from "./modules/modals";
import feedbackForm from "./modules/feedbackForm";
import setMaskPhoneNumber from "./modules/maskInput";
import activateTabs from "./modules/tabs";
import calcFeedbackForm from "./modules/calcFeedbackForm";
import countdown from "./modules/countdown";

export const urlServer = "http://localhost:9999/feedbacks";

window.addEventListener("DOMContentLoaded", () => {
  // modals
  let wasOpenedSomeModal = false;
  setTimeout(() => {
    if(!wasOpenedSomeModal)
      activateModal(".popup");
  }, 1000*60);
  modals(".popup_engineer_btn", ".popup_engineer", "block", () => {
    wasOpenedSomeModal=true
  });
  modals(".phone_link", ".popup", "block", () => {
    wasOpenedSomeModal=true
  });

  // magnify images only js
  document.querySelectorAll("section.works a").forEach(linkEl => {
    linkEl.addEventListener("click", (event) => {
      event.preventDefault();
      const srcImg = linkEl.getAttribute("href");

      const modalEl = document.createElement("div");
      modalEl.classList.add("modal-big-image");
      modalEl.style.cssText = `
        display: none; 
        position: fixed; 
        left: 0; 
        top: 0; 
        width: 100%; 
        height: 100%; 
        background-color: rgba(0,0,0, 0.5);
        justify-content: center;
        align-items: center;
      `;
      modalEl.innerHTML = `
        <img src="${srcImg}" alt="window" style="max-height: 90%"/>
      `;

      document.querySelector("body").append(modalEl);
      activateModal(".modal-big-image", "flex",() => {}, () => {
        modalEl.remove();
      })
    })
  })


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

  // countdown / timer
  const matchObjCountdown = {
    wrapperSel: "section.sale .timer1 > .container1",
    days: {
      numberSel: "#days-count",
      signatureSel: "#days-description"
    },
    hours: {
      numberSel: "#hours-count",
      signatureSel: "#days-description"
    },
    minutes: {
      numberSel: "#minutes-count",
      signatureSel: "#days-description"
    },
    seconds: {
      numberSel: "#seconds-count",
      signatureSel: "#days-description"
    }
  }
  countdown(matchObjCountdown, new Date(2022, 7, 28, 6, 0).getTime());
})