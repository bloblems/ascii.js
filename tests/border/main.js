/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		layer;
let		last_x, last_y;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	layer = create_layer();
	mouse_x = last_x = canvas_width / 2;
	mouse_y = last_y = canvas_height / 2;
	set_rect_border(".........")
	set_rect_mode(RECT_CENTER);
}

function	draw() {
	set_layer(layer);
	line_func(last_x, last_y, mouse_x, mouse_y, function(x, y) {
		rect(x, y, 4, 3);
	});
	last_x = mouse_x;
	last_y = mouse_y;
	set_layer();
	clear();
	draw_layer(layer);
	border("x");
}
