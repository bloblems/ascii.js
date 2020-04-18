/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

const	characters		= " .,-*:;!ioea#IOXHM8&@";
const	PARTICLES		= 3;
const	PARTICLES_STEP	= TWO_PI / PARTICLES;
const	FRAMES			= 180;
const	R				= 15;
const	RW				= 1;
const	RH				= 0.55;
const	D				= 4;

let		frame;
let		particles;

////////////////////////////////////////////////////////////////////////////////
/// CLASS
////////////////////////////////////////////////////////////////////////////////

class	Particle {
	constructor(x, y) {
		this.x = round(x);
		this.y = round(y);
		this.c = characters.length - 1;
	}

	update() {
		this.c -= 1;
		return (this.c >= 0);
	}

	draw() {
		if (is_on_canvas(this.x, this.y) == true) {
			ascii[this.y][this.x] = characters[this.c];
		}
	}
}

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	put_particle(x, y) {
	particles.push(new Particle(x, y));
}

function	setup() {
	create_canvas();
	frame = new FrameLoop(FRAMES, 0, TWO_PI);
	particles = [];
	mouse_x = floor(canvas_width / 2);
	mouse_y = floor(canvas_height / 2);
}

function	draw() {
	let		i;
	let		x, y;
	let		r;
	let		k;
	let		angle;
	let		new_particles;

	clear();
	for (i = 0; i < PARTICLES; ++i) {
		angle = (frame.value + (i * PARTICLES_STEP)) % TWO_PI;
		k = angle * D;
		r = R * sin(k);
		x = mouse_x + (r * RW) * cos(angle);
		y = mouse_y + (r * RH) * sin(angle);
		particles.push(new Particle(x, y));
	}
	new_particles = [];
	for (let particle of particles) {
		if (particle.update() == true) {
			new_particles.push(particle);
			particle.draw();
		}
	}
	particles = new_particles;
	frame.inc();
}
