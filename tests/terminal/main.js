/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		frame;
let		rotation;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	/// CREATE FRAME
	frame = create_layer();
	set_layer(frame);
	rect(0, 0, canvas_width, canvas_height);
	rect(0, 0, canvas_width, 3);
	frame[2][0] = "\u251C";
	frame[2][canvas_width - 1] = "\u2524";
	set_text_mode(TEXT_CENTER);
	text("TERMINAL", canvas_width / 2, 1);
	set_text_mode(TEXT_LEFT);
	text("Monday, March 15th 1985", 1, 1);
	set_text_mode(TEXT_RIGHT);
	text("gibbon_joyeux", canvas_width - 1, 1);
	set_layer();
	/// INIT ROTATION LOOP FROM 0 TO 1 IN 50 STEPS
	rotation = new FrameLoop(50, 0, 1);
}

function	draw() {
	clear();
	shape(canvas_width / 2, canvas_height / 2, 20, 11, 3, ".", true, rotation.value);
	rotation.inc();
	draw_layer(frame);
}
