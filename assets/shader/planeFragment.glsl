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
uniform float uAppear;
uniform float uReduceScaling;
uniform float uVerticalTranslation;

varying vec2 vUv;
varying vec4 vWorldPos;

#include "lygia/generative/cnoise.glsl";

float map(float value,float min1,float max1,float min2,float max2){
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

float verticalOffsetFromCenter=.5;
float maxScaleY=.4;

float minScaleY=3.8;
float verticalTranslation=.5;

vec4 typo(){
    
    vec2 resolution=vec2(gl_FragCoord.xy/vUv.xy);
    
    float textureAspect=uImageSizes.x/uImageSizes.y;
    float frameAspect=uResolution.x/uResolution.y;
    float textureFrameRatio=textureAspect/frameAspect;
    
    // Gutter is 120px , to have it in shader space we're doing 120/window.innerWidth
    float gutter=uTextGutter/uResolution.x;
    
    vec2 textureScale=vec2(1.,textureFrameRatio);
    textureScale=textureScale*(1.+gutter);
    
    vec2 uv=textureScale*(vUv-.5)+.5;
    
    float verticalOffset=textureFrameRatio*verticalOffsetFromCenter;
    uv.y=uv.y-verticalOffset+.5;
    
    uv.y-=mix(0.,verticalTranslation,uVerticalTranslation);
    
    // // Making Y going from 0->1 to -1->1 so we can scale it from top and bottom at the same time
    // // If we don't make it it'll be scaled only from top
    // float verticalPosition=(uv.y-.5)*2.;
    // // Offseting the position so the top stay at the top
    // float beforeAppearingScaleY=verticalPosition*maxScaleY+.5;
    // // Going back to 0->1 because that what the texture needs
    // beforeAppearingScaleY=(beforeAppearingScaleY+1.)*.5;
    
    // Making Y going from 0->1 to 1->0 so we can scale it from top
    // If we don't make it it'll be scaled only from bottom
    float verticalPosition=1.-uv.y;
    // Offseting the position so the top stay at the top
    float compressedScaleY=verticalPosition*minScaleY;
    // Going back to 0->1 because that what the texture needs
    compressedScaleY=(compressedScaleY-1.)*-1.;
    
    float currentScaleY=mix(compressedScaleY,uv.y,uReduceScaling);
    
    uv=vec2(uv.x,currentScaleY);
    vec4 color=texture2D(tMap,uv);
    
    float opacity=min(mix(uv.y-1.,uv.y+1.,uAppear),color.a);
    // color.a=opacity;
    
    return color;
    
}

vec4 noiseTexture(){
    
    float noise=cnoise(vec3(gl_FragCoord.y/400.,gl_FragCoord.x/400.,uTime/30.));
    
    float noiseClamped=map(noise,1.,0.,1.,.6)+.25;
    
    vec4 noiseTexture=vec4(noiseClamped,noiseClamped,noiseClamped,1.);
    
    return noiseTexture;
}

void main(){
    
    vec4 noise=noiseTexture();
    vec4 color=typo();
    
    gl_FragColor=mix(noise,color,color.a);
    
}

