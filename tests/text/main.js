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
	line(canvas_width / 2, 0, canvas_width / 2, canvas_height);
	set_text_mode();
	set_text_wrap();
	/// HORIZONTAL & VERTICAL
	text("Hello there !", 0, 0);
	text("Hello there !", 0, 0, true);

	/// LEFT & CENTER
	text("this is a test", canvas_width / 2, 10);
	set_text_mode(TEXT_CENTER);
	text("this is a test", canvas_width / 2, 11);

	/// TRIM & WRAP
	text("another test", canvas_width - 3, 10);
	set_text_wrap(TEXT_WRAP);
	text("another test", canvas_width - 3, 11);
}
