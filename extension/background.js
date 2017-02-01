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

function updateBadgeMessage(message) {
  chrome.browserAction.setBadgeText({text: message.toString()});
}

function updateBlockedReqCount() {
  state.count += 1;
  if(state.count < 1000) {
    updateBadgeMessage(state.count);
  } else if(state.count === 1000) {
    updateBadgeMessage('>999');
  }
  chrome.runtime.sendMessage({blockRequest: state.count});
}

function requestHandler() {
  updateBlockedReqCount();
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
      updateBadgeMessage('');
      state = {
        blocklist: null,
        user: null,
        count: 0
      };
    } else if(request.getCount) {
      sendResponse({count: state.count});
    }
});
