// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");   //changeColor is the button element
let dropdownColorWhite = document.getElementById("dropdownColorWhite");
let dropdownColorOffWhite = document.getElementById("dropdownColorOffWhite");
let dropdownColorBlack = document.getElementById("dropdownColorBlack");
let dropdownColorCustom = document.getElementById("custombgsubmit");
let dropdownColorReset = document.getElementById("dropdownColorReset");

// chrome.storage.sync.get("color", ({ color }) => {
//     changeColor.style.backgroundColor = color;
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     chrome.storage.sync.set({ "originalbackgroundcolor": getPageBackgroundColor() });

    // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // chrome.scripting.executeScript({
    //     target: { tabId: tab.id },
    //     function: setPageBackgroundColor,
    // });
// });

dropdownColorBlack.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args: [color="#000000"],
    });
})

dropdownColorWhite.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args: [color="#ffffff"],
    });
})

dropdownColorOffWhite.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args: [color = "#f8f0e3"],
    });
})

dropdownColorReset.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let bgcolor = "";
    chrome.storage.sync.get("originalbackgroundcolor", (result) => {
        bgcolor = result.originalbackgroundcolor;
    })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args: [color = bgcolor],
    });
})

dropdownColorCustom.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let bgcolor = document.getElementById("custombgcolor").value;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
        args: [color = bgcolor],
    });
})

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor(color) {
    // chrome.storage.sync.get("color", ({ color }) => {
    //     document.body.style.backgroundColor = color;
    // });
    document.body.style.backgroundColor = color;
    let paragraphs = document.getElementsByTagName("p");
    for (elt of paragraphs) {
        elt.style['background-color'] = color;
    }
}

//function to save previous background color
// function getPageBackgroundColor() {
//     return document.body.style.backgroundColor;
// }