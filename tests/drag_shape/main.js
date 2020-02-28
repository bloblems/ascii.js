/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const		WIDTH			= 20;
const		HEIGHT			= 12;
const		VERTICES		= 3;
const		ROTATION_ACC	= 0.01;
const		ROTATION_SLOW	= 0.005;
const		ROTATION_MAX	= 0.2;

let			layer;
let			x, y;
let			press_x, press_y;
let			locked;
let			hover;
let			angle;
let			angle_acc;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	set_canvas_mode(CANVAS_COVER);
	create_canvas();
	layer = create_layer(canvas_width + WIDTH * 2, canvas_height + HEIGHT * 2);
	set_layer(layer);
	locked = false;
	hover = false;
	angle = 0;
	angle_acc = 0;
	x = round(layer_width / 2);
	y = round(layer_height / 2);
}

function	draw() {
	clear();
	clear(layer);
	set_layer(layer);
	/// CREATE SHAPE
	shape(x, y, WIDTH, HEIGHT, VERTICES, "#", true, angle);
	/// FILL SHAPE TO CHECK HOVER
	fill(x, y, "?");
	hover = layer[mouse_y + HEIGHT][mouse_x + WIDTH] != " ";
	layer[mouse_y + HEIGHT][mouse_x + WIDTH] = "o";
	/// IF CLICKED
	if (locked == true) {
		angle_acc = min(angle_acc + ROTATION_ACC, ROTATION_MAX);
		fill(x, y, ":");
	} else {
		/// SLOW DOWN
		if (angle_acc > 0) {
			angle_acc -= ROTATION_SLOW;
		}
		/// IF HOVER
		if (hover == true) {
			fill(x, y, ".");
		/// IF OUT
		} else {
			fill(x, y, " ");
		}
	}
	/// UPDATE SHAPE ANGLE
	angle += angle_acc;
	while (angle >= 1) {
		angle -= 1;
	}
	/// DRAW LAYER TO SCREEN
	set_layer();
	draw_layer(layer, - WIDTH, - HEIGHT);
}

function	mouse_down(event) {
	if (hover == true) {
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
