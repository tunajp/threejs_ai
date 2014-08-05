/*
 * debugbox.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXUtil from '../util';
import * as PXConfig from '../config';

/**
 * Debugbox class
 */
export class Debugbox
{
  /**
   * constructor
   */
  constructor(callback_function)
  {
    PXUtil.trace_func('Debugbox::constructor');

    this.callback_function = callback_function;

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(100, 100, 100),
      new THREE.MeshPhongMaterial({color: 0x00ff00})
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
  }
}
