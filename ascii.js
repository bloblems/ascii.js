/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/// GLOBAL
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

const	DOM_CLASS_ASCII				= "ascii";
const	DOM_CLASS_ASCII_ARRAY		= "ascii_array";
const	DOM_CLASS_ASCII_LINKS		= "ascii_links";
const	DOM_CLASS_ASCII_LINE		= "ascii_line";

const	CANVAS_FIT					= 0;
const	CANVAS_COVER				= 1;
const	CANVAS_DEFAULT_FIT			= CANVAS_FIT;
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
const	DRAW_TEXT					= 0;
const	DRAW_HTML					= 1;
const	DRAW_DEFAULT_MODE			= DRAW_TEXT;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

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

function	shuffle(list, force = false) {
	let		i;
	let		rand_i;
	let		tmp;

	if (force == false) {
		list = list.slice();
	}
	for (i = list.length - 1; i >= 1; --i) {
		rand_i = floor(random(i));
		tmp = list[i];
		list[i] = list[rand_i];
		list[rand_i] = tmp;
	}
	return (list);
}

function	map(x, start0, stop0, start1, stop1, bounded = false) {
	x = (x - start0) / (stop0 - start0);
	x = x * (stop1 - start1) + start1;
	if (bounded == true) {
		return(min(stop1, max(start1, x)));
	}
	return (x);
}

function	is_float(number) {
	return (typeof(number) == "number" && number % 1 != 0);
}

class	FrameLoop {
	constructor(max, from = 0, to = max) {
		this.max = max;
		this.from = from;
		this.to = to;
		this.frame = 0;
		this.value = from;
	}

	inc() {
		this.frame += 1;
		if (this.frame >= this.max) {
			this.frame = 0;
		}
		this.value = map(this.frame, 0, this.max, this.from, this.to);
	}
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/// ASCII
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function	create_ascii(g = window) {

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
/// PUBLIC
//////////////////////////////////////////////////

	g.ascii					= null;
	g.canvas_width			= 0;
	g.canvas_height			= 0;
	g.layer_width			= 0;
	g.layer_height			= 0;
	g.char_width			= 0;
	g.char_height			= 0;
	g.mouse_x				= 0;
	g.mouse_y				= 0;
	g.touches				= null;

//////////////////////////////////////////////////
/// PRIVATE
//////////////////////////////////////////////////

	let	dom_ascii			= null;
	let	dom_array			= null;
	let	dom_links			= null;
	let	dom_spans			= null;
	let	current_layer		= null;
	let	color_layer			= null;
	let	canvas_fit			= CANVAS_DEFAULT_FIT;
	let	rect_border_chars	= RECT_DEFAULT_BORDER_CHARS;
	let	rect_mode			= RECT_DEFAULT_MODE;
	let	line_char			= LINE_DEFAULT_CHAR;
	let	text_mode			= TEXT_DEFAULT_MODE;
	let	text_wrap			= TEXT_DEFAULT_WRAP;
	let	text_align			= TEXT_DEFAULT_ALIGN;
	let	draw_mode			= DRAW_DEFAULT_MODE;
	let	ascii_loop_draw		= true;

////////////////////////////////////////////////////////////////////////////////
/// CLASSES
////////////////////////////////////////////////////////////////////////////////

	g.Link = class {
		constructor(url, x, y, option_1, option_2 = 1) {
			let	dom;
			let	w, h;

			if (is_int(x) == false) { x = floor(x); }
			if (is_int(y) == false) { y = floor(y); }
			/// MODE STRING
			if (typeof(option_1) == "string") {
				this.string = option_1;
				w = option_1.length;
				h = 1;
			/// MODE RECT
			} else {
				w = floor(option_1);
				h = floor(option_2);
			}
			/// CREATE DOM
			dom = document.createElement("a");
			dom.style.left = g.char_width * x + "px";
			dom.style.top = g.char_height * y + "px";
			dom.style.width = g.char_width * w + "px";
			dom.style.height = g.char_height * h + "px";
			dom_links.appendChild(dom);
			/// MODE URL
			if (typeof(url) == "string") {
				dom.href = url;
			/// MODE FUNCTION
			} else if (typeof(url) == "function") {
				dom.onclick = url;
			}
			/// SAVE
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
				if (this.y < 0 || this.y >= g.layer_height) {
					return;
				}
				for (i = 0; i < this.string.length; ++i) {
					if (this.x + i < 0) {
						continue
					} else if (this.x + i >= g.layer_width) {
						return;
					}
					layer[this.y][this.x + i] = this.string[i];
				}
			}
		}

		move_to(x, y) {
			if (is_int(x) == false) { x = floor(x); }
			if (is_int(y) == false) { y = floor(y); }
			this.x = x;
			this.dom.style.left = g.char_width * x + "px";
			this.y = y;
			this.dom.style.top = g.char_height * y + "px";
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

	// > create_canvas()
	// > create_canvas(width, height, dom)
	// > create_canvas(width, height, "dom")
	// > create_canvas(dom)
	// > create_canvas("dom")
	//
	// Creates ascii base:
	//  - ascii dom elements
	//  - ascii array
	// By default, the canvas will be created to fill it's mother dom but
	//  dimensions can also be passed by user via 'width' and 'height'.
	// By default, the mother dom is document.body but it can also be passed by
	//  the user via 'dom'.
	g.create_canvas = function(option_1 = null, option_2 = null, option_3 = null) {
		let		i;
		let		span;
		let		num_char;
		let		dom_mother;
		let		width, height;
		let		width_px, height_px;

		/// -> create_canvas(dom)
		if (option_1 && option_1.appendChild) {
			dom_mother = option_1;
		/// -> create_canvas("dom")
		} else if (typeof(option_1) == "string") {
			dom_mother = document.getElementById(option_1);
		/// -> create_canvas([width[, height[, dom || "dom"]]])
		} else {
			width = option_1;
			height = option_2;
			if (typeof(option_3) == "string") {
				dom_mother = document.getElementById(option_3);
			} else {
				dom_mother = option_3;
			}
		}
		/// USE BODY BY DEFAULT
		if (dom_mother == null) {
			dom_mother = document.body;
		}
		/// CREATE DOM
		if (dom_ascii == null) {
			/// CREATE ASCII BASE DOM
			dom_ascii = document.createElement("div");
			dom_ascii.className = DOM_CLASS_ASCII;
			/// CREATE ASCII ARRAY DOM
			dom_array = document.createElement("div");
			dom_array.className = DOM_CLASS_ASCII_ARRAY;
			dom_ascii.appendChild(dom_array);
			/// CREATE ASCII LINKS DOM
			dom_links = document.createElement("div");
			dom_links.className = DOM_CLASS_ASCII_LINKS;
			dom_ascii.appendChild(dom_links);
		}
		/// ADD ASCII TO MOTHER DOM
		if (dom_mother.contains(dom_ascii) == false) {
			dom_mother.appendChild(dom_ascii);
		}
		/// GET WIDTH AND HEIGHT
		width_px = dom_mother.offsetWidth || 0;
		height_px = dom_mother.offsetHeight || 0;
		span = document.createElement("span");
		dom_array.appendChild(span);
		/// RESPONSIVE WIDTH
		if (width == 0 || width == null) {
			span.textContent += " ".repeat(100);
			num_char = width_px / (dom_array.offsetWidth / 100);
			width = floor(num_char) - ((canvas_fit == CANVAS_FIT) ? 1 : 0);
			width = max(1, width);
			span.textContent = " ".repeat(width);
		/// FIXED WIDTH
		} else {
			if (is_int(width) == false) { width = floor(width); }
			span.textContent += " ".repeat(width);
		}
		span.className = DOM_CLASS_ASCII_LINE;
		g.ascii = [span.textContent.split("")];
		/// RESPONSIVE HEIGHT
		if (height == 0 || height == null) {
			while (dom_array.offsetHeight <= height_px) {
				dom_array.appendChild(span.cloneNode(true));
				g.ascii.push(span.textContent.split(""));
			}
			if (canvas_fit == CANVAS_FIT
			&& dom_array.offsetHeight > height_px && dom_array.length > 1) {
				dom_array.removeChild(dom_array.firstChild);
			}
			height = dom_array.childNodes.length;
		/// FIXED HEIGHT
		} else {
			if (is_int(height) == false) { height = floor(height); }
			for (i = 1; i < height; ++i) {
				dom_array.appendChild(span.cloneNode(true));
				g.ascii.push(span.textContent.split(""));
			}
		}
		/// SAVE 
		g.char_width = dom_array.offsetWidth / width;
		g.char_height = dom_array.offsetHeight / height;
		g.canvas_width = width;
		g.canvas_height = height;
		g.layer_width = width;
		g.layer_height = height;
		current_layer = g.ascii;
	}

	// > resize_canvas()
	// > resize_canvas(width, height)
	//
	// Resizes ascii canvas (and ascii array).
	// By default, the canvas will be resized to fill mother dom but dimensions
	//  can be passed by user via 'width' and 'height'.
	g.resize_canvas = function(width = null, height = null) {
		if (is_int(width) == false) { width = floor(width); }
		if (is_int(height) == false) { height = floor(height); }
		while (dom_array.firstChild) {
			dom_array.removeChild(dom_array.lastChild);
		}
		create_canvas(width, height, dom_ascii.parentNode);
	}

	g.move_canvas = function(x = 0, y = 0, in_characters = false, position_type = "absolute") {
		dom_ascii.style.position = position_type;
		if (in_characters == true) {
			dom_ascii.style.top = floor(y * g.char_height) + "px";
			dom_ascii.style.left = floor(x * g.char_width) + "px";
		} else {
			dom_ascii.style.top = y + "px";
			dom_ascii.style.left = x + "px";
		}
	}

	g.set_canvas_fit = function(mode = CANVAS_DEFAULT_FIT) {
		canvas_fit = mode;
	}

//////////////////////////////
/// LAYER
//////////////////////////////

	// > create_layer()
	// > create_layer(width, height)
	//
	// Creates a layer. A layer is a 2D array.
	// By default, the layer will take the canvas dimensions but it's dimensions
	//  can also be passed by user via 'width' and 'height'.
	g.create_layer = function(width = g.canvas_width, height = g.canvas_height) {
		let		layer;
		let		y;

		if (is_int(width) == false) { width = floor(width); }
		if (is_int(height) == false) { height = floor(height); }
		layer = [];
		for (y = 0; y < height; ++y) {
			layer.push(" ".repeat(width).split(""));
		}
		return (layer);
	}

	// > set_layer()
	// > set_layer(layer)
	//
	// Set the layer next ascii functions will draw on.
	// If no layer is passed, the canvas layer will be used.
	g.set_layer = function(layer = null) {
		if (layer == null) {
			current_layer = g.ascii;
			g.layer_width = g.canvas_width;
			g.layer_height = g.canvas_height;
		} else {
			current_layer = layer;
			g.layer_width = layer[0].length;
			g.layer_height = layer.length;
		}
	}

	// > draw_layer(layer)
	// > draw_layer(layer, x, y)
	//
	// Draw the given layer to the active layer.
	// By default, layer is drawn to [0, 0] but it's positions can be passed
	//  via 'x' and 'y'.
	g.draw_layer = function(to_draw, pos_x = 0, pos_y = 0) {
		let		layer;
		let		layer_line;
		let		to_draw_line;
		let		to_draw_cell;
		let		width, height;
		let		off_x, off_y;
		let		x, y;

		if (is_int(pos_x) == false) { pos_x = floor(pos_x); }
		if (is_int(pos_y) == false) { pos_y = floor(pos_y); }
		width = to_draw[0].length;
		height = to_draw.length;
		layer = current_layer;
		for (y = 0; y < height; ++y) {
			off_y = pos_y + y;
			if (off_y < 0) {
				continue;
			} else if (off_y >= g.layer_height) {
				return;
			}
			layer_line = layer[off_y];
			to_draw_line = to_draw[y];
			for (x = 0; x < width; ++x) {
				off_x = pos_x + x;
				if (off_x < 0 || off_x >= g.layer_width) {
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
/// MASK
////////////////////

	// > create_mask()
	// > create_mask(width, height)
	//
	// Creates a mask layer. A layer is a 2D array.
	// By default, the layer will take the canvas dimensions but it's dimensions
	//  can also be passed by user via 'width' and 'height'.
	g.create_mask = g.create_layer;

	// > put_mask()
	// > put_mask(x, y)
	// > put_mask(x, y, invert)
	// > put_mask(invert)
	//
	// Put a mask on the current layer. By default, empty characters of the mask
	// will make drawn layer characters empty too. If invert is set to true, non
	// empty characters will make drawn layer characters empty.
	g.put_mask = function(mask, option_1 = 0, option_2 = 0, invert = false) {
		let		layer;
		let		layer_line;
		let		mask_line;
		let		mask_cell;
		let		width, height;
		let		pos_x, pos_y;
		let		off_x, off_y;
		let		x, y;

		if (typeof(option_1) == "boolean") {
			invert = option_1;
			option_1 = 0;
		}
		pos_x = option_1;
		pos_y = option_2;
		if (is_int(pos_x) == false) { pos_x = floor(pos_x); }
		if (is_int(pos_y) == false) { pos_y = floor(pos_y); }
		width = mask[0].length;
		height = mask.length;
		layer = current_layer;
		for (y = 0; y < height; ++y) {
			off_y = pos_y + y;
			if (off_y < 0) {
				continue;
			} else if (off_y >= g.layer_height) {
				return;
			}
			layer_line = layer[off_y];
			mask_line = mask[y];
			for (x = 0; x < width; ++x) {
				off_x = pos_x + x;
				if (off_x < 0 || off_x >= g.layer_width) {
					continue;
				}
				mask_cell = mask_line[x];
				if (mask_cell == " " ^ invert == true) {
					layer_line[off_x] = " ";
				}
			}
		}
	}

////////////////////
/// COLOR
////////////////////

	g.create_color_layer = function() {
		let		layer;
		let		line;
		let		x, y;

		layer = [];
		for (y = 0; y < g.canvas_height; ++y) {
			line = [];
			for (x = 0; x < g.canvas_width; ++x) {
				line.push([null, null]);
			}
			layer.push(line);
		}
		return (layer);
	}

	g.set_color = function(layer = null) {
		color_layer = layer;
	}

	g.clear_color_layer = function(layer) {
		let		x, y;

		for (y = 0; y < g.canvas_height; ++y) {
			for (x = 0; x < g.canvas_width; ++x) {
				layer[y][x][0] = null;
				layer[y][x][1] = null;
			}
		}
	}

////////////////////
/// RECT
////////////////////

	g.set_rect_border = function(characters = null) {
		rect_border_chars = characters || RECT_DEFAULT_BORDER_CHARS;
	}

	g.set_rect_mode = function(mode = RECT_DEFAULT_MODE) {
		rect_mode = mode;
	}

	g.rect = function(pos_x, pos_y, width, height = width, border_chars = null) {
		let		layer;
		let		chars;
		let		x, y;

		if (is_int(pos_x) == false) { pos_x = floor(pos_x); }
		if (is_int(pos_y) == false) { pos_y = floor(pos_y); }
		if (is_int(width) == false) { width = floor(width); }
		if (is_int(height) == false) { height = floor(height); }
		/// HANDLE RECT MODE
		if (rect_mode == RECT_CENTER) {
			pos_x -= round(width / 2);
			pos_y -= round(height / 2);
		}
		/// CHECK OUTSIDE DRAWING
		if (pos_x >= g.layer_width || pos_x + width < 0 || pos_y >= g.layer_height
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
				if (pos_x + x >= 0 && pos_x + x < g.layer_width) {
					layer[pos_y][pos_x + x] = (x == 0) ? chars[0] : (x == width - 1) ? chars[2] : chars[1];
				}
			}
		}
		/// CENTER
		for (y = 1; y < height - 1; ++y) {
			if (pos_y + y >= 0 && pos_y + y < g.layer_height) {
				for (x = 0; x < width; ++x) {
					if (pos_x + x >= 0 && pos_x + x < g.layer_width) {
						layer[pos_y + y][pos_x + x] = (x == 0) ? chars[3] : (x == width - 1) ? chars[5] : chars[4];
					}
				}
			}
		}
		/// BOTTOM
		if (pos_y + height - 1 >= 0 && pos_y + height - 1 < g.layer_height) {
			for (x = 0; x < width; ++x) {
				if (pos_x + x >= 0 && pos_x + x < g.layer_width) {
					layer[pos_y + height - 1][pos_x + x] = (x == 0) ? chars[6] : (x == width - 1) ? chars[8] : chars[7];
				}
			}
		}
	}

////////////////////
/// BORDER
////////////////////

	g.border = function(char) {
		let		border_layer;
		let		x, y;

		/// DRAW ON A NEW LAYER
		border_layer = create_layer();
		for (y = 0; y < g.layer_height; ++y) {
			for (x = 0; x < g.layer_width; ++x) {
				if (layer[y][x] != " ") {
					continue;
				}
				if ((x > 0 && layer[y][x - 1] != " ")
				|| (x + 1 < g.layer_width && layer[y][x + 1] != " ")
				|| (y > 0 && layer[y - 1][x] != " ")
				|| (y + 1 < g.layer_height && layer[y + 1][x] != " ")
				|| (x > 0 && y > 0 && layer[y - 1][x - 1] != " ")
				|| (x + 1 < g.layer_width && y > 0 && layer[y - 1][x + 1] != " ")
				|| (x + 1 < g.layer_width && y + 1 < g.layer_height && layer[y + 1][x + 1] != " ")
				|| (x > 0 && y + 1 < g.layer_height && layer[y + 1][x - 1] != " ")
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

	g.set_line_char = function(char = null) {
		line_char = char || LINE_DEFAULT_CHAR;
	}

	g.line = function(x0, y0, x1, y1, char = null) {
		let		layer;
		let		x, y;
		let		dx, dy;
		let		sx, sy;
		let		err, err_2;

		if (is_int(x0) == false) { x0 = floor(x0); }
		if (is_int(y0) == false) { y0 = floor(y0); }
		if (is_int(x1) == false) { x1 = floor(x1); }
		if (is_int(y1) == false) { y1 = floor(y1); }
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
			if (x0 >= 0 && x0 < g.layer_width && y0 >= 0 && y0 < g.layer_height) {
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

	g.line_func = function(x0, y0, x1, y1, func) {
		let		layer;
		let		x, y;
		let		dx, dy;
		let		sx, sy;
		let		err, err_2;

		if (is_int(x0) == false) { x0 = floor(x0); }
		if (is_int(y0) == false) { y0 = floor(y0); }
		if (is_int(x1) == false) { x1 = floor(x1); }
		if (is_int(y1) == false) { y1 = floor(y1); }
		layer = current_layer;
		/// INIT
		dx =  abs(x1 - x0);
		sx = (x0 < x1) ? 1 : -1;
		dy = -abs( y1 - y0);
		sy = (y0 < y1) ? 1 : -1;
		err = dx + dy;
		while (true) {
			/// CALL USER FUNCTION
			func(x0, y0, (x0 >= 0 && x0 < g.layer_width && y0 >= 0 && y0 < g.layer_height));
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

	g.set_text_wrap = function(mode = TEXT_DEFAULT_WRAP) {
		text_wrap = mode;
	}

	g.set_text_mode = function(mode = TEXT_DEFAULT_MODE) {
		text_mode = mode;
	}

	g.set_text_align = function(mode = TEXT_DEFAULT_ALIGN) {
		text_align = mode;
	}

	g.text = function(string, x, y, w = null) {
		let		layer;
		let		split;
		let		pos_x;
		let		line, next_line;
		let		word;
		let		max;
		let		i, j;

		if (is_int(x) == false) { x = floor(x); }
		if (is_int(y) == false) { y = floor(y); }
		if (w != null && is_int(w) == false) { w = floor(w); }
		layer = current_layer;
		if (y >= g.layer_height) {
			return (null);
		}
		/// TRIM MODE
		if (text_wrap == TEXT_TRIM) {
			if (text_mode == TEXT_CENTER) {
				x -= floor(string.length / 2);
			} else if (text_mode == TEXT_RIGHT) {
				x -= string.length;
			}
			for (i = 0; i < string.length; ++i) {
				if (x < 0 || string[i] == " ") {
					++x;
					continue;
				} else if (x >= g.layer_width) {
					return (null);
				}
				layer[y][x] = string[i];
				++x;
			}
			return ([x, y]);
		/// HARD WRAP MODE
		} else if (text_wrap == TEXT_WRAP_HARD) {
			if (w != null) {
				if (text_mode == TEXT_CENTER) {
					x -= floor(w / 2);
				} else if (text_mode == TEXT_RIGHT) {
					x -= w;
				}
			}
			max = (w == null) ? g.layer_width - 1 : x + w;
			pos_x = 0;
			for (i = 0; i < string.length; ++i) {
				if (x + pos_x < 0 || x + pos_x >= g.layer_width || string[i] == " ") {
					++pos_x;
					continue;
				}
				layer[y][x + pos_x] = string[i];
				++pos_x;
				if (x + pos_x > max) {
					pos_x = 0;
					++y;
					if (y >= g.layer_height) {
						return (null);
					}
				}
			}
			return ([x + pos_x, y]);
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
			if (split[split.length - 1].length == 0) {
				split = split.slice(0, -1);
			}
			max = (w == null) ? g.layer_width - 1 : x + w;
			pos_x = 0;
			/// LOOP THROUGH WORDS
			line = "";
			for (i = 0; i < split.length; ++i) {
				word = split[i];
				if (word.length == 0) {
					continue;
				}
				/// NEXT WORD OUT OF LIMIT
				if (x + line.length + word.length - 1 > max) {
					/// WORD TOO BIG
					if (x + word.length - 1 > max) {
						/// TRUNCATE WORD
						while (x + word.length - 1 >= max) {
							next_line = word.substr(0, max - (x + line.length) + 0);
							for (j = 0; j < next_line.length; ++j) {
								if (x + j >= 0 && x + j < g.layer_width) {
									layer[y][x + j] = next_line[j];
								}
							}
							word = word.substr(max - (x + line.length));
							line = "";
							++y;
							if (y >= g.layer_height) {
								return (null);
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
							if (line[j] == " ") {
								continue;
							}
							if (x >= 0 && x < g.layer_width) {
								layer[y][pos_x + j] = line[j];
							}
						}
						/// GO TO NEXT LINE
						line = "";
						++y;
						if (y >= g.layer_height) {
							return (null);
						}
					}
				}
				if (i < split.length - 1) {
					line += word + " ";
				} else {
					line += word;
				}
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
				if (line[j] == " ") {
					continue;
				}
				layer[y][pos_x + j] = line[j];
			}
			return ([pos_x + j, y]);
		}
	}

//////////////////////////////
/// OTHER
//////////////////////////////

	g.shape = function(pos_x, pos_y, radius_w, radius_h, vertices, char, linked = true, offset = 0) {
		let		layer;
		let		angle;
		let		step;
		let		last_x, last_y;
		let		x, y;
		let		i;

		if (is_int(pos_x) == false) { pos_x = floor(pos_x); }
		if (is_int(pos_y) == false) { pos_y = floor(pos_y); }
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
			} else if (x >= 0 && x < g.layer_width && y >= 0 && y < g.layer_height) {
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

	g.clear = function(to_draw = null) {
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

	g.background = function(char) {
		let		layer;
		let		layer_line;
		let		x, y;

		layer = current_layer;
		for (y = 0; y < g.layer_height; ++y) {
			layer_line = layer[y];
			for (x = 0; x < g.layer_width; ++x) {
				layer_line[x] = char;
			}
		}
	}

	g.fill = function(x, y, char) {
		let		layer;
		let		to_change;

		if (is_int(x) == false) { x = floor(x); }
		if (is_int(y) == false) { y = floor(y); }
		layer = current_layer;
		to_change = layer[y][x];
		if (to_change == char) {
			return;
		}
		layer[y][x] = char;
		if (x > 0 && layer[y][x - 1] == to_change) {
			fill(x - 1, y, char);
		}
		if (x < g.layer_width - 1 && layer[y][x + 1] == to_change) {
			fill(x + 1, y, char);
		}
		if (y > 0 && layer[y - 1][x] == to_change) {
			fill(x, y - 1, char);
		}
		if (y < g.layer_height - 1 && layer[y + 1][x] == to_change) {
			fill(x, y + 1, char);
		}
	}

	g.is_on_canvas = function(x, y) {
		return (x >= 0 && x < canvas_width && y >= 0 && y < canvas_height);
	}

	g.is_on_layer = function(x, y) {
		return (x >= 0 && x < layer_width && y >= 0 && y < layer_height);
	}

	g.no_loop = function() {
		ascii_loop_draw = false;
	}

	g.loop = function() {
		if (ascii_loop_draw = false) {
			ascii_loop_draw = true;
			if (typeof(g.draw) == "function") {
				/// CALL draw()
				window.requestAnimationFrame(ascii_draw);
			}
		}
	}

	g.set_draw_mode = function(mode = DRAW_DEFAULT_MODE) {
		draw_mode = mode;
	}

//////////////////////////////////////////////////
/// PRIVATE FUNCTIONS
//////////////////////////////////////////////////

	function	ascii_init_events() {
		/// SET EVENTS
		document.addEventListener("mousemove", ascii_handle_mouse);
		document.addEventListener("touchstart", ascii_handle_touch);
		document.addEventListener("touchmove", ascii_handle_touch);
		document.addEventListener("touchend", ascii_handle_touch);
		/// MOUSE EVENTS
		if (typeof(g.mouse_clicked) == "function") { document.addEventListener("click", g.mouse_clicked); }
		if (typeof(g.mouse_double_clicked) == "function") { document.addEventListener("dblclick", g.mouse_double_clicked); }
		if (typeof(g.mouse_down) == "function") { document.addEventListener("mousedown", g.mouse_down); }
		if (typeof(g.mouse_up) == "function") { document.addEventListener("mouseup", g.mouse_up); }
		if (typeof(g.mouse_move) == "function") { document.addEventListener("mousemove", g.mouse_move); }
		/// KEYBOARD EVENTS
		if (typeof(g.key_down) == "function") { document.addEventListener("keydown", g.key_down); }
		if (typeof(g.key_up) == "function") { document.addEventListener("keyup", g.key_up); }
		/// TOUCH EVENTS
		if (typeof(g.touch_start) == "function") { document.addEventListener("touchstart", g.touch_start); }
		if (typeof(g.touch_end) == "function") { document.addEventListener("touchend", g.touch_end); }
		if (typeof(g.touch_move) == "function") { document.addEventListener("touchmove", g.touch_move); }
		/// WINDOW EVENT
		if (typeof(g.window_resized) == "function") { window.addEventListener("resize", g.window_resized); }
	}

	function	ascii_setup() {
		if (typeof(g.setup) == "function") {
			/// CALL setup()
			g.setup();
			if (typeof(g.draw) == "function") {
				/// INIT EVENTS
				ascii_init_events();
				/// CALL draw()
				window.requestAnimationFrame(ascii_draw);
			}
		}
	}

	function	ascii_draw_color(spans) {
		let		line;
		let		x, y;
		let		color_line, ascii_line;
		let		fore_color, back_color;
		let		prev_fore_color, prev_back_color;

		/// FOR EACH LINE
		for (y = 0; y < g.canvas_height; ++y) {
			color_line = color_layer[y];
			ascii_line = g.ascii[y];
			prev_fore_color = null;
			prev_back_color = null;
			line = "";
			/// FOR EACH CHARACTER
			for (x = 0; x < g.canvas_width; ++x) {
				back_color = color_line[x][0];
				fore_color = color_line[x][1];
				/// COLOR CHANGED
				if (fore_color != prev_fore_color
				|| back_color != prev_back_color) {
					/// START COLOR
					if (prev_fore_color == null
					&& prev_back_color == null) {
						line += "<span style=\"";
						if (fore_color != null) {
							line += "color:" + fore_color + ";";
						}
						if (back_color != null) {
							line += "background:" + back_color;
						}
						line += "\">" + ascii_line[x];
					/// END COLOR
					} else {
						line += "</span>";
						/// START NEW COLOR
						if (fore_color != null || back_color != null) {
							line += "<span style=\"";
							if (fore_color != null) {
								line += "color:" + fore_color + ";";
							}
							if (back_color != null) {
								line += "background:" + back_color;
							}
							line += "\">";
						}
						line += ascii_line[x];
					}
					prev_back_color = back_color;
					prev_fore_color = fore_color;
				/// SAME COLOR
				} else {
					line += ascii_line[x];
				}
			}
			if (prev_fore_color != null || prev_back_color != null) {
				line += "</span>";
			}
			/// PRINT LINE
			spans[y].innerHTML = line;
		}
	}

	function	ascii_draw() {
		let		y;
		let		spans;

		/// CALL draw()
		g.draw();
		/// DRAW ARRAY TO DOM ASCII
		spans = dom_array.childNodes;
		/// TEXT MODE
		if (draw_mode == DRAW_TEXT) {
			/// WITHOUT COLOR
			if (color_layer == null) {
				for (y = 0; y < g.canvas_height; ++y) {
					spans[y].textContent = g.ascii[y].join("");
				}
			/// WITH COLOR
			} else {
				ascii_draw_color(spans);
			}
		/// HTML MODE
		} else {
			for (y = 0; y < g.canvas_height; ++y) {
				spans[y].innerHTML = g.ascii[y].join("");
			}
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
		x = round((x / dom_rect.width) * g.canvas_width);
		mouse_x = min(x, g.canvas_width - 1);
		y = e.clientY - dom_rect.top;
		y = round((y / dom_rect.height) * g.canvas_height);
		mouse_y = min(y, g.canvas_height - 1);
	}

	function	ascii_handle_touch(e) {
		let		i;
		let		dom_rect;
		let		x, y;

		g.touches = [];
		if (e.touches.length > 0) {
			dom_rect = dom_array.getBoundingClientRect();
			for (i = 0; i < e.touches.length; ++i) {
				x = e.touches[i].clientX - dom_rect.left;
				x = floor((x / dom_rect.width) * g.canvas_width);
				y = e.touches[i].clientY - dom_rect.top;
				y = floor((y / dom_rect.height) * g.canvas_height);
				g.touches.push({"x": x, "y": y});
			}
		}
	}

////////////////////////////////////////////////////////////////////////////////
/// MAIN
////////////////////////////////////////////////////////////////////////////////

	if (document.readyState == "complete") {
		ascii_setup();
	} else {
		window.addEventListener("load", ascii_setup);
	}
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/// LOAD
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/// LOAD STYLE
window.addEventListener("load", function () {
	let		style;

	/// INSERT STYLE
	style = document.createElement("style");
	style.type = "text/css";
	style.innerText = ascii_style;
	document.head.appendChild(style);
});

/// LOAD ASCII
create_ascii();
