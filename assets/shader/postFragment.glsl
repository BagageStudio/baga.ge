#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

uniform sampler2D tPrimaryMap;
uniform sampler2D tSecondaryMap;
uniform sampler2D tDitherType;

uniform sampler2D uPrimaryDitherTexture;
uniform float uPrimaryDitherTextureSize;

uniform sampler2D uSecondaryDitherTexture;
uniform float uSecondaryDitherTextureSize;

uniform float uInversedTexture;

uniform float uPixelation;
uniform float pixelRatio;
uniform float pixelated;
uniform float dithered;
uniform float uInversedPalette;

uniform sampler2D uPrimaryDitherPalette;
uniform sampler2D uSecondaryDitherPalette;
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
    
    vec3 color_to_use=texture(palette,vec2(.001,.5)).rgb;
    
    for(int i=0;i<(int(palette_width));i++)
    {
        
        float color_to_test_x=color_size*float(i);
        vec3 color_to_test=texture(palette,vec2(color_to_test_x+.0001,.5)).rgb;
        
        if(colorDistance(color,color_to_test)<colorDistance(color,color_to_use))
        {
            
            color_to_use=color_to_test;
        }
    }
    
    return color_to_use;
    
}

vec3 getDitherPalette(float lum,sampler2D palette){
    
    // get the palette texture size mapped so it is 1px high (so the x value however many colour bands there are)
    ivec2 palette_size=textureSize(palette,0);
    int palette_width=palette_size.x/palette_size.y;
    
    float number_of_colors_in_palette=float(palette_width)-1.;// nb of color boundaries is 1 less than the number of colour bands
    float color_size=1./number_of_colors_in_palette;// the size of one color boundary
    
    float lower_boundary_color=floor(lum*number_of_colors_in_palette)*color_size;
    float upper_boundary_color=(floor(lum*number_of_colors_in_palette)+1.)*color_size;
    float lum_scaled_between_two_boundaries=fract(lum*number_of_colors_in_palette);// calculates where lum lies between the upper and lower bound
    
    return vec3(lower_boundary_color,upper_boundary_color,lum_scaled_between_two_boundaries);
}

vec2 pixelateUV(vec2 startingUv,float pixelation)
{
    vec2 p=startingUv.st;
    float updatedPixelRatio=pixelRatio*10.+1.;
    float pixelationUpdated=pixelation;
    p.x-=mod(p.x,1./pixelationUpdated*updatedPixelRatio);
    p.y-=mod(p.y,1./pixelationUpdated*uResolution.x/uResolution.y);
    p=mix(startingUv,p,pixelated);
    
    return p;
}

vec3 ditherByColorMatching(vec3 color,float threshold,sampler2D palette){
    vec3 color_attempt=color+threshold*uCmDistanceFactor;
    return findClosestColorFrom(palette,color_attempt);
}

vec3 ditherByLuminanceMapping(vec3 color,float threshold,sampler2D palette){
    
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
    
    vec3 ditherPalette=getDitherPalette(lum,palette);
    float lower_boundary_color=ditherPalette.x;
    float upper_boundary_color=ditherPalette.y;
    float lum_scaled_between_two_boundaries=ditherPalette.z;
    
    float boundary_to_use=lum_scaled_between_two_boundaries>threshold?1.:0.;
    
    float x_pos_of_color_to_use=mix(lower_boundary_color,upper_boundary_color,boundary_to_use);
    
    x_pos_of_color_to_use=mix(x_pos_of_color_to_use,1.-x_pos_of_color_to_use,uInversedPalette);// we inverse the color palette if uInversedPalette is at 1.
    
    return texture(palette,vec2(x_pos_of_color_to_use,.5)).rgb;
}

void main(){
    
    // "primary" === plane and thingies === tPrimaryMap
    // "secondary" === photos === tSecondaryMap
    
    // Primary texture will be more pixelated + luminance dither + primary_pallete + custom_tiles dither matrix
    // Secondary texture will be less pixelated + color matching dither + secondary_pallete + bayer16 dither matrix
    
    // 2 differents pixelisation
    vec2 primary_uv=pixelateUV(vUv,uPixelation);
    vec2 secondary_uv_1=vUv;
    vec2 secondary_uv_2=pixelateUV(vUv,uPixelation);
    
    float imgAppear=0.;
    
    vec2 secondary_uv=mix(secondary_uv_1,secondary_uv_2,imgAppear);
    
    // The mask to use between primary and secondary
    // In this case we take the less pixaleted uv to not have artefacts
    vec4 ditherTypeTexture=texture(tDitherType,secondary_uv);
    float ditherType=ceil(ditherTypeTexture.r);
    
    // 2 differents textures
    // (plane and thingies) vs (photos)
    vec3 primary_pixelatedTexture=texture(tPrimaryMap,primary_uv).rgb;
    vec3 secondary_pixelatedTexture=texture(tSecondaryMap,secondary_uv).rgb;
    
    // 2 differents dither matrix
    // (custom_tiles) vs (bayer16)
    float primary_threshold=texture(uPrimaryDitherTexture,mod(gl_FragCoord.xy,uPrimaryDitherTextureSize)/uPrimaryDitherTextureSize).r;
    primary_threshold=mix(primary_threshold,1.-primary_threshold,uInversedTexture);
    
    float secondary_threshold=texture(uSecondaryDitherTexture,mod(gl_FragCoord.xy,uSecondaryDitherTextureSize)/uSecondaryDitherTextureSize).r;
    secondary_threshold=mix(secondary_threshold,1.-secondary_threshold,uInversedTexture);
    
    // 2 differents dither techniques and palettes
    // (luminance dithering + custom duotone palette) vs (color matching dithering + 16-color EGA palette)
    vec3 primary_dithering=ditherByLuminanceMapping(primary_pixelatedTexture.rgb,primary_threshold,uPrimaryDitherPalette);
    vec3 secondary_dithering_1=ditherByColorMatching(secondary_pixelatedTexture.rgb,secondary_threshold,uSecondaryDitherPalette);
    // vec3 secondary_dithering_2=ditherByColorMatching(secondary_pixelatedTexture.rgb,secondary_threshold,uSecondaryDitherPaletteFirst);
    vec3 secondary_dithering=secondary_dithering_1;
    
    // We use the right effect depending in the mask
    vec3 ditherToUse=mix(primary_dithering,secondary_dithering,ditherType);
    
    // Adding color
    vec4 ditheredColor=vec4(ditherToUse,1.);
    
    fragColor=ditheredColor;
    
}