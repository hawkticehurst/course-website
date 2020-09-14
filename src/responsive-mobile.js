(function () {
  "use strict";

  window.addEventListener("load", initializePage);

  function initializePage() {
    id("mobile-dropdown-icon").addEventListener("click", toggleNavMenu);
    id("mobile-x-icon").addEventListener("click", toggleNavMenu);
  }

  function toggleNavMenu() {
    const navbar = qs("header");
    if (navbar.className === "navbar") {
      navbar.className += " responsive-nav";
    } else {
      navbar.className = "navbar";
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
    * Helper function to create shorthand for document.querySelector.
    * @param {string} the CSS selector that will be queried
    * @return {DOM object} the DOM object corresponding to the first instance
    * of the given selector
    */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();
