#!/bin/sh
#server side build
node node_modules/traceur/traceur --out tmp/app.compiled.js src/app.js
cat node_modules/traceur/bin/traceur.js tmp/app.compiled.js > bin/application.js
#client side build
cd webroot/js/app
node ../../../node_modules/traceur/traceur --out app.compiled.js app.js
node ../../../node_modules/uglify-js/bin/uglifyjs -o app.compiled.min.js app.compiled.js -c -m
#back to root directory
cd ../../../
#scss2css build
sass webroot/scss/style.scss:webroot/css/style.min.css --compass --style compressed --cache-location tmp/.sass-cache -E UTF-8
