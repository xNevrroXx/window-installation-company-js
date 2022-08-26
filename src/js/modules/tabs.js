function activateTabs(mainContainerSelector, triggerContentMatchObj, defaultActiveTab = 0) {
  const mainContainerEl = document.querySelector(mainContainerSelector);
  let activeTab = triggerContentMatchObj[Object.keys(triggerContentMatchObj)[defaultActiveTab]];
  console.log(triggerContentMatchObj[Object.keys(triggerContentMatchObj)[defaultActiveTab]])
  toggleActiveTabs(activeTab);

  mainContainerEl.addEventListener("click", (event) => {
    const target = event.target;

    for (const key in triggerContentMatchObj) {
      const selectorsObj = triggerContentMatchObj[key];
      const someTriggerEl = mainContainerEl.querySelector(selectorsObj.trigger);

      if(target) {
        Array.from(someTriggerEl.children).forEach(child => {
          if(target === someTriggerEl || child === target) {
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

    triggerLastElem.classList.remove("active");
    contentLastElem.classList.remove("active");

    activeTab = selectorsObjActive;
    const triggerNewElem = mainContainerEl.querySelector(activeTab.trigger);
    const contentNewElem = mainContainerEl.querySelector(activeTab.content);
    triggerNewElem.classList.add("active");
    contentNewElem.classList.add("active");
  }
}

export default activateTabs;