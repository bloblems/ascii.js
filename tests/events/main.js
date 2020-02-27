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
	let		i;

	clear();
	for (i = 0; i < touches.length; ++i) {
		ascii[touches[i].y][touches[i].x] = 'x';
	}
	ascii[mouse_y][mouse_x] = 'o';
}

function	mouse_clicked(event) {
	console.log("simple");
}

function	mouse_double_clicked(event) {
	console.log("double");
}

function	mouse_down(event) {
	console.log("down");
}

function	mouse_up(event) {
	console.log("up");
}

function	mouse_move(event) {
	//console.log("move");
}

function	key_down(event) {
	console.log("key down");
}

function	key_up(event) {
	console.log("key up");
}

function	key_pressed(event) {
	console.log("key pressed");
}

function	window_resized(event) {
	console.log("resize !");
}

function	touch_start(event) {
	console.log("touch start");
}

function	touch_end(event) {
	console.log("touch end");
}

function	touch_move(event) {
	console.log("touch move");
}
