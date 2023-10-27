var STORAGE;

document.addEventListener('DOMContentLoaded', async function() {
    await load_storage();
    send_message({"message": "load"});
    var toggles = document.getElementsByClassName("idm-switch_div");
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].addEventListener('click', function(el) {
          el.preventDefault();
          toggled(el.target);
        });
    };
});

async function load_storage(){
    var res = await browser.storage.local.get("gstoolbar_options")
    // check if res.gstoolbar_options is undefined
    console.log("got res -> ", res === null)
    if (res.gstoolbar_options != undefined) {
      STORAGE = res.gstoolbar_options;
      console.log("got storage -> ", STORAGE)
      var toggles = document.getElementsByClassName("idm-switch_div");
      for (var i = 0; i < toggles.length; i++) {
        var isChecked = toggles[i].getElementsByClassName("toggle-checkbox")[0];
        if (STORAGE[toggles[i].id] == true) {
          isChecked.checked = true;
        } else {
          isChecked.checked = false;
        }
      };
    } else {
      STORAGE = {
        'sort_toggle': false,
        'show_toggle': false,
      };
    }
    console.log("loading storage -> ", STORAGE)
    await save_storage();
};
  
async function save_storage(){
  console.log("saving storage -> ", STORAGE)
  await browser.storage.local.set({"gstoolbar_options": STORAGE});
}


async function toggled(el) {
  var message = {
    "message": "update",
    "refresh": false
  };
  var isChecked = el.parentElement.getElementsByClassName("toggle-checkbox")[0];
  if (isChecked.checked == true) {
    isChecked.checked = false;
    STORAGE[el.parentElement.id] = false;
    message["refresh"] = true;
  } else {
    isChecked.checked = true;
    STORAGE[el.parentElement.id] = true;
  }
  await save_storage();
  send_message(message);
}

function send_message(message) {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    browser.tabs.sendMessage(tabs[0].id, message);
  });
}



