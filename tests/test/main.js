/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

let			color;

function	setup() {
	create_canvas(20, 20);
	color = create_color_layer();
	color[0][0] = "red";
	color[0][1] = "red";
	color[0][2] = "red";
	color[0][3] = "red";
	color[0][4] = "green";
	color[0][5] = "green";
	color[0][6] = "green";
	color[0][7] = "green";
	color[0][9] = "yellow";
	color[0][19] = "cyan";
	set_color(color);
}

function	draw() {
	background("#");
	no_loop();
}
