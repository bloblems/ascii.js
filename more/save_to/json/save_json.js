//////////////////////////////// BY CACTUSFLUO /////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		ascii_save_json	= null;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	record_json() {
	let		elem, computed;
	let		back_color, font_color;
	let		font_size, font_family;
	let		frame;
	let		line;

	/// INIT DATA
	if (ascii_save_json == null) {
		ascii_save_json = {};
		/// LOAD DOM
		elem = document.getElementsByClassName("ascii")[0];
		computed = window.getComputedStyle(elem, null);
		/// GET 
		font_size = computed.getPropertyValue("font-size");
		font_family = computed.getPropertyValue("font-family");
		font_color = computed.getPropertyValue("color");
		back_color = computed.getPropertyValue("background-color");
		if (back_color == "rgba(0, 0, 0, 0)" && elem != document.body) {
			elem = elem.parentNode;
			back_color = window.getComputedStyle(elem, null).getPropertyValue("background-color");
		}
		ascii_save_json.font_size = font_size;
		ascii_save_json.font_family = font_family;
		ascii_save_json.font_color = font_color;
		ascii_save_json.back_color = back_color;
		ascii_save_json.record = "";
	}
	/// SAVE FRAME
	frame = [];
	for (line of ascii) {
		frame.push(line.join(''));
	}
	if (ascii_save_json.record[ascii_save_json.record.length - 1] == "]") {
		ascii_save_json.record += ",";
	}
	ascii_save_json.record += JSON.stringify(frame);
}

function	stop_record_json(filename) {
	let		json;
	let		string;
	let		link;

	/// COMPUTE FILE CONTENT
	json = {
		"width": canvas_width,
		"height": canvas_height,
		"char_height": char_height,
		"char_width": char_width,
		"font_size": ascii_save_json.font_size,
		"font_family": ascii_save_json.font_family,
		"font_color": ascii_save_json.font_color,
		"back_color": ascii_save_json.back_color,
		"frames": []
	};
	string = JSON.stringify(json);
	string = string.substring(0, string.length - 2) + ascii_save_json.record + "]}";
	/// DOWNLOAD FILE
	link = document.createElement("a");
	link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(string);
	link.download = filename + ".json";
	link.click();
}
