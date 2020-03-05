/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

let			color_layer;

function	setup() {
	/// Create the canvas of 30 x 20
	create_canvas(30, 20);
	color_layer = create_color_layer();
	set_color(color_layer);
}

function	draw() {
	/// Set the canvas background with '.'
	background('.');
	/// Put '#' to mouse coordinates
	set_layer(color_layer);
	clear_color_layer(color_layer);
	line(0, 0, mouse_x, mouse_y, ["red", null]);
	color_layer[0][0][0] = "yellow";
	set_layer();
}
