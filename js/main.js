'use strict';

// Входные данные
var NUMBER_ADS = 8; // количество похожих объявлений

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
var houseDescriptions = [
  'Большая площадь квартиры',
  'Около метро',
  'Тихие соседи',
  'Рядом магазины',
  'Красивый вид из окон',
  'Много детских площадок',
  'Недалеко парки'
];
var housePhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var coordinateX = [250, 300, 350, 400, 450, 500, 550, 600];
var coordinateY = [150, 200, 250, 300, 350, 400, 450, 500];

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


var similarAds = [];

for (var i = 0; i < NUMBER_ADS; i++) {

  similarAds[i] = {
    author: {
      avatar: 'img/avatars/user' + getRandomArrayElement(indexAvatars).toString(10) + '.png',
    },

    offer: {
      title: titleAds[i],
      address: getRandomArrayElement(houseAddress),
      price: housePrice[i],
      type: getRandomArrayElement(houseTypes),
      rooms: getRandomArrayElement(houseNumberRooms),
      guests: getRandomArrayElement(houseNumberGuests),
      checkin: getRandomArrayElement(timeCheckins),
      checkout: getRandomArrayElement(timeCheckouts),
      features: houseFeatures,
      description: getRandomArrayElement(houseDescriptions),
      photos: getRandomArrayElement(housePhotos),
    },

    location: {
      x: coordinateX[i],
      y: coordinateY[i],
    },
  };

  similarAds.push(similarAds[i]);
}

// Убираем класс map--faded у карты с классом map
document.querySelector('.map').classList.remove('map--faded');

// Шаблон #pin
var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Место для вставки шаблона #pin
var similarMapPinsList = document.querySelector('.map__pins');

// Функция отрисовки шаблона #pin
var renderMapPinTemplate = function () {
  var templateMapPinElement = similarMapPinTemplate.cloneNode(true);
  templateMapPinElement.style.left = similarAds[i].location.x + 'px';
  templateMapPinElement.style.top = similarAds[i].location.y + 'px';
  templateMapPinElement.querySelector('img').src = similarAds[i].author.avatar;
  templateMapPinElement.querySelector('img').alt = similarAds[i].offer.title;

  return templateMapPinElement;
};

// Вставка шаблона #pin в .map__pins
var fragment = document.createDocumentFragment();

for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderMapPinTemplate(similarAds[i]));
}

similarMapPinsList.appendChild(fragment);

// Шаблон #card
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Место для вставки шаблона #card
var similarMapCardsList = document.querySelector('.map');

// Функция отрисовки модального окна с объявлением
var renderCardTemplate = function () {
  var templateCardElement = similarCardTemplate.cloneNode(true);
  templateCardElement.querySelector('.popup__title').textContent = similarAds[i].offer.title;
  templateCardElement.querySelector('.popup__text--address').textContent = similarAds[i].offer.address;
  templateCardElement.querySelector('.popup__text--price').textContent = (similarAds[i].offer.price).toString(10) + ' Р/ночь';
  templateCardElement.querySelector('.popup__type').textContent = similarAds[i].offer.type;
  templateCardElement.querySelector('.popup__text--capacity').textContent = (similarAds[i].offer.rooms).toString(10) + ' комнаты для ' + (similarAds[i].offer.guests).toString(10) + ' гостей';
  templateCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + (similarAds[i].offer.checkin).toString(10) + ', ' + 'выезд до ' + (similarAds[i].offer.checkout).toString(10);

  var getComfortInAds = function (comfort) {
    templateCardElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
  };

  getComfortInAds('wifi');
  getComfortInAds('dishwasher');
  getComfortInAds('parking');
  getComfortInAds('washer');
  getComfortInAds('elevator');
  getComfortInAds('conditioner');

  templateCardElement.querySelector('.popup__description').textContent = similarAds[i].offer.description;

  var translationValues = function (incomingType, outgoingType) {
    if (similarAds[i].offer.type === incomingType) {
      templateCardElement.querySelector('.popup__type').textContent = outgoingType;
    }
  };

  translationValues('flat', 'Квартира');
  translationValues('bungalo', 'Бунгало');
  translationValues('palace', 'Дворец');
  translationValues('house', 'Дом');

  templateCardElement.querySelector('.popup__photo').src = similarAds[i].offer.photos;
  templateCardElement.querySelector('.popup__avatar').src = similarAds[i].author.avatar;

  return templateCardElement;
};

// Вставка шаблонов #card в .map-card
for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderCardTemplate(similarAds[i]));
}

similarMapCardsList.appendChild(fragment);

similarMapCardsList.appendChild(document.querySelector('.map__filters-container'));


