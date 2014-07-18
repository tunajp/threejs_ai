/*
 * app.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */


module PXUtil from './util';
module PXConfig from './config';
module PXScene from './testscene';

/**
 * Application class
 */
class Application
{
  /**
   * constructor
   */
  constructor()
  {
    PXUtil.trace_func('App::constructor');

    //
    // private member
    //
    /** renderer */
    this.renderer;
    /** stats */
    this.stats;
    /** currentSceneObject */
    this.currentSceneObject;

    /*
     * renderer
     */
    this.renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x00000, 1);
    document.getElementById('canvas').appendChild(this.renderer.domElement);

    /*
     * set stats
     */
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.zIndex = 100;
    document.body.appendChild(this.stats.domElement);

    /*
     * debug_board
     */
    if (PXConfig._DEBUG_MODE_) {
      document.body.appendChild(this.stats.domElement);
      $(document.body).append('<div id="debug_board" width="200" height="200">test<br>test2<br>test3<br></div');
    }

    /*
     * scene作成
     */
    this.currentSceneObject = new PXScene.TestScene(this.renderer);

    /*
     * eventハンドラ登録
     */
    this.resize();
  }
  /**
   * run method
   */
  run()
  {
    PXUtil.trace_func('App::run');

    this.update();
  }
  /**
   * update method
   */
  update()
  {
    this.rendering();
    
    // レンダリングするたびにFPSを計測
    this.stats.update();
  }
  /**
   * rendering method
   */
  rendering()
  {
    if (PXConfig._FPS_ === 60) {
      requestAnimationFrame( () => {
        this.update();
      });
    } else {
      setTimeout( () => {
        requestAnimationFrame( () => {
          this.update();
        });
      }, 1000/PXConfig._FPS_);
    }

    if (this.currentSceneObject.getLoadingStatus() === true) {
      this.currentSceneObject.rendering();
    }
  }
  /**
   * resize method
   */
  resize()
  {
    PXUtil.trace_func('App::resize');

    $(window).resize( (e) => {
      var w = window.innerWidth;
      var h = window.innerHeight;
      PXUtil.trace_func('App::resize::resize w:' + w + ',h:' + h);

      this.renderer.setSize(w, h);
      this.currentSceneObject.resize();
    });
  }
}

/*
 * entry point
 */
$( () => {
  /*
   * i18n init
   */
  PXUtil.i18nLoad( () => {
    PXUtil.trace_func($.i18n.t('app.i18nLoadComplete'));
    /*
     * application start
     */
    var app = new Application();
    app.run();
  });
});
