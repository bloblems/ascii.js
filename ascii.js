/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	ascii_style = ``;

let	dom_ascii;
let	dom_spans;
let	current_layer;

let	ascii;
let	canvas_width, canvas_height;
let	mouse_x, mouse_y;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
/// PUBLIC FUNCTIONS
//////////////////////////////////////////////////

//////////////////////////////
/// CANVAS
//////////////////////////////

function	create_canvas(width, height) {
	let		y;
	let		span;
	let		test;

	/// INIT
	canvas_width = width;
	canvas_height = height;
	ascii = [];
	/// CREATE ARRAY
	for (y = 0; y < height; ++y) {
		span = document.createElement("span");
		span.textContent = "-".repeat(width);
		dom_ascii.appendChild(span);
		ascii.push(span.textContent.split(""));
	}
	/// SAVE
	dom_spans = dom_ascii.childNodes;
	current_layer = ascii;
}

//////////////////////////////
/// LAYER
//////////////////////////////

function	create_layer() {
	let		layer;
	let		y;

	layer = [];
	for (y = 0; y < canvas_height; ++y) {
		layer.push(" ".repeat(canvas_width).split(""));
	}
	return (layer);
}

function	set_layer(layer = null) {
	if (layer == null) {
		current_layer = ascii;
	} else {
		current_layer = layer;
	}
}

function	draw_layer(to_draw) {
	let		layer;
	let		layer_line;
	let		to_draw_line;
	let		to_draw_cell;
	let		x, y;

	layer = current_layer;
	for (y = 0; y < canvas_height; ++y) {
		layer_line = layer[y];
		to_draw_line = to_draw[y];
		for (x = 0; x < canvas_width; ++x) {
			to_draw_cell = to_draw_line[x];
			if (to_draw_cell != " ") {
				layer_line[x] = to_draw_cell;
			}
		}
	}
}

//////////////////////////////
/// OTHER
//////////////////////////////

function	clear(to_draw = null) {
	let		layer;
	let		x, y;

	layer = to_draw || current_layer;
	for (y = 0; y < canvas_height; ++y) {
		for (x = 0; x < canvas_width; ++x) {
			layer[y][x] = " ";
		}
	}
}

//////////////////////////////////////////////////
/// PRIVATE FUNCTIONS
//////////////////////////////////////////////////

function	ascii_draw() {
	let		x, y;

	/// CALL USER draw()
	draw();
	/// DRAW ARRAY TO DOM ASCII
	for (y = 0; y < canvas_height; ++y) {
		dom_spans[y].textContent = ascii[y].join("");
	}
	/// LOOP ANIMATION
	window.requestAnimationFrame(ascii_draw);
}

function	ascii_mouse_move(e) {
	let		dom_rect;
	let		x, y;

	dom_rect = dom_ascii.getBoundingClientRect();
	x = e.clientX - dom_rect.left;
	x = Math.floor((x / dom_ascii.offsetWidth) * canvas_width);
	mouse_x = Math.min(x, canvas_width - 1);
	y = e.clientY - dom_rect.top;
	y = Math.floor((y / dom_ascii.offsetHeight) * canvas_height);
	mouse_y = Math.min(y, canvas_height - 1);
}

window.addEventListener("load", function () {
	let		style;
	let		body;

	mouse_x = 0;
	mouse_y = 0;
	/// INSERT STYLE
	style = document.createElement("style");
	style.type = "text/css";
	style.innerText = ascii_style;
	document.head.appendChild(style);
	/// CREATE BASE DOM
	body = document.getElementsByTagName("body")[0];
	dom_ascii = document.createElement("div");
	dom_ascii.id = "ascii";
	body.appendChild(dom_ascii);
	/// CALL USER setup()
	setup();
	/// CALL USER draw()
	window.requestAnimationFrame(ascii_draw);
	/// SET EVENTS
	dom_ascii.addEventListener("mousemove", ascii_mouse_move);
});
