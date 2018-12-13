const EXTENSION_TOGLE_STORAGE = "ExtensionOn";

var on;

function SaveExtensionTogle() {
	localStorage[EXTENSION_TOGLE_STORAGE] = on;
}

function LoadExtensionTogle() {
	var read = localStorage[EXTENSION_TOGLE_STORAGE];
	var togle;
	if (read) {
		togle = JSON.parse(read);
		if (togle) {
			chrome.browserAction.setIcon({path:"on-32.png"});
			on = true;
			return;
		}
	}
	chrome.browserAction.setIcon({path:"off-32.png"});
	on = false;
}

function Togle() {
	if (on == true) {
		chrome.browserAction.setIcon({path:"off-32.png"});
		on = false;
	}
	else  {
		chrome.browserAction.setIcon({path:"on-32.png"});
		on = true;
	}
	SaveExtensionTogle();
	SendTogle();
}

LoadExtensionTogle();

function SendTogle() {
	if (on == true)
		SendMessage("on");
	else
		SendMessage("off");
}

function SendMessage(message) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {data: message}, function(response) {});
	});
}

jQuery(document).ready(function($) {
	chrome.tabs.onUpdated.addListener(function(id, info, tab) {
        // if tab load
		if (on) {
			if (info && info.status && (info.status.toLowerCase() === 'complete')){
				if(!id || !tab)
					return 0;
				SendTogle();							
			}
		}
	});
	
	chrome.tabs.onActiveChanged.addListener(function (id, info) {
		SendTogle();
	});
	
	chrome.browserAction.onClicked.addListener(function() {
		Togle();
	});

});


