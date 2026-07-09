# YouFocus

A lightweight productivity Chrome extension that hides distracting recommendations and popups on YouTube

### Installation: 
##### Chrome Web Store: 
1. Install on the Chrome Web Store [**here**](https://chromewebstore.google.com/detail/youfocus-hide-youtube-dis/kbcdmkcnmpolhhhpeohepljeccihfngl)!

##### Local Installation:
1. Download Zip from github [**here**](https://github.com/leo3friedman/you-focus/archive/refs/heads/main.zip)
2. Navigate to [chrome://extensions/](chrome://extensions/)
3. Make sure developer mode is enabled and then click "Load unpacked".
4. Upload downloaded folder.

### Features:
YouFocus creates a more productive YouTube experience by: 
- Hiding Recommended Homepage Videos
- Hiding Related Sidebar Videos
- Hiding Endwall Videos
- Hiding comments
- Disabling Trending Mode 
- Disabling Subscription Mode
- Blocking Banner Ads
- Disabling Autoplay
- Hide Left Sidebar
- Run on Schedule Feature
- Hide Shorts

### Development
When making code changes to the extension, you can interact with the local development version:
1. Navigate to [chrome://extensions/](chrome://extensions/)
2. Make sure developer mode is enabled and then click "Load unpacked".
3. Select the [/src](/src) folder

Some changes will be reflected automatically in the loaded extension in Chrome (e.g. popup). 

Other changes require that you click the reload icon on the card via chrome://extensions.

#### Project Layout
```
you-focus
|- src/ 
|- tests/ 
```
| File   | Description                                                    |
|--------|----------------------------------------------------------------|
| src/   | only files that should be deployed when extension is installed |
| tests/ | automated tests to be run against the code in src/             |