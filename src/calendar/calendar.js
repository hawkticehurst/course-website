(function () {
  "use strict";

  let currMonth = undefined;
  let currMonthContainer = undefined;
  let currMonthTableBody = undefined;
  let currWeekContainer = undefined;

  // Ensures that fetched data is not cached by browsers 
  const NO_CACHE = "?no-cache=" + Math.random();

  window.addEventListener("load", initializePage);

  function initializePage() {
    fetchCalendar();
  }

  function fetchCalendar() {
    const url = "../json/calendar.json" + NO_CACHE;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(populateCalendar)
      .catch(console.log);
  }

  function populateCalendar(responseJSON) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calendar = An array of week objects
    const calendar = responseJSON.calendar;
    // Iterate through every week in calendar
    for (let i = 0; i < calendar.length; i++) {

      // Week = An array of day objects
      const week = calendar[i].week;
      const weekContainer = document.createElement("tr");
      currWeekContainer = weekContainer;
      // Iterate through every day in week
      for (let j = 0; j < week.length; j++) {
        const day = week[j];
        const date = new Date(day.date)

        // If the date is part of a new month create a new month section and
        // initialize a new month table
        if (months[date.getMonth()] !== currMonth) {
          // Initialize new month section
          currMonth = months[date.getMonth()];
          const monthContainer = document.createElement("section");
          monthContainer.classList.add("month");
          currMonthContainer = monthContainer;

          // Add calendar to calendar.html
          id("calendar-container").append(currMonthContainer);

          // Add name of month to calendar container
          const monthTitle = document.createElement("h2");
          monthTitle.innerText = currMonth;
          currMonthContainer.append(monthTitle);

          // Initialize new month table
          const monthTable = document.createElement("table");
          monthTable.classList.add("calendar");
          monthTable.classList.add("card");
          currMonthContainer.append(monthTable);

          // Initialize new month table body
          const monthTableBody = document.createElement("tbody");
          currMonthTableBody = monthTableBody;
          monthTable.append(currMonthTableBody);

          // Add weekday names to top row of calendar month
          const weekdaysRow = document.createElement("tr");
          for (let i = 1; i < 6; i++) {
            const dayOfWeek = document.createElement("th");
            dayOfWeek.classList.add("daytd");
            dayOfWeek.innerText = days[i];
            weekdaysRow.append(dayOfWeek);
          }
          currMonthTableBody.append(weekdaysRow);
        }

        // Initialize day container that will be added to the current week container
        const dayContainer = document.createElement("td");
        // If the date is equal to todays date highlight that day on the calendar
        if (date.getTime() === today.getTime()) {
          dayContainer.classList.add("highlight-cal");
        }
        const dateNum = document.createElement("span");
        dateNum.classList.add("datespan");
        // If the date number is a single digit, prefix a "0" to the number otherwise leave the number as is
        const num = date.getDate().toString().length === 1 ? "0" + date.getDate() : date.getDate();
        dateNum.innerText = num;
        dayContainer.append(dateNum);

        // ------------ Add lecture to calendar day if applicable -------------
        if (day.lecture !== null) {
          const lecture = day.lecture;

          // Initialize lecture container and add it to the day container
          const lectureContainer = document.createElement("div");
          lectureContainer.classList.add("lecture");
          lectureContainer.classList.add("event-card");
          dayContainer.append(lectureContainer);

          // Add lecture label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Lecture";
          lectureContainer.append(label);

          // Add lecture title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = lecture.title;
          lectureContainer.append(title);

          // Add horizontal line to container if applicable
          if ((lecture.readings && lecture.readings.length > 0) || (lecture.materials.length > 0) || (lecture.resources && lecture.resources.length > 0)) {
            const hr = document.createElement("hr");
            lectureContainer.append(hr);
          }

          // Add readings to container if applicable
          if (lecture.readings && lecture.readings.length > 0) {
            const readingTitle = document.createElement("p");
            readingTitle.innerText = "Readings";
            lectureContainer.append(readingTitle);

            const readingList = document.createElement("ul");
            lectureContainer.append(readingList);
            for (let i = 0; i < lecture.readings.length; i++) {
              const readingItem = document.createElement("li");
              if (lecture.readings[i].link) {
                const readingLink = document.createElement("a");
                readingLink.classList.add("blue-link");
                readingLink.href = lecture.readings[i].link;
                readingLink.innerText = lecture.readings[i].linkname;
                readingItem.append(readingLink);
              } else {
                readingItem.innerText = lecture.readings[i].linkname;
              }
              readingList.append(readingItem);
            }
          }

          // Add materials to container if applicable
          if (lecture.materials.length > 0) {
            const materialsTitle = document.createElement("p");
            materialsTitle.innerText = "Materials";
            lectureContainer.append(materialsTitle);

            const materialsList = document.createElement("ul");
            lectureContainer.append(materialsList);
            for (let i = 0; i < lecture.materials.length; i++) {
              const materialsItem = document.createElement("li");
              const materialsLink = document.createElement("a");
              materialsLink.classList.add("blue-link");
              if (lecture.materials[i].linkname === "Slides") {
                materialsLink.setAttribute("target", "_blank");
              }
              materialsLink.href = lecture.materials[i].link;
              materialsLink.innerText = lecture.materials[i].linkname;
              materialsItem.append(materialsLink);
              materialsList.append(materialsItem);
            }
          }

          // Add extra resources to container if applicable
          if (lecture.resources && lecture.resources.length > 0) {
            addResources(lectureContainer, lecture.resources);
          }

        }

        // ------------ Add section to calendar day if applicable -------------
        if (day.section !== null) {
          const section = day.section;

          // Initialize section container and add it to the day container
          const sectionContainer = document.createElement("div");
          sectionContainer.classList.add("section");
          sectionContainer.classList.add("event-card");
          dayContainer.append(sectionContainer);

          // Add section label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Section";
          sectionContainer.append(label);

          // Add section title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = section.title;
          sectionContainer.append(title);

          // Add horizontal line to container if applicable
          if ((section.materials.length > 0) || (section.resources)) {
            const hr = document.createElement("hr");
            sectionContainer.append(hr);
          }

          // Add materials to container if applicable
          if (section.materials.length > 0) {
            const materialsTitle = document.createElement("p");
            materialsTitle.innerText = "Materials";
            sectionContainer.append(materialsTitle);

            const materialsList = document.createElement("ul");
            sectionContainer.append(materialsList);
            for (let i = 0; i < section.materials.length; i++) {
              const materialsItem = document.createElement("li");
              const materialsLink = document.createElement("a");
              materialsLink.classList.add("blue-link");
              if (section.materials[i].linkname === "Slides") {
                materialsLink.setAttribute("target", "_blank");
              }
              materialsLink.href = section.materials[i].link;
              materialsLink.innerText = section.materials[i].linkname;
              materialsItem.append(materialsLink);
              materialsList.append(materialsItem);
            }
          }
          if (section.resources) {
            addResources(sectionContainer, section.resources);
          }
        }

        // ------------- Add HW to calendar day if applicable -----------------
        if (day.hw !== null) {
          const hw = day.hw;

          // Initialize HW container and add it to the day container
          const hwContainer = document.createElement("div");
          hwContainer.classList.add("hw");
          hwContainer.classList.add("event-card");
          dayContainer.append(hwContainer);

          // Add HW label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Homework";
          hwContainer.append(label);

          // Add HW title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = hw.title;
          hwContainer.append(title);

          // Add horizontal line to container
          if (hw.materials.length > 0) {
            const hr = document.createElement("hr");
            hwContainer.append(hr);
          }

          // Add materials to container if applicable
          if (hw.materials.length > 0) {
            const materialsTitle = document.createElement("p");
            materialsTitle.innerText = "Materials";
            hwContainer.append(materialsTitle);

            const materialsList = document.createElement("ul");
            hwContainer.append(materialsList);
            for (let i = 0; i < hw.materials.length; i++) {
              const materialsItem = document.createElement("li");
              const materialsLink = document.createElement("a");
              materialsLink.classList.add("blue-link");
              materialsLink.href = hw.materials[i].link;
              materialsLink.innerText = hw.materials[i].linkname;
              materialsItem.append(materialsLink);
              materialsList.append(materialsItem);
            }
          }
        }

        // -------------- Add CP to calendar day if applicable ----------------
        if (day.cp !== null) {
          const cp = day.cp;

          // Initialize CP container and add it to the day container
          const cpContainer = document.createElement("div");
          cpContainer.classList.add("cp");
          cpContainer.classList.add("event-card");
          dayContainer.append(cpContainer);

          // Add CP label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Creative Project";
          cpContainer.append(label);

          // Add CP title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = cp.title;
          cpContainer.append(title);

          // Add horizontal line to container if applicable
          if (cp.materials.length > 0) {
            const hr = document.createElement("hr");
            cpContainer.append(hr);
          }

          // Add materials to container if applicable
          if (cp.materials.length > 0) {
            const materialsTitle = document.createElement("p");
            materialsTitle.innerText = "Materials";
            cpContainer.append(materialsTitle);

            const materialsList = document.createElement("ul");
            cpContainer.append(materialsList);
            for (let i = 0; i < cp.materials.length; i++) {
              const materialsItem = document.createElement("li");
              const materialsLink = document.createElement("a");
              materialsLink.classList.add("blue-link");
              materialsLink.href = cp.materials[i].link;
              materialsLink.innerText = cp.materials[i].linkname;
              materialsItem.append(materialsLink);
              materialsList.append(materialsItem);
            }
          }
        }

        // ------- Add exploration session to calendar day if applicable ------
        if (day.exploration !== null) {
          const explore = day.exploration;

          // Initialize explore container and add it to the day container
          const exploreContainer = document.createElement("div");
          exploreContainer.classList.add("explore");
          exploreContainer.classList.add("event-card");
          dayContainer.append(exploreContainer);

          // Add explore label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Exploration Session";
          exploreContainer.append(label);

          // Add explore title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = explore.title;
          exploreContainer.append(title);

          // Add horizontal line to container if applicable
          if (explore.details.length > 0 || explore.materials.length > 0) {
            const hr = document.createElement("hr");
            exploreContainer.append(hr);
          }

          // Add explore details to container if applicable
          if (explore.details.length > 0) {
            const details = document.createElement("p");
            details.classList.add("description");
            details.innerText = explore.details;
            exploreContainer.append(details);
          }

          // Add materials to container if applicable
          if (explore.materials.length > 0) {
            const materialsTitle = document.createElement("p");
            materialsTitle.innerText = "Materials";
            exploreContainer.append(materialsTitle);

            const materialsList = document.createElement("ul");
            exploreContainer.append(materialsList);
            for (let i = 0; i < explore.materials.length; i++) {
              const materialsItem = document.createElement("li");
              const materialsLink = document.createElement("a");
              materialsLink.classList.add("blue-link");
              materialsLink.href = explore.materials[i].link;
              materialsLink.innerText = explore.materials[i].linkname;
              materialsItem.append(materialsLink);
              materialsList.append(materialsItem);
            }
          }
        }

        // -------------- Add exam to calendar day if applicable --------------
        if (day.exam !== null) {
          const exam = day.exam;

          // Initialize exam container and add it to the day container
          const examContainer = document.createElement("div");
          examContainer.classList.add("exam");
          examContainer.classList.add("event-card");
          dayContainer.append(examContainer);

          // Add exam label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = exam.id === "midterm" ? "Midterm Exam" : "Final Exam";
          examContainer.append(label);

          // Add exam details to container
          const details = document.createElement("p");
          details.classList.add("description");
          details.innerText = exam.details;
          examContainer.append(details);

          // Add horizontal line to container
          if (exam.resources.length > 0) {
            const hr = document.createElement("hr");
            examContainer.append(hr);
          }

          // Add resources to container if applicable
          if (exam.resources.length > 0) {
            const resourcesTitle = document.createElement("p");
            resourcesTitle.innerText = "Extra Resources";
            examContainer.append(resourcesTitle);

            const resourcesList = document.createElement("ul");
            examContainer.append(resourcesList);
            for (let i = 0; i < exam.resources.length; i++) {
              const resourcesItem = document.createElement("li");
              const resourcesLink = document.createElement("a");
              resourcesLink.classList.add("blue-link");
              resourcesLink.href = exam.resources[i].link;
              resourcesLink.innerText = exam.resources[i].linkname;
              resourcesItem.append(resourcesLink);
              resourcesList.append(resourcesItem);
            }
          }
        }

        // ------------- Add holiday to calendar day if applicable ------------
        if (day.holiday !== null) {
          const holiday = day.holiday;

          // Initialize holiday container and add it to the day container
          const holidayContainer = document.createElement("div");
          holidayContainer.classList.add("holiday");
          holidayContainer.classList.add("event-card");
          dayContainer.append(holidayContainer);

          // Add holiday label to container
          const label = document.createElement("p");
          label.classList.add("summary");
          label.innerText = "Holiday (No School)";
          holidayContainer.append(label);

          // Add holiday title to container
          const title = document.createElement("p");
          title.classList.add("description");
          title.innerText = holiday.title;
          holidayContainer.append(title);
        }
        currWeekContainer.append(dayContainer);
      }
      currMonthTableBody.append(currWeekContainer);
    }
  }

  function addResources(container, resources) {
    const resourcesTitle = document.createElement("p");
    resourcesTitle.innerText = "Extra Resources";
    container.append(resourcesTitle);

    const resourcesList = document.createElement("ul");
    container.append(resourcesList);
    for (let i = 0; i < resources.length; i++) {
      const resourcesItem = document.createElement("li");
      const resourcesLink = document.createElement("a");
      resourcesLink.classList.add("blue-link");
      resourcesLink.href = resources[i].link;
      resourcesLink.innerText = resources[i].linkname;
      resourcesItem.append(resourcesLink);
      resourcesList.append(resourcesItem);
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
