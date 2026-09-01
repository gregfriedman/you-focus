# YouFocus

This is a WebExtension that we hope to run in Chrome, Safari, and maybe others.
The primary interaction is the user viewing a page in YouTube and seeing distracting content removed due to the injected content_script called main.js
The secondary interaction is the user modifying the settings via popup.html and then seeing the results of that change reflected on modifications to what is displayed on the YouTube page.
This is deployed to multiple Web stores. 
We want to know that the extension works before deploying it to the Web stores so testing through the browser (aka the front-door) with as much of the true browser functionality as possible is essential.
