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
	no_loop();
}

function	mouse_clicked(event) {
	console.log("simple", event);
}

function	mouse_double_clicked(event) {
	console.log("double", event);
}

function	mouse_down(event) {
	console.log("down", event);
}

function	mouse_up(event) {
	console.log("up", event);
}

function	mouse_move(event) {
	//console.log("move", event);
}

function	key_down(event) {
	console.log("key down", event);
}

function	key_up(event) {
	console.log("key up", event);
}

function	key_pressed(event) {
	console.log("key pressed", event);
}
