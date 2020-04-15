/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		mask;
let		angle;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	mask = create_mask();
	angle = 0;
}

function	draw() {
	clear();
	background(".");
	/// DRAW SHAPE
	polygon(canvas_width / 2, canvas_height / 2, 20, 12, 3, "#", true, angle);
	fill(canvas_width / 2, canvas_height / 2, "#");
	angle = (angle + 0.05) % 1;
	/// DRAW MASK
	set_layer(mask);
	clear();
	polygon(mouse_x, mouse_y, 20, 12, 12, "?");
	fill(mouse_x, mouse_y, "?");
	set_layer();
	put_mask(mask);
}

function	window_resized() {
	resize_canvas();
}
