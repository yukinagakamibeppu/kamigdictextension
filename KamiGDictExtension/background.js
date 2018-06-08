// background.js

// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
  
  // Check if the active tab is google search page
  console.debug("Tab URL:" + tab.url);
  if (!tab.url.startsWith("https://www.google")) {
    alert("Unknown URL. This extension is for google search page.");
    return;
  }

  // for the current tab, inject the "inject.js" file & execute it
  chrome.tabs.executeScript({
    file: 'inject.js'
  });

});
