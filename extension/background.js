chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.blocklist) {
        console.log('blocklist:', request.blocklist);
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {cancel: true};
    },
    {
        urls: ["*://mail.ru/*"]
    },
    ["blocking"]
);