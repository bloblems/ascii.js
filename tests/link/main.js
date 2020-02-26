/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let		link;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	/// STRING LINK
	link = new Link("https://sebhue.com", 10, 10, "coucou");
	/// RECT LINK
	new Link("https://sebhue.com", 20, 10, 11, 10);
	new Link("https://sebhue.com", 0, 0, 17, 1);
}

function	draw() {
	let		i;

	clear();
	/// STRING LINK
	link.print();
	/// RECT LINK
	text("This is a link :)", 0, 0);
	for (i = 0; i < 10; ++i) {
		text("salut toi !", 20, 10 + i);
	}
}
