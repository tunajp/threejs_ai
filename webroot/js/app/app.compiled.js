System.register("config", [], function() {
  "use strict";
  var __moduleName = "config";
  var _DEBUG_MODE_ = true;
  var _FPS_ = 60;
  var _ASSETS_PATH_ = "js/app/assets/";
  return {
    get _DEBUG_MODE_() {
      return _DEBUG_MODE_;
    },
    get _FPS_() {
      return _FPS_;
    },
    get _ASSETS_PATH_() {
      return _ASSETS_PATH_;
    }
  };
});
System.register("util", [], function() {
  "use strict";
  var __moduleName = "util";
  var PXConfig = System.get("config");
  function trace_func(str) {
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dd = d.getMilliseconds();
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      console.log(log_time + " " + str);
    }
  }
  function debug_board(str) {
    'use strict';
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dd = d.getMilliseconds();
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      $('#debug_board').html(log_time + ' ' + str);
    }
  }
  var Hoge = function Hoge() {};
  ($traceurRuntime.createClass)(Hoge, {hoge: function(x) {
      console.log('Hoge::hoge');
    }}, {});
  function confirmDialog(message, title, buttonok, buttoncancel, response) {
    var _dlg = $('<div>' + message + '</div>');
    var _buttons = {};
    _buttons[buttonok] = function() {
      $(this).dialog('close');
      response(false);
      $(this).dialog('destroy');
    };
    _buttons[buttoncancel] = function() {
      $(this).dialog('close');
      response(true);
      $(this).dialog('destroy');
    };
    _dlg.dialog({
      modal: true,
      draggable: true,
      title: title,
      height: 180,
      width: 500,
      buttons: _buttons,
      open: function() {
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
      },
      overlay: {
        opacity: 0.3,
        background: "#225b7f"
      }
    });
  }
  function myDialog(message, title, buttonok, buttoncancel, response) {
    var _dlg = $('<div>' + message + '</div>');
    var _buttons = {};
    _buttons[buttonok] = function() {
      $(this).dialog('close');
      response(false);
      $(this).dialog('destroy');
    };
    _buttons[buttoncancel] = function() {
      $(this).dialog('close');
      response(true);
      $(this).dialog('destroy');
    };
    _dlg.dialog({
      modal: true,
      draggable: true,
      title: title,
      width: 500,
      buttons: _buttons,
      open: function() {
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
      },
      overlay: {
        opacity: 0.3,
        background: "#225b7f"
      }
    });
  }
  function uuid(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
  }
  return {
    get trace_func() {
      return trace_func;
    },
    get debug_board() {
      return debug_board;
    },
    get Hoge() {
      return Hoge;
    },
    get confirmDialog() {
      return confirmDialog;
    },
    get myDialog() {
      return myDialog;
    },
    get uuid() {
      return uuid;
    }
  };
});
System.register("objects/debugbox", [], function() {
  "use strict";
  var __moduleName = "objects/debugbox";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Debugbox = function Debugbox(callback_function) {
    PXUtil.trace_func('Debugbox::constructor');
    this.callback_function = callback_function;
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshPhongMaterial({color: 0x00ff00}));
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.callback_function(this.mesh);
  };
  ($traceurRuntime.createClass)(Debugbox, {rendering: function(delta) {
      this.mesh.rotation.y += delta;
    }}, {});
  return {get Debugbox() {
      return Debugbox;
    }};
});
System.register("objects/debugfloor", [], function() {
  "use strict";
  var __moduleName = "objects/debugfloor";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Debugfloor = function Debugfloor(callback_function) {
    PXUtil.trace_func('Debugbox::constructor');
    this.callback_function = callback_function;
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({color: 0xe0e0e0}));
    this.mesh.rotation.x = Math.PI + Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.callback_function(this.mesh);
  };
  ($traceurRuntime.createClass)(Debugfloor, {rendering: function(delta) {}}, {});
  return {get Debugfloor() {
      return Debugfloor;
    }};
});
System.register("objects/enemies", [], function() {
  "use strict";
  var __moduleName = "objects/enemies";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Enemy = function Enemy() {
    this.hp = 100;
    this.mp = 0;
    this.ammo = 10;
    this.status = null;
    this.character = null;
    this.target_positions_array = null;
    this.target_position_index = 0;
    this.current_animation = "idol";
  };
  ($traceurRuntime.createClass)(Enemy, {
    calcDistance: function(x1, y1, x2, y2) {
      var a,
          b,
          d;
      a = x1 - x2;
      b = y1 - y2;
      d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      return d;
    },
    rendering: function(delta) {
      var target_position = new THREE.Vector3(this.target_positions_array[this.target_position_index].x, this.character.root.position.y, this.target_positions_array[this.target_position_index].z);
      this.character.root.lookAt(target_position);
      var distance = this.calcDistance(this.character.root.position.x, this.character.root.position.z, target_position.x, target_position.z);
      var moveDistance = 200 * delta / 3;
      this.character.root.translateZ(moveDistance);
      if (distance < 10.0) {
        if (this.target_position_index + 1 >= this.target_positions_array.length) {
          this.target_position_index = 0;
        } else {
          this.target_position_index++;
        }
      }
      this.character.update(delta);
    }
  }, {});
  var Enemies = function Enemies(nCharacters, callback_function) {
    PXUtil.trace_func('Enemies::constructor');
    var config = {
      baseUrl: PXConfig._ASSETS_PATH_ + "models/ogro/",
      body: "ogro-light.js",
      skins: ["grok.jpg", "ogrobase.png", "arboshak.png", "ctf_r.png", "ctf_b.png", "darkam.png", "freedom.png", "gib.png", "gordogh.png", "igdosh.png", "khorne.png", "nabogro.png"],
      weapons: [["weapon-light.js", "weapon.jpg"]],
      animations: {
        move: "run",
        idle: "stand",
        jump: "jump",
        attack: "attack",
        crouchMove: "cwalk",
        crouchIdle: "cstand",
        crouchAttach: "crattack"
      },
      walkSpeed: 350,
      crouchSpeed: 175
    };
    var controls = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false
    };
    this.callback_function = callback_function;
    this.characters = new Array();
    this.cloneCharacterRoots = new Array();
    for (var i = 0; i < nCharacters; i++) {
      var character = new THREE.MD2CharacterComplex();
      character.scale = 1;
      character.controls = controls;
      var enemy = new Enemy();
      enemy.character = character;
      enemy.target_positions_array = new Array();
      for (var j = 0; j < 3; j++) {
        var x = Math.floor(Math.random() * 1000) - 500;
        var z = Math.floor(Math.random() * 1000) - 500;
        enemy.target_positions_array.push({
          x: x,
          z: z
        });
      }
      this.characters.push(enemy);
    }
    var baseCharacter = new THREE.MD2CharacterComplex();
    baseCharacter.scale = 3;
    var obj = this;
    baseCharacter.onLoadComplete = function() {
      for (var i = 0; i < nCharacters; i++) {
        var cloneCharacter = obj.characters[i].character;
        cloneCharacter.shareParts(baseCharacter);
        cloneCharacter.enableShadows(true);
        cloneCharacter.setWeapon(0);
        cloneCharacter.setSkin(i);
        cloneCharacter.frontAcceleration = 0;
        cloneCharacter.controls.moveForward = true;
        cloneCharacter.root.position.x = i * 150 - 500;
        cloneCharacter.root.position.y = 25;
        cloneCharacter.root.position.z = i * 150 - 500;
        obj.cloneCharacterRoots.push(cloneCharacter.root);
      }
      obj.callback_function(obj.cloneCharacterRoots);
    };
    baseCharacter.loadParts(config);
  };
  ($traceurRuntime.createClass)(Enemies, {rendering: function(delta) {
      for (var i = 0; i < this.characters.length; i++) {
        this.characters[i].rendering(delta);
      }
    }}, {});
  return {get Enemies() {
      return Enemies;
    }};
});
System.register("objects/shaderbox", [], function() {
  "use strict";
  var __moduleName = "objects/shaderbox";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var Shaderbox = function Shaderbox(myVertexShader1, myFragmentShader1, callback_function) {
    PXUtil.trace_func('Shaderbox::constructor');
    this.callback_function = callback_function;
    var baseTexture = new THREE.ImageUtils.loadTexture(PXConfig._ASSETS_PATH_ + 'cover.png');
    var sepia = true;
    var sepia_value = false;
    var grayscale_value = false;
    if (sepia === true) {
      sepia_value = true;
    } else {
      grayscale_value = true;
    }
    this.customUniforms = {
      baseTexture: {
        type: "t",
        value: baseTexture
      },
      time: {
        type: "f",
        value: 1.0
      },
      grayscale: {
        type: "i",
        value: grayscale_value
      },
      sepia: {
        type: "i",
        value: sepia_value
      }
    };
    var customMaterial = new THREE.ShaderMaterial({
      uniforms: this.customUniforms,
      vertexShader: myVertexShader1,
      fragmentShader: myFragmentShader1
    });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), customMaterial);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.callback_function(this.mesh);
  };
  ($traceurRuntime.createClass)(Shaderbox, {rendering: function(delta) {
      this.mesh.rotation.y += delta;
      this.customUniforms.time.value += delta;
    }}, {});
  return {get Shaderbox() {
      return Shaderbox;
    }};
});
System.register("testscene", [], function() {
  "use strict";
  var __moduleName = "testscene";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var PXDebugbox = System.get("objects/debugbox");
  var PXShaderbox = System.get("objects/shaderbox");
  var PXDebugfloor = System.get("objects/debugfloor");
  var PXEnemies = System.get("objects/enemies");
  var _TEST_CONTROLLER_ = true;
  var TestScene = function TestScene(renderer) {
    PXUtil.trace_func('TestScene::constructor');
    this.renderer;
    this.scene;
    this.camera;
    this.light;
    this.ambient;
    this.all_items = 4;
    this.loaded_items = 0;
    this.render_target_array = new Array();
    this.clock;
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
    this.camera.position = new THREE.Vector3(0, 150, 500);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.light = new THREE.SpotLight(0xffffff);
    this.light.position.set(100, 1000, 0);
    this.light.angle = Math.PI / 4;
    this.scene.add(this.light);
    this.ambient = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambient);
    this.light.castShadow = true;
    this.light.shadowMapWidth = 1024;
    this.light.shadowMapHeight = 1024;
    this.light.shadowCameraNear = 100;
    this.light.shadowCameraFar = 1100;
    this.light.shadowCameraFov = 30;
    this.light.shadowCameraVisible = true;
    this.renderer.shadowMapEnabled = true;
    this.loadObjects();
    if (_TEST_CONTROLLER_) {
      this.trackball = new THREE.TrackballControls(this.camera);
    }
  };
  ($traceurRuntime.createClass)(TestScene, {
    getLoadingStatus: function() {
      if (this.all_items === this.loaded_items || this.loading == false) {
        return true;
      } else {
        return false;
      }
    },
    loadedIncrements: function() {
      this.loaded_items++;
      if (this.loaded_items === this.all_items) {
        this.loading = false;
        this.clock = new THREE.Clock();
      }
    },
    rendering: function() {
      if (_TEST_CONTROLLER_) {
        this.trackball.update();
      }
      var delta = this.clock.getDelta();
      for (var i = 0; i < this.render_target_array.length; i++) {
        this.render_target_array[i].rendering(delta);
      }
      this.renderer.render(this.scene, this.camera);
    },
    loadObjects: function() {
      var $__5 = this;
      var debugbox = new PXDebugbox.Debugbox((function(mesh) {
        mesh.position.y += 70;
        $__5.scene.add(mesh);
        $__5.loadedIncrements();
      }));
      this.render_target_array.push(debugbox);
      SHADER_LOADER.load((function(data) {
        var myVertexShader1 = data.vertexShader.vertex;
        var myFragmentShader1 = data.fragmentShader.fragment;
        var shaderbox = new PXShaderbox.Shaderbox(myVertexShader1, myFragmentShader1, (function(mesh) {
          mesh.position.y += 70;
          mesh.position.x += 120;
          $__5.scene.add(mesh);
          $__5.loadedIncrements();
        }));
        $__5.render_target_array.push(shaderbox);
      }));
      var debugfloor = new PXDebugfloor.Debugfloor((function(mesh) {
        $__5.scene.add(mesh);
        $__5.loadedIncrements();
      }));
      this.render_target_array.push(debugfloor);
      var enemies = new PXEnemies.Enemies(10, (function(meshes) {
        for (var i = 0; i < meshes.length; i++) {
          $__5.scene.add(meshes[i]);
        }
        $__5.loadedIncrements();
      }));
      this.render_target_array.push(enemies);
    },
    resize: function() {
      PXUtil.trace_func('TestScene::resize');
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }, {});
  return {get TestScene() {
      return TestScene;
    }};
});
System.register("app", [], function() {
  "use strict";
  var __moduleName = "app";
  var PXUtil = System.get("util");
  var PXConfig = System.get("config");
  var PXScene = System.get("testscene");
  var Application = function Application() {
    PXUtil.trace_func('App::constructor');
    this.renderer;
    this.stats;
    this.currentSceneObject;
    this.renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
    var width = window.innerWidth;
    var height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x00000, 1);
    document.getElementById('canvas').appendChild(this.renderer.domElement);
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.zIndex = 100;
    document.body.appendChild(this.stats.domElement);
    if (PXConfig._DEBUG_MODE_) {
      document.body.appendChild(this.stats.domElement);
      $(document.body).append('<div id="debug_board" width="200" height="200">test<br>test2<br>test3<br></div');
    }
    this.currentSceneObject = new PXScene.TestScene(this.renderer);
    this.resize();
  };
  ($traceurRuntime.createClass)(Application, {
    run: function() {
      PXUtil.trace_func('App::run');
      this.update();
    },
    update: function() {
      this.rendering();
      this.stats.update();
    },
    rendering: function() {
      var $__7 = this;
      if (PXConfig._FPS_ === 60) {
        requestAnimationFrame((function() {
          $__7.update();
        }));
      } else {
        setTimeout((function() {
          requestAnimationFrame((function() {
            $__7.update();
          }));
        }), 1000 / PXConfig._FPS_);
      }
      if (this.currentSceneObject.getLoadingStatus() === true) {
        this.currentSceneObject.rendering();
      }
    },
    resize: function() {
      var $__7 = this;
      PXUtil.trace_func('App::resize');
      $(window).resize((function(e) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        PXUtil.trace_func('App::resize::resize w:' + w + ',h:' + h);
        $__7.renderer.setSize(w, h);
        $__7.currentSceneObject.resize();
      }));
    }
  }, {});
  $((function() {
    var app = new Application();
    app.run();
  }));
  return {};
});
System.get("app" + '');
