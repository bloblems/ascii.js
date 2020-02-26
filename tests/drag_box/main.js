/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const		WIDTH		= 10;
const		HEIGHT		= 6;

let			x, y;
let			press_x, press_y;
let			locked;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	locked = false;
	x = Math.round(canvas_width / 2) - WIDTH / 2;
	y = Math.round(canvas_height / 2) - HEIGHT / 2;
	set_rect_border("#### ####");
}

function	draw() {
	clear();
	if (locked == true) {
		set_rect_border("####:####");
	} else if (mouse_x >= x && mouse_x < x + WIDTH && mouse_y >= y && mouse_y < y + HEIGHT) {
		set_rect_border("####.####");
	} else {
		set_rect_border("#### ####");
	}
	rect(x, y, WIDTH, HEIGHT);
}

function	mouse_down(event) {
	if (mouse_x >= x && mouse_x < x + WIDTH && mouse_y >= y && mouse_y < y + HEIGHT) {
		locked = true;
		press_x = mouse_x - x;
		press_y = mouse_y - y;
	}
}

function	mouse_up(event) {
	locked = false;
}

function	mouse_move(event) {
	if (locked == true) {
		x = mouse_x - press_x;
		y = mouse_y - press_y;
	}
}
