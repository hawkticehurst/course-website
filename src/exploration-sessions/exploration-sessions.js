(function () {
  "use strict";

  // Ensures that fetched data is not cached by browsers 
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchSessions();
  }

  function fetchSessions() {
    let url = "../json/exploration-sessions.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateSessions)
      .catch(console.log);
  }

  function populateSessions(responseJSON) {
    const sessions = responseJSON.sessions;
    for (let i = 0; i < sessions.length; i++) {
      // Initialize exploration session card
      const exploreDiv = document.createElement("div");
      exploreDiv.classList.add("card");
      exploreDiv.classList.add("assignment-card");

      // Add exploration session title to card
      const exploreName = document.createElement("h2");
      exploreName.innerText = sessions[i].name;
      exploreDiv.appendChild(exploreName);

      // Add exploration session date to card
      const exploreDate = document.createElement("p");
      exploreDate.classList.add("explore-info");
      exploreDate.innerText = sessions[i].date;
      exploreDiv.appendChild(exploreDate);

      // Add exploration session location to card
      const exploreLocation = document.createElement("p");
      exploreLocation.classList.add("explore-info");
      exploreLocation.innerText = "Location: " + sessions[i].location;
      exploreDiv.appendChild(exploreLocation);

      // Add exploration session description to card
      const exploreDescription = document.createElement("p");
      exploreDescription.classList.add("explore-info");
      exploreDescription.innerText = sessions[i].description;
      exploreDiv.appendChild(exploreDescription);

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("button-container");

      // Add exploration session slides if available
      if (sessions[i].slides) {
        // Add exploration session slides to card
        const slidesBtn = document.createElement("a");
        slidesBtn.classList.add("button");
        slidesBtn.setAttribute("target", "_blank");
        slidesBtn.href = sessions[i].slides;
        slidesBtn.innerText = "Slides";
        btnContainer.appendChild(slidesBtn);
      }

      // Add exploration session video if available
      if (sessions[i].video) {
        const videoBtn = document.createElement("a");
        videoBtn.classList.add("button");
        videoBtn.setAttribute("target", "_blank");
        videoBtn.href = sessions[i].video;
        videoBtn.innerText = "Video";
        btnContainer.appendChild(videoBtn);
      }

      // Add extra materials/links to card if available
      if (sessions[i].materials.length > 0) {
        for (let j = 0; j < sessions[i].materials.length; j++) {
          const linkBtn = document.createElement("a");
          linkBtn.classList.add("button");
          linkBtn.setAttribute("target", "_blank");
          linkBtn.href = sessions[i].materials[j].link;
          linkBtn.innerText = sessions[i].materials[j].linkname;
          btnContainer.appendChild(linkBtn);
        }
      }

      exploreDiv.appendChild(btnContainer);
      const exploreContainer = id("explore-container");
      exploreContainer.appendChild(exploreDiv);
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
