precision highp float;

attribute vec2 position;
attribute vec2 uv;

varying vec2 vUv;
varying vec4 vWorldPos;

void main(){
    vUv=uv;
    
    gl_Position=vec4(position,0,1);
}