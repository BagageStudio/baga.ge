#version 300 es
precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uResolution;
uniform float uTextGutter;
uniform vec2 uPlaneSizes;
uniform vec2 uCurrentTypoSize;
uniform sampler2D tMap;

uniform float uTime;
uniform float uAppearNoiseOpacity;
uniform float uAppearTypoOpacity;
uniform float uAppearTypoScale;
uniform float uReduceScaling;
uniform float uVerticalTranslation;
uniform float uScrollOut;
uniform float uBottomMask;

uniform float uNoiseThreshold;
uniform float uNoisePower;

in vec2 vUv;

out vec4 FragData[3];

#include "lygia/generative/cnoise.glsl";

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

// 60px from the top of thw viewport
float topOffset=60.;

// TODO: The translation should be the number of pixels scrolled and depending of the viewport width, but not of viewport height !
float scrollOutVerticalTranslation=1.2;
float scrollOutScale=.7;

vec4 typo(){
    
    vec2 uv=vUv;
    vec2 resolution=vec2(gl_FragCoord.xy/vUv.xy);
    
    // /** ----- TOP OFFSET ------- */
    float normalizedTopOffset=mix(topOffset/uResolution.y,0.,uScrollOut);
    uv.y=uv.y+normalizedTopOffset;
    
    /** ----- COVER ------- */
    // To make a object-fit cover, we know the image will be landscape so only the y dimension will need to be reduced
    // We calculate the ratio to reduce vertically
    float textureAspect=uImageSizes.x/uImageSizes.y;
    float frameAspect=uResolution.x/uResolution.y;
    float textureFrameRatio=textureAspect/frameAspect;
    vec2 textureScale=vec2(1.,textureFrameRatio);
    
    
    // We want the text to be at the top, so we apply the ratio when y in 0 -> 1 (it's 1 -> 0 by default).
    // Later we will go back to 1 -> 0, because the next transform will also need 0-> 1
    uv.y=(uv.y-1.)*-1.;
    float finalScale =uv.y*textureScale.y;
    
    uv.y=mix(uv.y, finalScale, uAppearTypoScale);
    
    /** ----- GUTTER ------- */
    
    // Gutter is 120px , to have it in shader space we're doing 120/window.innerWidth
    float gutter=uTextGutter/uResolution.x;
    // Reducing the X scale with the gutter
    uv=uv*(1.+gutter);
    // Offseting to the right so the text in centered horizontally
    uv.x-=gutter/2.;
    
    // Back to 1->0 vertically
    uv.y=(uv.y-1.)*-1.;
    
    /** ----- SCROLL ANIMATION ------- */
    
    float typoMaxVerticalTranslation=1.;
    // Vertical translation on scroll
    uv.y-=mix(0.,1.,uScrollOut);
    
    // Scale on scroll, we center the horizontal origin point and then reset it
    uv.x=(uv.x-.5)*2.;
    uv=uv*mix(1.,scrollOutScale,uScrollOut);
    uv.x=(uv.x+1.)*.5;
    
    vec4 color=texture(tMap,uv);
    float opacity=mix(color.a,mix(color.a,.4,uScrollOut),color.a);
    color.a=opacity;
    
    return color;
    
}

vec4 noiseTexture(){
    
    float noise=cnoise(vec3(gl_FragCoord.y/300.,gl_FragCoord.x/600.,(uTime+100.)/30.));
    noise=map(noise,-1.,1.,1.,-1.);
    
    float noiseClamped=map(noise,-1.,1.,0.,.55)-.27;
    
    noiseClamped=clamp(noiseClamped,0.,1.);
    
    vec4 noiseTexture=vec4(noiseClamped,noiseClamped,noiseClamped,1.);
    
    return noiseTexture;
}

float bottomTextMaskTexture(){
    
    float offset=200./uResolution.y*(1.-uBottomMask);
    float heightOfMask=max(50./uResolution.y-offset,0.);
    float heightOfGradient=max(150./uResolution.y-offset,0.);
    
    // Only gradient mask
    float line=smoothstep(heightOfMask,heightOfGradient+heightOfMask,vUv.y);
    // Only full mask
    // float line=step(heightOfMask,vUv.y);
    // Both at the same time
    // float line=min(step(heightOfMask,vUv.y),smoothstep(heightOfMask,heightOfGradient,vUv.y));
    line=1.-line;
    return line;
}

void main(){
    
    vec4 fragColor=vec4(0.,0.,0.,0.);
    
    vec4 noise=noiseTexture();
    noise.a=mix(0.,noise.a,uAppearNoiseOpacity);
    vec4 typo=typo();
    typo.a=mix(0.,typo.a,uAppearTypoOpacity);
    
    float bottomTextMask=bottomTextMaskTexture();
    
    // fragColor+=max(noise,typo);
    // fragColor+=typo;
    fragColor=mix(noise,typo,typo.a);
    // fragColor+=typo;
    
    fragColor=mix(fragColor,vec4(0.,0.,0.,0.),bottomTextMask);
    
    FragData[0]=fragColor;
    FragData[1]=vec4(0.);
    FragData[2]=vec4(0.,0.,1.,1.);
    
}

