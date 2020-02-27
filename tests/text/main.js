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
	line(Math.floor(canvas_width / 2), 0, Math.floor(canvas_width / 2), canvas_height);
	set_text_mode();
	set_text_wrap();
	/// HORIZONTAL & VERTICAL
	//text("Hello there !", 0, 0);
	//text("Hello there !", 0, 0, true);

	/// LEFT & CENTER
	text("this is a test", Math.floor(canvas_width / 2), 10);
	set_text_mode(TEXT_CENTER);
	text("this is a test", Math.floor(canvas_width / 2), 11);

	/// TRIM & WRAP
	set_text_mode();
	text("test on how text does wrap", canvas_width - 10, 10);
	set_text_wrap(TEXT_WRAP_HARD);
	text("test on how text does wrap", canvas_width - 10, 12);
	set_text_wrap(TEXT_WRAP);
	text("test on how text does wrap", canvas_width - 11, 16);

	/// PARAGRAPH
	text("this is a simple string which aims to show how paragraphs and wrap do work", Math.floor(canvas_width / 2), 13, 20);
}
