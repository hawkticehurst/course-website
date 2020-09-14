(function () {
  "use strict";

  // Ensures that fetched data is not cached by browsers 
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchCPs();
  }

  function fetchCPs() {
    const url = "../json/creative-projects.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateCPs)
      .catch(console.log);
  }

  function populateCPs(responseJSON) {
    const cps = responseJSON.cps;
    for (let i = 0; i < cps.length; i++) {
      // Initialize CP card
      const cpDiv = document.createElement("div");
      cpDiv.classList.add("card");
      cpDiv.classList.add("assignment-card");

      // Add CP name to card
      const cpName = document.createElement("h2");
      cpName.innerText = cps[i].name;
      cpDiv.appendChild(cpName);

      // Add CP assignment date to card
      const cpAssignedContainer = document.createElement("div");
      const cpAssignedTitle = document.createElement("h3");
      cpAssignedTitle.innerText = "Assigned: ";
      cpAssignedContainer.appendChild(cpAssignedTitle);
      const cpAssignedDate = document.createElement("p");
      cpAssignedDate.innerText = cps[i].assigned;
      cpAssignedContainer.appendChild(cpAssignedDate);
      cpDiv.appendChild(cpAssignedContainer);

      // Add CP due date to card
      const cpDueContainer = document.createElement("div");
      const cpDueTitle = document.createElement("h3");
      cpDueTitle.innerText = "Due: ";
      cpDueContainer.appendChild(cpDueTitle);
      const cpDueDate = document.createElement("p");
      cpDueDate.innerText = cps[i].due;
      cpDueContainer.appendChild(cpDueDate);
      cpDiv.appendChild(cpDueContainer);

      // Add CP final due date to card if applicable
      if (cps[i].finaldue !== "") {
        const cpFinalDueContainer = document.createElement("div");
        const cpFinalDueTitle = document.createElement("h3");
        cpFinalDueTitle.innerText = "GitGrade Lock: ";
        cpFinalDueContainer.appendChild(cpFinalDueTitle);
        const cpFinalDueDate = document.createElement("p");
        cpFinalDueDate.innerText = cps[i].finaldue;
        cpFinalDueContainer.appendChild(cpFinalDueDate);
        cpDiv.appendChild(cpFinalDueContainer);
      }

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("button-container");

      if (cps[i].accpetlink !== "") {
        const acceptBtn = document.createElement("a");
        acceptBtn.classList.add("button");
        acceptBtn.setAttribute("target", "_blank");
        acceptBtn.href = cps[i].acceptlink;
        acceptBtn.innerText = "Accept CP";
        btnContainer.appendChild(acceptBtn); ``
      }

      if (cps[i].enableturnin) {
        if (cps[i].turninlink !== "") {
          const turninBtn = document.createElement("a");
          turninBtn.classList.add("button");
          turninBtn.setAttribute("target", "_blank");
          turninBtn.href = cps[i].turninlink;
          turninBtn.innerText = "Turn in CP";
          btnContainer.appendChild(turninBtn);
        }
      }

      if (cps[i].showcaselink !== "") {
        const showcaseBtn = document.createElement("a");
        showcaseBtn.classList.add("button");
        showcaseBtn.setAttribute("target", "_blank");
        showcaseBtn.href = cps[i].showcaselink;
        showcaseBtn.innerText = "Submit to Showcase!";
        btnContainer.appendChild(showcaseBtn);
      }

      cpDiv.appendChild(btnContainer);
      const cpContainer = id("cp-container");
      cpContainer.appendChild(cpDiv);
    }
  }

  /*****************************  HELPER FUNCTIONS  *****************************/

  /**
    * Helper function to create shorthand for document.getElementById.
    * @param {string} the ID of the element that will be retrieved
    * @return {DOM object} the DOM object with the corresponding ID
    */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
    * Function to check the status of an Ajax call, boiler plate code to include,
    * based on: https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    * @param the response text from the url call
    * @return did we succeed or not, so we know whether or not to continue with
    * the handling of this promise
    */
  function checkStatus(response) {
    const OK = 200;
    const ERROR = 300;
    if (response.status >= OK && response.status < ERROR) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " +
        response.statusText));
    }
  }

})();
