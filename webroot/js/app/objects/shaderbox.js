/*
 * shaderbox.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXUtil from '../util';
import * as PXConfig from '../config';

/**
 * shaderbox class
 */
export class Shaderbox
{
  /**
   * constructor
   */
  constructor(myVertexShader1, myFragmentShader1, callback_function)
  {
    PXUtil.trace_func('Shaderbox::constructor');

    this.callback_function = callback_function;

    var baseTexture = new THREE.ImageUtils.loadTexture(PXConfig._ASSETS_PATH_ + 'cover.png');
    // http://www.atmarkit.co.jp/ait/articles/1211/26/news012.htmlより
    // i	数値（整数に丸められる）
    // f	数値
    // c	THREE.Color
    // v2	THREE.Vector2
    // v3	THREE.Vector3
    // v4	THREE.Vector4
    // m4	THREE.Matrix4
    // t	THREE.Texture
    // iv1	整数の配列
    // iv	整数の配列（長さは3の倍数）
    // fv1	浮動小数点値の配列
    // fv	浮動小数点値の配列（長さは3の倍数）
    // v2v	THREE.Vector2の配列
    // v3v	THREE.Vector3の配列
    // v4v	THREE.Vector4の配列
    // m4v	THREE.Matrix4の配列
    // tv	THREE.Textureの配列
    var sepia = true;
    var sepia_value = false;
    var grayscale_value = false;
    if (sepia === true) {
      sepia_value = true;
    } else {
      grayscale_value = true;
    }
    this.customUniforms ={
      baseTexture: { type: "t", value:baseTexture},
      time: { type: "f", value: 1.0 },
      grayscale: { type: "i", value:grayscale_value},
      sepia: { type: "i", value:sepia_value}
    };
    var customMaterial = new THREE.ShaderMaterial({
      uniforms: this.customUniforms,
      vertexShader: myVertexShader1,
      fragmentShader: myFragmentShader1,
    });

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      //new THREE.MeshPhongMaterial({color: 0x00ff00})
      customMaterial
      );

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.callback_function(this.mesh);
  }
  /**
   * rendering method
   */
  rendering(delta)
  {
    this.mesh.rotation.y += delta;
    this.customUniforms.time.value += delta;
  }
}

