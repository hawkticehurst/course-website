# CSE 154 JSON Architecture

The CSE 154 course website uses a JSON based system for dynamically rendering course content. This means changes made to each of the JSON files in this directory will update the website with information corresponding to the file name.

## Current JSON Files

- [Announcements](announcements.json)
- [Calendar](calendar.json)
- [Creative Projects](creative-projects.json)
- [Exploration Sessions](exploration-sessions.json)
- [Homework](homework.json)
- [Sections](sections.json)
- [SEO](seo.json)
- [Staff](staff.json)

## Schema Breakdown

Each JSON file has it's own schema that should be followed in order to correctly update website content.

### Annoucements

Information in announcements.json is used to create announcements that will be populated on the homepage of the CSE 154 website under the announcements section.

### Calendar

Information in calendar.json is used to create calendar event cards that will be populated on the calendar page of the CSE 154 website.

### Creative Projects

Information in creative-projects.json is used to create creative project assignment cards that will be populated on the creative projects page of the CSE 154 website.

### Exploration Sessions

Information in exploration-sessions.json is used to create exploration session cards that will be populated on the exploration sessions page of the CSE 154 website.

### Homework

Information in homework.json is used to create homework assignment cards that will be populated on the homework page of the CSE 154 website.

### Sections

Information in sections.json is used to create section cards that will be populated on the sections page of the CSE 154 website.

### SEO

Information in seo.json is used to create link and meta tags that will be populated within the head tag of all HTML pages in the CSE 154 website.

### Staff 

Information in staff.json is used to create staff cards that will be populated on the homepage of the CSE 154 website under the staff section.
