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

let		particles;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
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
		particle.char = Math.max(particle.char - 1, 0);
		particle.y += 1;
		if (particle.y < canvas_height) {
			new_particles.push(particle);
		}
	}
	new_particles.push({"x": mouse_x, "y": mouse_y, "char": characters.length - 1});
	if (mouse_x < canvas_width - 1) {
		new_particles.push({"x": mouse_x + 1, "y": mouse_y, "char": characters.length - 1});
	}
	if (mouse_x > 0) {
		new_particles.push({"x": mouse_x - 1, "y": mouse_y, "char": characters.lenth - 1});
	}
	particles = new_particles;
}
