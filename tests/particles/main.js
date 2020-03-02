/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	characters = ".,-*:;!ioea#IOXHM8&@";
const	NUM_PARTICLES	= 10;

let		followers;
let		particles;

////////////////////////////////////////////////////////////////////////////////
/// CLASS
////////////////////////////////////////////////////////////////////////////////

class		Follower {
	constructor() {
		let	i;

		this.x = floor(random(canvas_width));
		this.y = floor(random(canvas_height));
		this.acc_x = 0;
		this.acc_y = 0;
	}

	update() {
		let	i;

		if (this.x < mouse_x) {
			this.acc_x += 0.1;
		} else {
			this.acc_x -= 0.1;
		}
		if (this.y < mouse_y) {
			this.acc_y += 0.1;
		} else {
			this.acc_y -= 0.1;
		}
		this.acc_x *= 0.99;
		this.acc_y *= 0.99;
		this.x += this.acc_x;
		this.y += this.acc_y;
		particles.push(new Particle(floor(this.x), floor(this.y)));
	}

	draw() {
		if (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) {
			ascii[floor(this.y)][floor(this.x)] = '@';
		}
	}
}

class	Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.c = characters.length - 1;
	}

	update() {
		this.c -= 1;
		return (this.c >= 0);
	}

	draw() {
		if (this.x >= 0 && this.x < canvas_width && this.y >= 0 && this.y < canvas_height) {
			ascii[this.y][this.x] = characters[this.c];
		}
	}
}

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	let		i;

	create_canvas();
	mouse_x = canvas_width / 2;
	mouse_y = canvas_height / 2;
	particles = [];
	followers = [];
	for (i = 0; i < NUM_PARTICLES; ++i) {
		followers.push(new Follower());
	}
}

function	draw() {
	let		i;
	let		new_particles;

	clear();
	for (i = 0; i < NUM_PARTICLES; ++i) {
		followers[i].update();
		followers[i].draw();
	}
	new_particles = [];
	for (i = 0; i < particles.length; ++i) {
		if (particles[i].update() == true) {
			new_particles.push(particles[i]);
			particles[i].draw();
		}
	}
}
