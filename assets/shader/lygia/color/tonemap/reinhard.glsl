#include "../luminance.glsl"

/*
original_author: [Erik Reinhard, Michael Stark, Peter Shirley, James Ferwerda]
description: Photographic Tone Reproduction for Digital Images. http://www.cmap.polytechnique.fr/~peyre/cours/x2005signal/hdr_photographic.pdf
use: <vec3|vec4> tonemapReinhard(<vec3|vec4> x)
*/

#ifndef FNC_TONEMAPREINHARD
#define FNC_TONEMAPREINHARD
vec3 tonemapReinhard(const vec3 v) { return v / (1.0 + luminance(v)); }
vec4 tonemapReinhard(const vec4 v) { return vec4( tonemapReinhard(v.rgb), v.a ); }
#endif