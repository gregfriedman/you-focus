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


## Testing

### Setup
Run `npm run setup` to ensure that 3rd party packages and playwright are installed.

### Integration Testing
We want to be able to test against the 3rd party website without actually depending on the actual website being available.  In Integration Testing, we want to test the full functionality of the service under test but with dependent services represented as a deterministic mock or fixture.

#### Generate a fixture
1. Open https://www.youtube.com in an incognito Chrome browser (with YouFocus disabled)
2. Click `File > Save Page As...` and choose Format: `Webpage, Complete`
3. Save in <project>/tests/fixtures with a name specific to which page is being saved (e.g. `YouTube-home.html`)
4. Run `npm run fixture <project>/tests/fixtures/<saved file>` to rewrite the webpage to work as a fixture. (Scripts seem to interfere with the accurate rendering of the static HTML and stylesheets without css extension are blocked)
5. Write a Playwright test which calls `gotoFixture` with the fixture path

### Visual Regression Testing
Note that npm run test:ui (i.e. playwright test --ui) doesn't seem to reflect the injected css so don't be surprised if elements are rendered that you expect to be hidden. Fortunately the toHaveScreenshot() method does capture the correct screenshot (as long as chromium is run headed)

Run `npm run pw:run` and it will run the test and launch the report if there is a failure. Use the diff tool on the report to compare the screenshots or look in the .test-results folder. If the new screenshot is correct you can run `npm run pw:update` to update all snapshots or  `npx playwright test tests/hide.spec.js --update-snapshots` to focus only on certain test file

If the test fails you can use `npx playwright show-report` to see the last run and find the `View trace` link to see actual network calls and errors