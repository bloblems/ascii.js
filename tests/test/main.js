/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

function	setup() {
	/// Create the canvas of 30 x 20
	create_canvas(30, 20);
}

function	draw() {
	ascii[mouse_y][mouse_x] = '#';
}
