/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		x, y;
let		dir_x, dir_y;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	x = 0;
	y = 0;
	dir_x = 1;
	dir_y = 1;
}

function	draw() {
	clear();
	ascii[y][x] = 'o';
	x += dir_x;
	y += dir_y;
	if (x >= canvas_width - 1) {
		dir_x = -1;
	} else if (x <= 0) {
		dir_x = 1;
	}
	if (y >= canvas_height - 1) {
		dir_y = -1;
	} else if (y <= 0) {
		dir_y = 1;
	}
}
