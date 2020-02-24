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
let		dom_spans;
let		current_layer;
let		rect_border_chars;
let		rect_mode;
let		line_char;
let		text_mode;
let		text_wrap;
let		ascii_loop_draw;
let		ascii_links;

let		ascii;
let		canvas_width, canvas_height;
let		char_width, char_height;
let		mouse_x, mouse_y;

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
	dom_ascii.appendChild(span);
	/// RESPONSIVE WIDTH
	if (width == 0 || width == null) {
		span.textContent += " ".repeat(100);
		num_char = window.innerWidth / (dom_ascii.offsetWidth / 100);
		width = Math.ceil(num_char);
		span.textContent = " ".repeat(width);
	/// FIXED WIDTH
	} else {
		span.textContent += " ".repeat(width);
	}
	ascii = [span.textContent.split("")];
	/// RESPONSIVE HEIGHT
	if (height == 0 || height == null) {
		while (dom_ascii.offsetHeight <= window.innerHeight) {
			dom_ascii.appendChild(span.cloneNode(true));
			ascii.push(span.textContent.split(""));
		}
		height = dom_ascii.childNodes.length;
	/// FIXED HEIGHT
	} else {
		for (i = 1; i < height; ++i) {
			dom_ascii.appendChild(span.cloneNode(true));
			ascii.push(span.textContent.split(""));
		}
	}
	/// SAVE 
	char_width = dom_ascii.offsetWidth / width;
	char_height = dom_ascii.offsetHeight / height;
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

function	link(url, x, y, option_1, option_2 = null) {
	let		i;

	/// IF LINK IS STRING
	if (typeof(option_1) == "string") {
		if (ascii_links[y] == null) {
			ascii_links[y] = [];
		}
		ascii_links[y].push({"x": x, "url": url, "string": option_1, "w": option_1.length});
	/// IF LINK IS RECT
	} else {
		for (i = 0; i < option_1; ++i) {
			if (ascii_links[y + i] == null) {
				ascii_links[y + i] = [];
			}
			ascii_links[y + i].push({"x": x, "url": url, "w": option_2});
		}
	}
}

//////////////////////////////
/// OTHER
//////////////////////////////

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

function	ascii_put_links() {
	let		i, j;
	let		spans, span;
	let		space;
	let		before, between, after;
	let		links, link;

	/// LOOP THROUGH LINES
	spans = dom_ascii.childNodes;
	for (i = 0; i < spans.length; ++i) {
		span = spans[i];
		links = ascii_links[i];
		/// IF LINE GOT LINKS
		if (links != null) {
			links.sort(function (a, b) {return (a.x - b.x);});
			if (links.length > 1) {
				/// CHECK SUPERPOSITION
				for (j = 1; j < links.length; ++j) {
					link = links[j];
					space = link.x - (links[j - 1].x + links[j - 1].w);
					/// IF SUPERPOSITION
					if (space < 0) {
						link.w += space;
						link.x -= space;
						/// TYPE STRING
						if (link.string != null) {
							link.string = link.string.substring(-space);
						}
					}
					/// TYPE INVISIBLE
					if (link.string == null) {
						link.string = spans[i].innerHTML.substring(link.x, link.w);
					}
				}
			}
			/// UPDATE SPAN
			for (j = links.length - 1; j >= 0; --j) {
				link = links[j];
				before = span.innerHTML.substring(0, link.x);
				after = span.innerHTML.substring(link.x + link.w);
				between = `<a href="${link.url}">${link.string}</a>`;
				span.innerHTML = before + between + after;
			}
		}
	}
	ascii_links = [];
}

function	ascii_draw() {
	let		x, y;
	let		spans;

	/// CALL USER draw()
	if (typeof(draw) == "function") {
		draw();
	}
	/// DRAW ARRAY TO DOM ASCII
	spans = dom_ascii.childNodes;
	for (y = 0; y < canvas_height; ++y) {
		spans[y].textContent = ascii[y].join("");
	}
	/// PUT LINKS
	ascii_put_links();
	/// LOOP ANIMATION
	if (ascii_loop_draw == true) {
		window.requestAnimationFrame(ascii_draw);
	}
}

function	ascii_mouse_move(e) {
	let		dom_rect;
	let		x, y;

	dom_rect = dom_ascii.getBoundingClientRect();
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

	ascii_links = [];
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
	/// CREATE BASE DOM
	body = document.getElementsByTagName("body")[0];
	dom_ascii = document.createElement("div");
	dom_ascii.id = "ascii";
	body.appendChild(dom_ascii);
	/// CALL USER setup()
	if (typeof(setup) == "function") {
		setup();
	}
	/// CALL USER draw()
	window.requestAnimationFrame(ascii_draw);
	/// SET EVENTS
	dom_ascii.addEventListener("mousemove", ascii_mouse_move);
});
