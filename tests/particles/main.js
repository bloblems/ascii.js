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
	/// LOOP THROUGH PARTICLES
	for (i = 0; i < particles.length; ++i) {
		particle = particles[i];
		/// DRAW PARTICLE
		ascii[particle.y][particle.x] = characters[particle.char];
		particle.char -= 1;
		if (particle.char >= 0) {
			new_particles.push(particle);
		}
	}
	/// ADD NEW PARTICLE
	new_particles.push({"x": mouse_x, "y": mouse_y, "char": characters.length - 1});
	/// UPDATE PARTICLE LIST
	particles = new_particles;
}
