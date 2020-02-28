# lib-ascii

## About

This is a javascript library that aims to help artists and developers create
light weight ascii (text only) creative coding sketches or websites.

## Learn

### Use it

Once you got the ascii.js file, you just have to link it into your HTML page.
Just like any other javascript library.
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
Here's 
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
	line(0, 0, canvas_width - 1, canvas_height - 1);
}
```

In this example, `draw()` will draw a diagonal line, from the top left border to
the bottom right one.

### Variables

The Asci lib provides user some environment variables.

- ascii
- canvas_width
- canvas_height
- layer_width
- layer_height
- mouse_x
- mouse_y
- touches
- char_width
- char_height

#### ascii

`ascii` is the most important variable. It is the character array that will be
printed on screen. It is two dimentional array (x and y). You can access it
like `ascii[y][x]`.

#### canvas_width + canvas_height

The canvas format in characters, the limits of the `ascii` array.

#### layer_width + layer_height

These act like `canvas_width` and `canvas_height` but for the layer in use
(which can also be `ascii`).

#### mouse_x + mouse_y

The cursor coordinates on the canvas.

#### touches

A list which contains current touch points and their coordinates.

#### char_width + char_height

The characters format in pixel.

### Functions

- create_canvas([width[, height]])
- resize_canvas([width[, height]])

- no_loop()
- loop()

- clear()
- background(character)
- fill(x, y, character)

- create_layer()
- set_layer([layer])
- draw_layer(layer)

- line(x0, y0, x1, y1[, character])
- set_line_char([character])

- line_func(x0, y0, x1, y1, function)

- rect(x, y, width, height[, characters])
- set_rect_border([characters])
- set_rect_mode([mode])

- shape(x, y, rw, rh, vertices, character[, linked[, offset]])

- border(char)

- text(string, x, y[, width])
- set_text_mode([mode])
- set_text_wrap([wrap_mode])
- set_text_align([align_mode])

- random([max]) || random(from, to) || random(list)

#### Minor

- is_int(x)
- is_float(x)
- is_array(x)
- round(x)
- floor(x)
- ceil(x)
- rand()
- abs(x)
- min(x, y[, z[, ... n]])
- max(x, y[, z[, ... n]])
- cos(x)
- sin(x)
- acos(x)
- asin(x)
- acosh(x)
- asinh(x)
- atan(x)
- atan2(y, x)
- atanh(x)
- cbrt(x)
- exp(x)
- log(x)
- pow(x)
- sqrt(x)
- tan(x)
- tanh(x)
- trunc(x)

#### Event functions

- mouse_clicked()
- mouse_double_clicked()
- mouse_down()
- mouse_up()
- mouse_move()

- key_down()
- key_up()
- key_pressed()

- touch_start()
- touch_end()
- touch_move()

- window_resized()

### Classes

- Link(x, y, width, height) || Link(x, y, string)
