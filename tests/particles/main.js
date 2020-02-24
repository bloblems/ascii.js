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

let		prev_x, prev_y;
let		particles;

////////////////////////////////////////////////////////////////////////////////
/// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function	setup() {
	create_canvas();
	particles = [];
	prev_x = prev_y = 0;
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
	/// ADD NEW PARTICLES
	line_func(prev_x, prev_y, mouse_x, mouse_y, function (x, y, in_frame) {
		if (in_frame == true) {
			new_particles.push({"x": x, "y": y, "char": characters.length - 1});
		}
	});
	prev_x = mouse_x;
	prev_y = mouse_y;
	/// UPDATE PARTICLE LIST
	particles = new_particles;
}
