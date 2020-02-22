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
	create_canvas(100, 50);
	x = y = 0;
	dir_x = 1;
	dir_y = 0;
	set_line_char("x");
}

function	draw() {
	clear();
	line(x, y, mouse_x, mouse_y);
	x += dir_x;
	y += dir_y;
	if (x >= canvas_width - 1) {
		if (y == 0) {
			dir_y = 1;
			dir_x = 0;
		} else if (y >= canvas_height - 1) {
			dir_x = -1;
			dir_y = 0;
		}
	} else if (x == 0) {
		if (y == 0) {
			dir_y = 0;
			dir_x = 1;
		} else if (y >= canvas_height - 1) {
			dir_x = 0;
			dir_y = -1;
		}
	}
}
