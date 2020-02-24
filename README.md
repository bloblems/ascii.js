# lib-ascii

## About

This is a javascript library that aims to help artists and developers create ascii (text only) creative coding sketches.

## Learn

### Use it

Once you got the ascii.js file, you just have to link it into your HTML page. Just like any other javascript library.
Here's an exemple:
```html
<html>
	<head>
		<script src="../ascii.js"></script>
		<script src="sketch.js"></script>
	</head>
	<body>
	</body>
</html>
```

### Base

Here's the ascii library base:
```javascript
function	setup() {
}

function	draw() {
}
```

#### step()

The `setup()` function is called once when the page's loading is done. Then,
the function `draw()` is called at each frame.

The `setup()` function is where you create the main canvas. You can also
initialize variables you will need later.

To create the canvas, you will need to `create_canvas()` function.
It can take parameters but the simplest way to use it is without any parameter.

```javascript
function	setup() {
	create_canvas();
}
```

#### draw()

The `draw()` function is called each frame. This is where you put the drawing
part of your code.

Here's a small example:

```javascript
function	draw() {
	line(0, 0, canvas_width, canvas_height);
}
```

In this example, `draw()` will draw a diagonal line, from the top left border to
the bottom right one.

### Variables

The Asci lib provides user some basic variables.

- ascii
- canvas_width
- canvas_height
- char_width
- char_height
- mouse_x
- mouse_y

### Functions

- create_canvas([width, height]);


- no_loop();
- loop();


- clear();
- fill();


- create_layer();
- set_layer([layer]);
- draw_layer(layer);


- line(x0, y0, x1, y1[, character]);
- set_line_char([character]);


- line_func(x0, y0, x1, y1, function);


- rect(x, y, width, height[, characters]);
- set_rect_border([characters]);
- set_rect_mode([mode]);


- border(char);


- text(string, x, y[, is_vertical]);
- set_text_wrap([wrap_mode]);
- set_text_mode([mode]);
