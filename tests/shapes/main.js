/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const		CIRCLE_WIDTH	= 18;
const		CIRCLE_HEIGHT	= 10;
const		CHAR			= '.';

const		ROTATION_STEP	= TWO_PI / 300;
const		VERTICES_MIN	= 2;
const		VERTICES_MAX	= 8;
const		VERTICES_DELAY	= 4;
let			angle;
let			vertices;
let			vertices_delay;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	angle = 0;
	vertices = VERTICES_MIN;
	vertices_delay = 0;
	mouse_x = canvas_width / 2;
	mouse_y = canvas_height / 2;
}

function	draw() {
	clear();
	polygon(mouse_x, mouse_y, CIRCLE_WIDTH, CIRCLE_HEIGHT, vertices, CHAR, null, angle);
	angle += ROTATION_STEP;
	if (angle >= 1) {
		angle = 0;
		++vertices_delay;
		if (vertices_delay >= VERTICES_DELAY) {
			vertices_delay = 0;
			++vertices;
			if (vertices > VERTICES_MAX) {
				vertices = VERTICES_MIN;
			}
		}
	}
}
