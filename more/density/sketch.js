/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
/// PARAMETERS
///////////////////////////////////////////////////////////

const	FONT		= "Courier New";
const	TEXT_SIZE	= 32;
const	WIDTH		= 100;
const	HEIGHT		= 100;

///////////////////////////////////////////////////////////
/// VARIABLES
///////////////////////////////////////////////////////////

let		characters;
let		c;
let		result;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	/// SET PARAMETERS
	createCanvas(WIDTH, HEIGHT);
	textFont(FONT);
	textSize(TEXT_SIZE);
	textAlign(CENTER);
	/// CREATE CHARACTERS STRING
	characters = "";
	for (let i = 32; i <= 126; ++i) {
		characters = characters + String.fromCharCode(i);
	}
	/// INIT
	c = 0;
	result = [];
}

function	draw() {
	let		char_density;
	let		d;
	let		i;
	let		max;
	let		string;


	clear();
	/// DRAW CHARACTER
	text(characters[c], width / 2, height / 2);
	/// READ PIXELS
	loadPixels();
	d = pixelDensity();
	max = 4 * (width * d) * (height * d);
	char_density = 0;
	for (i = 0; i < max; i += 4) {
		char_density += pixels[i + 3];
	}
	result.push({"c": characters[c], "d": char_density});
	/// CHECK JOB DONE
	++c;
	if (c >= characters.length) {
		result.sort(function(a, b) {return (a.d - b.d);});
		string = "";
		for (let c of result) {
			if (c.c == '"' || c.c == '/') {
				c.c = '/' + c.c;
			}
			string = string + c.c;
		}
		console.log('"' + string + '"');
		noLoop();
	}
}
