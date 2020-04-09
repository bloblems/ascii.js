/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	NUM_RAYS	= 1000;
const	RAYS_STEP	= (PI * 2) / NUM_RAYS;

let		walls;
let		l_walls;
let		l_rays;
let		drawing;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	my_line(x, y, on_canvas) {
	if (on_canvas == true) {
		if (ascii[y][x] != " "
		|| (x > 0 && ascii[y][x - 1] != " ")
		|| (x < canvas_width - 1 && ascii[y][x + 1] != " ")
		|| (y > 0 && ascii[y - 1][x] != " ")
		|| (y < canvas_height - 1 && ascii[y + 1][x] != " ")) {
			return (true);
		} else {
			l_rays[y][x] = "@";
		}
	}
}

function	setup() {
	let		i;
	let		x1, y1, x2, y2;

	set_canvas_fit(CANVAS_COVER);
	create_canvas();
	l_walls = create_layer();
	l_rays = create_layer();
	drawing = false;
}

function	draw() {
	let		a;
	let		step;
	let		c, s;

	clear();
	if (drawing == true) {
		l_walls[mouse_y][mouse_x] = '#';
	}
	draw_layer(l_walls);
	clear(l_rays);
	for (a = 0; a < TWO_PI; a += RAYS_STEP) {
		c = cos(a) * canvas_width;
		s = sin(a) * canvas_width;
		line_func(mouse_x, mouse_y, mouse_x + c, mouse_y + s, my_line);
	}
	draw_layer(l_rays);
}

function	mouse_down() {
	drawing = true;
}

function	mouse_up() {
	drawing = false;
}
