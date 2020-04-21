//////////////////////////////// BY CACTUSFLUO /////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	characters			= ".,-*:;!ioea#IOXHM8&@";

const	SHAPE_VERTICES		= 3;
const	ROTATION_STEP		= 0.02;
const	PARALLAX_RATIO		= 1.5;
const	STEP				= 1.3;
const	FRAME_CYCLE			= 6;

let		g_shapes			= null;
let		g_frame				= 0;
let		g_angle				= 0;
let		take_screenshot		= false;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	download_file(filename, content) {
	let		elem;

	elem = document.createElement("a");
	elem.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
	elem.download = filename;
	elem.click();
}

function	screenshot() {
	const	SVG_HEADER = "<svg viewBox=\"0 0 " + (canvas_width * char_width)
	+ " " + (canvas_height * char_height)
	+ "\" xmlns=\"http://www.w3.org/2000/svg\">\n";
	const	SVG_FOOTER = "</svg>"
	let		x, y;
	let		string;
	let		font, elem;

	elem = document.getElementsByClassName("ascii")[0];
	console.log(window.getComputedStyle(elem, null));
	console.log(elem.offsetWidth, canvas_width * char_width);
	console.log(elem.offsetHeight, canvas_height * char_height);
	let computed = window.getComputedStyle(elem, null);
	font = window.getComputedStyle(elem, null).getPropertyValue("font-family");

	string = SVG_HEADER;

	/// ADD STYLE
	string += "<style>\ntext {\n";
	string += "font-size: " + computed.getPropertyValue("font-size") + ";\n";
	string += "font-family: " + computed.getPropertyValue("font-family") + ";\n";
	string += "white-space: pre;\n";
	string += "stroke: " + computed.getPropertyValue("color") + ";\n";
	string += "text-shadow: " + computed.getPropertyValue("text-shadow") + ";\n";
	string += "font-weight: " + computed.getPropertyValue("font-weight") + ";\n";
	string += "}\n"
	string += "</style>\n";

	// FIND BACKGROUND COLOR
	let		background = computed.getPropertyValue("background-color");
	if (background == "rgba(0, 0, 0, 0)" && elem != document.body) {
		elem = elem.parentNode;
		background = window.getComputedStyle(elem, null).getPropertyValue("background-color");
	}
	string += "<rect width=\"100%\" height=\"100%\" fill=\"" + background + "\"/>\n";

	/// FILL TEXT
	for (y = 0; y < canvas_height; ++y) {
		string += "<text x=\"0\" y=\"" + (char_height / 2 + y * char_height) + "\">";
		string += ascii[y].join("");
		string += "</text>\n";
	}
	string += SVG_FOOTER;
	download_file("test.svg", string);
}

//////////////////////////////////////////////////
/// TOOLS
//////////////////////////////////////////////////

function	draw_shape(x, y, w, angle) {
	let		c;

	c = characters[floor(map(w, 5, canvas_width * PARALLAX_RATIO, 0, characters.length - 1, true))];
	polygon(x + w / 2, y + w / 2, w, w * 0.7, SHAPE_VERTICES, c, null, angle);
}

//////////////////////////////////////////////////
/// ASCII MAIN
//////////////////////////////////////////////////

function	setup() {
	let		i;

	set_canvas_fit(CANVAS_COVER);
	create_canvas();
	g_shapes = [];
	mouse_x = canvas_width / 2;
	mouse_y = canvas_height / 2;
	g_frame = new FrameLoop(FRAME_CYCLE);
}

function	draw() {
	let		i;
	let		x, y, w;
	let		shape;
	let		parallax;

	clear();
	/// ADD SHAPE
	g_shapes.push({
		"x": mouse_x,
		"y": mouse_y,
		"w": 5,
		"a": g_angle
	});
	/// UPDATE ANGLE
	g_angle += ROTATION_STEP;
	if (g_angle >= 1.0) {
		g_angle -= 1.0;
	}
	/// UPDATE SHAPES
	if (g_frame.value == 0) {
		for (i = 0; i < g_shapes.length; ++i) {
			shape = g_shapes[i];
			/// UPDATE POSITIONS
			if (i < g_shapes.length - 1) {
				shape.x = g_shapes[i + 1].x;
				shape.y = g_shapes[i + 1].y;
			}
			/// UPDATE WIDTH
			shape.w *= STEP;
			/// UPDATE ANGLE
			shape.a += ROTATION_STEP;
			if (shape.a >= 1.0) {
				shape.a -= 1.0;
			}
		}
	}
	/// REMOVE BIG SHAPES
	while (g_shapes[0].w > canvas_width * PARALLAX_RATIO) {
		g_shapes.shift();
		take_screenshot = true;
	}
	/// PRINT SHAPES
	for (i = g_shapes.length - 1; i >= 0; --i) {
		shape = g_shapes[i];
		w = shape.w * (1 + (STEP - 1) * (g_frame.value / FRAME_CYCLE));
		parallax = max(0, 1 - (w / (canvas_width * PARALLAX_RATIO)));
		x = canvas_width / 2 + ((shape.x - (canvas_width / 2)) * parallax) - (w / 2);
		y = canvas_height / 2 + ((shape.y - (canvas_height / 2)) * parallax) - (w / 2);
		draw_shape(x, y, w, shape.a);
	}
	/// HANDLE ANIMATION FRAME
	g_frame.inc();
	/// TAKE SCREENSHOT
	if (take_screenshot == true) {
		screenshot();
		no_loop();
	}
}
