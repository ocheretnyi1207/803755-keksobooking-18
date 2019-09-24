'use strict';

// Mohs data
var NUMBER_ADS = 8; // количество похожих объявлений
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

var indexAvatars = [];
var houseClasses = [];
var houseRooms = [];
var houseGuests = [];
var timeCheckins = [];
var timeCheckouts = [];
var houseAmeneties = [];
var houseDescription = [];
var housePhotos = [];
var locationX = [];
var locationY = [];

var similarAds = [];

for (var i = 0; i < NUMBER_ADS; i++) {

  indexAvatars[i] = getRandomArrayElement(numberAvatars);
  indexAvatars.push(indexAvatars[i]);

  houseClasses[i] = getRandomArrayElement(houseTypes);
  houseClasses.push(houseClasses[i]);

  houseRooms[i] = getRandomArrayElement(houseNumberRooms);
  houseRooms.push(houseRooms[i]);

  houseGuests[i] = getRandomArrayElement(houseNumberGuests);
  houseGuests.push(houseGuests[i]);

  timeCheckins[i] = getRandomArrayElement(timeEntrys);
  timeCheckins.push(timeCheckins[i]);

  timeCheckouts[i] = getRandomArrayElement(timeDepartures);
  timeCheckouts.push(timeCheckouts[i]);

  houseAmeneties[i] = getRandomArrayElement(houseFeatures);
  houseAmeneties.push(houseAmeneties[i]);

  houseDescription[i] = getRandomArrayElement(houseDefinitions);
  houseDescription.push(houseDescription[i]);

  housePhotos[i] = getRandomArrayElement(houseImage);
  housePhotos.push(housePhotos[i]);

  locationX[i] = getRandomArrayElement(coordinateX);
  locationX.push(locationX[i]);

  locationY[i] = getRandomArrayElement(coordinateY);
  locationY.push([i]);

  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user' + (indexAvatars[i]).toString(10) + '.png',
    },

    address: houseAdress[i],
    offer: {
      title: titleAds[i],
      address: houseAdress[i],
      price: houseCosts[i],
      type: houseClasses[i],
      rooms: houseNumberRooms[i],
      guests: houseNumberGuests[i],
      checkin: timeCheckins[i],
      checkout: timeCheckouts[i],
      features: houseAmeneties[i],
      description: houseDescription[i],
      photos: housePhotos[i],
      location: {
        x: locationX[i],
        y: locationY[i],
      }
    }
  };

  similarAds.push(similarAds[i]);
}

// Убираем класс map--faded у карты с классом map
document.querySelector('.map').classList.remove('map--faded');

// Ищем шаблон и место для вставки шаблонов

var similarAdsTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // шаблон метки
var similarList = document.querySelector('.map'); // вставляем шаблоны на карту


// Функция отрисовки объявления

var renderAds = function () {
  var adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.style = 'left:' + (similarAds[i].location.x).toString(10) + 'px' + ';' + 'top;' + (similarAds[i].location.y).toString(10) + 'px' + ';';
  adsElement.querySelector('img').src = similarAds[i].avatar;
};

// Вставка шаблонов на карту

var fragment = document.createDocumentFragment();

for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderAds(similarAds[i]));
}

similarList.appendChild(fragment);
