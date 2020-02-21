/////////////////////////////// BY GIBBONJOYEUX ////////////////////////////////

"use strict";

window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame;

////////////////////////////////////////////////////////////////////////////////
/// DATA
////////////////////////////////////////////////////////////////////////////////

//const	characters = "Oo:,.";
const	characters = "M8$0+:.";

let		x, y;
let		particles;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	x = 0;
	y = 0;
	create_canvas(100, 50);
	particles = [];
}

function	draw() {
	let		new_particles;
	let		particle;
	let		i;

	clear();
	new_particles = [];
	for (i = 0; i < particles.length; ++i) {
		particle = particles[i];
		ascii[particle.y][particle.x] = characters[particle.char];
		particle.char = Math.min(particle.char + 1, characters.length - 1);
		particle.y += 1;
		if (particle.y < canvas_height) {
			new_particles.push(particle);
		}
	}
	new_particles.push({"x": mouse_x, "y": mouse_y, "char": 0});
	if (mouse_x < canvas_width - 1) {
		new_particles.push({"x": mouse_x + 1, "y": mouse_y, "char": 0});
	}
	if (mouse_x > 0) {
		new_particles.push({"x": mouse_x - 1, "y": mouse_y, "char": 0});
	}
	particles = new_particles;
}
