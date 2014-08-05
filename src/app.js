/*
 * app.js
 *
 * @author Mitsunori Inaba <m-inaba@phoenixdesign.jp>
 */

import * as PXConfig from './config';
import * as PXUtil from './util';

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
    /** http */
    this.http_ = require('http');
    /** connect */
    this.connect_ = require('connect');
    /** static */
    this.serveStatic = require('serve-static');
    // TODO:socketIO
  }
  /**
   * run method
   */
  run()
  {
    PXUtil.trace_func('App::run');

    /*
     * httpd
     */
    var con = this.connect_()
      .use(this.serveStatic('./webroot'))
      //.use(this.connect_.logger('dev'));
      ;
    var server = this.http_.createServer(con);

    server.listen(80);
  }
}

/**
 * インスタンスの作成と実行
 */
var app = new Application();
app.run();
