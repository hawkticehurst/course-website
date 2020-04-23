(function () {
  "use strict";

  // Ensures that fetched data is not cached by browsers
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchSections();
  }

  function fetchSections() {
    const url = "../json/sections.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateSections)
      .catch(console.log);
  }

  function populateSections(responseJSON) {
    const sections = responseJSON.sections;
    for (let i = 0; i < sections.length; i++) {
      // Initialize section card
      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add("card");
      sectionDiv.classList.add("assignment-card");

      // Add section title to card
      const sectionName = document.createElement("h2");
      sectionName.innerText = sections[i].name;
      sectionDiv.appendChild(sectionName);

      // Add section date to card if available
      if (sections[i].date !== "") {
        const sectionDate = document.createElement("p");
        sectionDate.innerText = "Date: " + sections[i].date;
        sectionDiv.appendChild(sectionDate);
      }

      // Add section description to card if available
      if (sections[i].description !== "") {
        const sectionDescription = document.createElement("p");
        sectionDescription.innerText = sections[i].description;
        sectionDiv.appendChild(sectionDescription);
      }

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("button-container");

      // Add section slides to card if available
      if (sections[i].slides !== "") {
        const slidesBtn = document.createElement("a");
        slidesBtn.classList.add("button");
        slidesBtn.setAttribute("target", "_blank");
        slidesBtn.href = sections[i].slides;
        slidesBtn.innerText = "Slides";
        btnContainer.appendChild(slidesBtn);
      }

      // Add quickcheck to card if available
      if (sections[i].qc !== "") {
        const qcBtn = document.createElement("a");
        qcBtn.classList.add("button");
        qcBtn.setAttribute("target", "_blank");
        qcBtn.href = sections[i].qc;
        qcBtn.innerText = "Quick Check";
        btnContainer.appendChild(qcBtn);
      }

      // Add quickcheck solution to card if available
      if (sections[i].qcsolution !== "") {
        const qcSolutionBtn = document.createElement("a");
        qcSolutionBtn.classList.add("button");
        qcSolutionBtn.setAttribute("target", "_blank");
        qcSolutionBtn.href = sections[i].qcsolution;
        qcSolutionBtn.innerText = "QC Solution";
        btnContainer.appendChild(qcSolutionBtn);
      }

      sectionDiv.appendChild(btnContainer);
      const sectionContainer = id("section-container");
      sectionContainer.appendChild(sectionDiv);
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
