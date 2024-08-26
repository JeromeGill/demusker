// create a listener that change chrome.storage.local.get("hideMuskCheckbox") to true or false when the toggle is clicked
let hideMuskCheckbox = document.getElementById("hideMuskCheckbox");

chrome.storage.sync.get('hideMusk', storage => {
    hideMuskCheckbox.checked = storage.hideMusk;
});


hideMuskCheckbox.addEventListener("click", () => {
  chrome.storage.sync.set({
    hideMusk: hideMuskCheckbox.checked,
  });
  reloadCurrentTab();
});


function reloadCurrentTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
}