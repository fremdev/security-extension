var state = {
  blocklist: null,
  user: null,
  count: 0
};

chrome.storage.local.get(['ovpn_user', 'ovpn_blocklist'], function(items) {
  state.user = items.ovpn_user;
  state.blocklist = items.ovpn_blocklist;
  if(state.blocklist) {
    setBeforeRequestListener();
  }
});

function formatBlocklist(blocklist) {
  return blocklist.map(function(data) {
    return "*://" + data.domain + "/*";
  });
}

function requestHandler() {
  state.count += 1;
  chrome.runtime.sendMessage({blockRequest: state.count});
  return {cancel: true};
}

function setBeforeRequestListener() {
  chrome.webRequest.onBeforeRequest.addListener(
    requestHandler,
    {
      urls: state.blocklist
    },
    ["blocking"]
  );
}

function removeBeforeRequestListener() {
  chrome.webRequest.onBeforeRequest.removeListener(requestHandler);
}

function updateBeforeRequestListener(blocklist) {
  removeBeforeRequestListener();
  setBeforeRequestListener();
  chrome.webRequest.handlerBehaviorChanged();
}

function updateChromeStorageData() {
  chrome.storage.local.set({'ovpn_blocklist': state.blocklist});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.blocklist) {
      const formattedBlocklist = formatBlocklist(request.blocklist);
      state.blocklist = formattedBlocklist;
      updateChromeStorageData();
      updateBeforeRequestListener();
    } else if(request.logout) {
      removeBeforeRequestListener();
      state = {
        blocklist: null,
        user: null,
        count: 0
      };
    } else if(request.getCount) {
      sendResponse({count: state.count});
    } 
});




