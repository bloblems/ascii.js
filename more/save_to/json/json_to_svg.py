#!/usr/bin/env python3
############################### BY GIBBONJOYEUX ################################ 

################################################################################
### MODULES
################################################################################

import  sys
import  json
import  os

################################################################################
### DATA
################################################################################

SVG_HEADER              = "<svg viewBox=\"0 0 {} {}\" xmlns=\"http://www.w3.org/2000/svg\">\n"
SVG_FOOTER              = "</svg>"
SVG_BACKGROUND          = "\t<rect width=\"100%\" height=\"100%\" fill=\"{}\"/>\n"
SVG_CONTAINER_HEADER    = "\t<text style='font-size:{};font-family:{};stroke:{};white-space:pre;'>\n"
SVG_CONTAINER_FOOTER    = "\t</text>\n"
SVG_LINE                = "\t\t<tspan x=\"0\" y=\"{}\">{}</tspan>\n"

################################################################################
### FUNCTIONS
################################################################################

################################################################################
### MAIN
################################################################################

### HANDLE PARAMETERS
if len(sys.argv) != 3:
    print("ERROR: require a .json file and an output directory")
    sys.exit(1)

### HANDLE OUTPUT DIRECTORY
if os.path.exists(sys.argv[2]):
    if os.path.isdir(sys.argv[2]):
        print("ERROR: output directory is not a directory")
        sys.exit(1)
else:
    os.mkdir(sys.argv[2])

### CREATE FILES
with open(sys.argv[1]) as json_file:
    ### GET DATA
    json_data = json.load(json_file);
    width = json_data["width"]
    height = json_data["height"]
    char_width = json_data["char_width"]
    char_height = json_data["char_height"]
    font_size = json_data["font_size"]
    font_family = json_data["font_family"]
    font_color = json_data["font_color"]
    back_color = json_data["back_color"]
    frames = json_data["frames"]
    ### CREATE FILES
    i = 0
    for frame in frames:
        content = SVG_HEADER.format(width * char_width, height * char_height)
        content += SVG_BACKGROUND.format(back_color)
        content += SVG_CONTAINER_HEADER.format(font_size, font_family, font_color)
        #content += SVG_CONTAINER_HEADER.format(font_size, "Courier New", "black")
        y = 0
        for line in frame:
            content += SVG_LINE.format(char_height / 2 + y * char_height, line)
            y += 1
        content += SVG_CONTAINER_FOOTER + SVG_FOOTER
        with open("{}/{}.svg".format(sys.argv[2], i), "w") as output:
            output.write(content)
        i += 1
