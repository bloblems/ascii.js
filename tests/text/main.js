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
	let		last;

	clear();
	line(Math.floor(canvas_width / 2), 0, Math.floor(canvas_width / 2), canvas_height);
	set_text_mode();
	set_text_wrap();
	/// HORIZONTAL & VERTICAL
	//text("Hello there !", 0, 0);
	//text("Hello there !", 0, 0, true);

	/// LEFT & CENTER
	last = text("this is a test", Math.floor(canvas_width / 2), 10);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}
	set_text_mode(TEXT_CENTER);
	last = text("this is a test", Math.floor(canvas_width / 2), 11);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}

	/// TRIM & WRAP
	set_text_mode();
	last = text("test on how text does wrap", canvas_width - 10, 10);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}
	set_text_wrap(TEXT_WRAP_HARD);
	last = text("test on how text does wrap", canvas_width - 10, 12);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}
	set_text_wrap(TEXT_WRAP);
	last = text("test on how text does wrap", canvas_width - 11, 16);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}

	/// PARAGRAPH
	last = text("this is a simple string which aims to show how paragraphs and wrap do work", Math.floor(canvas_width / 2), 14, 20);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}
	set_text_align(TEXT_ALIGN_CENTER);
	set_text_mode(TEXT_CENTER);
	last = text("this is a simple string which aims to show how paragraphs and wrap do  work ", Math.floor(canvas_width / 2), 20, 20);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}
	set_text_align(TEXT_ALIGN_RIGHT);
	set_text_mode(TEXT_RIGHT)
	last = text("this is a simple string which aims to show how paragraphs and wrap do work", Math.floor(canvas_width / 2), 26, 20);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}

	/// WORD TRUNCATE IF TOO BIG
	set_text_align(TEXT_ALIGN_CENTER);
	set_text_mode(TEXT_CENTER)
	last = text("abcdefghijklmnopqrstuvwxyz", Math.floor(canvas_width / 2), 32, 5);
	if (last && is_on_canvas(last[0], last[1])) {
		ascii[last[1]][last[0]] = '@';
	}

	no_loop();
}
