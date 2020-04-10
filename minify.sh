#!/usr/bin/env bash
############################### BY GIBBONJOYEUX ################################


borders='BOX_BORDERS=[" \\u2500\\u2502\\u250C\\u2510\\u2514\\u2518\\u251C\\u2524\\u2534\\u252C\\u253C"," \\u2550\\u2551\\u2554\\u2557\\u255A\\u255D\\u2560\\u2563\\u2569\\u2566\\u256C"," \\u2588\\u2588\\u2588\\u2588\\u2588\\u2588\\u2588\\u2588\\u2588\\u2588\\u2588"]'

curl \
	-X POST \
	-s \
	--data-urlencode 'input@ascii.js' \
	https://javascript-minifier.com/raw \
	| sed -E 's/BOX_BORDERS=\[(".{12}",)*".{12}"]/'"${borders}/" \
	> ascii.min.js
