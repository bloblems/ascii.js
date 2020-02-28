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

//////////////////////////////////////////////////
/// GENERAL
//////////////////////////////////////////////////

const	round						= Math.round;
const	floor						= Math.floor;
const	ceil						= Math.ceil;
const	rand						= Math.random;
const	abs							= Math.abs;
const	cos							= Math.cos;
const	sin							= Math.sin;
const	acos						= Math.acos;
const	asin						= Math.asin;
const	acosh						= Math.acosh;
const	asinh						= Math.asinh;
const	atan						= Math.atan;
const	atan2						= Math.atan2;
const	atanh						= Math.atanh;
const	cbrt						= Math.cbrt;
const	exp							= Math.exp;
const	log							= Math.log;
const	max							= Math.max;
const	min							= Math.min;
const	pow							= Math.pow;
const	sqrt						= Math.sqrt;
const	tan							= Math.tan;
const	tanh						= Math.tanh;
const	trunc						= Math.trunc;
const	is_int						= Number.isInteger;
const	is_array					= Array.isArray;

const	PI							= Math.PI;
const	TWO_PI						= PI * 2;
const	HALF_PI						= PI / 2;
const	QUARTER_PI					= PI / 4;
const	E							= Math.E;
const	SQRT2						= Math.SQRT2;
const	SQRT1_2						= Math.SQRT1_2;
const	LN2							= Math.LN2;
const	LN10						= Math.LN10;
const	LOG2E						= Math.LOG2E;
const	LOG10E						= Math.LOG10E;

//////////////////////////////////////////////////
/// ASCII
//////////////////////////////////////////////////

const	CANVAS_FIT					= 0;
const	CANVAS_COVER				= 1;
const	CANVAS_DEFAULT_MODE			= CANVAS_FIT;
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
const	TEXT_RIGHT					= 2;
const	TEXT_ALIGN_LEFT				= 0;
const	TEXT_ALIGN_CENTER			= 1;
const	TEXT_ALIGN_RIGHT			= 2;
const	TEXT_DEFAULT_WRAP			= TEXT_TRIM;
const	TEXT_DEFAULT_MODE			= TEXT_LEFT;
const	TEXT_DEFAULT_ALIGN			= TEXT_ALIGN_LEFT;

let		dom_ascii;
let		dom_array;
let		dom_links;
let		dom_spans;
let		current_layer;
let		canvas_mode;
let		rect_border_chars;
let		rect_mode;
let		line_char;
let		text_mode;
let		text_wrap;
let		text_align;
let		ascii_loop_draw;

let		ascii;
let		canvas_width, canvas_height;
let		layer_width, layer_height;
let		char_width, char_height;
let		mouse_x, mouse_y;
let		touches;

////////////////////////////////////////////////////////////////////////////////
/// CLASSES
////////////////////////////////////////////////////////////////////////////////

class		Link {
	constructor(url, x, y, option_1, option_2 = 1) {
		let	dom;
		let	w, h;

		if (is_int(x) == false) { x = round(x); }
		if (is_int(y) == false) { y = round(y); }
		/// MODE STRING
		if (typeof(option_1) == "string") {
			this.string = option_1;
			w = option_1.length;
			h = 1;
		/// MODE RECT
		} else {
			w = round(option_1);
			h = round(option_2);
		}
		dom = document.createElement("a");
		dom.href = url;
		dom.className = "ascii_link";
		dom.style.left = char_width * x + "px";
		dom.style.top = char_height * y + "px";
		dom.style.width = char_width * w + "px";
		dom.style.height = char_height * h + "px";
		dom_links.appendChild(dom);
		this.dom = dom;
		this.url = url;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	print() {
		let	i;
		let	layer;

		layer = current_layer;
		if (this.string != null) {
			for (i = 0; i < this.string.length; ++i) {
				if (this.x + i < 0) {
					continue
				} else if (this.x + i >= layer_width) {
					return;
				}
				current_layer[this.y][this.x + i] = this.string[i];
			}
		}
	}

	move_to(x, y) {
		if (is_int(x) == false) { x = round(x); }
		if (is_int(y) == false) { y = round(y); }
		this.x = x;
		this.dom.style.left = char_width * x + "px";
		this.y = y;
		this.dom.style.top = char_height * y + "px";
	}

	remove() {
		if (dom_links.contains(this.dom) == true) {
			dom_links.removeChild(this.dom);
		}
	}

	activate() {
		if (dom_links.contains(this.dom) == false) {
			dom_links.appendChild(this.dom);
		}
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

function	create_canvas(width = null, height = null, dom_mother = null) {
	let		i;
	let		span;
	let		num_char;
	let		width_px, height_px;

	if (dom_mother == null) {
		document.body.appendChild(dom_ascii);
		width_px = window.innerWidth;
		height_px = window.innerHeight;
	} else if (typeof(dom_mother) == "string") {
		dom_mother = document.getElementById(dom_mother);
		dom_mother.appendChild(dom_ascii);
		width_px = dom_mother.offsetWidth;
		height_px = dom_mother.offsetHeight;
	}
	span = document.createElement("span");
	dom_array.appendChild(span);
	/// RESPONSIVE WIDTH
	if (width == 0 || width == null) {
		span.textContent += " ".repeat(100);
		num_char = width_px / (dom_array.offsetWidth / 100);
		width = floor(num_char) - ((canvas_mode == CANVAS_FIT) ? 1 : 0);
		span.textContent = " ".repeat(width);
	/// FIXED WIDTH
	} else {
		if (is_int(width) == false) { width = round(width); }
		span.textContent += " ".repeat(width);
	}
	ascii = [span.textContent.split("")];
	/// RESPONSIVE HEIGHT
	if (height == 0 || height == null) {
		while (dom_array.offsetHeight <= height_px) {
			dom_array.appendChild(span.cloneNode(true));
			ascii.push(span.textContent.split(""));
		}
		if (canvas_mode == CANVAS_FIT
		&& dom_array.offsetHeight > height_px) {
			dom_array.removeChild(dom_array.firstChild);
		}
		height = dom_array.childNodes.length;
	/// FIXED HEIGHT
	} else {
		if (is_int(height) == false) { height = round(height); }
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
	layer_width = width;
	layer_height = height;
	current_layer = ascii;
}

function	resize_canvas(width = null, height = null) {
	if (is_int(width) == false) { width = round(width); }
	if (is_int(height) == false) { height = round(height); }
	while (dom_array.firstChild) {
		dom_array.removeChild(dom_array.lastChild);
	}
	create_canvas(width, height, dom_ascii.parentNode);
}

function	set_canvas_mode(mode = DEFAULT_CANVAS_MODE) {
	canvas_mode = mode;
}

//////////////////////////////
/// LAYER
//////////////////////////////

function	create_layer(width = canvas_width, height = canvas_height) {
	let		layer;
	let		y;

	if (is_int(width) == false) { width = round(width); }
	if (is_int(height) == false) { height = round(height); }
	layer = [];
	for (y = 0; y < height; ++y) {
		layer.push(" ".repeat(width).split(""));
	}
	return (layer);
}

function	set_layer(layer = null) {
	if (layer == null) {
		current_layer = ascii;
		layer_width = canvas_width;
		layer_height = canvas_height;
	} else {
		current_layer = layer;
		layer_width = layer[0].length;
		layer_height = layer.length;
	}
}

function	draw_layer(to_draw, pos_x = 0, pos_y = 0) {
	let		layer;
	let		layer_line;
	let		to_draw_line;
	let		to_draw_cell;
	let		width, height;
	let		off_x, off_y;
	let		x, y;

	if (is_int(pos_x) == false) { pos_x = round(pos_x); }
	if (is_int(pos_y) == false) { pos_y = round(pos_y); }
	width = to_draw[0].length;
	height = to_draw.length;
	layer = current_layer;
	for (y = 0; y < height; ++y) {
		off_y = pos_y + y;
		if (off_y < 0) {
			continue;
		} else if (off_y >= layer_height) {
			return;
		}
		layer_line = layer[off_y];
		to_draw_line = to_draw[y];
		for (x = 0; x < width; ++x) {
			off_x = pos_x + x;
			if (off_x < 0 || off_x >= layer_width) {
				continue;
			}
			to_draw_cell = to_draw_line[x];
			if (to_draw_cell != " ") {
				layer_line[off_x] = to_draw_cell;
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

	if (is_int(pos_x) == false) { pos_x = round(pos_x); }
	if (is_int(pos_y) == false) { pos_y = round(pos_y); }
	if (is_int(width) == false) { width = round(width); }
	if (is_int(height) == false) { height = round(height); }
	/// HANDLE RECT MODE
	if (rect_mode == RECT_CENTER) {
		pos_x -= round(width / 2);
		pos_y -= round(height / 2);
	}
	/// CHECK OUTSIDE DRAWING
	if (pos_x >= layer_width || pos_x + width < 0 || pos_y >= layer_height
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
			if (pos_x + x >= 0 && pos_x + x < layer_width) {
				layer[pos_y][pos_x + x] = (x == 0) ? chars[0] : (x == width - 1) ? chars[2] : chars[1];
			}
		}
	}
	/// CENTER
	for (y = 1; y < height - 1; ++y) {
		if (pos_y + y >= 0 && pos_y + y < layer_height) {
			for (x = 0; x < width; ++x) {
				if (pos_x + x >= 0 && pos_x + x < layer_width) {
					layer[pos_y + y][pos_x + x] = (x == 0) ? chars[3] : (x == width - 1) ? chars[5] : chars[4];
				}
			}
		}
	}
	/// BOTTOM
	if (pos_y + height - 1 >= 0 && pos_y + height - 1 < layer_height) {
		for (x = 0; x < width; ++x) {
			if (pos_x + x >= 0 && pos_x + x < layer_width) {
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
	for (y = 0; y < layer_height; ++y) {
		for (x = 0; x < layer_width; ++x) {
			if (layer[y][x] != " ") {
				continue;
			}
			if ((x > 0 && layer[y][x - 1] != " ")
			|| (x + 1 < layer_width && layer[y][x + 1] != " ")
			|| (y > 0 && layer[y - 1][x] != " ")
			|| (y + 1 < layer_height && layer[y + 1][x] != " ")
			|| (x > 0 && y > 0 && layer[y - 1][x - 1] != " ")
			|| (x + 1 < layer_width && y > 0 && layer[y - 1][x + 1] != " ")
			|| (x + 1 < layer_width && y + 1 < layer_height && layer[y + 1][x + 1] != " ")
			|| (x > 0 && y + 1 < layer_height && layer[y + 1][x - 1] != " ")
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

	if (is_int(x0) == false) { x0 = round(x0); }
	if (is_int(y0) == false) { y0 = round(y0); }
	if (is_int(x1) == false) { x1 = round(x1); }
	if (is_int(y1) == false) { y1 = round(y1); }
	layer = current_layer;
	char = char || line_char;
	/// INIT
	dx =  abs(x1 - x0);
	sx = (x0 < x1) ? 1 : -1;
	dy = -abs( y1 - y0);
	sy = (y0 < y1) ? 1 : -1;
	err = dx + dy;
	while (true) {
		/// PUT CHARACTER
		if (x0 >= 0 && x0 < layer_width && y0 >= 0 && y0 < layer_height) {
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

	if (is_int(x0) == false) { x0 = round(x0); }
	if (is_int(y0) == false) { y0 = round(y0); }
	if (is_int(x1) == false) { x1 = round(x1); }
	if (is_int(y1) == false) { y1 = round(y1); }
	layer = current_layer;
	/// INIT
	dx =  abs(x1 - x0);
	sx = (x0 < x1) ? 1 : -1;
	dy = -abs( y1 - y0);
	sy = (y0 < y1) ? 1 : -1;
	err = dx + dy;
	while (true) {
		/// CALL USER FUNCTION
		func(x0, y0, (x0 >= 0 && x0 < layer_width && y0 >= 0 && y0 < layer_height));
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

function	set_text_align(mode = TEXT_DEFAULT_ALIGN) {
	text_align = mode;
}

function	text(string, x, y, w = null) {
	let		layer;
	let		split;
	let		pos_x;
	let		line, next_line;
	let		word;
	let		max;
	let		i, j;

	if (is_int(x) == false) { x = round(x); }
	if (is_int(y) == false) { y = round(y); }
	if (w != null && is_int(w) == false) { w = round(w); }
	layer = current_layer;
	if (y >= layer_height) {
		return;
	}
	/// TRIM MODE
	if (text_wrap == TEXT_TRIM) {
		if (text_mode == TEXT_CENTER) {
			x -= floor(string.length / 2);
		} else if (text_mode == TEXT_RIGHT) {
			x -= string.length;
		}
		for (i = 0; i < string.length; ++i) {
			if (x < 0) {
				continue;
			} else if (x >= layer_width) {
				return;
			}
			layer[y][x] = string[i];
			++x;
		}
	/// HARD WRAP MODE
	} else if (text_wrap == TEXT_WRAP_HARD) {
		if (w != null) {
			if (text_mode == TEXT_CENTER) {
				x -= floor(w / 2);
			} else if (text_mode == TEXT_RIGHT) {
				x -= w;
			}
		}
		max = (w == null) ? layer_width - 1 : x + w;
		pos_x = 0;
		for (i = 0; i < string.length; ++i) {
			if (x + pos_x < 0 || x + pos_x >= layer_width) {
				continue;
			}
			layer[y][x + pos_x] = string[i];
			++pos_x;
			if (x + pos_x > max) {
				pos_x = 0;
				++y;
				if (y >= layer_height) {
					return;
				}
			}
		}
	/// WRAP MODE
	} else {
		if (w != null) {
			if (text_mode == TEXT_CENTER) {
				x -= floor(w / 2);
			} else if (text_mode == TEXT_RIGHT) {
				x -= w;
			}
		}
		split = string.split(" ");
		max = (w == null) ? layer_width - 1 : x + w;
		pos_x = 0;
		/// LOOP THROUGH WORDS
		line = "";
		for (i = 0; i < split.length; ++i) {
			word = split[i];
			/// NEXT WORD OUT OF LIMIT
			if (x + line.length + word.length - 1 > max) {
				/// WORD TOO BIG
				if (x + word.length - 1 > max) {
					/// TRUNCATE WORD
					while (x + word.length - 1 >= max) {
						next_line = word.substr(0, max - (x + line.length) + 0);
						for (j = 0; j < next_line.length; ++j) {
							if (x + j >= 0 && x + j < layer_width) {
								layer[y][x + j] = next_line[j];
							}
						}
						word = word.substr(max - (x + line.length));
						line = "";
						++y;
						if (y >= layer_height) {
							return;
						}
					}
					++i;
				/// NORMAL SIZE
				} else {
					if (w == null || text_align == TEXT_ALIGN_LEFT) {
						pos_x = x;
					} else if (text_align == TEXT_ALIGN_CENTER) {
						pos_x = x + round((w - line.length) / 2);
					} else if (text_align == TEXT_ALIGN_RIGHT) {
						pos_x = x + w - line.length + 1;
					}
					/// PUT LINE
					for (j = 0; j < line.length - 1; ++j) {
						if (x >= 0 && x < layer_width) {
							layer[y][pos_x + j] = line[j];
						}
					}
					/// GO TO NEXT LINE
					line = "";
					++y;
					if (y >= layer_height) {
						return;
					}
				}
			}
			line += word + " ";
		}
		/// PUT REST OF STRING
		if (w == null || text_align == TEXT_ALIGN_LEFT) {
			pos_x = x;
		} else if (text_align == TEXT_ALIGN_CENTER) {
			pos_x = x + round((w - line.length) / 2);
		} else if (text_align == TEXT_ALIGN_RIGHT) {
			pos_x = x + w - line.length + 1;
		}
		for (j = 0; j < line.length; ++j) {
			layer[y][pos_x + j] = line[j];
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

	if (is_int(pos_x) == false) { pos_x = round(pos_x); }
	if (is_int(pos_y) == false) { pos_y = round(pos_y); }
	last_x = null;
	layer = current_layer;
	step = TWO_PI / vertices;
	/// LOOP THROUGH 2 PI
	for (i = 0; i < TWO_PI; i += step) {
		/// GET COORDS
		angle = i + offset * step;
		x = round(pos_x + cos(angle) * radius_w);
		y = round(pos_y + sin(angle) * radius_h);
		/// PRINT LINE
		if (linked == true) {
			if (last_x != null) {
				line(x, y, last_x, last_y, char);
			}
			last_x = x;
			last_y = y;
		/// PRINT POINT
		} else if (x >= 0 && x < layer_width && y >= 0 && y < layer_height) {
			layer[y][x] = char;
		}
	}
	/// PRINT LAST LINE
	if (linked == true) {
		x = round(pos_x + cos(offset * step) * radius_w);
		y = round(pos_y + sin(offset * step) * radius_h);
		line(x, y, last_x, last_y, char);
	}
}

function	clear(to_draw = null) {
	let		layer;
	let		layer_line;
	let		width, height;
	let		x, y;

	layer = to_draw || current_layer;
	width = layer[0].length;
	height = layer.length;
	for (y = 0; y < height; ++y) {
		layer_line = layer[y];
		for (x = 0; x < width; ++x) {
			layer_line[x] = " ";
		}
	}
}

function	background(char) {
	let		layer;
	let		layer_line;
	let		x, y;

	layer = current_layer;
	for (y = 0; y < layer_height; ++y) {
		layer_line = layer[y];
		for (x = 0; x < layer_width; ++x) {
			layer_line[x] = char;
		}
	}
}

function	fill(x, y, char) {
	let		layer;
	let		to_change;

	if (is_int(x) == false) { x = round(x); }
	if (is_int(y) == false) { y = round(y); }
	layer = current_layer;
	to_change = layer[y][x];
	layer[y][x] = char;
	if (x > 0 && layer[y][x - 1] == to_change) {
		fill(x - 1, y, char);
	}
	if (x < layer_width - 1 && layer[y][x + 1] == to_change) {
		fill(x + 1, y, char);
	}
	if (y > 0 && layer[y - 1][x] == to_change) {
		fill(x, y - 1, char);
	}
	if (y < layer_height - 1 && layer[y + 1][x] == to_change) {
		fill(x, y + 1, char);
	}
}

function	no_loop() {
	ascii_loop_draw = false;
}

function	loop() {
	ascii_loop_draw = true;
}

function	random(option_1 = null, option_2 = null) {
	/// MODE ARRAY
	if (is_array(option_1) == true) {
		return (option_1[floor(rand() * option_1.length)]);
	/// MODE BOUND
	} else {
		/// 0 -> 1
		if (option_1 == null) {
			return (rand());
		}
		/// 0 -> option_1
		if (option_2 == null) {
			return (rand() * option_1);
		}
		/// option_1 -> option_2
		if (option_1 < option_2) {
			return (rand() * (option_2 - option_1) + option_1);
		}
		/// option_2 -> option_1
		return (rand() * (option_1 - option_2) + option_2);
	}
}

function	is_float(number) {
	return (typeof(number) == "number" && number % 1 != 0);
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

function	ascii_handle_mouse(e) {
	let		dom_rect;
	let		x, y;

	dom_rect = dom_array.getBoundingClientRect();
	x = e.clientX - dom_rect.left;
	x = round((x / dom_rect.width) * canvas_width);
	mouse_x = min(x, canvas_width - 1);
	y = e.clientY - dom_rect.top;
	y = round((y / dom_rect.height) * canvas_height);
	mouse_y = min(y, canvas_height - 1);
}

function	ascii_handle_touch(e) {
	let		i;
	let		dom_rect;
	let		x, y;

	touches = [];
	if (e.touches.length > 0) {
		dom_rect = dom_array.getBoundingClientRect();
		for (i = 0; i < e.touches.length; ++i) {
			x = e.touches[i].clientX - dom_rect.left;
			x = floor((x / dom_rect.width) * canvas_width);
			y = e.touches[i].clientY - dom_rect.top;
			y = floor((y / dom_rect.height) * canvas_height);
			touches.push({"x": x, "y": y});
		}
	}
}

window.addEventListener("load", function () {
	let		style;
	let		body;

	/// INIT VARIABLES
	ascii_loop_draw = true;
	canvas_mode = CANVAS_DEFAULT_MODE;
	rect_border_chars = RECT_DEFAULT_BORDER_CHARS;
	rect_mode = RECT_DEFAULT_MODE;
	line_char = LINE_DEFAULT_CHAR;
	text_mode = TEXT_DEFAULT_MODE;
	text_wrap = TEXT_DEFAULT_WRAP;
	text_align = TEXT_DEFAULT_ALIGN;
	mouse_x = 0;
	mouse_y = 0;
	touches = [];
	/// INSERT STYLE
	style = document.createElement("style");
	style.type = "text/css";
	style.innerText = ascii_style;
	document.head.appendChild(style);
	/// CREATE ASCII BASE DOM
	//body = document.body;
	dom_ascii = document.createElement("div");
	dom_ascii.id = "ascii";
	//body.appendChild(dom_ascii);
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
	document.addEventListener("mousemove", ascii_handle_mouse);
	document.addEventListener("touchstart", ascii_handle_touch);
	document.addEventListener("touchmove", ascii_handle_touch);
	document.addEventListener("touchend", ascii_handle_touch);
	/// MOUSE EVENTS
	if (typeof(mouse_clicked) == "function") { document.addEventListener("click", mouse_clicked); }
	if (typeof(mouse_double_clicked) == "function") { document.addEventListener("dblclick", mouse_double_clicked); }
	if (typeof(mouse_down) == "function") { document.addEventListener("mousedown", mouse_down); }
	if (typeof(mouse_up) == "function") { document.addEventListener("mouseup", mouse_up); }
	if (typeof(mouse_move) == "function") { document.addEventListener("mousemove", mouse_move); }
	/// KEYBOARD EVENTS
	if (typeof(key_down) == "function") { document.addEventListener("keydown", key_down); }
	if (typeof(key_up) == "function") { document.addEventListener("keyup", key_up); }
	if (typeof(key_pressed) == "function") { document.addEventListener("keypress", key_pressed); }
	/// TOUCH EVENTS
	if (typeof(touch_start) == "function") { document.addEventListener("touchstart", touch_start); }
	if (typeof(touch_end) == "function") { document.addEventListener("touchend", touch_end); }
	if (typeof(touch_move) == "function") { document.addEventListener("touchmove", touch_move); }
	/// WINDOW EVENT
	if (typeof(window_resized) == "function") { window.addEventListener("resize", window_resized); }
});
