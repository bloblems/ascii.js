/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	ascii_style = ``;

const	PI							= Math.PI;
const	TWO_PI						= PI * 2;

const	RECT_CORNER					= 0;
const	RECT_CENTER					= 1;
const	RECT_DEFAULT_BORDER_CHARS	= "|-|| ||-|";
const	RECT_DEFAULT_MODE			= RECT_CORNER;
const	LINE_DEFAULT_CHAR			= ".";
const	TEXT_TRIM					= 0;
const	TEXT_WRAP					= 1;
const	TEXT_WRAP_HARD				= 2;
const	TEXT_LEFT					= 0;
const	TEXT_CENTER					= 1;
const	TEXT_DEFAULT_WRAP			= TEXT_TRIM;
const	TEXT_DEFAULT_MODE			= TEXT_LEFT;

let		dom_ascii;
let		dom_array;
let		dom_links;
let		dom_spans;
let		current_layer;
let		rect_border_chars;
let		rect_mode;
let		line_char;
let		text_mode;
let		text_wrap;
let		ascii_loop_draw;

let		ascii;
let		canvas_width, canvas_height;
let		char_width, char_height;
let		mouse_x, mouse_y;

////////////////////////////////////////////////////////////////////////////////
/// CLASSES
////////////////////////////////////////////////////////////////////////////////

class		Link {
	constructor(url, x, y, w, h) {
		let	dom;

		this.url = url;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		dom = document.createElement("a");
		dom.href = url;
		dom.className = "ascii_link";
		dom.style.left = char_width * x + "px";
		dom.style.top = char_height * y + "px";
		dom.style.width = char_width * w + "px";
		dom.style.height = char_height * h + "px";
		dom_links.appendChild(dom);
		this.dom = dom;

	}
}

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
/// PUBLIC FUNCTIONS
//////////////////////////////////////////////////

//////////////////////////////
/// CANVAS
//////////////////////////////

function	create_canvas(width = null, height = null) {
	let		i;
	let		span;
	let		num_char;

	span = document.createElement("span");
	dom_array.appendChild(span);
	/// RESPONSIVE WIDTH
	if (width == 0 || width == null) {
		span.textContent += " ".repeat(100);
		num_char = window.innerWidth / (dom_array.offsetWidth / 100);
		width = Math.ceil(num_char);
		span.textContent = " ".repeat(width);
	/// FIXED WIDTH
	} else {
		span.textContent += " ".repeat(width);
	}
	ascii = [span.textContent.split("")];
	/// RESPONSIVE HEIGHT
	if (height == 0 || height == null) {
		while (dom_array.offsetHeight <= window.innerHeight) {
			dom_array.appendChild(span.cloneNode(true));
			ascii.push(span.textContent.split(""));
		}
		height = dom_array.childNodes.length;
	/// FIXED HEIGHT
	} else {
		for (i = 1; i < height; ++i) {
			dom_array.appendChild(span.cloneNode(true));
			ascii.push(span.textContent.split(""));
		}
	}
	/// SAVE 
	char_width = dom_array.offsetWidth / width;
	char_height = dom_array.offsetHeight / height;
	canvas_width = width;
	canvas_height = height;
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

////////////////////
/// RECT
////////////////////

function	set_rect_border(characters = null) {
	rect_border_chars = characters || RECT_DEFAULT_BORDER_CHARS;
}

function	set_rect_mode(mode = RECT_DEFAULT_MODE) {
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

function	set_line_char(char = null) {
	line_char = char || LINE_DEFAULT_CHAR;
}

function	line(x0, y0, x1, y1, char = null) {
	let		layer;
	let		x, y;
	let		dx, dy;
	let		sx, sy;
	let		err, err_2;

	layer = current_layer;
	char = char || line_char;
	/// INIT
	dx =  Math.abs(x1 - x0);
	sx = (x0 < x1) ? 1 : -1;
	dy = -Math.abs( y1 - y0);
	sy = (y0 < y1) ? 1 : -1;
	err = dx + dy;
	while (true) {
		/// PUT CHARACTER
		if (x0 >= 0 && x0 < canvas_width && y0 >= 0 && y0 < canvas_height) {
			layer[y0][x0] = char;
		}
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

function	line_func(x0, y0, x1, y1, func) {
	let		layer;
	let		x, y;
	let		dx, dy;
	let		sx, sy;
	let		err, err_2;

	layer = current_layer;
	/// INIT
	dx =  Math.abs(x1 - x0);
	sx = (x0 < x1) ? 1 : -1;
	dy = -Math.abs( y1 - y0);
	sy = (y0 < y1) ? 1 : -1;
	err = dx + dy;
	while (true) {
		/// CALL USER FUNCTION
		func(x0, y0, (x0 >= 0 && x0 < canvas_width && y0 >= 0 && y0 < canvas_height));
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

////////////////////
/// TEXT
////////////////////

function	set_text_wrap(mode = TEXT_DEFAULT_WRAP) {
	text_wrap = mode;
}

function	set_text_mode(mode = TEXT_DEFAULT_MODE) {
	text_mode = mode;
}

function	text(string, x, y, vertical = false) {
	let		layer;
	let		i;

	layer = current_layer;
	if (text_mode == TEXT_CENTER) {
		x -= Math.floor(string.length / 2);
	}
	/// HORIZONTAL
	if (vertical == false) {
		/// OUT OF FRAME
		if (y < 0 || y >= canvas_height) {
			return;
		}
		/// PUT CHARACTERS
		for (i = 0; i < string.length; ++i) {
			/// OUT ON LEFT
			if (x + i < 0) {
				continue;
			/// OUT ON RIGHT
			} else if (x + i >= canvas_width) {
				/// WRAP
				if (text_wrap == TEXT_WRAP_HARD) {
					x = -i;
					++y;
				/// TRIM
				} else {
					return;
				}
			}
			layer[y][x + i] = string[i];
		}
	/// VERTICAL
	} else {
		/// OUT OF FRAME
		if (x < 0 || x >= canvas_width) {
			return;
		}
		for (i = 0; i < string.length; ++i) {
			if (y + i >= 0 && y + i < canvas_height) {
				layer[y + i][x] = string[i];
			}
		}
	}
}

//////////////////////////////
/// OTHER
//////////////////////////////

function	shape(pos_x, pos_y, radius_w, radius_h, vertices, char, linked = true, offset = 0) {
	let		layer;
	let		angle;
	let		step;
	let		last_x, last_y;
	let		x, y;
	let		i;

	last_x = null;
	layer = current_layer;
	step = TWO_PI / vertices;
	/// LOOP THROUGH 2 PI
	for (i = 0; i < TWO_PI; i += step) {
		/// GET COORDS
		angle = i + offset * step;
		x = Math.round(pos_x + Math.cos(angle) * radius_w);
		y = Math.round(pos_y + Math.sin(angle) * radius_h);
		/// PRINT LINE
		if (linked == true) {
			if (last_x != null) {
				line(x, y, last_x, last_y);
			}
			last_x = x;
			last_y = y;
		/// PRINT POINT
		} else if (x >= 0 && x < canvas_width && y >= 0 && y < canvas_height) {
			layer[y][x] = char;
		}
	}
	/// PRINT LAST LINE
	if (linked == true) {
		x = Math.round(pos_x + Math.cos(offset * step) * radius_w);
		y = Math.round(pos_y + Math.sin(offset * step) * radius_h);
		line(x, y, last_x, last_y);
	}
}

function	clear(to_draw = null) {
	let		layer;
	let		layer_line;
	let		x, y;

	layer = to_draw || current_layer;
	for (y = 0; y < canvas_height; ++y) {
		layer_line = layer[y];
		for (x = 0; x < canvas_width; ++x) {
			layer_line[x] = " ";
		}
	}
}

function	fill(char) {
	let		layer;
	let		layer_line;
	let		x, y;

	layer = current_layer;
	for (y = 0; y < canvas_height; ++y) {
		layer_line = layer[y];
		for (x = 0; x < canvas_width; ++x) {
			layer_line[x] = char;
		}
	}
}

function	no_loop() {
	ascii_loop_draw = false;
}

function	loop() {
	ascii_loop_draw = true;
}

//////////////////////////////////////////////////
/// PRIVATE FUNCTIONS
//////////////////////////////////////////////////

function	ascii_draw() {
	let		y;
	let		spans;

	/// CALL USER draw()
	if (typeof(draw) == "function") {
		draw();
	}
	/// DRAW ARRAY TO DOM ASCII
	spans = dom_array.childNodes;
	for (y = 0; y < canvas_height; ++y) {
		spans[y].textContent = ascii[y].join("");
	}
	/// LOOP ANIMATION
	if (ascii_loop_draw == true) {
		window.requestAnimationFrame(ascii_draw);
	}
}

function	ascii_mouse_move(e) {
	let		dom_rect;
	let		x, y;

	dom_rect = dom_array.getBoundingClientRect();
	x = e.clientX - dom_rect.left;
	x = Math.floor((x / dom_rect.width) * canvas_width);
	mouse_x = Math.min(x, canvas_width - 1);
	y = e.clientY - dom_rect.top;
	y = Math.floor((y / dom_rect.height) * canvas_height);
	mouse_y = Math.min(y, canvas_height - 1);
}

window.addEventListener("load", function () {
	let		style;
	let		body;

	ascii_loop_draw = true;
	rect_border_chars = RECT_DEFAULT_BORDER_CHARS;
	rect_mode = RECT_DEFAULT_MODE;
	line_char = LINE_DEFAULT_CHAR;
	text_mode = TEXT_DEFAULT_MODE;
	text_wrap = TEXT_DEFAULT_WRAP;
	mouse_x = 0;
	mouse_y = 0;
	/// INSERT STYLE
	style = document.createElement("style");
	style.type = "text/css";
	style.innerText = ascii_style;
	document.head.appendChild(style);
	/// CREATE ASCII BASE DOM
	body = document.getElementsByTagName("body")[0];
	dom_ascii = document.createElement("div");
	dom_ascii.id = "ascii";
	body.appendChild(dom_ascii);
	/// CREATE ASCII ARRAY DOM
	dom_array = document.createElement("div");
	dom_array.id = "ascii_array";
	dom_ascii.appendChild(dom_array);
	/// CREATE ASCII LINKS DOM
	dom_links = document.createElement("div");
	dom_links.id = "ascii_links";
	dom_ascii.appendChild(dom_links);
	/// CALL USER setup()
	if (typeof(setup) == "function") {
		setup();
	}
	/// CALL USER draw()
	window.requestAnimationFrame(ascii_draw);
	/// SET EVENTS
	dom_ascii.addEventListener("mousemove", ascii_mouse_move);
});
