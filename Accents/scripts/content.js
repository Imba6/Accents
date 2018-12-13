var hash = new Object();
hash['А']='А́'; 
hash['Е']='Е́';
hash['И']='И́';
hash['О']='О́';
hash['У']='У́';
hash['Ы']='Ы́';
hash['Э']='Э́';
hash['Ю']='Ю́';
hash['Я']='Я́';
hash['а']='а́';
hash['е']='е́';
hash['и']='и́';
hash['о']='о́';
hash['у']='у́';
hash['ы']='ы́';
hash['э']='э́';
hash['ю']='ю́';
hash['я']='я́';
hash['A']='Á';
hash['a']='á';
hash['E']='É';
hash['e']='é';
hash['I']='Í';
hash['i']='í';
hash['O']='Ó';
hash['o']='ó';
hash['U']='Ú';
hash['u']='ú';
hash['Y']='Ý';
hash['y']='ý';

var can_edit = true;

function Accent(event) {
	event = event || window.event;
	var keycode = event.charCode || event.keyCode;
	if(can_edit && keycode === 113){
		var header = event.target;
		var value = header.value;
		var position = header.selectionStart;
		var character = value.charAt(position-1);
		var replace_character = hash[character];
		if (replace_character) {
			header.value = header.value.substring(0, position-1) + replace_character + header.value.substring(position);
			
		}
		header.selectionStart = position;
		header.selectionEnd = position;
	}
}

function AddEventListener(elementList) {
	[].forEach.call(elementList, function(header) {
		if (!header.hooked) {
			header.addEventListener("keydown", Accent);
			header.hooked = true;
		}
	});
}

function DomUpdated() {
	var elementsList = document.querySelectorAll('input');
	AddEventListener(elementsList);
	elementsList = document.querySelectorAll('textarea');
	AddEventListener(elementsList);
}



chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = request.data || {};
	if (data == "add_listener" && can_edit) {
		DomUpdated();
		$("body").bind("DOMSubtreeModified", function() { DomUpdated(); });
	} else if (data == "off") {
		can_edit = false;
		$("body").unbind("DOMSubtreeModified");
	} else if (data == "on") {
		can_edit = true;
		DomUpdated();
		$("body").unbind("DOMSubtreeModified");
		$("body").bind("DOMSubtreeModified", function() { DomUpdated(); });
	}
    sendResponse({data: data, success: true});
});

