#version 300 es
precision highp float;

// Default uniform for previous pass is 'tMap'.
// Can change this using the 'textureUniform' property
// when adding a pass.
uniform sampler2D tMap;
uniform vec2 uResolution;
uniform float uTime;

uniform sampler2D uDitherTexture;
uniform float uDitherTextureSize;
uniform float uInversedTexture;

uniform float uDitherType;

uniform float pixelation;
uniform float pixelRatio;
uniform float pixelated;
uniform float dithered;
uniform float uInversedPalette;

uniform sampler2D uDitherPalette;
uniform float uLmRampConstrast;
uniform float uLmRampOffset;

uniform float uCmDistanceFactor;

in vec2 vUv;
out vec4 fragColor;

float colorDistance(vec3 color1,vec3 color2)
{
    return sqrt(distance(color1*color1,color2*color2));
}

vec3 findClosestColorFrom(sampler2D palette,vec3 color){
    ivec2 palette_size=textureSize(palette,0);
    int palette_width=palette_size.x/palette_size.y;
    
    float number_of_colors_in_palette=float(palette_width)-1.;// nb of color boundaries is 1 less than the number of colour bands
    float color_size=1./number_of_colors_in_palette;// the size of one color boundary
    
    // color*=color;
    
    vec3 color_to_use=texture(palette,vec2(.001,.5)).rgb;
    
    for(int i=0;i<(int(palette_width));i++)
    {
        
        float color_to_test_x=color_size*float(i);
        vec3 color_to_test=texture(palette,vec2(color_to_test_x+.0001,.5)).rgb;
        // color_to_test*=color_to_test;
        
        if(colorDistance(color,color_to_test)<colorDistance(color,color_to_use))
        {
            
            color_to_use=color_to_test;
        }
    }
    
    return color_to_use;
    
}

vec3 getDitherPalette(float lum){
    
    // get the palette texture size mapped so it is 1px high (so the x value however many colour bands there are)
    ivec2 palette_size=textureSize(uDitherPalette,0);
    int palette_width=palette_size.x/palette_size.y;
    
    float number_of_colors_in_palette=float(palette_width)-1.;// nb of color boundaries is 1 less than the number of colour bands
    float color_size=1./number_of_colors_in_palette;// the size of one color boundary
    
    float lower_boundary_color=floor(lum*number_of_colors_in_palette)*color_size;
    float upper_boundary_color=(floor(lum*number_of_colors_in_palette)+1.)*color_size;
    float lum_scaled_between_two_boundaries=fract(lum*number_of_colors_in_palette);// calculates where lum lies between the upper and lower bound
    
    return vec3(lower_boundary_color,upper_boundary_color,lum_scaled_between_two_boundaries);
}

vec2 pixelateUV(vec2 startingUv)
{
    vec2 p=startingUv.st;
    float updatedPixelRatio=pixelRatio*10.+1.;
    float pixelationUpdated=pixelation;
    p.x-=mod(p.x,1./pixelationUpdated*updatedPixelRatio);
    p.y-=mod(p.y,1./pixelationUpdated*uResolution.x/uResolution.y);
    p=mix(startingUv,p,pixelated);
    
    return p;
}

vec3 ditherByColorMatching(vec3 color,float threshold){
    vec3 color_attempt=color+threshold*uCmDistanceFactor;
    return findClosestColorFrom(uDitherPalette,color_attempt);
}

vec3 ditherByLuminanceMapping(vec3 color,float threshold){
    
    // calculate pixel luminosity (https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color)
    float lum=(color.r*.299)+(color.g*.587)+(color.b*.114);
    
    // adjust with contrast and offset parameters
    lum=(lum-.5+uLmRampOffset)*uLmRampConstrast+.5;
    lum=clamp(lum,0.,1.);
    
    lum=max(lum-.00001,0.);// makes sure our floor calculation below behaves when lum == 1.0
    
    // adjust the dither slightly so min and max aren't quite at 0.0 and 1.0
    // otherwise we wouldn't get fullly dark and fully light dither patterns at lum 0.0 and 1.0
    threshold=threshold*.99+.005;
    
    // to support multicolour palettes, we want to dither between the two colours on the palette
    // which are adjacent to the current pixel luminosity.
    // to do this, we need to determine which 'band' lum falls into, calculate the upper and lower
    // bound of that band, then later we will use the dither texture to pick either the upper or
    // lower colour.
    
    vec3 ditherPalette=getDitherPalette(lum);
    float lower_boundary_color=ditherPalette.x;
    float upper_boundary_color=ditherPalette.y;
    float lum_scaled_between_two_boundaries=ditherPalette.z;
    
    float boundary_to_use=lum_scaled_between_two_boundaries>threshold?1.:0.;
    
    float x_pos_of_color_to_use=mix(lower_boundary_color,upper_boundary_color,boundary_to_use);
    
    x_pos_of_color_to_use=mix(x_pos_of_color_to_use,1.-x_pos_of_color_to_use,uInversedPalette);// we inverse the color palette if uInversedPalette is at 1.
    
    return texture(uDitherPalette,vec2(x_pos_of_color_to_use,.5)).rgb;
}

void main(){
    
    vec4 pixelatedTexture=texture(tMap,pixelateUV(vUv));
    float threshold=texture(uDitherTexture,mod(gl_FragCoord.xy,uDitherTextureSize)/uDitherTextureSize).r;
    threshold=mix(threshold,1.-threshold,uInversedTexture);
    
    vec3 colorMatchingDithered=ditherByColorMatching(pixelatedTexture.rgb,threshold);
    vec3 luminanceMappingDithered=ditherByLuminanceMapping(pixelatedTexture.rgb,threshold);
    
    vec3 ditherToUse=mix(luminanceMappingDithered,colorMatchingDithered,uDitherType);
    
    // Adding color
    vec4 ditheredColor=vec4(ditherToUse,1.);
    
    fragColor=mix(pixelatedTexture,ditheredColor,dithered);
    
}