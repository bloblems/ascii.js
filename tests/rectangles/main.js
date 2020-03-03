/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		x;
let		y;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	y = -3;
	x = -5;
}

function	draw() {
	clear();
	set_rect_mode(RECT_CORNER);
	rect(0, 0, canvas_width - 1, canvas_height - 1);
	set_rect_mode(RECT_CENTER);
	rect(x, y, 10, 6);
	++x;
	if (x >= canvas_width + 5) {
		x = -5;
	}
	++y;
	if (y >= canvas_height + 3) {
		y = -3;
	}
}

function	window_resized() {
	resize_canvas();
}
