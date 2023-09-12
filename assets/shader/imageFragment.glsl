#version 300 es

precision highp float;

uniform sampler2D tMap;

in vec2 vUv;
out vec4 FragData[3];

void main(){
    vec4 color=vec4(0.);
    color.rgb=texture(tMap,vUv).rgb;
    color.a=1.;
    
    FragData[0]=vec4(0.);
    FragData[1]=color;
    FragData[2]=vec4(1.,0.,0.,1.);
}