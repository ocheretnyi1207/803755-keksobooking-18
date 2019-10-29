'use strict';

(function () {
  // Функция получения рандомного индекса элемента массива
  var getRandomIndexElement = function (arr) {
    var minIndex = 0;
    var maxIndex = arr.length;
    return Math.floor(Math.random() * ((maxIndex - minIndex) + minIndex));
  };

  // Функция получения рандомного элемента массива
  var getRandomArrayElement = function (arr) {
    var randomIndex = getRandomIndexElement(arr);
    return arr[randomIndex];
  };

  // Генерация объектов на основе мок данных
  var similarAds = [];

  for (var i = 0; i < window.util.NUMBER_ADS; i++) {

    similarAds.push({
      author: {
        avatar: 'img/avatars/user' + getRandomArrayElement(window.util.indexAvatars).toString(10) + '.png',
      },

      offer: {
        title: window.util.titleAds[i],
        address: getRandomArrayElement(window.util.houseAddress),
        price: window.util.housePrice[i],
        type: getRandomArrayElement(window.util.houseTypes),
        rooms: getRandomArrayElement(window.util.houseNumberRooms),
        guests: getRandomArrayElement(window.util.houseNumberGuests),
        checkin: getRandomArrayElement(window.util.timeCheckins),
        checkout: getRandomArrayElement(window.util.timeCheckouts),
        features: window.util.houseFeatures,
        description: getRandomArrayElement(window.util.houseDescriptions),
        photos: getRandomArrayElement(window.util.housePhotos),
      },

      location: {
        x: window.util.coordinateX[i],
        y: window.util.coordinateY[i],
      }
    });
  }

  window.similarAds = similarAds;
})();
