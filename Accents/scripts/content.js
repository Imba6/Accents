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

function AccentDocument(event) {
	event = event || window.event;
	var keycode = event.charCode || event.keyCode;
	if(can_edit && keycode === 113){
		var focused = $(':focus').get(0);
		if (focused != null) {
			var position = focused.selectionStart;
			var character;
			var replace_character;
			var outelement;
			if (position != null) {
				character = focused.value.charAt(position-1);
				var replace_character = hash[character];
				if (replace_character) {
					focused.value = focused.value.substring(0, position-1) + replace_character + focused.value.substring(position);
				}
				focused.selectionStart = position;
				focused.selectionEnd = position;
				
			} else {
				var range = document.getSelection().getRangeAt(0);
				position = range.startOffset;
				if (position == null)
					return;
				var start = range.startContainer;
				character = start.data.charAt(position-1);
				var replace_character = hash[character];
				if (replace_character) {
					start.data = start.data.substring(0, position-1) + replace_character + start.data.substring(position);
				}
				range.setStart(start,position);
				range.setEnd(start,position);
			}
		}
	}
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var data = request.data || {};
	if (data == "add_listener" && can_edit) {

	
	} else if (data == "off") {
		can_edit = false;
		document.removeEventListener("keydown", AccentDocument);
	} else if (data == "on") {
		can_edit = true;
		document.removeEventListener("keydown", AccentDocument);
		document.addEventListener("keydown", AccentDocument);
	}
    sendResponse({data: data, success: true});
});

