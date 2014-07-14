/*
 * debugfloor.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

module PXUtil from '../util';
module PXConfig from '../config';

/**
 * Debugfloor class
 */
export class Debugfloor
{
  /**
   * constructor
   */
  constructor(callback_function)
  {
    PXUtil.trace_func('Debugbox::constructor');

    this.callback_function = callback_function;

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshPhongMaterial({
        color: 0xe0e0e0,
        //side: THREE.DoubleSide
      })
      );
    this.mesh.rotation.x = Math.PI + Math.PI / 2; // 180+90度(Math.PI=180度)
    this.mesh.receiveShadow = true;

    this.callback_function(this.mesh);
  }
  /**
   * rendering method
   */
  rendering(delta)
  {
  }
}
