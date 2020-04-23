(function () {
  "use strict";

  // Ensures that fetched data is not cached by browsers 
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchHomework();
  }

  function fetchHomework() {
    const url = "../json/homework.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateHomework)
      .catch(console.log);
  }

  function populateHomework(responseJSON) {
    const homework = responseJSON.homework;
    for (let i = 0; i < homework.length; i++) {
      // Initialize homework card
      const hwDiv = document.createElement("div");
      hwDiv.classList.add("card");
      hwDiv.classList.add("assignment-card");

      // Add homework name to card
      const hwName = document.createElement("h2");
      hwName.innerText = homework[i].name;
      hwDiv.appendChild(hwName);

      // Add homework assignment date to card
      const hwAssignedContainer = document.createElement("div");
      const hwAssignedTitle = document.createElement("h3");
      hwAssignedTitle.innerText = "Assigned: ";
      hwAssignedContainer.appendChild(hwAssignedTitle);
      const hwAssignedDate = document.createElement("p");
      hwAssignedDate.innerText = homework[i].assigned;
      hwAssignedContainer.appendChild(hwAssignedDate);
      hwDiv.appendChild(hwAssignedContainer);

      // Add homework due date to card
      const hwDueContainer = document.createElement("div");
      const hwDueTitle = document.createElement("h3");
      hwDueTitle.innerText = "Due: ";
      hwDueContainer.appendChild(hwDueTitle);
      const hwDueDate = document.createElement("p");
      hwDueDate.innerText = homework[i].due;
      hwDueContainer.appendChild(hwDueDate);
      hwDiv.appendChild(hwDueContainer);

      // Add homework final due date to card
      const hwFinalDueContainer = document.createElement("div");
      const hwFinalDueTitle = document.createElement("h3");
      hwFinalDueTitle.innerText = "GitGrade Lock: ";
      hwFinalDueContainer.appendChild(hwFinalDueTitle);
      const hwFinalDueDate = document.createElement("p");
      hwFinalDueDate.innerText = homework[i].finaldue;
      hwFinalDueContainer.appendChild(hwFinalDueDate);
      hwDiv.appendChild(hwFinalDueContainer);

      // Add homework demo link if available
      if (homework[i].demolink !== "") {
        const videoLink = document.createElement("a");
        let demoName = homework[i].demolink;
        videoLink.href = demoName;
        let ext = demoName.substr(demoName.lastIndexOf(".") + 1);

        videoLink.innerText = ext;
        videoLink.classList.add("blue-link");
        videoLink.setAttribute("target", "_blank");

        const videoDemo = document.createElement("p");
        videoDemo.innerText = "Video Demo: ";
        videoDemo.appendChild(videoLink);
        hwDiv.appendChild(videoDemo);
      }

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("button-container");

      // Add homework accept button
      if (homework[i].acceptlink !== "") {
        const acceptBtn = document.createElement("a");
        acceptBtn.classList.add("button");
        acceptBtn.setAttribute("target", "_blank");
        acceptBtn.href = homework[i].acceptlink;
        acceptBtn.innerText = "Accept HW";
        btnContainer.appendChild(acceptBtn);
      }

      // Add homework turn in button if available
      if (homework[i].enableturnin) {
        if (homework[i].turninlink !== "") {
          const turninBtn = document.createElement("a");
          turninBtn.classList.add("button");
          turninBtn.setAttribute("target", "_blank");
          turninBtn.href = homework[i].turninlink;
          turninBtn.innerText = "Turn in HW";
          btnContainer.appendChild(turninBtn);
        }
      }

      hwDiv.appendChild(btnContainer);
      const homeworkContainer = id("homework-container");
      homeworkContainer.appendChild(hwDiv);
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
