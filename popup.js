// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");   //changeColor is the button element
let dropdownColorWhite = document.getElementById("dropdownColorWhite");
let dropdownColorOffWhite = document.getElementById("dropdownColorOffWhite");
let dropdownColorBlack = document.getElementById("dropdownColorBlack");
let dropdownColorCustom = document.getElementById("custombgsubmit");
let dropdownColorReset = document.getElementById("dropdownColorReset");

//Initialize button for font manipulation
let changeFont = document.getElementById("changeFont");   //changeFont is the button element
let dropdownChangeFontStyle = document.getElementById("dropdownChangeFontStyle");
let dropdownChangeFontSize = document.getElementById("customfontsizesubmit");
let dropdownFontColor = document.getElementById("dropdownFontColor");
let spacing = document.getElementById("customspacingsubmit");
let dropdownFontReset = document.getElementById("dropdownFontReset");

// Initialize font style buttons
let fontStyle = document.getElementById("fontStyle");
let dropdownFontStyleArial = document.getElementById("dropdownFontStyleArial");
let dropdownFontStyleTahoma = document.getElementById("dropdownFontStyleTahoma");
let dropdownFontStyleCalibri = document.getElementById("dropdownFontStyleCalibri");

// Initialize font color buttons
let dropdownFontColorBlack = document.getElementById("dropdownFontColorBlack");
let dropdownFontColorWhite = document.getElementById("dropdownFontColorWhite");
let dropdownFontColorCustom = document.getElementById("dropdownFontColorCustom");
let dropdownFontColorSubmit = document.getElementById("customFontColotSubmit");

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

dropdownFontStyleArial.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontStyle,
        args: [font = 'Arial']
    });
})

dropdownFontStyleTahoma.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontStyle,
        args: [font = 'Tahoma']
    });
})

dropdownFontStyleCalibri.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontStyle,
        args: [font = 'Calibri']
    });
})

dropdownFontColorBlack.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontColor,
        args: [color = '#000']
    });
})

dropdownFontColorWhite.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontColor,
        args: [color = '#fff']
    });
})

dropdownFontColorCustom.addEventListener("click", async ()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let fontColor = document.getElementById("customFontColor").value;

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontColor,
        args: [color = fontColor],
    });
})

dropdownFontReset.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let fontStyle = "";
    let fontSize = "";
    let spacing = "";
    let fontColor = "";
    chrome.storage.sync.get("originalfontstyle", (result) => {
        fontstyle = result.originalfontstyle;
    })
    chrome.storage.sync.get("originalfontsize", (result) => {
        fontSize = result.originalfontsize;
    })
    chrome.storage.sync.get("originalspacing", (result) => {
        spacing = result.originalspacing;
    })
    chrome.storage.sync.get("originalfontcolor", (result) => {
        fontColor = result.originalfontcolor;
    })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontStyle,
        args: [font = fontStyle],
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontSize,
        args: [size = fontSize],
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeSpacing,
        args: [space = spacing],
    });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontColor,
        args: [color = fontColor],
    });
})

dropdownChangeFontSize.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let fontSize = document.getElementById("customfontsize").value+"px";

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFontSize,
        args: [size = fontSize],
    });
})

spacing.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let fontSpacing = document.getElementById("customspacing").value + "em"; //(parseFloat(document.getElementById("customspacing").value) / 16 + 0.4)+"em"

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeSpacing,
        args: [space = fontSpacing],
    });
})

function changeFontColor(color) {
    document.body.style.fontColor = color;

    let paragraphs = document.getElementsByTagName("p");
    for (elt of paragraphs) {
        elt.style['color'] = color;
    }

    let hyperlink = document.getElementsByTagName("a");
    for (each of hyperlink) {
        each.style['color'] = color;
    }
}

function changeFontStyle(font){
    document.body.style.fontFamily = font;
}

function changeFontSize(size){
    document.body.style.fontSize = size;
}

function changeSpacing(space){
    document.body.style.lineHeight = space;
    let paragraphs = document.getElementsByTagName("p");
    for (elt of paragraphs) {
        elt.style['line-height'] = space;
    }
}

//function to save previous background color
// function getPageBackgroundColor() {
//     return document.body.style.backgroundColor;
// }