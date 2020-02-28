/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let			points;
let			x, y;
let			acc_x, acc_y;
let			link;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	set_canvas_mode(CANVAS_FIT);
	create_canvas(null, null, "my_header");
	set_rect_mode(RECT_CORNER);
	set_rect_border("**** ****");
	x = floor(random(canvas_width));
	y = floor(random(canvas_height));
	acc_x = 1;
	acc_y = 1;
	link = new Link("https://sebhue.com", canvas_width / 2 - "my website".length / 2, canvas_height / 2 - 1, "my website");
}

function	draw() {
	clear();
	/// DRAW BORDER
	rect(0, 0, canvas_width, canvas_height);
	/// DRAW BALL
	ascii[y][x] = "o";
	/// HANDLE BALL POSITION
	x += acc_x;
	y += acc_y;
	/// HANDLE BALL COLLISION
	if (x >= canvas_width - 1) {
		acc_x = -1;
		x = canvas_width - 2;
	} else if (x < 1) {
		acc_x = 1;
		x = 1;
	}
	if (y >= canvas_height - 1) {
		acc_y = -1;
		y = canvas_height - 2;
	} else if (y < 1) {
		acc_y = 1;
		y = 1;
	}
	/// PRINT LINK
	link.print();
}

function	window_resized() {
	resize_canvas(null, 10);
}
