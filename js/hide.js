// save value if currently on twitter homepage
let onHomepage = false;

// get current url
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  if (obj.type === 'URL_CHANGE') {
      if (obj.url === "https://twitter.com/home" || obj.url === "https://x.com/home") {
        onHomepage = true;
      }
  }
});

// get current value of hideRetweets and hideSelfReplies
let hideMusk = false;
chrome.storage.sync.get('hideMusk', storage => {
  hideMusk = storage.hideMusk;
  if (storage.hideMusk) {
    hideMuskTweets();
  }
});


// update on infinite scroll
const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    if (hideMusk) {
        hideMuskTweets();
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// jquery to hide all tweets with the words "elon" or "musk" in them
function hideMuskTweets() {
    $( "div" ).filter(function() {
        return $(this).text().toLowerCase().indexOf('musk'.toLowerCase()) >= 0 ||
            $(this).text().toLowerCase().indexOf('elon'.toLowerCase()) >= 0;
      }).filter('[data-testid="cellInnerDiv"]').hide();
}
