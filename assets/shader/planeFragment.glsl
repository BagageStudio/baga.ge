precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uResolution;
uniform float uTextGutter;
uniform vec2 uPlaneSizes;
uniform sampler2D tMap;

uniform vec3 uColor;
uniform float uTime;
uniform float pixelated;
uniform float pixelation;
uniform float dithered;
uniform float pixelRatio;
uniform float uAppearNoiseOpacity;
uniform float uAppearTypoOpacity;
uniform float uAppearTypoScale;
uniform float uReduceScaling;
uniform float uVerticalTranslation;
uniform float uScrollOut;
uniform float uBottomMask;

varying vec2 vUv;
varying vec4 vWorldPos;

#include "lygia/generative/cnoise.glsl";

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

// float verticalOffsetFromCenter=.5;
// float maxScaleY=.4;
// float minScaleY=3.8;
// float verticalTranslation=1.;

// 60px from the top of thw viewport
float topOffset=60.;

// TODO: The translation should be the number of pixels scrolled and depending of the viewport width, but not of viewport height !
float scrollOutVerticalTranslation=1.2;
float scrollOutScale=.7;

vec4 typo(){
    
    vec2 uv=vUv;
    vec2 resolution=vec2(gl_FragCoord.xy/vUv.xy);
    
    // /** ----- TOP OFFSET ------- */
    float normalizedTopOffset=topOffset/uResolution.y;
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
    
    /** ----- APPEAR ANIMATION ------- */
    
    
    
    
    /** ----- SCROLL ANIMATION ------- */
    
    // Vertical translation on scroll
    uv.y-=mix(0.,scrollOutVerticalTranslation,uScrollOut);
    
    // Scale on scroll, we center the horizontal origin point and then reset it
    uv.x=(uv.x-.5)*2.;
    uv=uv*mix(1.,scrollOutScale,uScrollOut);
    uv.x=(uv.x+1.)*.5;
    
    /** ----- OLD STUFF JUST IN CASE ------- */
    
    // // Making Y going from 0->1 to -1->1 so we can scale it from top and bottom at the same time
    // // If we don't make it it'll be scaled only from top
    // float verticalPosition=(uv.y-.5)*2.;
    // // Offseting the position so the top stay at the top
    // float beforeAppearingScaleY=verticalPosition*maxScaleY+.5;
    // // Going back to 0->1 because that what the texture needs
    // beforeAppearingScaleY=(beforeAppearingScaleY+1.)*.5;
    
    // // Making Y going from 0->1 to 1->0 so we can scale it from top
    // // If we don't make it it'll be scaled only from bottom
    // float verticalPosition=1.-uv.y;
    // // Offseting the position so the top stay at the top
    // float compressedScaleY=verticalPosition*minScaleY;
    // // Going back to 0->1 because that what the texture needs
    // compressedScaleY=(compressedScaleY-1.)*-1.;
    // float currentScaleY=mix(compressedScaleY,uv.y,uReduceScaling);
    // uv=vec2(uv.x,currentScaleY);
    
    // vec2 division=resolution/100.;
    // vec2 d=1./division;
    // vec2 pixelizedUV=d*(floor(uv/d)+.5);
    // uv=mix(uv,pixelizedUV,uScrollOut);
    
    // float opacity=min(mix(uv.y-1.,uv.y+1.,uAppear),color.a);
    
    vec4 color=texture2D(tMap,uv);
    float opacity=mix(color.a,mix(color.a,.4,uScrollOut),color.a);
    color.a=opacity;
    
    return color;
    
}

vec4 noiseTexture(){
    
    float noise=cnoise(vec3(gl_FragCoord.y/300.,gl_FragCoord.x/600.,(uTime+100.)/30.));
    
    float noiseClamped=map(noise,0.,1.,.7,1.)+.25;
    
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
    return line;
}

void main(){
    
    vec4 noise=noiseTexture();
    noise.a=mix(0.,noise.a,uAppearNoiseOpacity);
    vec4 typo=typo();
    typo.a=mix(0.,typo.a,uAppearTypoOpacity);
    
    gl_FragColor=mix(noise,typo,typo.a);
    
    float bottomTextMask=bottomTextMaskTexture();
    gl_FragColor.a=gl_FragColor.a*bottomTextMask;
    
    // vec2 uv=vUv;
    // uv.y=(uv.y-1.)*-1.;
    // float normalizedTopOffset=topOffset/uResolution.y;
    // uv.y=uv.y-normalizedTopOffset;
    
    // gl_FragColor=vec4(uv.y,uv.y,uv.y,1.);
    
}

