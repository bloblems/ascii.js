/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	new Link("https://sebhue.com", 10, 10, 6, 1);
	new Link("https://sebhue.com", 20, 10, 10, 10);
	new Link("https://sebhue.com", 0, 0, 4, 4);
}

function	draw() {
	clear();
	text("coucou", 10, 10);
}
