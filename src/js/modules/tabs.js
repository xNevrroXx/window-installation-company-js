function activateTabs(mainContainerSelector, triggerContentMatchObj, defaultActiveTab = 0, activeClass = "active", typeTabs="") {
  const mainContainerEl = document.querySelector(mainContainerSelector);
  let activeTab = triggerContentMatchObj[Object.keys(triggerContentMatchObj)[defaultActiveTab]];

  toggleActiveTabs(activeTab);

  mainContainerEl.addEventListener("click", (event) => {
    const target = event.target;

    for (const key in triggerContentMatchObj) {
      const selectorsObj = triggerContentMatchObj[key];
      const someTriggerEl = mainContainerEl.querySelector(selectorsObj.trigger);

      if(target) {
        if(target === someTriggerEl) {
          toggleActiveTabs(selectorsObj);
          return;
        }
        Array.from(someTriggerEl.children).forEach(child => {
          if (child === target) {
            toggleActiveTabs(selectorsObj);
          }
        })
      }
    }
  })

  function toggleActiveTabs(selectorsObjActive) {
    const lastActiveTab = JSON.parse(JSON.stringify(activeTab));
    const triggerLastElem = mainContainerEl.querySelector(lastActiveTab.trigger);
    const contentLastElem = mainContainerEl.querySelector(lastActiveTab.content);

    if(typeTabs === "calc")
      triggerLastElem.parentElement.classList.remove(activeClass);
    else
      triggerLastElem.classList.remove(activeClass);
    contentLastElem.classList.remove(activeClass);

    activeTab = selectorsObjActive;
    const triggerNewElem = mainContainerEl.querySelector(activeTab.trigger);
    const contentNewElem = mainContainerEl.querySelector(activeTab.content);

    if(typeTabs === "calc")
      triggerNewElem.parentElement.classList.add(activeClass);
    else
      triggerNewElem.classList.add(activeClass);
    contentNewElem.classList.add(activeClass);
  }
}

export default activateTabs;