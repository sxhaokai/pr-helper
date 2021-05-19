chrome.action.onClicked.addListener((tab) => {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
console.log("tab.id:" + tabs[0].id + ",url:" + tabs[0].url);
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "generateReview"}, function(response) {
    console.log(response.farewell);
  });
});
});

