const contentTabs = document.querySelectorAll(".content-tab");

contentTabs.forEach((tab) => {
  tab.addEventListener("mouseover", () => {
    contentTabs.forEach((otherTab) => {
      if (otherTab !== tab) {
        otherTab.style.display = "none";
        otherTab.style.transition = "ease-out 0.2s";
      }
    });
  });

  tab.addEventListener("mouseout", () => {
    contentTabs.forEach((otherTab) => {
      if (otherTab !== tab) {
        otherTab.style.display = "block";
        otherTab.style.transition = "none";
      }
    });
  });
});
