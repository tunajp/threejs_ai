System.registerModule("config.js", [], function() {
  "use strict";
  var __moduleName = "config.js";
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
System.registerModule("util.js", [], function() {
  "use strict";
  var __moduleName = "util.js";
  var PXConfig = System.get("config.js");
  function trace_func(str) {
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = pad(d.getHours());
      var mm = pad(d.getMinutes());
      var ss = pad(d.getSeconds());
      var dd = pad(d.getMilliseconds());
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      console.log(log_time + " " + str);
    }
  }
  function pad(n) {
    return ("0" + n).slice(-2);
  }
  function debug_board(str) {
    'use strict';
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = pad(d.getHours());
      var mm = pad(d.getMinutes());
      var ss = pad(d.getSeconds());
      var dd = pad(d.getMilliseconds());
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      $('#debug_board').html(log_time + ' ' + str);
    }
  }
  function webgl_info(renderer) {
    var gl = renderer.context;
    var gl_info = {
      "Version": gl.getParameter(gl.VERSION),
      "Shading language": gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      "Vendor": gl.getParameter(gl.VENDOR),
      "Renderer": gl.getParameter(gl.RENDERER),
      "Max varying vectors": gl.getParameter(gl.MAX_VARYING_VECTORS),
      "Max vertex attribs": gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      "Max vertex uniform vectors": gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      "Max fragment uniform vectors": gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      "Max renderbuffer size": gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      "Max texture size": gl.getParameter(gl.MAX_TEXTURE_SIZE),
      "Max cube map texture size": gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      "Max texture image units": gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      "Max vertex texture units": gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      "Max combined texture units": gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      "Max viewport dims": gl.getParameter(gl.MAX_VIEWPORT_DIMS)[0] + "x" + gl.getParameter(gl.MAX_VIEWPORT_DIMS)[1]
    };
    console.log("WebGL info: ", gl_info);
  }
  function screenshot(dontDownload, useJPG) {
    var imgtype = useJPG ? "image/jpeg" : "image/png";
    var dataUrl = renderer.domElement.toDataURL(imgtype);
    if (!dontDownload)
      dataUrl = dataUrl.replace(imgtype, "image/octet-stream");
    window.open(dataUrl, "_blank");
  }
  var Hoge = function Hoge() {};
  ($traceurRuntime.createClass)(Hoge, {hoge: function(x) {
      console.log('Hoge::hoge ' + x);
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
  function i18nLoad(callback_function) {
    $.i18n.init({
      ns: {
        namespaces: ['ns.special'],
        defaultNs: 'ns.special'
      },
      useLocalStorage: false,
      debug: true
    }, function() {
      callback_function();
    });
  }
  return {
    get trace_func() {
      return trace_func;
    },
    get debug_board() {
      return debug_board;
    },
    get webgl_info() {
      return webgl_info;
    },
    get screenshot() {
      return screenshot;
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
    },
    get i18nLoad() {
      return i18nLoad;
    }
  };
});
System.registerModule("objects/debugbox.js", [], function() {
  "use strict";
  var __moduleName = "objects/debugbox.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
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
System.registerModule("objects/debugfloor.js", [], function() {
  "use strict";
  var __moduleName = "objects/debugfloor.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
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
System.registerModule("objects/enemies.js", [], function() {
  "use strict";
  var __moduleName = "objects/enemies.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var Sprite = function Sprite(message, callback_function) {
    PXUtil.trace_func('Sprite::constructor');
    this.callback_function = callback_function;
    this.sprite = this.makeTextSprite(message, {
      fontsize: 24,
      borderColor: {
        r: 255,
        g: 0,
        b: 0,
        a: 1.0
      },
      backgroundColor: {
        r: 255,
        g: 100,
        b: 100,
        a: 0.8
      }
    });
    this.callback_function(this.sprite);
  };
  ($traceurRuntime.createClass)(Sprite, {
    getSprite: function() {
      return this.sprite;
    },
    setPositionVector3: function(v) {
      this.sprite.position.set(v.x, v.y, v.z);
    },
    setPosition: function(x, y, z) {
      this.sprite.position.set(x, y, z);
    },
    rendering: function(delta) {},
    updateSprite: function(message, parameters) {
      if (parameters === undefined)
        parameters = {};
      var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
      var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
      var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
      };
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
      };
      var metrics = this.context.measureText(message);
      var textWidth = metrics.width;
      this.context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
      this.context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
      this.context.lineWidth = borderThickness;
      this.roundRect(this.context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      this.context.fillStyle = "rgba(0, 0, 0, 1.0)";
      this.context.fillText(message, borderThickness, fontsize + borderThickness);
      this.texture.needsUpdate = true;
    },
    makeTextSprite: function(message, parameters) {
      if (parameters === undefined)
        parameters = {};
      var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
      var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
      var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
      var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
      };
      var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
        r: 255,
        g: 255,
        b: 255,
        a: 1.0
      };
      var canvas = document.createElement('canvas');
      this.context = canvas.getContext('2d');
      this.context.font = "Bold " + fontsize + "px " + fontface;
      var metrics = this.context.measureText(message);
      var textWidth = metrics.width;
      this.context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
      this.context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
      this.context.lineWidth = borderThickness;
      this.roundRect(this.context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
      this.context.fillStyle = "rgba(0, 0, 0, 1.0)";
      this.context.fillText(message, borderThickness, fontsize + borderThickness);
      this.texture = new THREE.Texture(canvas);
      this.texture.needsUpdate = true;
      var spriteMaterial = new THREE.SpriteMaterial({
        map: this.texture,
        useScreenCoordinates: false
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(100, 50, 1.0);
      return sprite;
    },
    roundRect: function(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }, {});
  var Enemy = function Enemy() {
    this.name = "";
    this.maxhp = 100;
    this.hp = 100;
    this.maxmp = 0;
    this.mp = 0;
    this.maxammo = 10;
    this.ammo = 10;
    this.status = null;
    this.character = null;
    this.target_positions_array = null;
    this.target_position_index = 0;
    this.current_animation = "idol";
    this.sprite = null;
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
      this.sprite.updateSprite(" " + this.name + " HP:" + this.hp-- + "/" + this.maxhp + " ", {
        fontsize: 24,
        borderColor: {
          r: 255,
          g: 0,
          b: 0,
          a: 1.0
        },
        backgroundColor: {
          r: 255,
          g: 100,
          b: 100,
          a: 0.8
        }
      });
      this.sprite.setPosition(this.character.root.position.x, this.character.root.position.y + 30, this.character.root.position.z);
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
    this.sprites = new Array();
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
      enemy.name = "モンスター" + i;
      var sprite = new Sprite(" " + enemy.name + " HP:" + enemy.hp + "/" + enemy.maxhp + " ", (function() {}));
      enemy.sprite = sprite;
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
        obj.sprites.push(obj.characters[i].sprite.getSprite());
      }
      obj.callback_function(obj.cloneCharacterRoots, obj.sprites);
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
System.registerModule("objects/shaderbox.js", [], function() {
  "use strict";
  var __moduleName = "objects/shaderbox.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var Shaderbox = function Shaderbox(myVertexShader1, myFragmentShader1, callback_function) {
    PXUtil.trace_func('Shaderbox::constructor');
    this.callback_function = callback_function;
    var baseTexture = new THREE.ImageUtils.loadTexture(PXConfig._ASSETS_PATH_ + 'Three.js-code-example.jpg');
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
System.registerModule("testscene.js", [], function() {
  "use strict";
  var __moduleName = "testscene.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var PXDebugbox = System.get("objects/debugbox.js");
  var PXShaderbox = System.get("objects/shaderbox.js");
  var PXDebugfloor = System.get("objects/debugfloor.js");
  var PXEnemies = System.get("objects/enemies.js");
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
    this.camera.position.set(0, 150, 500);
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
      PXUtil.debug_board('delta: ' + Math.floor(delta * 100000) / 100000 + '<br>' + 'info.memory.programs:' + this.renderer.info.memory.programs + '<br>' + 'info.memory.geometries:' + this.renderer.info.memory.geometries + '<br>' + 'info.memory.textures:' + this.renderer.info.memory.textures + '<br>' + 'info.render.calls:' + this.renderer.info.render.calls + '<br>' + 'info.render.vertices:' + this.renderer.info.render.vertices + '<br>' + 'info.render.faces:' + this.renderer.info.render.faces + '<br>' + 'info.render.points:' + this.renderer.info.render.points);
      this.renderer.render(this.scene, this.camera);
    },
    loadObjects: function() {
      var $__0 = this;
      var debugbox = new PXDebugbox.Debugbox((function(mesh) {
        mesh.position.y += 70;
        $__0.scene.add(mesh);
        $__0.loadedIncrements();
      }));
      this.render_target_array.push(debugbox);
      SHADER_LOADER.load((function(data) {
        var myVertexShader1 = data.vertexShader.vertex;
        var myFragmentShader1 = data.fragmentShader.fragment;
        var shaderbox = new PXShaderbox.Shaderbox(myVertexShader1, myFragmentShader1, (function(mesh) {
          mesh.position.y += 70;
          mesh.position.x += 120;
          $__0.scene.add(mesh);
          $__0.loadedIncrements();
        }));
        $__0.render_target_array.push(shaderbox);
      }));
      var debugfloor = new PXDebugfloor.Debugfloor((function(mesh) {
        $__0.scene.add(mesh);
        $__0.loadedIncrements();
      }));
      this.render_target_array.push(debugfloor);
      var enemies = new PXEnemies.Enemies(10, (function(meshes, sprites) {
        for (var i = 0; i < meshes.length; i++) {
          $__0.scene.add(meshes[i]);
        }
        for (var i = 0; i < sprites.length; i++) {
          $__0.scene.add(sprites[i]);
        }
        $__0.loadedIncrements();
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
System.registerModule("app.js", [], function() {
  "use strict";
  var __moduleName = "app.js";
  var PXUtil = System.get("util.js");
  var PXConfig = System.get("config.js");
  var PXScene = System.get("testscene.js");
  var Application = function Application() {
    PXUtil.trace_func('App::constructor');
    this.renderer;
    this.stats;
    this.currentSceneObject;
    this.renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer();
    if (Detector.webgl) {
      PXUtil.webgl_info(this.renderer);
    } else {}
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
      var $__0 = this;
      if (PXConfig._FPS_ === 60) {
        requestAnimationFrame((function() {
          $__0.update();
        }));
      } else {
        setTimeout((function() {
          requestAnimationFrame((function() {
            $__0.update();
          }));
        }), 1000 / PXConfig._FPS_);
      }
      if (this.currentSceneObject.getLoadingStatus() === true) {
        this.currentSceneObject.rendering();
      }
    },
    resize: function() {
      var $__0 = this;
      PXUtil.trace_func('App::resize');
      $(window).resize((function(e) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        PXUtil.trace_func('App::resize::resize w:' + w + ',h:' + h);
        $__0.renderer.setSize(w, h);
        $__0.currentSceneObject.resize();
      }));
    }
  }, {});
  $((function() {
    PXUtil.i18nLoad((function() {
      PXUtil.trace_func($.i18n.t('app.i18nLoadComplete'));
      var app = new Application();
      app.run();
    }));
  }));
  return {};
});
System.get("app.js" + '');
