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
		- [About layers](#About-layers)
		- [About masks](#About-masks)
		- [About color layers](#About-color-layers)
		- [Make the canvas responsive](#Make-the-canvas-responsive)
		- [Put the canvas into another dom element](#Put-the-canvas-into-another-dom-element)
		- [Set the ascii environment into an object](#Set-the-ascii-environment-into-an-object)
		- [Create multiple canvas](#Create-multiple-canvas)
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
characters (see [Understand canvas format](#Understand-canvas-format) for
adaptative dimensions).

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

#### Understand ascii array

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

### About layers

Layers are canvas like arrays which are not automatically printed to screen.
You can draw on them exactly like if it was the main canvas. They can be useful
in multiple cases.

Like printing text to a layer which won't be modified next and easily print it
at each `draw()` iteration without any more text calculation.

Or to handle different plans, a layer handling, for example, the background and
an other one, the foreground.

By default, a layer gets the canvas dimensions but it's dimensions can also be
passed (smaller or even bigger than the main canvas).

To create a layer, you need to call the `create_layer()` function (see
[create_layer](#create_layer)) which will returns the layer (a 2D array like
the main canvas). You can draw yourself on it by indexing it like so
`layer[y][x] = '#';`. To use drawing functions on it, you can use `set_layer()`
(see [set_layer](#set_layer)) which will set the passed layer as drawing layer
(canvas being considered just like a layer). Once you drawn on the layer, to
draw it, you first need to reput the main canvas as drawing layer by calling
`set_layer()` without any parameter. Then, you will be able to use
`draw_layer()` (see [draw_layer](#draw_layer)). This function draws a layer on
an other one (or on the main canvas, depending on the the current drawing
layer).

Ascii provides `canvas_width` and `canvas_height` like environment variables
when `set_layer()` is used. These are `layer_width` and `layer_height` (see
[layer_width & layer_height](#layer_width--layer_height)) which are set to give
you the active layer dimensions (giving the canvas dimensions if it is the
active layer).

See:
- [create_layer](#create_layer)
- [set_layer](#set_layer)
- [draw_layer](#draw_layer)
- [layer_width & layer_height](#layer_width--layer_height)

### About masks

Masks are special layers on which you can draw exactly like regular ones. The
interesting fact about masks is that when they are put on the canvas or on
layers, empty areas of the mask (space characters: ' ') will erase the same
areas on the active layer. whereas whatever characters are drawn on the mask, if
they are not spaces, they will not have any effect on the layer.

This can be used, for example, to hide everything on the screen and make appears
it's content when the mouse hovers it (with a specific radius).
To do so, you would have to draw a filled circle (see [shape](#shape) and
[fill](#fill)) on a clear mask at the mouse position (with the radius you
desire) and then put the mask on the layer (or canvas) you drawn your graphics
on.

To create a mask, you need to call the `create_mask()` function (see
[create_mask](#create_mask)) which will return the mask (a 2D array like the
main canvas or a layer). You can then draw whatever you want on it, using
indexation `mask[y][x] = '?';` or `set_layer()` (see [set_layer](#set_layer))
which works on mask and will allow you to use drawing functions on it.
Then, once the mask is finished, to put it to the canvas (or layer), you will
have to use `set_layer()` to set the active layer and `put_mask()` (see
[put_mask](#put_mask)).

Technically, mask layers are created exactly the same way regular ones are. So
regular layers can be used with `put_mask()` too.

See:
- [create_mask](#create_mask)
- [put_mask](#put_mask)

### About color layers

A color layer can be used to easily color the canvas. To create it, use
`create_color_layer()` (see [create_color_layer](#create_color_layer)) which
will return the layer. The color layer can be indexed just like the canvas or a
regular layer, but instead of characters, cells contain a small array holdind a
background and a foreground value (set to `null` by default). To set a color,
you simply need to put a color string into this small array at the desired cell.
Index the cell at `0` for background and `1` for foreground.
Color strings can be formated like with CSS.

```javascript
/// Change background color
color_layer[y0][x0][0] = "red";
/// Change foreground color
color_layer[y1][x1][1] = "#ff00ff";
```

Once you modified the color layer, you need to set it with `set_color()` (see
[set_color](#set_color)) (once the color layer set, you still can modify it's
content). The color will be printed at the end of the `draw()` function.

It is important to notice that drawing with a lot of differents colors can have
a significant impact on performances.

See:
- [create_color_layer](#create_color_layer)
- [set_color](#set_color)
- [clear_color](#clear_color_layer)

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

- Base
	- [create_ascii](#create_ascii)
	- [no_loop](#no_loop)
	- [loop](#loop)
- Canvas (see [Introduction](#Introduction))
	- [create_canvas](#create_canvas)
	- [resize_canvas](#resize_canvas)
- Layers (see [About layers](#About-layers))
	- [create_layer](#create_layer)
	- [set_layer](#set_layer)
	- [draw_layer](#draw_layer)
- Masks (see [About masks](#About-masks))
	- [create_mask](#create_mask)
	- [put_mask](#put_mask)
- Color layers (see [About color layers](#About-color-layers))
	- [create_color_layer](#create_color_layer)
	- [set_color](#set_color)
	- [clear_color_layer](#clear_color_layer)

#### create_ascii

```javascript
> create_ascii(object);
```

This function should be used to put the ascii environment into a passed object
instead of into the `window`.

See [Set the ascii environment into an object](#Set-the-ascii-environment-into-an-object)
for an example.

#### no_loop

```javascript
> no_loop();
```

#### loop

```javascript
> loop();
```

#### create_canvas

```javascript
> create_canvas();
> create_canvas(width, height);
> create_canvas(mother_dom);
> create_canvas("mother_dom_id");
> create_canvas(width, height, mother_dom);
> create_canvas(width, height, "mother_dom_id");
```

This function, which should be used into the `setup()` function, creates the
main ascii canvas. `width` and `height` can be passed in term of characters
to dimension the canvas. If a dimension is not passed (or passed as `null`),
this dimension will adapt to fill the mother dom element. In this way, if no
dimension is passed, the canvas will adapt on both dimensions.

By default, the canvas is put at the end of the `body` element. But the mother
element can be passed as the 3rd parameter, after both dimensions or as
the only one, setting dimensions to their default values.
In both cases, the dom can be passed directly (as an element) or as a string
(corresponding dom id).

#### resize_canvas

```javascript
> resize_canvas();
> resize_canvas(width, height);
```
This function resizes the main ascii canvas. Dimensions work just like with the
`create_canvas()` function.

#### create_layer

```javascript
> create_layer();
> create_layer(width, height);

return layer
```
This function creates a new layer. If a dimension is not passed (or passed as
`null`), it will take the canvas corresponding dimension. In that way, if no
dimension is passed, the layer will take the main canvas dimensions.

See [About layers](#About-layers)

#### set_layer

```javascript
> set_layer();
> set_layer(layer);
```
This function set the active layer. The active layer (which, by default, is the
main canvas) is the layer on which drawing functions will apply (`line()`,
`rect()`, `shape()`, `clear()`, etc).

See [About layers](#About-layers)

#### draw_layer

```javascript
> draw_layer(layer);
> draw_layer(layer, x, y);
```
This function draws the passed layer to the active one (the main canvas by
default). `x` and `y` can be passed (positive and negative values are allowed)
to offset the canvas.

See [About layers](#About-layers)

#### create_mask

```javascript
> create_mask();
> create_mask(width, height);

return mask
```
This function creates a new mask layer. If a dimension is not passed (or passed
as `null`), it will take the canvas corresponding dimension. In that way, if no
dimension is passed, the layer will take the main canvas dimensions.

Technically, mask layers are created exactly the same way regular ones are. So
regular layers can be used with `put_mask()` too.

See [About masks](#About-masks)

#### put_mask

```javascript
> put_mask(mask);
> put_mask(mask, x, y);
> put_mask(mask, x, y, invert);
```
This function put the mask to the active layer. This will erase empty areas of
the mask on the active layer. `x` and `y` can be passed (positive and negative
values are allowed) to offset the canvas. `invert` is a boolean varible which
is set to `false` by default. When it is set true, the mask effects are
inverted, in this way, non empty areas of the mask will erase characters of the
layer.

See [About masks](#About-masks)

#### create_color_layer

```javascript
> create_color_layer();

return layer
```
This function creates a new color layer. The color layer will automatically take
the main canvas dimensions. Cells of the color layers are made of small arrays
holding 2 color strings, a background and a foreground which are, by default,
set to `null`.

See [About color layers](#About-color-layers)

#### set_color

```javascript
> set_color();
> set_color(color_layer);
```
This function will set the passed color layer as coloring layer of the main
canvas. To reset the coloring layer of the main canvas, `set_color()` must be
used without any parameter.

See [About color layers](#About-color-layers)

#### clear_color_layer

```javascript
> clear_color_layer(color_layer);
```
This function resets the passed color layer, putting `null` in each color
string.

See [About color layers](#About-color-layers)



### Drawing functions

- base
	- clear
	- background
- line
	- line
	- set_line_char
	- line_func
- rectangle
	- rect
	- set_rect_border
	- set_rect_mode
- text
	- text(string, x, y[, width]) -> return [x, y]
	- set_text_mode([mode])
	- set_text_align([align_mode])
	- set_text_wrap([wrap_mode])
- other
	- shape(x, y, rw, rh, vertices, character[, linked[, offset]])
	- fill(x, y, character)
	- border(char)
	- set_draw_mode([mode])

#### clear

```javascript
> clear();
```
Clear the active layer by putting space characters at each cell.

#### background

```javascript
> background(character);
```
Put the passed charater at each cell of the active layer.

#### line

```javascript
> line(x0, y0, x1, y1);
> line(x0, y0, x1, y1, character);
```
Draw a line from `[x0, y0]` to `[x1, y1]` on the active layer with the passed
character. If no character is passed, `line()` will use the set line character
(see [set_line_char](#set_line_char)).

#### set_line_char

```javascript
> set_line_char();
> set_line_char(character);
```
Set the `line()` character. Next calls of `line()` will use this character if
not passed into `line()` itself.

Calling `set_line_char()` without any parameter resets the `line()` character to
it's default value.

#### line_func

```javascript
> line_func(x0, y0, x1, y1, function);
```
Call the passed function for each point of the line formed by `[x0, y0]` and
`[x1, y1]`. The called function takes 3 parameters, `x` and `y` coordinates
of the current point and a boolean variable which is set to `true` when the
coordinates are inside the active layer.

Here is an example of a function passed to `line_func()`:
```javascript
function	(x, y, is_on_layer) {
	if (is_on_layer == true) {
		my_layer[y][x] = '#';
	}
}
```

#### rect

```javascript
> rect(x, y, width, height);
> rect(x, y, width, height, border);
```
Draw a rectangle on the active layer. `x`, `y`, `width` and `height` are passed
to position and dimension the rectangle. A `border` string can be passed to
style the rectangle. Here is how the border string works:
```
with "012345678"
0: top-left corn
1: top side
2: top-right corner
3: left side
4: center
5: right side
6: botton-left corner
7: bottom side
8: bottom-right corner
```
The border string can also be set through `set_rect_border()` (see
[set_rect_border](#set_rect_border)).
By default, the top-left corner of the rectangle is placed at the passed
coordinates, but it can also be placed differently via `set_rect_mode()` (see
[set_rect_mode](#set_rect_mode)).

#### set_rect_border

```javascript
> set_rect_border();
> set_rect_border(characters);
```
Set the `rect()` border string. Next calls of `rect()` will automatically use
this string if not passed into `rect()` itself.

Calling `set_rect_border()` without any parameter resets the `rect()` border
string to it's default value.

#### set_rect_mode

```javascript
> set_rect_mode();
> set_rect_mode(mode);
```
Set the `rect()` placement mode. By default, the top-left corner of the drawn
rectangle is placed at the passed cordinates.

Calling `set_rect_rect()` without any parameter resets the `rect()` border
string to it's default value.

Modes:
- `RECT_CORNER` Default value, passed coordinates are used for the top-left corner.
- `RECT_CENTER` Passed coordinates are used for the center of the rectangle.

#### text

```javascript
> text(string, x, y);
> text(string, x, y, paragraph_width);
```

#### set_text_mode

```javascript
> set_text_mode();
> set_text_mode(mode);
```

#### set_text_align

```javascript
> set_text_align();
> set_text_align(align_mode);
```

#### set_text_wrap

```javascript
> set_text_wrap();
> set_text_wrap(wrap_mode);
```


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
