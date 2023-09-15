/*
original_author: Patricio Gonzalez Vivo
description: calculate point light
use: lightPoint(<vec3> _diffuseColor, <vec3> _specularColor, <vec3> _N, <vec3> _V, <float> _NoV, <float> _f0, out <vec3> _diffuse, out <vec3> _specular)
options:
    - DIFFUSE_FNC: diffuseOrenNayar, diffuseBurley, diffuseLambert (default)
    - SURFACE_POSITION: in glslViewer is v_position
    - LIGHT_POSITION: in glslViewer is u_light
    - LIGHT_COLOR: in glslViewer is u_lightColor
    - LIGHT_INTENSITY: in glslViewer is  u_lightIntensity
    - LIGHT_FALLOFF: in glslViewer is u_lightFalloff
*/

#include "../specular.glsl"
#include "../diffuse.glsl"
#include "../shadow.glsl"
#include "falloff.glsl"

#ifndef SURFACE_POSITION
#define SURFACE_POSITION vec3(0.0, 0.0, 0.0)
#endif

#ifndef LIGHT_POSITION
#define LIGHT_POSITION  vec3(0.0, 10.0, -50.0)
#endif

#ifndef LIGHT_COLOR
#define LIGHT_COLOR    vec3(0.5, 0.5, 0.5)
#endif

#ifndef LIGHT_INTENSITY
#define LIGHT_INTENSITY 1.0
#endif

#ifndef LIGHT_FALLOFF
#define LIGHT_FALLOFF   0.0
#endif

#ifndef STR_LIGHT_POINT
#define STR_LIGHT_POINT
struct LightPoint {
    vec3    position;
    vec3    color;
    float   intensity;
#ifdef LIGHT_FALLOFF
    float   falloff;
#endif

// Cache
    vec3    direction;
    float   dist;
    float   shadow;
};
#endif

#ifndef FNC_LIGHT_POINT
#define FNC_LIGHT_POINT

void lightPoint(
    const in vec3 _diffuseColor, const in vec3 _specularColor, 
    const in vec3 _V, 
    const in vec3 _Lp, const in vec3 _Ld, const in vec3 _Lc, const in float _Li, const in float _Ldist, const in float _Lof, 
    const in vec3 _N, const in float _NoV, const in float _NoL, const in float _roughness, const in float _f0, 
    inout vec3 _diffuse, inout vec3 _specular) {

    float dif   = diffuse(_Ld, _N, _V, _NoV, _NoL, _roughness);// * ONE_OVER_PI;
    float spec  = specular(_Ld, _N, _V, _NoV, _NoL, _roughness, _f0);

    vec3 lightContribution = _Lc * _Li;
    #ifdef LIGHT_FALLOFF
    if (_Lof > 0.0)
        lightContribution *= falloff(_Ldist, _Lof);
    #endif

    _diffuse    += max(vec3(0.0), _diffuseColor * lightContribution * dif);
    _specular   += max(vec3(0.0), _specularColor * lightContribution * spec);
}

#ifdef STR_MATERIAL
void lightPoint(
    const in vec3 _diffuseColor, const in vec3 _specularColor,
    LightPoint _L, const in Material _mat, 
    inout vec3 _diffuse, inout vec3 _specular) 
    {
    float f0    = max(_mat.f0.r, max(_mat.f0.g, _mat.f0.b));
    float NoL   = dot(_mat.normal, _L.direction);

    lightPoint( _diffuseColor, _specularColor, 
                _mat.V, 
                _L.position, _L.direction, _L.color, _L.intensity, _L.dist, _L.falloff, 
                _mat.normal, _mat.NoV, NoL, _mat.roughness, f0, 
                _diffuse, _specular);

    // TODO:
    // - make sure that the shadow use a perspective projection
    #ifdef SHADING_MODEL_SUBSURFACE
    vec3  h     = normalize(_mat.V + _L.direction);
    float NoH   = saturate(dot(_mat.normal, h));
    float LoH   = saturate(dot(_L.direction, h));

    float scatterVoH = saturate(dot(_mat.V, -_L.direction));
    float forwardScatter = exp2(scatterVoH * _mat.subsurfacePower - _mat.subsurfacePower);
    float backScatter = saturate(NoL * _mat.thickness + (1.0 - _mat.thickness)) * 0.5;
    float subsurface = mix(backScatter, 1.0, forwardScatter) * (1.0 - _mat.thickness);
    _diffuse += _mat.subsurfaceColor * (subsurface * diffuseLambert());
    #endif
}
#endif

#endif
