/*
 * testscene.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

module PXUtil from './util';
module PXConfig from './config';
module PXDebugbox from './objects/debugbox';
module PXShaderbox from './objects/shaderbox';
module PXDebugfloor from './objects/debugfloor';
module PXEnemies from './objects/enemies';

var _TEST_CONTROLLER_ = true;

/**
 * TestScene class
 */
export class TestScene
{
  /**
   * constructor
   */
  constructor(renderer)
  {
    PXUtil.trace_func('TestScene::constructor');

    //
    // private member
    //
    /** renderer */
    this.renderer;
    /** scene */
    this.scene;
    /** camera */
    this.camera;
    /** light */
    this.light;
    /** ambient light */
    this.ambient;
    /** items count */
    this.all_items = 4;
    /** load item count */
    this.loaded_items = 0;
    /** rendering target array */
    this.render_target_array = new Array();
    /** clock */
    this.clock;

    /*
     * initial process
     */
    this.renderer = renderer;

    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
    this.camera.position = new THREE.Vector3(0, 150, 500);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Light
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(100, 1000, 0);
    this.light.angle = Math.PI / 4;
    this.scene.add(this.light);

    // Ambient light
    this.ambient = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambient);

    // Shadow
    this.light.castShadow = true;
    this.light.shadowMapWidth = 1024;
    this.light.shadowMapHeight = 1024;
    this.light.shadowCameraNear = 100;
    this.light.shadowCameraFar = 1100;
    this.light.shadowCameraFov = 30;
    this.light.shadowCameraVisible = true; // 影生成カメラの表示(DEBUG)
    this.renderer.shadowMapEnabled = true;

    /*
     * mesh
     */
    this.loadObjects();

    // test用コントローラ
    if (_TEST_CONTROLLER_) {
      this.trackball = new THREE.TrackballControls(this.camera);
    }
  }
  /**
   * getLoadingStatus method
   */
  getLoadingStatus()
  {
    if (this.all_items === this.loaded_items || this.loading == false) {
      return true; // complete
    } else {
      return false; // loading
    }
  }
  /**
   * loadedIncrements method
   */
  loadedIncrements()
  {
    this.loaded_items++;
    if (this.loaded_items === this.all_items) {
      this.loading = false;
      // ロード完了のこのタイミングでタイマーを開始
      this.clock = new THREE.Clock();
    }
  }
  /**
   * rendering method
   */
  rendering()
  {
    if (_TEST_CONTROLLER_) {
      this.trackball.update();
    }

    var delta = this.clock.getDelta();

    for (var i=0; i<this.render_target_array.length; i++) {
      this.render_target_array[i].rendering(delta);
    }

    this.renderer.render(this.scene, this.camera);
  }
  /**
   * loadObjects method
   */
  loadObjects()
  {
    var debugbox = new PXDebugbox.Debugbox( (mesh) => {
      mesh.position.y += 70;
      this.scene.add(mesh);
      this.loadedIncrements();
    });
    this.render_target_array.push(debugbox);
    /*
     * shader load
     */
    SHADER_LOADER.load( (data) => {
      var myVertexShader1 = data.vertexShader.vertex; //data-name
      var myFragmentShader1 = data.fragmentShader.fragment; //data-name;
      var shaderbox = new PXShaderbox.Shaderbox(myVertexShader1, myFragmentShader1, (mesh) => {
        mesh.position.y += 70;
        mesh.position.x += 120;
        this.scene.add(mesh);
        this.loadedIncrements();
      });
      this.render_target_array.push(shaderbox);
    });
    var debugfloor = new PXDebugfloor.Debugfloor( (mesh) => {
      this.scene.add(mesh);
      this.loadedIncrements();
    });
    this.render_target_array.push(debugfloor);

    var enemies = new PXEnemies.Enemies(10, (meshes, sprites) => {
      for (var i=0; i<meshes.length; i++) {
        this.scene.add(meshes[i]);
      }
      for (var i=0; i<sprites.length; i++) {
        this.scene.add(sprites[i]);
      }
      this.loadedIncrements();
    });
    this.render_target_array.push(enemies);
  }
  /**
   * resize method
   */
  resize()
  {
    PXUtil.trace_func('TestScene::resize');

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
