#version 300 es

precision highp float;

uniform float uTime;
uniform float uIndex;
uniform int uType;
uniform float uVelocity;
uniform float uAppearOpacity;
uniform float uAppearRotate;

in vec2 vUv;
out vec4 FragData[3];

float time_factor=.3;

const int number=6;

#define PI 3.14159265359

#include "lygia/animation/easing/quadratic.glsl";
#include "lygia/generative/random.glsl";
#include "lygia/math/rotate2d.glsl";
#include "lygia/animation/easing/back.glsl";
#include "lygia/animation/easing/elastic.glsl";
#include "lygia/sdf/circleSDF.glsl";
#include "lygia/sdf/rectSDF.glsl";
#include "lygia/sdf/polySDF.glsl";
#include "lygia/sdf/starSDF.glsl";
#include "lygia/draw/stroke.glsl";

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.,
    0.,_scale.y);
}

float fill(float sdf,float size){
    return 1.-step(size,sdf);
}

float petal(vec2 uv,int index){
    
    float seed=float(index)+uIndex+.3;
    
    float wiggle=random(seed)*1.2;
    wiggle*=uAppearRotate;
    
    uv-=vec2(.5);
    uv*=scale(vec2(mix(8.,1.,uAppearOpacity)));
    
    // rotation
    uv*=rotate2d((random(seed+2.)-wiggle)*PI);
    
    float floating_speed=4.;
    float floating_strength=.1;
    
    float floating=cos((uTime-float(index)*.15)*floating_speed)*floating_strength;
    floating=mix(0.,floating,uVelocity);
    
    uv*=rotate2d(floating*PI);
    
    // move it back to the original place
    uv+=vec2(.5);
    float shape;
    if(uType==1){
        
        float size=float(index+1)/float(number)*.5;
        shape=fill(starSDF(uv,7,.04),size);
    }else if(uType==2){
        
        float size=float(index+1)/float(number)*.5;
        shape=fill(polySDF(uv,4),size);
    }else if(uType==3){
        float size=float(index+1)/float(number)*.36;
        shape=fill(starSDF(uv,5,.06),size);
        
    }
    
    return shape;
}

void main(){
    vec4 color=vec4(0.);
    vec2 uv=vUv;
    
    for(int i=0;i<number+1;i++){
        float delay=float(i)*.05;
        float appear=clamp(uTime*.3-delay,0.,1.);
        
        float opacity=float(i)/10.;
        vec4 petal_final_color=vec4(1.,1.,1.,1./float(number)*.8);
        
        vec4 petal_color=mix(vec4(0.),petal_final_color,petal(uv,i)*uAppearOpacity);
        
        color+=petal_color;
        
    }
    
    FragData[0]=color;
    FragData[1]=vec4(0.);
    FragData[2]=vec4(0.,0.,1.,1.);
}

