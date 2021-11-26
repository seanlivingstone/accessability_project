// background.js

let color = '#ffffff';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    //console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(changeInfo.status == "complete")    //check to see if tab has completed loading
    {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); //grab current tab
        const chromeurl = new RegExp('chrome://*');
        const chromeexturl = new RegExp('chrome-extension://*')
        if(chromeurl.test(tab.url) || chromeexturl.test(tab.url))
        {
            console.log("Chrome URL Detected. Will not load content script.");
            return;
        }
        // console.log(tab);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getPageBackgroundColor,
        },
        (results) => {
            console.log(results[0].result);
            chrome.storage.sync.set({"originalbackgroundcolor": results[0].result});
            // chrome.storage.sync.get("originalbackgroundcolor", (result) => {
            //     console.log(result.originalbackgroundcolor);
            // })
        });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getFontStyle,
        },
        (results) => {
        	console.log(results[0].result);
            chrome.storage.sync.set({"originalfontStyle": results[0].result});
        });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getFontSize,
        },
        (results) => {
            chrome.storage.sync.set({"originalfontsize": results[0].result});
        });
    }
});

//function to save previous background color
function getPageBackgroundColor() {
    // chrome.storage.sync.set({"originalbackgroundcolor": document.body.style.backgroundColor});
    // console.log(document.body.style.backgroundColor);
    let backgroundcolor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    // console.log(backgroundcolor);
    if (backgroundcolor == "")
    {
        return "#ffffff"
    }
    return backgroundcolor;
}

//function to save previous font style
function getFontStyle(){
	let fontstyle = window.getComputedStyle(document, null).getPropertyValue('font-style');
    return fontstyle;
}

//function to save previous font size
function getFontSize(){
	let fontsize = window.getComputedStyle(document, null).getPropertyValue('fontSize');
    return fontsize;
}
