/*
 * util.js
 * 
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXConfig from './config';

/**
 * debug_board デバッグ板に文字列を出力する
 * @param {string} str
 */
export function trace_func(str)
{
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
function pad(n) { return ("0" + n).slice(-2); }

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
    $('#debug_board').text(log_time + ' ' + str);
  }
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

