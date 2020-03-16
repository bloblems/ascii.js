/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const		DELAY	= 100;
const		BOXES	= 20;
const		MIN		= 5;
const		MAX		= 30;

let			frame;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	set_box_mode(BOX_CENTER);
	set_box_intersection(BOX_INTERSECTION);
	frame = DELAY;
}

function	draw() {
	let		i;
	let		x, y;
	let		width, height;

	++frame;
	if (frame >= DELAY) {
		frame = 0;
		clear();
		for (i = 0; i < BOXES; ++i) {
			x = floor(random(0, canvas_width));
			y = floor(random(0, canvas_height));
			width = floor(random(MIN, MAX));
			height = floor(random(MIN, MAX));
			box(x, y, width, height);
		}
	}
}
