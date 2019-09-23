'use strict';

// Mohs data

var numberAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleAds = ['1 объявление', '2 объявление', '3 объявление', '4 объявление', '5 объявление', '6 объявление', '7 объявление', '8 объявление'];
var houseAdress = ['Лиговский пр-кт', 'Растанная ул.', 'Курляндская ул', 'Будапештская ул.', 'Средний проспект ВО', 'ул. Белинского', 'Литейный пр', 'ул. Маяковского'];
var houseCosts = [1250, 2845, 5000, 12384, 10200, 50000, 35000, 28000];
var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
var houseNumberRooms = [1, 2, 3, 4, 5];
var houseNumberGuests = [1, 2, 3, 4, 5];
var timeEntrys = ['12:00', '13:00', '14:00'];
var timeDepartures = ['12:00', '13:00', '14:00'];
var houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var houseDefinitions = ['Качественный ремонт', 'Около метро', 'Тихие соседи', 'Рядом магазины', 'Красивый вид из окон', 'Много детских площадок', 'Недалеко парки'];
var houseImage = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var coordinateX = [250, 300, 350, 400, 450, 500, 550, 600];
var coordinateY = [150, 200, 250, 300, 350, 400, 450, 500];

var NUMBER_ADS = 8; // количество похожих объявлений

var similarAdsTemplate = document.querySelector('.card').content;


// Функция генерации рандомного индекса элемента массива

var getRandomIndexElement = function (arr) {
  var minIndex = 0;
  var maxIndex = arr.length;
  var randomIndex = Math.floor(Math.random() * ((maxIndex - minIndex) + minIndex));
  return randomIndex;
};

// Функция генерации рандомного элемента массива

var getRandomArrayElement = function (arr) {
  var randomIndex = getRandomIndexElement(arr);
  return arr[randomIndex];
};

var similarAds = [];

for (var i = 0; i < NUMBER_ADS; i++) {

  indexAvatars[i] = getRandomArrayElement(numberAvatars);
  houseClasses[i] = getRandomArrayElement(houseTypes);
  timeCheckins[i] = getRandomArrayElement(timeEntrys);
  timeCheckouts[i] = getRandomArrayElement(timeDepartures);
  houseAmeneties[i] = getRandomArrayElement(houseFeatures);
  houseDescription[i] = getRandomArrayElement(houseDefinitions);
  housePhotos[i] = getRandomArrayElement(houseImage);
  locationX[i] = getRandomArrayElement(coordinateX);
  locationY[i] = getRandomArrayElement(coordinateY);

  similarAds[i] = {
    "author": {
      "avatar": 'img/avatars/user' + (indexAvatars[i]).toString(10) + '.png',
    },

    "offer": {
      "title": titleAds[i],
      "address": houseAdress[i],
      "price": houseCosts[i],
      "type": houseClasses[i],
      "rooms": houseNumberRooms[i],
      "guests": houseNumberGuests[i],
      "checkin": timeCheckins[i],
      "checkout": timeCheckouts[i],
      "features": houseAmeneties[i],
      "description": houseDescription[i],
      "photos": housePhotos[i],

      "location": {
        "x": locationX[i],
        "y": locationY[i],
      }
    }
  };

  similarAds.push(similarAds[i]);
}

// Функция отрисовки объявления

var renderAds = function () {
  var adsElement = similarAdsTemplate.cloneNode(true);

  return adsElement;
};

// Вставка шаблонов в список

var fragment = document.createDocumentFragment();

for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderAds(similarAds[i]));
}

document.querySelector('.map').classList.remove('map--faded');
