'use strict';


// Входные данные
var NUMBER_ADS = 8; // количество похожих объявлений
var LOCATION_X_PIN = 570; // координаты метки по горизонтали
var LOCATION_Y_PIN = 375; // координаты метки по вертикали
var HEIGHT_POINTER_PIN = 22; // высота указателя метки
var WIDTH_PIN = 62; // ширина мекти
var HEIGHT_PIN = 58 + HEIGHT_POINTER_PIN; // высота метки

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


// Шаблон #pin
var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


// Место для вставки шаблона #pin
var similarMapPinsList = document.querySelector('.map__pins');


// Функция отрисовки шаблона #pin
var renderMapPinTemplate = function (elementArrayObject) {
  var templateMapPinElement = similarMapPinTemplate.cloneNode(true);
  templateMapPinElement.style.left = elementArrayObject.location.x + 'px';
  templateMapPinElement.style.top = elementArrayObject.location.y + 'px';
  templateMapPinElement.querySelector('img').src = elementArrayObject.author.avatar;
  templateMapPinElement.querySelector('img').alt = elementArrayObject.offer.title;

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
var renderCardTemplate = function (elementArrayObject) {
  var templateCardElement = similarCardTemplate.cloneNode(true);
  templateCardElement.querySelector('.popup__title').textContent = elementArrayObject.offer.title;
  templateCardElement.querySelector('.popup__text--address').textContent = elementArrayObject.offer.address;
  templateCardElement.querySelector('.popup__text--price').textContent = (elementArrayObject.offer.price).toString(10) + ' Р/ночь';
  templateCardElement.querySelector('.popup__type').textContent = elementArrayObject.offer.type;
  templateCardElement.querySelector('.popup__text--capacity').textContent = (elementArrayObject.offer.rooms).toString(10) + ' комнаты для ' + (elementArrayObject.offer.guests).toString(10) + ' гостей';
  templateCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + (elementArrayObject.offer.checkin).toString(10) + ', ' + 'выезд до ' + (elementArrayObject.offer.checkout).toString(10);

  var getComfortInAds = function (comfort) {
    templateCardElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
  };

  getComfortInAds('wifi');
  getComfortInAds('dishwasher');
  getComfortInAds('parking');
  getComfortInAds('washer');
  getComfortInAds('elevator');
  getComfortInAds('conditioner');

  templateCardElement.querySelector('.popup__description').textContent = elementArrayObject.offer.description;

  var translationValues = function (incomingType, outgoingType) {
    if (elementArrayObject.offer.type === incomingType) {
      templateCardElement.querySelector('.popup__type').textContent = outgoingType;
    }
  };

  translationValues('flat', 'Квартира');
  translationValues('bungalo', 'Бунгало');
  translationValues('palace', 'Дворец');
  translationValues('house', 'Дом');

  templateCardElement.querySelector('.popup__photo').src = elementArrayObject.offer.photos;
  templateCardElement.querySelector('.popup__avatar').src = elementArrayObject.author.avatar;

  return templateCardElement;
};


// Вставка шаблонов #card в .map-card
for (i = 0; i < similarAds.length; i++) {
  fragment.appendChild(renderCardTemplate(similarAds[i]));
}

similarMapCardsList.appendChild(fragment);
similarMapCardsList.appendChild(document.querySelector('.map__filters-container'));


// Добавляем атрибут disabled всем элементам формы (при неактивной странице)
var formFieldset = document.querySelector('.ad-form').querySelectorAll('.ad-form__element');

for (i = 0; i < formFieldset.length; i++) {
  formFieldset[i].disabled = 'disabled';
}


// Вставляем координаты пина в поле адреса (при неактивной странице)
document.querySelector('#address').value = (LOCATION_X_PIN + (WIDTH_PIN / 2)) + ', ' + (LOCATION_Y_PIN + ((HEIGHT_PIN - HEIGHT_POINTER_PIN) / 2));


// Делаем страницу активной. Добавляем обработчик событий на .map__pin--main
// по нажатию на кнопку мыши
var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  for (i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = '';
  }

  document.querySelector('#address').value = Math.floor(LOCATION_X_PIN + (WIDTH_PIN / 2)) + ', ' + Math.floor(LOCATION_Y_PIN + HEIGHT_PIN);
});


// по нажатию на Enter
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  }
});

// Изменение min значения поля цены за ночь в зависимости от типа выбранного жилья
var dependPriceChangeOfTypeHouse = function (idSelect, idPriceFieldForm, indexOption, valueMinPrice, valuePlaceholder) {
  if (document.querySelector(idSelect).options[indexOption].selected) {
    document.querySelector(idPriceFieldForm).min = valueMinPrice;
    document.querySelector(idPriceFieldForm).placeholder = valuePlaceholder;
  }
};

document.querySelector('#type').addEventListener('change', function () {

  dependPriceChangeOfTypeHouse('#type', '#price', 0, 0, '0');
  dependPriceChangeOfTypeHouse('#type', '#price', 1, 1000, '1000');
  dependPriceChangeOfTypeHouse('#type', '#price', 2, 5000, '5000');
  dependPriceChangeOfTypeHouse('#type', '#price', 3, 10000, '10000');
});

// Сценарий соответствия количества гостей и количества комнат
var selectRoomNumber = document.querySelector('#room_namber');

var selectGuestNumber = document.querySelector('#capacity');

selectRoomNumber.addEventListener('invalid', function (evt) {

  if ((selectRoomNumber.options[0].selected && selectGuestNumber.options[0].selected).validity.valid) {
    selectRoomNumber.setCustomValidity('Вы можете забронировать 1 комнату для 1 гостя');
    selectGuestNumber.setCustomValidity('Вы можете забронировать 1 комнату для 1 гостя');
  }
});
