//////////////////////////////// BY CACTUSFLUO /////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	save_to_svg(filename) {
	const	SVG_HEADER = "<svg viewBox=\"0 0 " + (canvas_width * char_width)
	+ " " + (canvas_height * char_height)
	+ "\" xmlns=\"http://www.w3.org/2000/svg\">\n";
	const	SVG_FOOTER = "</svg>"
	let		x, y;
	let		string;
	let		font, elem;
	let		computed;
	let		background;
	let		elem;

	/// INIT
	elem = document.getElementsByClassName("ascii")[0];
	computed = window.getComputedStyle(elem, null);
	font = window.getComputedStyle(elem, null).getPropertyValue("font-family");
	string = SVG_HEADER;
	// FIND BACKGROUND COLOR
	background = computed.getPropertyValue("background-color");
	if (background == "rgba(0, 0, 0, 0)" && elem != document.body) {
		elem = elem.parentNode;
		background = window.getComputedStyle(elem, null).getPropertyValue("background-color");
	}
	string += "<rect width=\"100%\" height=\"100%\" fill=\"" + background + "\"/>\n";
	/// ADD STYLE
	string += "<text style='";
	string += "font-size:" + computed.getPropertyValue("font-size") + ";";
	string += "font-family:" + computed.getPropertyValue("font-family") + ";";
	string += "stroke:" + computed.getPropertyValue("color") + ";";
	string += "white-space:pre;";
	string += "'>\n"
	/// FILL TEXT
	for (y = 0; y < canvas_height; ++y) {
		string += "<tspan x=\"0\" y=\"" + (char_height / 2 + y * char_height) + "\">";
		string += ascii[y].join("");
		string += "</tspan>\n";
	}
	string += "</text>\n";
	string += SVG_FOOTER;
	/// DOWNLOAD FILE
	elem = document.createElement("a");
	elem.href = "data:text/plain;charset=utf-8," + encodeURIComponent(string);
	elem.download = filename + ".svg";
	elem.click();
}
