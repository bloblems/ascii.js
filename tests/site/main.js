/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	POPUP_X			= 3;
const	POPUP_Y			= 7;
const	POPUP_MIN_WIDTH	= 30;

let		triangle;
let		l_frame;
let		l_frame_mask;
let		l_popup;
let		l_popup_mask;
let		popup_content;
let		popup_x, popup_y;
let		popup_active;
let		popup_button_close;
let		nav_projets;
let		nav_liens;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////
/// FRAME
//////////////////////////////

function	build_frame() {
	l_frame = create_layer();
	set_layer(l_frame);
	/// BUILD TITLE
	box(0, 0, layer_width, layer_height);
	box(0, 0, layer_width, 3);
	box(0, 0, 19, 3);
	text("SEBASTIEN HUERTAS", 1, 1);
	/// BUILD NAV
	box(0, 2, layer_width, 5);
	nav_projets = {
		"link": new Link("https://gibbonjoyeux.fr/projets", 4, 3, "PROJETS"),
		"hover": false
	};
	nav_projets.link.dom.onmouseover = function () {
		nav_projets.hover = true;
	};
	nav_projets.link.dom.onmouseout = function () {
		nav_projets.hover = false;
	};
	nav_liens = {
		"link": new Link("https://gibbonjoyeux.fr/liens", 4, 5, "LIENS"),
		"hover": false
	};
	nav_liens.link.dom.onmouseover = function () {
		nav_liens.hover = true;
	};
	nav_liens.link.dom.onmouseout = function () {
		nav_liens.hover = false;
	};
	l_frame_mask = create_layer();
	set_layer(l_frame_mask);
	box(0, 0, layer_width, 7, "#######");
	set_layer();
}

function	draw_frame() {
	put_mask(l_frame_mask, true);
	draw_layer(l_frame);
	nav_projets.link.print();
	nav_liens.link.print();
	if (nav_projets.hover == true) {
		ascii[3][2] = ">";
	} else if (nav_liens.hover == true) {
		ascii[5][2] = ">";
	}
}

//////////////////////////////
/// POPUP
//////////////////////////////

function	build_close() {
	popup_active = false;
	popup_content.style.display = "none";
}

function	build_popup(x, y, width, height, title, id) {
	/// CREATE POPUP
	l_popup = create_layer(width, height);
	set_layer(l_popup);
	box(0, 0, layer_width, layer_height);
	box(0, 0, layer_width, 3);
	box(layer_width - 3, 0, 3, 3);
	box(layer_width - 5, 0, 3, 3);
	popup_button_close = new Link(build_close, x + layer_width - 2, y + 1, "X");
	//l_popup[1][layer_width - 2] = "X";
	l_popup[1][layer_width - 4] = "-";
	text(title, 2, 1);
	/// CREATE POPUP MASK
	l_popup_mask = create_layer(width, height);
	set_layer(l_popup_mask);
	background("?");
	set_layer();
	/// LOAD POPUP CONTENT
	popup_content = document.getElementById(id);
	popup_content.parentNode.removeChild(popup_content);
	document.getElementById("popup").appendChild(popup_content);
	popup_content.style.position = "absolute";
	popup_content.style.top = (POPUP_Y + 3) * char_height + "px";
	popup_content.style.left = (POPUP_X + 1) * char_width + "px";
	popup_content.style.width = (width - 2) * char_width + "px";
	popup_content.style.height = (height - 4) * char_height + "px";
	popup_x = x;
	popup_y = y;
	popup_active = true;
}

function	draw_popup() {
	put_mask(l_popup_mask, popup_x, popup_y, true);
	draw_layer(l_popup, popup_x, popup_y);
	popup_button_close.print();
}

//////////////////////////////////////////////////
/// MAIN
//////////////////////////////////////////////////

function	setup() {
	document.getElementsByTagName("main")[0].style.display = "none";
	create_canvas();
	set_box_intersection(BOX_INTERSECTION);
	/// HANDLE FRAME
	build_frame();
	/// HANDLE POPUP
	build_popup(POPUP_X, POPUP_Y, max(canvas_width / 2, POPUP_MIN_WIDTH),
	canvas_height - 15, "A propos", "popup-a-propos");
	/// HANDLE TRIANGLE
	triangle = new FrameLoop(50, 0, 1);
	mouse_x = canvas_width * 0.5;
	mouse_y = canvas_height * 0.7;
}

function	draw() {
	clear();
	/// TRIANGLE
	polygon(mouse_x, mouse_y, 20, 11, 3, ".", true, triangle.value);
	triangle.inc();
	/// POPUP
	if (popup_active == true) {
		draw_popup();
	}
	/// FRAME
	draw_frame();
}
