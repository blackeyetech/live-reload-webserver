"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const express = require("express");

const gulpLivereload = require("gulp-livereload");
const connectLivereload = require("connect-livereload");

const HTML_ROOT = "html";
const ALL_FILES = `${HTML_ROOT}/**/*.*`;

const INTERFACE = "0.0.0.0";
const PORT = 8000;

const app = express();

let reload = cb => {
  // uses the callback to indicate completion
  src(ALL_FILES).pipe(gulpLivereload());
  cb();
};

let start = () => {
  // NOTE: The RELOAD_HOST and RELOAD_PORT are for the browser to connect
  // to and not the server to listen to
  app.use(
    connectLivereload({
      hostname: process.env.RELOAD_HOST,
      port: process.env.RELOAD_PORT,
    }),
  );
  app.use(express.static(`./${HTML_ROOT}`));
  app.listen(PORT, INTERFACE);

  gulpLivereload.listen({
    quiet: false,
  });

  watch(ALL_FILES, reload);
};

module.exports = {
  start,
  default: start,
};
