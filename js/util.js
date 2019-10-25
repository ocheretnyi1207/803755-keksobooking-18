'use strict';

(function () {
  var NUMBER_ADS = 9; // количество похожих объявлений
  var LOCATION_X_PIN = 570; // координаты метки по горизонтали
  var LOCATION_Y_PIN = 375; // координаты метки по вертикали
  var HEIGHT_POINTER_PIN = 22; // высота указателя метки
  var WIDTH_PIN = 66; // ширина мекти
  var HEIGHT_PIN = 66 + HEIGHT_POINTER_PIN; // высота метки
  var ESC_KEYCODE = 27; // кейкод ESC
  var ENTER_KEYCODE = 13; // кейкод ENTER

  window.util = {
    NUMBER_ADS: NUMBER_ADS,
    LOCATION_X_PIN: LOCATION_X_PIN,
    LOCATION_Y_PIN: LOCATION_Y_PIN,
    HEIGHT_POINTER_PIN: HEIGHT_POINTER_PIN,
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
  };
})();
