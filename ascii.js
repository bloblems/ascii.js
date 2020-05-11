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

const	ascii_style = `.ascii{font-family:Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;display:inline-block;overflow-x:hidden;white-space:pre}.ascii_line{display:block}.ascii_links a{position:absolute}.ascii_links a:hover{cursor:pointer}`;

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

const	MOUSE_LEFT					= 0;
const	MOUSE_MIDDLE				= 1;
const	MOUSE_RIGHT					= 2;
const	KEY_BACKSPACE				= 8;
const	KEY_DELETE					= 46;
const	KEY_ENTER					= 13;
const	KEY_RETURN					= 13;
const	KEY_TAB						= 9;
const	KEY_ESCAPE					= 27;
const	KEY_SHIFT					= 16;
const	KEY_CONTROL					= 17;
const	KEY_OPTION					= 17;
const	KEY_ALT						= 18;
const	KEY_UP						= 38;
const	KEY_DOWN 					= 40;
const	KEY_LEFT 					= 37;
const	KEY_RIGHT					= 39;

const	CANVAS_FIT					= 0;
const	CANVAS_COVER				= 1;
const	CANVAS_DEFAULT_FIT			= CANVAS_FIT;
const	BOX_CORNER					= 0;
const	BOX_CENTER					= 1;
const	BOX_TRANSPARENT				= 0;
const	BOX_COVER					= 1;
const	BOX_HOVER					= 0;
const	BOX_INTERSECTION			= 1;
const	BOX_BORDERS					= [	" \u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u2534\u252C\u253C",
										" \u2550\u2551\u2554\u2557\u255A\u255D\u2560\u2563\u2569\u2566\u256C",
										" \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588"]
const	BOX_DEFAULT_MODE			= BOX_CORNER;
const	BOX_DEFAULT_BORDER_CHARS	= BOX_BORDERS[0];
const	BOX_DEFAULT_ALPHA			= BOX_TRANSPARENT;
const	BOX_DEFAULT_INTERSECTION	= BOX_HOVER;
const	BOX_BORDER_INTERSECTION_HORIZONTAL = [1, 1, 11, 10, 10, 9, 9, 11, 11, 9, 10, 11];
const	BOX_BORDER_INTERSECTION_VERTICAL = [2, 11, 2, 7, 8, 7, 8, 7, 8, 11, 11, 11];
const	BOX_BORDER_INTERSECTION_TOP_LEFT = [3, 10, 7, 3, 10, 7, 11, 7, 11, 11, 10, 11];
const	BOX_BORDER_INTERSECTION_TOP_RIGHT = [4, 10, 8, 10, 4, 11, 8, 11, 8, 11, 10, 11];
const	BOX_BORDER_INTERSECTION_BOTTOM_LEFT = [5, 9, 7, 7, 11, 5, 9, 7, 11, 9, 11, 11];
const	BOX_BORDER_INTERSECTION_BOTTOM_RIGHT = [6, 9, 8, 11, 8, 11, 6, 11, 8, 9, 11, 11];
const	LINE_DEFAULT_CHAR			= ".";
const	TEXT_BLOCK					= 0;
const	TEXT_WRAP					= 1;
const	TEXT_WRAP_HARD				= 2;
const	TEXT_LEFT					= 0;
const	TEXT_CENTER					= 1;
const	TEXT_RIGHT					= 2;
const	TEXT_ALIGN_LEFT				= 0;
const	TEXT_ALIGN_CENTER			= 1;
const	TEXT_ALIGN_RIGHT			= 2;
const	TEXT_DEFAULT_WRAP			= TEXT_BLOCK;
const	TEXT_DEFAULT_MODE			= TEXT_LEFT;
const	TEXT_DEFAULT_ALIGN			= TEXT_ALIGN_LEFT;
const	DRAW_TEXT					= 0;
const	DRAW_HTML					= 1;
const	DRAW_DEFAULT_MODE			= DRAW_TEXT;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
/// EASE
//////////////////////////////////////////////////

function 	ease_linear(t, b, c, d) {
	return c*t/d + b;
}

function	ease_quad_in(t, b, c, d) {
	t /= d;
	return c*t*t + b;
}

function	ease_quad_out(t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}

function	ease_quad_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

function	ease_cubic_in(t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
}

function	ease_cubic_out(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
}

function	ease_cubic_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
}

function	ease_quartic_in(t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
}

function	ease_quartic_out(t, b, c, d) {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
}

function	ease_quartic_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
}

function	ease_quintic_in(t, b, c, d) {
	t /= d;
	return c*t*t*t*t*t + b;
}

function	ease_quintic_out(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t*t*t + 1) + b;
}

function	ease_quintic_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t*t*t + 2) + b;
}

function	ease_sin_in(t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
}

function	ease_sin_out(t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
}

function	ease_sin_in_out(t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}

function	ease_exp_in(t, b, c, d) {
	return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
}

function	ease_exp_out(t, b, c, d) {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
}

function	ease_exp_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
}

function	ease_circular_in(t, b, c, d) {
	t /= d;
	return -c * (Math.sqrt(1 - t*t) - 1) + b;
}

function	ease_circular_out(t, b, c, d) {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
}

function	ease_circular_in_out(t, b, c, d) {
	t /= d/2;
	if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	t -= 2;
	return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
}

//////////////////////////////////////////////////
/// OTHER
//////////////////////////////////////////////////

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

function	constrain(x, val_min, val_max) {
	return (min(val_max, max(val_min, x)));
}

function	is_float(number) {
	return (typeof(number) == "number" && number % 1 != 0);
}

class	FrameLoop {
	constructor(max, from = 0, to = max, go_back = false, ease = ease_linear) {
		this.max = max;
		this.from = from;
		this.to = to;
		this.frame = 0;
		this.value = from;
		this.range = (from < to) ? (to - from) : - (from - to);
		this.go_back = go_back;
		this.ease = ease;
	}

	update_value() {
		/// TWO DIRECTIONS
		if (this.go_back == true) {
			/// FORWARD
			if (this.frame < this.max / 2) {
				this.value = this.ease(this.frame, this.from, this.range, this.max / 2);
			/// BACKWARD
			} else {
				this.value = this.ease(this.frame - this.max / 2, this.to, - this.range, this.max / 2);
			}
		/// ONE DIRECTION
		} else {
			this.value = this.ease(this.frame, this.from, this.range, this.max);
		}
	}

	inc() {
		this.frame += 1;
		if (this.frame >= this.max) {
			this.frame = 0;
		}
		this.update_value();
	}

	set(frame) {
		this.frame = frame;
		if (this.frame >= this.max) {
			this.frame = 0;
		}
		this.update_value();
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
	let	box_border_chars	= BOX_DEFAULT_BORDER_CHARS;
	let	box_mode			= BOX_DEFAULT_MODE;
	let	box_alpha			= BOX_DEFAULT_ALPHA;
	let	box_intersection	= BOX_DEFAULT_INTERSECTION;
	let	line_char			= LINE_DEFAULT_CHAR;
	let	text_mode			= TEXT_DEFAULT_MODE;
	let	text_wrap			= TEXT_DEFAULT_WRAP;
	let	text_align			= TEXT_DEFAULT_ALIGN;
	let	draw_mode			= DRAW_DEFAULT_MODE;
	let	loop_draw			= true;
	let	mouse_buttons		= []
	let	keys				= [];

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
			/// MODE BOX
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
			&& dom_array.offsetHeight > height_px
			&& dom_array.childNodes.length > 1) {
				g.ascii.pop();
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

	g.draw_layer = function(to_draw, dst_x = 0, dst_y = 0, src_x = 0, src_y = 0, src_w = null, src_h = null) {
		let		layer;
		let		layer_line;
		let		to_draw_line;
		let		to_draw_cell;
		let		w, h;
		let		off_x, off_y;
		let		x, y;

		/// GET POSITION
		if (is_int(dst_x) == false) { dst_x = floor(dst_x); }
		if (is_int(dst_y) == false) { dst_y = floor(dst_y); }
		/// GET DRAWN QUAD FROM LAYER
		if (is_int(src_x) == false) { src_x = floor(src_x); }
		if (is_int(src_y) == false) { src_y = floor(src_y); }
		w = to_draw[0].length;
		h = to_draw.length;
		if (src_w == null) {
			src_w = to_draw[0].length - src_x;
		} else if (is_int(src_w) == false)  { src_w = floor(src_w); }
		if (src_h == null) {
			src_h = to_draw.length - src_y;
		} else if (is_int(src_h) == false)  { src_h = floor(src_h); }
		src_w = min(src_w, w - src_x);
		src_h = min(src_h, h - src_y);
		/// DRAW QUAD TO ACTIVE LAYER
		layer = current_layer;
		for (y = 0; y < src_h; ++y) {
			off_y = dst_y + y;
			if (off_y < 0) {
				continue;
			} else if (off_y >= g.layer_height) {
				return;
			}
			layer_line = layer[off_y];
			to_draw_line = to_draw[y + src_y];
			for (x = 0; x < src_w; ++x) {
				off_x = dst_x + x;
				if (off_x < 0 || off_x >= g.layer_width) {
					continue;
				}
				to_draw_cell = to_draw_line[x + src_x];
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

	// > put_mask(mask)
	// > put_mask(mask, x, y)
	// > put_mask(mask, x, y, invert)
	// > put_mask(mask, invert)
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
/// BOX
////////////////////

	g.box = function(pos_x, pos_y, width, height = width, border_chars = null) {
		let		layer;
		let		chars;
		let		x, y;
		let		cell_x, cell_y;
		let		cell;
		let		to_cell;

		if (is_int(pos_x) == false) { pos_x = floor(pos_x); }
		if (is_int(pos_y) == false) { pos_y = floor(pos_y); }
		if (is_int(width) == false) { width = floor(width); }
		if (is_int(height) == false) { height = floor(height); }
		/// HANDLE BOX MODE
		if (box_mode == BOX_CENTER) {
			pos_x -= round(width / 2);
			pos_y -= round(height / 2);
		}
		/// CHECK OUTSIDE DRAWING
		if (pos_x >= g.layer_width || pos_x + width < 0
		|| pos_y >= g.layer_height || pos_y + height < 0
		|| width == 0 || height == 0) {
			return;
		}
		/// SET CHARACTERS
		if (is_int(border_chars) == true) {
			chars = BOX_BORDERS[border_chars % BOX_BORDERS.length];
		} else {
			chars = border_chars || box_border_chars;
		}
		layer = current_layer;
		/// TOP LINE
		if (pos_y >= 0 && pos_y < g.layer_height) {
			if (pos_x >= 0 && pos_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[3] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					to_cell = BOX_BORDER_INTERSECTION_TOP_LEFT;
					cell = chars.indexOf(layer[pos_y][pos_x]);
					layer[pos_y][pos_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[3];
				} else {
					layer[pos_y][pos_x] = chars[3];
				}
			}
			if (box_alpha == BOX_COVER || chars[1] != " ") {
				to_cell = BOX_BORDER_INTERSECTION_HORIZONTAL;
				for (x = 1; x < width - 1; ++x) {
					cell_x = pos_x + x;
					if (cell_x < 0) { continue; }
					else if (cell_x >= g.layer_width) { break; }
					if (box_intersection == BOX_INTERSECTION) {
						cell = chars.indexOf(layer[pos_y][cell_x]);
						layer[pos_y][cell_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[1];
					} else {
						layer[pos_y][cell_x] = chars[1];
					}
				}
			}
			cell_x = pos_x + width - 1;
			if (cell_x >= 0 && cell_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[4] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					to_cell = BOX_BORDER_INTERSECTION_TOP_RIGHT;
					cell = chars.indexOf(layer[pos_y][cell_x]);
					layer[pos_y][cell_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[4];
				} else {
					layer[pos_y][cell_x] = chars[4];
				}
			}
		}
		/// MIDDLE LINES
		to_cell = BOX_BORDER_INTERSECTION_VERTICAL
		for (y = 1; y < height - 1; ++y) {
			cell_y = pos_y + y;
			if (cell_y < 0) { continue; }
			else if (cell_y >= g.layer_height) { return; }
			if (pos_x >= 0 && pos_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[2] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					cell = chars.indexOf(layer[cell_y][pos_x]);
					layer[cell_y][pos_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[2];
				} else {
					layer[cell_y][pos_x] = chars[2];
				}
			}
			if (box_alpha == BOX_COVER || chars[0] != " ") {
				for (x = 1; x < width - 1; ++x) {
					cell_x = pos_x + x;
					if (cell_x < 0) { continue; }
					else if (cell_x >= g.layer_width) { break; }
					layer[cell_y][cell_x] = chars[0];
				}
			}
			cell_x = pos_x + width - 1;
			if (cell_x >= 0 && cell_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[2] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					cell = chars.indexOf(layer[cell_y][cell_x]);
					layer[cell_y][cell_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[2];
				} else {
					layer[cell_y][cell_x] = chars[2];
				}
			}
		}
		/// BOTTOM LINE
		cell_y = pos_y + height - 1;
		if (cell_y >= 0 && cell_y < g.layer_height) {
			if (pos_x >= 0 && pos_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[5] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					to_cell = BOX_BORDER_INTERSECTION_BOTTOM_LEFT;
					cell = chars.indexOf(layer[cell_y][pos_x]);
					layer[cell_y][pos_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[5];
				} else {
					layer[cell_y][pos_x] = chars[5];
				}
			}
			if (box_alpha == BOX_COVER || chars[1] != " ") {
				to_cell = BOX_BORDER_INTERSECTION_HORIZONTAL;
				for (x = 1; x < width - 1; ++x) {
					cell_x = pos_x + x;
					if (cell_x < 0) { continue; }
					else if (cell_x >= g.layer_width) { break; }
					if (box_intersection == BOX_INTERSECTION) {
						cell = chars.indexOf(layer[cell_y][cell_x]);
						layer[cell_y][cell_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[1];
					} else {
						layer[cell_y][cell_x] = chars[1];
					}
				}
			}
			cell_x = pos_x + width - 1;
			if (cell_x >= 0 && cell_x < g.layer_width
			&& (box_alpha == BOX_COVER || chars[6] != " ")) {
				if (box_intersection == BOX_INTERSECTION) {
					to_cell = BOX_BORDER_INTERSECTION_BOTTOM_RIGHT;
					cell = chars.indexOf(layer[cell_y][cell_x]);
					layer[cell_y][cell_x] = (cell >= 0) ? chars[to_cell[cell]] : chars[6];
				} else {
					layer[cell_y][cell_x] = chars[6];
				}
			}
		}
	}

	g.set_box_border = function(characters = null) {
		if (is_int(characters) == true) {
			box_border_chars = BOX_BORDERS[characters % BOX_BORDERS.length];
		} else {
			box_border_chars = characters || BOX_DEFAULT_BORDER_CHARS;
		}
	}

	g.set_box_mode = function(mode = BOX_DEFAULT_MODE) {
		box_mode = mode;
	}

	g.set_box_alpha = function(mode = BOX_DEFAULT_ALPHA) {
		box_alpha = mode;
	}

	g.set_box_intersection = function(mode = BOX_DEFAULT_INTERSECTION) {
		box_intersection = mode;
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
		let		ret;

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
			ret = func(x0, y0, (x0 >= 0 && x0 < g.layer_width && y0 >= 0 && y0 < g.layer_height));
			/// IF USER STOPS
			if (ret == true) {
				return;
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
		let		max;
		let		reg;
		let		line;
		let		pos_x;
		let		i;

		if (is_int(x) == false) { x = floor(x); }
		if (is_int(y) == false) { y = floor(y); }
		if (w != null && is_int(w) == false) { w = floor(w); }
		layer = current_layer;
		if (x >= g.layer_width || y >= g.layer_height) {
			return (null);
		}
		/// PREPARE MODE BLOCK
		if (text_wrap == TEXT_BLOCK) {
			if (text_mode == TEXT_CENTER) {
				x -= floor(string.length / 2);
			} else if (text_mode == TEXT_RIGHT) {
				x -= string.length;
			}
		} else {
			/// PREPARE MODE WRAP
			if (text_wrap == TEXT_WRAP) {
				max = w || g.layer_width - x;
				if (max == 0) {
					return (null);
				}
				reg = string.match(RegExp('[\\s\n]*.{1,' + max
				+ '}(\\s+|$\n?)|(.{1,' + max + '})', 'g'));
				/// HANDLE ALIGNEMENT
				if (reg != null && w != null && text_align != TEXT_ALIGN_LEFT) {
					for (i = 0; i < reg.length; ++i) {
						line = reg[i].trim();
						if (text_align == TEXT_ALIGN_RIGHT) {
							reg[i] = " ".repeat(w - line.length) + line;
						} else {
							reg[i] = " ".repeat(floor((w - line.length) / 2))
							+ line;
						}
					}
				}
				string = (reg != null) ? reg.join('\n') : "";
			/// PREPARE MODE WRAP HARD
			} else if (text_wrap == TEXT_WRAP_HARD) {
				max = w || g.layer_width - x;
				if (max == 0) {
					return (null);
				}
				reg = string.match(RegExp('[\\s\n]*.{1,' + max + '}', 'g'));
				string = (reg != null) ? reg.join('\n') : "";
			}
			/// HANDLE WIDTH
			if (w != null) {
				if (text_mode == TEXT_CENTER) {
					x -= floor(w / 2);
				} else if (text_mode == TEXT_RIGHT) {
					x -= w;
				}
			}
		}
		/// PUT STRING
		pos_x = x;
		for (i = 0; i < string.length; ++i) {
			/// NEW LINE
			if (string[i] == '\n') {
				pos_x = x;
				++y;
				if (y >= g.layer_height) {
					break;
				}
			/// NOTHING TO PRINT
			} else if (pos_x < 0 || string[i] == ' ') {
				++pos_x;
			/// PUT CHARACTER
			} else if (pos_x < g.layer_width){
				layer[y][pos_x] = string[i];
				++pos_x;
			}
		}
		return ([pos_x, y]);
	}

//////////////////////////////
/// OTHER
//////////////////////////////

	g.polygon = function(cx, cy, rw, rh, vertices, char_edges, char_fill = null, offset = 0) {
		let		layer, original_layer;
		let		angle;
		let		step;
		let		last_x, last_y;
		let		x, y;
		let		i;

		if (is_int(cx) == false) { cx = floor(cx); }
		if (is_int(cy) == false) { cy = floor(cy); }
		/// IF FILL IS REQUIRED
		if (char_fill != null && vertices > 2) {
			/// CREATE NEW LAYER TO DRAW ON
			original_layer = current_layer;
			layer = create_layer(layer_width, layer_height);
			set_layer(layer);
		/// NO FILL
		} else {
			layer = current_layer;
		}
		step = TWO_PI / vertices;
		/// PREPARE FIRST LINE
		angle = step * (vertices - 1) + offset * step;
		last_x = round(cx + cos(angle) * rw);
		last_y = round(cy + sin(angle) * rh);
		/// LOOP THROUGH 2 PI
		for (i = 0; i < TWO_PI; i += step) {
			/// GET COORDS
			angle = i + offset * step;
			x = round(cx + cos(angle) * rw);
			y = round(cy + sin(angle) * rh);
			/// PRINT LINE
			line(x, y, last_x, last_y, char_edges);
			last_x = x;
			last_y = y;
		}
		/// IF FILL IS REQUIRE
		if (char_fill != null && vertices > 2) {
			/// RESET LAYER AND PUT DRAWN ONE
			fill(cx, cy, char_fill);
			set_layer(original_layer);
			draw_layer(layer);
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

	g.iter_func = function(func, layer = current_layer) {
		let		l;
		let		x, y;
		let		w, h;

		w = layer[0].length;
		h = layer.length;
		for (y = 0; y < h; ++y) {
			l = layer[y];
			for (x = 0; x < w; ++x) {
				func(l[x], x, y, layer);
			}
		}
	}

	g.map_func = function(func, layer = current_layer) {
		let		new_layer;
		let		l1, l2;
		let		x, y;
		let		w, h;

		w = layer[0].length;
		h = layer.length;
		new_layer = create_layer(w, h);
		for (y = 0; y < h; ++y) {
			l1 = layer[y];
			l2 = new_layer[y];
			for (x = 0; x < w; ++x) {
				l2[x] = func(l1[x], x, y, layer);
			}
		}
		for (y = 0; y < h; ++y) {
			l1 = layer[y];
			l2 = new_layer[y];
			for (x = 0; x < w; ++x) {
				l1[x] = l2[x];
			}
		}
	}

	g.is_on_canvas = function(x, y) {
		return (x >= 0 && x < canvas_width && y >= 0 && y < canvas_height);
	}

	g.is_on_layer = function(x, y) {
		return (x >= 0 && x < layer_width && y >= 0 && y < layer_height);
	}

	g.is_key_down = function(key) {
		return (keys[key] || false);
	}

	g.is_mouse_down = function(button = null) {
		if (button == null) {
			return (mouse_buttons[0] || mouse_buttons[1] || mouse_buttons[2]
				|| false);
		} else {
			return (mouse_buttons[button] || false);
		}
	}

	g.no_loop = function() {
		loop_draw = false;
	}

	g.loop = function() {
		if (loop_draw = false) {
			loop_draw = true;
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
		/// ASCII EVENTS
		document.addEventListener("keydown", ascii_handle_key_down);
		document.addEventListener("keyup", ascii_handle_key_up);
		document.addEventListener("mousedown", ascii_handle_mouse_down);
		document.addEventListener("mouseup", ascii_handle_mouse_up);
		document.addEventListener("mousemove", ascii_handle_mouse_move);
		document.addEventListener("touchstart", ascii_handle_touch);
		document.addEventListener("touchmove", ascii_handle_touch);
		document.addEventListener("touchend", ascii_handle_touch);
		/// USER EVENTS
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
		if (loop_draw == true) {
			window.requestAnimationFrame(ascii_draw);
		}
	}

	function	ascii_handle_key_down(e) {
		keys[e.keyCode] = true;
	}

	function	ascii_handle_key_up(e) {
		keys[e.keyCode] = false;
	}

	function	ascii_handle_mouse_down(e) {
		mouse_buttons[e.button] = true;
	}

	function	ascii_handle_mouse_up(e) {
		mouse_buttons[e.button] = false;
	}

	function	ascii_handle_mouse_move(e) {
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
