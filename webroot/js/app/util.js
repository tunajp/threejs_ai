/*
 * util.js
 * 
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXConfig from './config';

/**
 * trace_func
 * デバッグモード時にconsoleに文字列を出力する
 *
 * @param {string} str
 */
export function trace_func(str)
{
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

/**
 * debug_board デバッグ板に文字列を出力する
 * @param {string} str
 */
export function debug_board(str)
{
  'use strict';
  if (PXConfig._DEBUG_MODE_) {
    var d = new Date();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    var dd = d.getMilliseconds();
    var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
    //$('#debug_board').text(log_time + ' ' + str);
    $('#debug_board').html(log_time + ' ' + str);
  }
}

/**
 * WebGL Info(https://github.com/tapio/plasma-forks/blob/master/js/utils.js)
 */
export function webgl_info(renderer)
{
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

/**
 * screenshot(https://github.com/tapio/plasma-forks/blob/master/js/utils.js)
 */
export function screenshot(dontDownload, useJPG) {
  var imgtype = useJPG ? "image/jpeg" : "image/png";
  var dataUrl = renderer.domElement.toDataURL(imgtype);
  if (!dontDownload) dataUrl = dataUrl.replace(imgtype, "image/octet-stream");
  window.open(dataUrl, "_blank");
}

/**
 * Hoge class
 */
export class Hoge{
  /**
   * constructor
   */
  constructor()
  {
  }
  
  /**
   * hoge method
   * @argument {int} x description
   */
  hoge(x)
  {
    console.log('Hoge::hoge');
  }
}

/**
 * 確認ダイアログ(http://tilfin.hatenablog.com/entry/20080616/1213695611)
 *
 * message      : ダイアログのメッセージ本文
 * title        : ダイアログのタイトル
 * buttonok     : OKボタンのテキスト
 * buttoncancel : キャンセルボタンのテキスト
 * response     : コールバック関数を指定する。引数 cancel にボタン選択の結果が入る。
 *                OK ならば false キャンセルならば true となる。
 * サンプル:
 * confirmDialog('この処理を続行しますか？', '確認', 'OK', 'キャンセル', function(cancel){
 *   if (cancel) return;
 *   処理を書く
 *   });
 */
export function confirmDialog(message, title, buttonok, buttoncancel, response)
{
  var _dlg = $('<div>' + message + '</div>');
  var _buttons = {};
  _buttons[buttonok] = function(){
    $(this).dialog('close');
    response(false)
    $(this).dialog('destroy');
  };
  _buttons[buttoncancel] = function(){
    $(this).dialog('close');
    response(true)
    $(this).dialog('destroy');
  };
  
  _dlg.dialog({
    modal: true,
    draggable: true,
    title: title,
    height:180,
    width: 500,
    buttons:_buttons,
    // http://stackoverflow.com/questions/8681707/jqueryui-modal-dialog-does-not-show-close-button-x
    open: function(){
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
    },
    overlay: {opacity:0.3, background: "#225b7f"}
  });
}

/**
 * ダイアログ(http://tilfin.hatenablog.com/entry/20080616/1213695611)
 *
 * message      : ダイアログのメッセージ本文
 * title        : ダイアログのタイトル
 * buttonok     : OKボタンのテキスト
 * buttoncancel : キャンセルボタンのテキスト
 * response     : コールバック関数を指定する。引数 cancel にボタン選択の結果が入る。
 *                OK ならば false キャンセルならば true となる。
 * サンプル:
 * confirmDialog('この処理を続行しますか？', '確認', 'OK', 'キャンセル', function(cancel){
 *   if (cancel) return;
 *   処理を書く
 *   });
 */
export function myDialog(message, title, buttonok, buttoncancel, response)
{
  var _dlg = $('<div>' + message + '</div>');
  var _buttons = {};
  _buttons[buttonok] = function(){
    $(this).dialog('close');
    response(false)
    $(this).dialog('destroy');
  };
  _buttons[buttoncancel] = function(){
    $(this).dialog('close');
    response(true)
    $(this).dialog('destroy');
  };
  
  _dlg.dialog({
    modal: true,
    draggable: true,
    title: title,
    //height:180,
    width: 500,
    buttons:_buttons,
    // http://stackoverflow.com/questions/8681707/jqueryui-modal-dialog-does-not-show-close-button-x
    open: function(){
        var closeBtn = $('.ui-dialog-titlebar-close');
        closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
    },
    overlay: {opacity:0.3, background: "#225b7f"}
  });
  //tinymce.init({selector:'textarea'});
}

/**
 * uuid
 * makeUUID
 * @param a placeholder
 *
 * https://gist.github.com/jed/982883
 */
export function uuid(a)
{
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      >> a/4         // 8 to 11
      ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      [1e7] +        // 10000000 +
      -1e3 +         // -1000 +
      -4e3 +         // -4000 +
      -8e3 +         // -80000000 +
      -1e11          // -100000000000,
      ).replace(     // replacing
        /[018]/g,    // zeroes, ones, and eights with
        uuid            // random hex digits
      );
}

export function i18nLoad(callback_function)
{
  $.i18n.init({
    //lng: 'en-US',
    ns: { namespaces: ['ns.special'], defaultNs: 'ns.special'},
    useLocalStorage: false,
    debug: true
  }, function() {
    //var name = $.i18n.t('app.name');
    //$('#name').text(name);
    callback_function();
  });
}
