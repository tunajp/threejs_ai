/*
 * basic vertex shader
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 * Copyright(C) 2014 DesignStudioPhoenix Corporation. All Rights Reserved.
 */

varying vec2 vUv;
uniform float time;
void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.x -= time*10.0;
}
