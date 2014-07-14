/*
 * basic fragment shader
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2014 DesignStudioPhoenix Corporation. All Rights Reserved.
 */


//http://wgld.org/d/webgl/w054.html
uniform sampler2D baseTexture;
varying vec2 vUv; // texcoordと同意
uniform bool grayscale;
uniform bool sepia;

const float redScale = 0.298912;
const float greenScale = 0.586611;
const float blueScale = 0.114478;
const vec3 monochromeScale = vec3(redScale, greenScale, blueScale);

// sepia
const float sRedScale   = 1.07;
const float sGreenScale = 0.74;
const float sBlueScale  = 0.43;
const vec3  sepiaScale = vec3(sRedScale, sGreenScale, sBlueScale);

void main()
{
    vec4  smpColor  = texture2D(baseTexture, vUv);
    float grayColor = dot(smpColor.rgb, monochromeScale);
    // grayscale
    if (grayscale) {
        smpColor = vec4(vec3(grayColor), 1.0);
    }
    //sepia
    if (sepia) {
        vec3 monoColor = vec3(grayColor) * sepiaScale;
        smpColor = vec4(monoColor, 1.0);
    }

    gl_FragColor = smpColor;
    //gl_FragColor = texture2D(baseTexture, vUv);
    //gl_FragColor=vec4(0.0, 0.0, 1.0, 1.0);
}
