/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

let			obj;
let			obj_2;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//obj = {};
//
//obj.setup = function() {
//	obj.create_canvas(null, 10, "header");
//}
//
//obj.draw = function() {
//	obj.rect(0, 0, obj.canvas_width, obj.canvas_height);
//}
//
//create_ascii(obj);
//
//obj_2 = {};
//
//obj_2.setup = function() {
//	obj_2.create_canvas(null, 5, "main");
//}
//
//obj_2.draw = function() {
//	obj_2.rect(0, 0, obj_2.canvas_width, obj_2.canvas_height);
//}
//
//create_ascii(obj_2);

function	setup() {
	create_canvas(null, null, "main");
}

function	draw() {
	rect(0, 0, canvas_width, canvas_height);
}

create_ascii();
