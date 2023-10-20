document.getElementById('sortButton').addEventListener('click', function() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      browser.tabs.sendMessage(activeTab.id, {"message": "sort"});
    });
  });