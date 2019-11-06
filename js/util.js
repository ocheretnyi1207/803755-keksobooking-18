'use strict';

(function () {
  var NUMBER_ADS = 8; // количество похожих объявлений
  var LOCATION_X_PIN = 570; // координаты метки по горизонтали
  var LOCATION_Y_PIN = 375; // координаты метки по вертикали
  var HEIGHT_POINTER_PIN = 22; // высота указателя метки
  var WIDTH_PIN = 64; // ширина метки
  var HEIGHT_PIN = 64 + HEIGHT_POINTER_PIN; // высота метки
  var CENTER_X_PIN = WIDTH_PIN / 2;
  var CENTER_Y_PIN = HEIGHT_PIN / 2;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var LEFT_LIMIT = 0;
  var RIGHT_LIMIT = 1200;
  var ESC_KEYCODE = 27; // кейкод ESC
  var ENTER_KEYCODE = 13; // кейкод ENTER
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';
  var SERVER_RESPONCE_SUCCESS = 200;
  var TIMEOUT = 10000;
  var MAX_VISIBLE_PIN = 5;
  var DEBOUNCE_INTERVAL = 500;


  window.util = {
    NUMBER_ADS: NUMBER_ADS,
    LOCATION_X_PIN: LOCATION_X_PIN,
    LOCATION_Y_PIN: LOCATION_Y_PIN,
    HEIGHT_POINTER_PIN: HEIGHT_POINTER_PIN,
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    CENTER_X_PIN: CENTER_X_PIN,
    CENTER_Y_PIN: CENTER_Y_PIN,
    TOP_LIMIT: TOP_LIMIT,
    BOTTOM_LIMIT: BOTTOM_LIMIT,
    LEFT_LIMIT: LEFT_LIMIT,
    RIGHT_LIMIT: RIGHT_LIMIT,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    SERVER_RESPONCE_SUCCESS: SERVER_RESPONCE_SUCCESS,
    TIMEOUT: TIMEOUT,
    MAX_VISIBLE_PIN: MAX_VISIBLE_PIN,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL
  };
})();
