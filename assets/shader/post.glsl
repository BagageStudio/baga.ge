precision highp float;
// Default uniform for previous pass is 'tMap'.
// Can change this using the 'textureUniform' property
// when adding a pass.
uniform sampler2D tMap;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform vec3 uBgColor;
uniform float uTime;
uniform float pixelated;
uniform float pixelation;
uniform float dithered;
uniform float pixelRatio;
varying vec2 vUv;

#include bayer/8x8;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main(){
    
    vec2 res=uResolution;
    
    // PIXELATION
    vec2 p=vUv.st;
    float updatedPixelRatio=pixelRatio*10.+1.;
    float pixelationUpdated=pixelation;
    p.x-=mod(p.x,1./pixelationUpdated*updatedPixelRatio);
    p.y-=mod(p.y,1./pixelationUpdated*res.x/res.y);
    p=mix(vUv,p,pixelated);
    vec4 pixelatedTexture=texture2D(tMap,p);
    
    // BAYER DITHER
    vec4 ditheredTexture=pixelatedTexture;
    
    float bayerDither=dither8x8(gl_FragCoord.xy,ditheredTexture.r);
    
    // Adding color
    float text=1.+(-1.*bayerDither);
    ditheredTexture=vec4(mix(uBgColor,uColor,text),1.);
    
    gl_FragColor=mix(pixelatedTexture,ditheredTexture,dithered);
    
    // gl_FragColor=vec4(p.x,p.y,1.,1.);
}