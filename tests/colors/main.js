/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

const		COLORS			= ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
let			color_array;

function	setup() {
	create_canvas(20, 12);
	color_array = create_color_layer();
	set_color(color_array);
}

function	draw() {
	let		x, y;
	let		color;

	background("#");
	for (y = 0; y < canvas_height; ++y) {
		for (x = canvas_width - 1; x >= 1; --x) {
			color_array[y][x][0] = color_array[y][x - 1][0];
			color_array[y][x][1] = color_array[y][x - 1][1];
		}
		color = "#" + random(COLORS) + random(COLORS) + random(COLORS)
		+ random(COLORS) + random(COLORS) + random(COLORS);
		color_array[y][0][1] = color;
		color = "#" + random(COLORS) + random(COLORS) + random(COLORS)
		+ random(COLORS) + random(COLORS) + random(COLORS);
		color_array[y][0][0] = color;
	}
}
