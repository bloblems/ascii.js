# lib-ascii

This is a javascript library that aims to help artists and developers easily
create lightweight ascii (text only) creative coding sketches or websites.

## Table of content:

- [How to](#How-to)
	- [Introduction](#Introduction)
		- [Initialize ascii environment](#Initialize-ascii-environment)
		- [Start drawing](#Start-drawing)
		- [Understand canvas format](#Understand-canvas-format)
		- [Choose a font](#Choose-a-font)
	- [Go further](#Go-further)
		- [Make the canvas responsive](#Make-the-canvas-responsive)
		- [Put the canvas into another dom element](#Put-the-canvas-into-another-dom-element)
		- [Set the ascii environment into an object](#Set-the-ascii-environment-into-an-object)
		- [Create multiple canvas](#Create-multiple-canvas)
		- [Use colors](#Use-colors)
	- [Examples](#Examples)
		- simulate collision detection
- [Manual](#Manual)
	- [Environment variables](#Environment-variables)
	- [Functions](#Functions)
		- [Environment functions](#Environment-functions)
		- [Drawing functions](#Drawing-functions)
		- [External functions](#External-functions)
		- [Event functions](#Event-functions)
	- [Classes](#Classes)

# How to

## Introduction

### Initialize ascii environment

To use the library, you got two options. Download the lib and use its file
(which is the simplest way to test it localy) or use the lib's file url.

[ascii.min.js](https://gitlab.com/cactusfluo/lib-ascii/-/raw/release/ascii.min.js)

#### Download

To download the lib, you simply need to open 'ascii.min.js' and download it into
your computer. Once you got the .js file, you add it to your HTML page.

```html
<html>
	<head>
		<!-- Link to Ascii library -->
		<script src="path/to/ascii.js"></script>
		<!-- Link to your code -->
		<script src="sketch.js"></script>
	</head>
	<body>
	</body>
</html>
```

#### Url

Or you can simply insert the library via it's url

```html
<html>
	<head>
		<!-- Link to Ascii library -->
		<script src="https://gitlab.com/cactusfluo/lib-ascii/release/ascii.min.js"></script>
		<!-- Link to your code -->
		<script src="sketch.js"></script>
	</head>
	<body>
	</body>
</html>
```

#### Create a canvas

Once you added the library to your environment, you already can jump to JS !

Your JS main file should follow a simple base, containing these two functions:

```javascript
function	setup() {
}

function	draw() {
}
```

##### setup()

The `setup()` function is called once when the page's loading is done. This is
where you create the main canvas and initialize your own variables for further
use.

You can also draw into `setup()` if your project doesn't need any animation or
if you want to prepare a background which will then be drawn at each frame
(from `draw()`).

To create the canvas, you will need the `create_canvas()` function.
The simplest way to use it is to give the width and height of the canvas in
characters (adaptative width and height are seen here).

```javascript
function	setup() {
	create_canvas(15, 10);
}
```

In this example, the `setup()` function creates a canvas of `15` (width) x `10`
(height) characters.

##### draw()

The `draw()` function is called each frame. This is where you put the drawing
part of your code.

```javascript
function	draw() {
	line(0, 0, canvas_width - 1, canvas_height - 1);
}
```

In this example, `draw()` will draw a diagonal line from the top left border to
the bottom right one (`canvas_width` and `canvas_height` being two environment
variables you can use anytime).

### Start drawing

#### Character array

The `ascii` environment variable allows you to get access to printed characters.
It is a simple 2D array accessible like this `ascii[y][x]`.

Here is an example which draws a '#' character on the screen at the mouse
coordinates:

```javascript
function	setup() {
	/// Create the canvas of 30 x 20
	create_canvas(30, 20);
}

function	draw() {
	/// Clear the canvas background with the '.' character
	background('.');
	/// Put '#' to mouse coordinates
	ascii[mouse_y][mouse_x] = '#';
}
```

#### Moving line

The following example draws a vertical line which moves indefinitely from left
to right:

```javascript
/// Create x
let	x;

function	setup() {
	/// Create the canvas of 30 x 20
	create_canvas(30, 20);
	/// Initialize x
	x = 0;
}

function	draw() {
	/// Clear the canvas (remove previous drawn stuff)
	clear();
	/// Draw a vertical line at x
	line(x, 0, x, canvas_height - 1);
	/// Increment x (go to right)
	x += 1;
	/// Check canvas width limit
	if (x >= canvas_width) {
		/// Restart at 0
		x = 0;
	}
}
```

Here's another example which allows the user to draw with the mouse.

```javascript
function	setup() {
	/// Create the canvas of 30 x 20
	create_canvas(30, 20);
}

function	draw() {
	/// Put a '#' character at mouse position
	ascii[mouse_y][mouse_x] = '#';
}
```

The `ascii` environment variable is an array which gives you access to the
canvas characters. You access it with a `y` index (line) and with a `x` index
(column).

`mouse_x` and `mouse_y` are other environment variables which give you the mouse
coordinates.

### Understand canvas format

By default, the library put the canvas at the end of the `body` dom element but
another dom element can be set as a mother (see [Put the canvas into another dom element](#Put-the-canvas-into-another-dom-ement)).

To style the canvas, you need to style it's mother element (`body` by default).

In CSS, to be sure that the canvas is well synchronised with the other ascii
elements, it is important to set the mother element's `position` attribute to
either `fixed` or `relative`.

#### Make the canvas fill the window

`create_canvas()` does not require any parameter. By default, when a dimension
is not passed or set to `null`, this dimension will try to fill the mother
element. In that way, if you do not pass any dimension to the function, the
canvas will simply fill the mother element. But it is really important to notice
that in the previous cases, the mother must have the unpassed dimensions set
into the CSS (`width`, `height` or both) or it will be set to 1 (minimum of
`width` and `height`).

Here is an example where the canvas will fill the whole window:

```css
body {
	/* Position fixed or relative */
	position:	fixed;
	/* To fill the whole page, avoid margins */
	margin:		0;
	/* width to 100% of the window width */
	width:		100vw;
	/* height to 100% of the window height */
	height:		100vh;
}
```

```javascript
function	setup() {
	/// Create canvas without any parameter means that the canvas will try to
	/// fill the mother element.
	/// alternative: create_canvas(null, null);
	create_canvas();
}

function	draw() {
	/// Draw a rectangle on the whole screen to show that it fills the window.
	rect(0, 0, canvas_width - 1, canvas_height - 1);
}
```

### Choose a font

The easiest way to draw with text is to use monospace fonts.

By default, ascii set the canvas `font-family` property to
`Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace`.
`Courier New` being a monospace font which should be on most platforms.

You can easily change the canvas font with CSS:

```css
.ascii {
	font-family:		Lucida Console, Lucida Sans Typewriter, monaco, Bitstream Vera Sans Mono, monospace;
}
```

## Go further

### Make the canvas responsive

The code example given into the [Make the canvas fill the window](#Make-the-canvas-fill-the-window)
section can be extended to be responsive with the `window_resized()` event
function which is called each time the window is resized and `resize_canvas()`
which simply resizes the canvas created by `create_canvas()`. The dimensions
passed to `resize_canvas()` act just like `create_canvas()` ones. Here, no
dimension is passed to make it fill the mother element.

```javascript
function	setup() {
	/// Create canvas without any dimension means that the canvas will try to
	/// fill the mother element.
	/// alternative: create_canvas(null, null);
	create_canvas();
}

function	draw() {
	/// Draw a rectangle on the whole screen to show that it fills the window.
	rect(0, 0, canvas_width - 1, canvas_height - 1);
}

function	window_resized() {
	/// Resize canvas without any dimension means that the canvas will try to
	/// fill the mother element.
	/// alernative: resize_canvas(null, null);
	resize_canvas();
}
```

### Put the canvas into another dom element

The `create_canvas()` function can take, with the dimensions, an additional
parameter which would be the mother element ID (as string) or the element
itself.
When dimensions are not passed, the mother element can also be passed through
the first parameter.

```javascript
/// Dom ID passed through 3rd parameter as string...
create_canvas(10, 10, "my_dom_id");
/// ...or element itself.
create_canvas(null, null, document.getElementById("my_dom_id"));
/// Dom ID passed through 1st parameter. Dimensions are then set to null.
create_canvas("my_dom_id");
```

### Set the ascii environment into an object

When you do not want to initialize the library directly into the `window`
object, you can use the `create_ascii()` function which takes as parameter an
object which would contains the basic ascii function (such as `setup()` or
`draw()`). Each ascii function should then be called through this object.

Here is an example:
```javascript
/// Create the object
let		obj = {};

/// Create setup() through obj
obj.setup = function() {
	/// Call create_canvas() through obj
	obj.create_canvas();
}

/// Create draw() through obj
obj.draw = function() {
	/// Call rect() through obj
	obj.rect(0, 0, obj.canvas_width - 1, obj.canvas_height - 1);
	/// Here, ascii it used through obj
	/// but not floor which is an external function
	obj.ascii[floor(obj.canvas_width / 2)][floor(obj.canvas_height / 2)] = '#';
}

/// Initialize ascii library into obj
create_ascii(obj);
```

### Create multiple canvas

To create multiple canvas, you need to know how to use the `create_ascii()`
function (see [Set the ascii environment into an object](#Set-the-ascii-environment-into-an-object)).

Creating two canvas requires two environments.

Here is an example which creates two canvas. One for the page's header and an
other for the page's body. These two canvas are responsive.

```javascript
/// Create header and body objects
let		header = {};
let		body = {};

/// Handle header functions

header.setup = function() {
	/// Create the canvas into the dom element "my_header"
	header.create_canvas("my_header");
}

header.draw = function() {
	/// header got it's own canvas_width and canvas_height
	header.rect(0, 0, obj.canvas_width - 1, obj.canvas_height - 1);
}

header.window_resized = function() {
	header.resize_canvas();
}

/// Handle body functions

body.setup = function() {
	/// Create the canvas into the dom element "my_body"
	body.create_canvas("my_body");
}

body.draw = function() {
	/// body got it's own canvas_width and canvas_height
	body.rect(0, 0, obj.canvas_width - 1, obj.canvas_height - 1);
}

body.window_resized = function() {
	body.resize_canvas();
}

/// Create environment for both objects
create_ascii(header);
create_ascii(body);

```

### Use colors

To draw with colors, ascii provides the `create_color_layer()` function which
returns an array of the main canvas dimensions. Colors are set into this layer's
cells. A cell contains a background color and a font color (null by default)
combined into a small array accessible like this `color_layer[y][x][ground]`.

Here is an example:

```javascript
let		color_layer;

/// Create the color layer
color_layer = create_color_layer;
/// Index the layer like the main canvas or a regular layer.
/// As you can see, a 3rd indexation is done.
/// [0] -> background color
color_layer[5][5][0] = "red";
/// [1] -> foreground color
color_layer[5][5][1] = "#ffffff";
```


# Manual

## Environment variables

The Ascii lib provides user some environment variables.

- [ascii](#ascii)
- [canvas_width](#canvas_width--canvas_height)
- [canvas_height](#canvas_width--canvas_height)
- [layer_width](#layer_width--layer_height)
- [layer_height](#layer_width--layer_height)
- [mouse_x](#mouse_x--mouse_y)
- [mouse_y](#mouse_x--mouse_y)
- [touches](#touches)
- [char_width](#char_width--char_height)
- [char_height](#char_width--char_height)

### ascii

`ascii` is the most important variable. It is the character array that will be
printed on screen. It is two dimentional array (x and y). You can access it
like `ascii[y][x]`.

See [Character array](#Character-array) for an example.

### canvas_width + canvas_height

The canvas dimensions in characters, the limits of the `ascii` array.

### layer_width + layer_height

These act like `canvas_width` and `canvas_height` but for the layer in use
(which can also be `ascii`).

### mouse_x + mouse_y

The cursor coordinates on the canvas.

### touches

A list which contains current touch points and their coordinates.

### char_width + char_height

The characters dimensions in pixel.

## Functions

### Environment functions

- create_ascii(object)

- create_canvas([width[, height[, dom]]])
- resize_canvas([width[, height]])

- create_layer() -> return layer
- set_layer([layer])
- draw_layer(layer)

- create_mask() -> return mask
- put_mask(mask[, x, y[, invert]])

- create_color_layer() -> return color layer
- set_color(color_layer)

- no_loop()
- loop()

### Drawing functions

- clear()
- background(character)
- fill(x, y, character)

- line(x0, y0, x1, y1[, character])
- set_line_char([character])

- line_func(x0, y0, x1, y1, function)

- rect(x, y, width, height[, characters])
- set_rect_border([characters])
- set_rect_mode([mode])

- shape(x, y, rw, rh, vertices, character[, linked[, offset]])

- border(char)

- text(string, x, y[, width]) -> return [x, y]
- set_text_mode([mode])
- set_text_wrap([wrap_mode])
- set_text_align([align_mode])

- set_draw_mode([mode])

### External functions

- random([max]) || random(from, to) || random(list)
- shuffle(list[, force])
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

### Event functions

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

## Classes

- Link(url || callback, x, y, string) || Link(url || callback, x, y, width, height)
> - print()
> - move_to(x, y)
> - remove()
> - activate()
