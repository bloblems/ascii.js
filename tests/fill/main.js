/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
}

function	draw() {
	clear();
	shape(Math.round(canvas_width / 2), Math.round(canvas_height / 2), 20, 12, 3, "#", true, mouse_x / canvas_width);
	fill(Math.round(canvas_width / 2), Math.round(canvas_height / 2), ".");
}
