/*
 * enemies.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

module PXUtil from '../util';
module PXConfig from '../config';

/**
 * Enemy class
 */
class Enemy
{
  /*
   * constructor
   */
  constructor()
  {
    //
    // private member
    //
    /** HP */
    this.hp = 100;
    /** MP? */
    this.mp = 0;
    /** 弾の残り数 */
    this.ammo = 10;
    /** ステータス */
    this.status =null;
    /** MD2Characterオブジェクト */
    this.character = null;
    /** 巡回点配列(XZ)(-500->500) */
    this.target_positions_array = null;
    /** 今どの巡回点に向かっているか(index指定) */
    this.target_position_index = 0;
    /** sleep or awake */
    /** target helo character */
    /** current animation */
    this.current_animation = "idol";
  }

  calcDistance(x1,y1,x2,y2)
  {
    var a, b, d;
    a = x1 - x2;
    b = y1 - y2;
    d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return d;
  }

  /**
   * rendering method
   */
  rendering(delta)
  {
    //this.character.setAnimation('run');//
    //console.log(this.character.root.position.x + "," + this.character.root.position.z);

    // 巡回点の方向に向かせる
    var target_position = new THREE.Vector3(
      this.target_positions_array[this.target_position_index].x,
      this.character.root.position.y,
      this.target_positions_array[this.target_position_index].z
      );
    //this.character.root.parent.worldToLocal(target_position);
    this.character.root.lookAt(target_position); // lookAtで方向転換させるために、MD2CharacterComplex.jsのthis.root.rotation.y = this.bodyOrientation;をコメントアウト
    //console.log(target_position.x + "," + target_position.z);

    // 巡回点に向かって歩かせる
    var distance = this.calcDistance(this.character.root.position.x, this.character.root.position.z, target_position.x, target_position.z);
    //console.log(distance);
    var moveDistance = 200 * delta / 3; // 200 pixels per second  // should be velocity?
    //this.character.root.translateX( moveDistance );
    this.character.root.translateZ( moveDistance );

    // 巡回点に近づいたら、次の巡回点をターゲットにする
    if (distance < 10.0) {
      if (this.target_position_index+1 >= this.target_positions_array.length) {
        this.target_position_index = 0;
      } else {
        this.target_position_index++;
      }
    }

    this.character.update(delta);
  }
}

/**
 * Enemies class
 * 敵小隊クラス
 */
export class Enemies
{
  /**
   * constructor
   * パラメータ：キャラクタ数、地面、プレイヤー
   */
  constructor(nCharacters, callback_function)
  {
    PXUtil.trace_func('Enemies::constructor');

    var config = {
      baseUrl: PXConfig._ASSETS_PATH_ + "models/ogro/",
      body: "ogro-light.js",
      skins: ["grok.jpg", "ogrobase.png", "arboshak.png", "ctf_r.png", "ctf_b.png", "darkam.png", "freedom.png", "gib.png", "gordogh.png", "igdosh.png", "khorne.png", "nabogro.png"],
      weapons:  [ [ "weapon-light.js", "weapon.jpg" ] ],
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

    //
    // private member
    //
    /** characters array */
    this.callback_function = callback_function;
    this.characters = new Array();
    this.cloneCharacterRoots = new Array();

    /*
     * clones
     */
    for (var i=0; i< nCharacters; i++) {
      var character = new THREE.MD2CharacterComplex();
      character.scale = 1;//3;
      character.controls = controls;

      var enemy = new Enemy();
      enemy.character = character;
      // 巡回点作成(field上ではこのようにランダムでいい、ダンジョンの場合は設計する事)
      enemy.target_positions_array = new Array();
      for (var j=0; j< 3; j++) {
        var x = Math.floor(Math.random()*1000) -500;
        var z = Math.floor(Math.random()*1000) -500;
        enemy.target_positions_array.push({x:x, z:z});
      }
      this.characters.push(enemy);
    }

    /*
     * base(通常のMD2と基本は同じ)
     */
    var baseCharacter = new THREE.MD2CharacterComplex();
    baseCharacter.scale = 3;
    var obj = this;
    baseCharacter.onLoadComplete = function() {
      for (var i=0; i<nCharacters; i++) {
        /*
         * baseからcloneへ分配
         */
        var cloneCharacter = obj.characters[i].character;
        cloneCharacter.shareParts(baseCharacter);
        cloneCharacter.enableShadows(true);
        cloneCharacter.setWeapon(0);
        cloneCharacter.setSkin(i);

        cloneCharacter.frontAcceleration = 0;
        cloneCharacter.controls.moveForward = true;

        cloneCharacter.root.position.x = i * 150 -500;
        cloneCharacter.root.position.y = 25;
        cloneCharacter.root.position.z = i * 150 -500;

        obj.cloneCharacterRoots.push(cloneCharacter.root);
      }
      obj.callback_function(obj.cloneCharacterRoots);
    };
    baseCharacter.loadParts(config);
  }

  /**
   * rendering method
   */
  rendering(delta)
  {
    for (var i=0; i<this.characters.length; i++) {
      this.characters[i].rendering(delta);
    }
  }
}
