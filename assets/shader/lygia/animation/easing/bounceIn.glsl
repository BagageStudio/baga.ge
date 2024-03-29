#include "bounceOut.glsl"

/*
original_author: Hugh Kennedy (https://github.com/hughsk)
description: bounce in easing. From https://github.com/stackgl/glsl-easings
use: <float> bounceIn(<float> x)
examples:
    - https://raw.githubusercontent.com/eduardfossas/lygia-study-examples/main/animation/e_EasingBounce.frag
*/

#ifndef FNC_BOUNCEIN
#define FNC_BOUNCEIN
float bounceIn(in float t) { return 1.0 - bounceOut(1.0 - t); }
#endif
