'use strict';

(function () {
  var NUMBER_ADS = 8; // количество похожих объявлений
  var LOCATION_X_PIN = 570; // координаты метки по горизонтали
  var LOCATION_Y_PIN = 375; // координаты метки по вертикали
  var HEIGHT_POINTER_PIN = 22; // высота указателя метки
  var WIDTH_PIN = 62; // ширина мекти
  var HEIGHT_PIN = 58 + HEIGHT_POINTER_PIN; // высота метки
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var indexAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var titleAds = ['1 объявление', '2 объявление', '3 объявление', '4 объявление', '5 объявление', '6 объявление', '7 объявление', '8 объявление'];
  var houseAddress = ['Лиговский пр-кт', 'Растанная ул.', 'Курляндская ул', 'Будапештская ул.', 'Средний проспект ВО', 'ул. Белинского', 'Литейный пр', 'ул. Маяковского'];
  var housePrice = [1250, 2845, 5000, 12384, 10200, 50000, 35000, 28000];
  var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
  var houseNumberRooms = [1, 2, 3, 4, 5];
  var houseNumberGuests = [1, 2, 3, 4, 5];
  var timeCheckins = ['12:00', '13:00', '14:00'];
  var timeCheckouts = ['12:00', '13:00', '14:00'];
  var houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var houseDescriptions = ['Большая площадь квартиры', 'Около метро', 'Тихие соседи', 'Рядом магазины', 'Красивый вид из окон', 'Много детских площадок', 'Недалеко парки'];
  var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var coordinateX = [250, 300, 350, 400, 450, 500, 550, 600];
  var coordinateY = [150, 200, 250, 300, 350, 400, 450, 500];

  window.util = {
    NUMBER_ADS: NUMBER_ADS,
    LOCATION_X_PIN: LOCATION_X_PIN,
    LOCATION_Y_PIN: LOCATION_Y_PIN,
    HEIGHT_POINTER_PIN: HEIGHT_POINTER_PIN,
    WIDTH_PIN: WIDTH_PIN,
    HEIGHT_PIN: HEIGHT_PIN,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    indexAvatars: indexAvatars,
    titleAds: titleAds,
    houseAddress: houseAddress,
    housePrice: housePrice,
    houseTypes: houseTypes,
    houseNumberRooms: houseNumberRooms,
    houseNumberGuests: houseNumberGuests,
    timeCheckins: timeCheckins,
    timeCheckouts: timeCheckouts,
    houseFeatures: houseFeatures,
    houseDescriptions: houseDescriptions,
    housePhotos: housePhotos,
    coordinateX: coordinateX,
    coordinateY: coordinateY,
  };
})();
