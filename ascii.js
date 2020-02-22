/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	RECT_CORNER					= 0;
const	RECT_CENTER					= 1;
const	DEFAULT_RECT_BORDER_CHARS	= "|-|| ||-|";
const	DEFAULT_RECT_MODE			= RECT_CORNER;
const	DEFAULT_LINE_CHAR			= ".";
const	ascii_style = ``;

let	dom_ascii;
let	dom_spans;
let	current_layer;
let	rect_border_chars;
let	rect_mode;
let	line_char;

let	ascii;
let	canvas_width, canvas_height;
let	mouse_x, mouse_y;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
/// PUBLIC FUNCTIONS
//////////////////////////////////////////////////

//////////////////////////////
/// CANVAS
//////////////////////////////

function	create_canvas(width, height) {
	let		y;
	let		span;
	let		test;

	/// INIT
	canvas_width = width;
	canvas_height = height;
	ascii = [];
	/// CREATE ARRAY
	for (y = 0; y < height; ++y) {
		span = document.createElement("span");
		span.textContent = " ".repeat(width);
		dom_ascii.appendChild(span);
		ascii.push(span.textContent.split(""));
	}
	/// SAVE
	dom_spans = dom_ascii.childNodes;
	current_layer = ascii;
}

//////////////////////////////
/// LAYER
//////////////////////////////

function	create_layer() {
	let		layer;
	let		y;

	layer = [];
	for (y = 0; y < canvas_height; ++y) {
		layer.push(" ".repeat(canvas_width).split(""));
	}
	return (layer);
}

function	set_layer(layer = null) {
	if (layer == null) {
		current_layer = ascii;
	} else {
		current_layer = layer;
	}
}

function	draw_layer(to_draw) {
	let		layer;
	let		layer_line;
	let		to_draw_line;
	let		to_draw_cell;
	let		x, y;

	layer = current_layer;
	for (y = 0; y < canvas_height; ++y) {
		layer_line = layer[y];
		to_draw_line = to_draw[y];
		for (x = 0; x < canvas_width; ++x) {
			to_draw_cell = to_draw_line[x];
			if (to_draw_cell != " ") {
				layer_line[x] = to_draw_cell;
			}
		}
	}
}

//////////////////////////////
/// OTHER
//////////////////////////////

function	clear(to_draw = null) {
	let		layer;
	let		x, y;

	layer = to_draw || current_layer;
	for (y = 0; y < canvas_height; ++y) {
		for (x = 0; x < canvas_width; ++x) {
			layer[y][x] = " ";
		}
	}
}

////////////////////
/// RECT
////////////////////

function	set_rect_border(characters = null) {
	rect_border_chars = characters || DEFAULT_RECT_BORDER_CHARS;
}

function	set_rect_mode(mode = DEFAULT_RECT_MODE) {
	rect_mode = mode;
}

function	rect(pos_x, pos_y, width, height = width, border_chars = null) {
	let		layer;
	let		chars;
	let		x, y;

	/// HANDLE RECT MODE
	if (rect_mode == RECT_CENTER) {
		pos_x -= Math.round(width / 2);
		pos_y -= Math.round(height / 2);
	}
	/// CHECK OUTSIDE DRAWING
	if (pos_x >= canvas_width || pos_x + width < 0 || pos_y >= canvas_height
	|| pos_y + height < 0) {
		return;
	}
	/// SET CHARACTERS
	layer = current_layer;
	chars = border_chars || rect_border_chars;
	if (height == 1) {
		chars = chars.split("");
		if (width == 1) {
			chars[6] = chars[4];
		} else {
			chars[6] = chars[3];
			chars[7] = chars[4];
			chars[8] = chars[5];
		}
	} else if (width == 1) {
		chars = chars.split("");
		chars[0] = chars[1];
		chars[3] = chars[4];
		chars[6] = chars[7];
	}
	/// TOP
	if (height > 1 && pos_y >= 0) {
		for (x = 0; x < width; ++x) {
			if (pos_x + x >= 0 && pos_x + x < canvas_width) {
				layer[pos_y][pos_x + x] = (x == 0) ? chars[0] : (x == width - 1) ? chars[2] : chars[1];
			}
		}
	}
	/// CENTER
	for (y = 1; y < height - 1; ++y) {
		if (pos_y + y >= 0 && pos_y + y < canvas_height) {
			for (x = 0; x < width; ++x) {
				if (pos_x + x >= 0 && pos_x + x < canvas_width) {
					layer[pos_y + y][pos_x + x] = (x == 0) ? chars[3] : (x == width - 1) ? chars[5] : chars[4];
				}
			}
		}
	}
	/// BOTTOM
	if (pos_y + height - 1 >= 0 && pos_y + height - 1 < canvas_height) {
		for (x = 0; x < width; ++x) {
			if (pos_x + x >= 0 && pos_x + x < canvas_width) {
				layer[pos_y + height - 1][pos_x + x] = (x == 0) ? chars[6] : (x == width - 1) ? chars[8] : chars[7];
			}
		}
	}
}

////////////////////
/// BORDER
////////////////////

function	border(char) {
	let		border_layer;
	let		x, y;

	/// DRAW ON A NEW LAYER
	border_layer = create_layer();
	for (y = 0; y < canvas_height; ++y) {
		for (x = 0; x < canvas_width; ++x) {
			if (layer[y][x] != " ") {
				continue;
			}
			if ((x > 0 && layer[y][x - 1] != " ")
			|| (x + 1 < canvas_width && layer[y][x + 1] != " ")
			|| (y > 0 && layer[y - 1][x] != " ")
			|| (y + 1 < canvas_height && layer[y + 1][x] != " ")
			|| (x > 0 && y > 0 && layer[y - 1][x - 1] != " ")
			|| (x + 1 < canvas_width && y > 0 && layer[y - 1][x + 1] != " ")
			|| (x + 1 < canvas_width && y + 1 < canvas_height && layer[y + 1][x + 1] != " ")
			|| (x > 0 && y + 1 < canvas_height && layer[y + 1][x - 1] != " ")
			) {
				border_layer[y][x] = char;
			}
		}
	}
	/// DRAW NEW LAYER ON CURRENT
	draw_layer(border_layer);
}

////////////////////
/// LINE
////////////////////

function		set_line_char(char = null) {
	line_char = char || DEFAULT_LINE_CHAR;
}

function		line(x0, y0, x1, y1, char = null) {
	if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
		if (x0 > x1) {
			ascii_draw_line_low(x1, y1, x0, y0, char || line_char);
		} else {
			ascii_draw_line_low(x0, y0, x1, y1, char || line_char);
		}
	} else {
		if (y0 > y1) {
			ascii_draw_line_high(x1, y1, x0, y0, char || line_char);
		} else {
			ascii_draw_line_high(x0, y0, x1, y1, char || line_char);
		}
	}
}

function		line(x0, y0, x1, y1, char = null) {
	let			layer;
	let			x, y;
	let			dx, dy;
	let			sx, sy;
	let			err, err_2;

	layer = current_layer;
	char = char || line_char;
	dx =  Math.abs(x1 - x0);
	sx = (x0 < x1) ? 1 : -1;
	dy = -Math.abs( y1 - y0);
	sy = (y0 < y1) ? 1 : -1;
	err = dx + dy;
	while (true) {
		layer[y0][x0] = char;
		if (x0 == x1 && y0 == y1) {
			break;
		}
		err_2 = 2 * err;
		if (err_2 >= dy) {
			err += dy;
			x0 += sx;
		}
		if (err_2 <= dx) {
			err += dx;
			y0 += sy;
		}
	}
}

//////////////////////////////////////////////////
/// PRIVATE FUNCTIONS
//////////////////////////////////////////////////

function	ascii_draw() {
	let		x, y;

	/// CALL USER draw()
	draw();
	/// DRAW ARRAY TO DOM ASCII
	for (y = 0; y < canvas_height; ++y) {
		dom_spans[y].textContent = ascii[y].join("");
	}
	/// LOOP ANIMATION
	window.requestAnimationFrame(ascii_draw);
}

function	ascii_mouse_move(e) {
	let		dom_rect;
	let		x, y;

	dom_rect = dom_ascii.getBoundingClientRect();
	x = e.clientX - dom_rect.left;
	x = Math.floor((x / dom_ascii.offsetWidth) * canvas_width);
	mouse_x = Math.min(x, canvas_width - 1);
	y = e.clientY - dom_rect.top;
	y = Math.floor((y / dom_ascii.offsetHeight) * canvas_height);
	mouse_y = Math.min(y, canvas_height - 1);
}

window.addEventListener("load", function () {
	let		style;
	let		body;

	rect_border_chars = DEFAULT_RECT_BORDER_CHARS;
	rect_mode = DEFAULT_RECT_MODE;
	line_char = DEFAULT_LINE_CHAR;
	mouse_x = 0;
	mouse_y = 0;
	/// INSERT STYLE
	style = document.createElement("style");
	style.type = "text/css";
	style.innerText = ascii_style;
	document.head.appendChild(style);
	/// CREATE BASE DOM
	body = document.getElementsByTagName("body")[0];
	dom_ascii = document.createElement("div");
	dom_ascii.id = "ascii";
	body.appendChild(dom_ascii);
	/// CALL USER setup()
	setup();
	/// CALL USER draw()
	window.requestAnimationFrame(ascii_draw);
	/// SET EVENTS
	dom_ascii.addEventListener("mousemove", ascii_mouse_move);
});
