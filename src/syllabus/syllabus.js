(function () {
  "use strict";

  const TOP_OFFSET = -100;

  window.addEventListener("load", initializePage);

  function initializePage() {
    const links = document.querySelectorAll("#syllabus-links a");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", renderAnchorLinkContentBelowNavbar);
    }
  }

  /**
   * Overrides the click event default behavior of a given anchor page 
   * link so that the anchor link content is rendered below the website
   * navbar.
   * 
   * Without this the functionality, the beginning of anchor page links 
   * will be hidden below the website navbar.
   *
   * @param clickEvent {Event} Anchor link click event to override.
   */
  function renderAnchorLinkContentBelowNavbar(clickEvent) {
    clickEvent.preventDefault();
    window.location.hash = this.hash;
    window.scrollBy(0, TOP_OFFSET);
  }

})();
