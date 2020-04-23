(function () {
  "use strict";

  // Ensures that fetched data is not cached by browsers
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchAnnoucements();
    fetchStaff();
  }

  function fetchAnnoucements() {
    const url = "json/announcements.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateAnnouncements)
      .catch(console.log);
  }

  function populateAnnouncements(responseJSON) {
    const announcements = responseJSON.announcements;
    const announcementsList = id("announcements-list");
    for (let i = 0; i < announcements.length; i++) {
      const li = document.createElement("li");
      li.innerHTML = announcements[i];
      announcementsList.appendChild(li);
    }
  }

  function fetchStaff() {
    const url = "json/staff.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateStaff)
      .catch(console.log);
  }

  function populateStaff(responseJSON) {
    const staff = responseJSON.staff;
    for (let i = 0; i < staff.length; i++) {

      // Initialize staff card
      const staffCard = document.createElement("div");
      staffCard.classList.add("card");
      staffCard.classList.add("staff-card");
      staffCard.setAttribute("data-aos", "fade-right");
      staffCard.setAttribute("data-aos-once", "true");
      staffCard.setAttribute("data-aos-duration", "1000");

      // Add staff image to card
      const img = document.createElement("img");
      const imgLink = staff[i].imglink;
      img.src = imgLink
      img.alt = "Headshot of " + imgLink;
      staffCard.appendChild(img);

      // Create a div to contain staff information
      const staffInfo = document.createElement("div");
      staffInfo.classList.add("staff-info");

      // Create a div to contain staff name and email icon
      const nameEmailContainer = document.createElement("div");
      nameEmailContainer.classList.add("name-email-container");
      staffInfo.appendChild(nameEmailContainer);

      // Add staff name with about me page link to card
      const name = document.createElement("h3");
      const aboutMe = document.createElement("a");
      aboutMe.href = staff[i].aboutme;
      aboutMe.innerText = staff[i].name;
      aboutMe.classList.add("staff-name");
      name.appendChild(aboutMe);
      nameEmailContainer.appendChild(name);

      // Add staff email and email icon to card
      const emailLink = document.createElement("a");
      emailLink.href = "mailto:" + staff[i].email;
      const emailIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      emailIcon.classList.add("email-icon");
      emailIcon.style.width = "22px";
      emailIcon.style.height = "22px";
      const emailIconImage = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      emailIconImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'assets/website-icons.svg#envelope-1');
      emailIcon.appendChild(emailIconImage);
      emailLink.appendChild(emailIcon);
      nameEmailContainer.appendChild(emailLink);

      if (staff[i].type === "Instructor") {
        // Add office number to staff info
        const office = document.createElement("p");
        office.innerText = "Office: " + staff[i].office;
        staffInfo.appendChild(office);

        // Add office hours link to staff info
        const officeHours = document.createElement("a");
        officeHours.href = staff[i].officehrs;
        officeHours.innerText = "Office Hours";
        officeHours.classList.add("blue-link");
        officeHours.classList.add("office-hours")
        staffInfo.appendChild(officeHours);

        // Add staff info to staff card
        staffCard.appendChild(staffInfo);

        // Add staff card instructor section of homepage
        const instructorContainer = id("instructor-container");
        instructorContainer.appendChild(staffCard);
      } else if (staff[i].type === "Head TA") {
        // Add TA type to staff info
        const type = document.createElement("p");
        type.innerText = staff[i].type;
        staffInfo.appendChild(type);

        // Add office hours link to staff info
        const officeHours = document.createElement("a");
        officeHours.href = staff[i].officehrs;
        officeHours.innerText = "Office Hours";
        officeHours.classList.add("blue-link");
        officeHours.classList.add("office-hours")
        staffInfo.appendChild(officeHours);

        // Add staff info to staff card
        staffCard.appendChild(staffInfo);

        // Add staff card instructor section of homepage
        const taContainer = id("ta-container");
        taContainer.appendChild(staffCard);
      } else if (staff[i].type === "TA") {
        // Add section to staff info
        const section = document.createElement("p");
        section.innerText = "Section: " + staff[i].section;
        staffInfo.appendChild(section);

        // Add staff info to staff card
        staffCard.appendChild(staffInfo);

        // Add staff card instructor section of homepage
        const taContainer = id("ta-container");
        taContainer.appendChild(staffCard);
      } else if (staff[i].type === "Mentor") {
        // Add TA type to staff info
        const type = document.createElement("p");
        type.innerText = staff[i].type;
        staffInfo.appendChild(type);

        // Add mentorship hours link to staff info
        const mentorHours = document.createElement("a");
        mentorHours.href = staff[i].mentorhrs;
        mentorHours.innerText = "Mentorship Program";
        mentorHours.classList.add("blue-link");
        mentorHours.classList.add("office-hours")
        staffInfo.appendChild(mentorHours);

        // Add staff info to staff card
        staffCard.appendChild(staffInfo);

        // Add staff card instructor section of homepage
        const taContainer = id("ta-container");
        taContainer.appendChild(staffCard);
      } else {
        // Add TA type to staff info
        const type = document.createElement("p");
        type.innerText = staff[i].type;
        staffInfo.appendChild(type);

        // Add staff info to staff card
        staffCard.appendChild(staffInfo);

        // Add staff card instructor section of homepage
        const taContainer = id("ta-container");
        taContainer.appendChild(staffCard);
      }
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
