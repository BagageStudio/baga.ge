/*
original_author: Patricio Gonzalez Vivo
description: |
    It center the coordinates from 0 to 1 to -1 to 1
    So the center goes from 0.5 to 0.0. 
use: <float|vec2|vec3> center(<float|vec2|vec3> st)
examples:
    - https://raw.githubusercontent.com/patriciogonzalezvivo/lygia_examples/main/draw_shapes.frag
*/

#ifndef FNC_CENTER
#define FNC_CENTER

float center(float x) { return x * 2.0 - 1.0; }
vec2  center(vec2 v) { return v * 2.0 - 1.0; }
vec3  center(vec3 v) { return v * 2.0 - 1.0; }

#endif