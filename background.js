// background.js

let color = '#f8f0e3';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Changing the background color', `color: ${color}`);
});

