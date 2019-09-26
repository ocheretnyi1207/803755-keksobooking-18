'use strict';

// Mohs data
var NUMBER_ADS = 8; // количество похожих объявлений

var indexAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleAds = ['1 объявление', '2 объявление', '3 объявление', '4 объявление', '5 объявление', '6 объявление', '7 объявление', '8 объявление'];
var houseAdress = ['Лиговский пр-кт', 'Растанная ул.', 'Курляндская ул', 'Будапештская ул.', 'Средний проспект ВО', 'ул. Белинского', 'Литейный пр', 'ул. Маяковского'];
var housePrice = [1250, 2845, 5000, 12384, 10200, 50000, 35000, 28000];
var houseTypes = ['palace', 'flat', 'house', 'bungalo'];
var houseNumberRooms = [1, 2, 3, 4, 5];
var houseNumberGuests = [1, 2, 3, 4, 5];
var timeCheckins = ['12:00', '13:00', '14:00'];
var timeCheckouts = ['12:00', '13:00', '14:00'];
var houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var houseDescriptions = ['Качественный ремонт', 'Около метро', 'Тихие соседи', 'Рядом магазины', 'Красивый вид из окон', 'Много детских площадок', 'Недалеко парки'];
var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var coordinateX = [250, 300, 350, 400, 450, 500, 550, 600];
var coordinateY = [150, 200, 250, 300, 350, 400, 450, 500];

// Функция получения рандомного индекса элемента массива

var getRandomIndexElement = function (arr) {
  var minIndex = 0;
  var maxIndex = arr.length;
  var randomIndex = Math.floor(Math.random() * ((maxIndex - minIndex) + minIndex));
  return randomIndex;
};

// Функция получения рандомного элемента массива

var getRandomArrayElement = function (arr) {
  var randomIndex = getRandomIndexElement(arr);
  return arr[randomIndex];
};


var similarAds = [];

for (var i = 0; i < NUMBER_ADS; i++) {

  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user' + getRandomArrayElement(indexAvatars).toString(10) + '.png',
    },

    offer: {
      title: titleAds[i],
      address: houseAdress[i],
      price: housePrice[i],
      type: getRandomArrayElement(houseTypes),
      rooms: getRandomArrayElement(houseNumberRooms),
      guests: getRandomArrayElement(houseNumberGuests),
      checkin: getRandomArrayElement(timeCheckins),
      checkout: getRandomArrayElement(timeCheckouts),
      features: getRandomArrayElement(houseFeatures),
      description: houseDescriptions[i],
      photos: getRandomArrayElement(housePhotos),

      location: {
        x: coordinateX[i],
        y: coordinateY[i],
      }
    }
  };

  similarAds.push(similarAds[i]);
}

// Убираем класс map--faded у карты с классом map
document.querySelector('.map').classList.remove('map--faded');

// Ищем шаблон и место для вставки шаблонов

var similarTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // шаблон метки
var similarList = document.querySelector('.map'); // вставляем шаблоны на карту


// Функция отрисовки указателя

var renderTemplate = function () {
  var templateElement = similarTemplate.cloneNode(true);
  templateElement.style = similarAds[i].x + 'px';
  templateElement.style = similarAds[i].y + 'px';
  templateElement.querySelector('img').src = similarAds[i].avatar;
  templateElement.querySelector('img').alt = similarAds[i].title;
};

// Вставка шаблонов на карту

var fragment = document.createDocumentFragment();

for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderTemplate(similarAds[i]));
}

similarList.appendChild(fragment);
