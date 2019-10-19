'use strict';

(function () {
  // Шаблон #pin
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // Место для вставки шаблона #pin
  var mapPins = document.querySelector('.map__pins');


  // Шаблон #card
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  // Место для вставки шаблона #card
  var map = document.querySelector('.map');


  // Функция отрисовки пинов
  var renderMapPinTemplate = function (arrayElement) {
    var mapPinTemplateElement = mapPinTemplate.cloneNode(true);
    mapPinTemplateElement.style.left = arrayElement.location.x + 'px';
    mapPinTemplateElement.style.top = arrayElement.location.y + 'px';
    mapPinTemplateElement.querySelector('img').src = arrayElement.author.avatar;
    mapPinTemplateElement.querySelector('img').alt = arrayElement.offer.title;

    return mapPinTemplateElement;
  };


  // Функция отрисовки объявления
  var renderCardTemplate = function (arrayElement) {

    var cardTemplateElement = cardTemplate.cloneNode(true);
    cardTemplateElement.querySelector('.popup__title').textContent = arrayElement.offer.title;
    cardTemplateElement.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
    cardTemplateElement.querySelector('.popup__text--price').textContent = (arrayElement.offer.price).toString(10) + ' Р/ночь';
    cardTemplateElement.querySelector('.popup__type').textContent = arrayElement.offer.type;
    cardTemplateElement.querySelector('.popup__text--capacity').textContent = (arrayElement.offer.rooms).toString(10) + ' комнаты для ' + (arrayElement.offer.guests).toString(10) + ' гостей';
    cardTemplateElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + (arrayElement.offer.checkin).toString(10) + ', ' + 'выезд до ' + (arrayElement.offer.checkout).toString(10);

    var getComfortInAds = function (comfort) {
      cardTemplateElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
    };

    getComfortInAds('wifi');
    getComfortInAds('dishwasher');
    getComfortInAds('parking');
    getComfortInAds('washer');
    getComfortInAds('elevator');
    getComfortInAds('conditioner');

    cardTemplateElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    var translationValues = function (typeEnglish, typeRussian) {
      if (arrayElement.offer.type === typeEnglish) {
        cardTemplateElement.querySelector('.popup__type').textContent = typeRussian;
      }
    };

    translationValues('flat', 'Квартира');
    translationValues('bungalo', 'Бунгало');
    translationValues('palace', 'Дворец');
    translationValues('house', 'Дом');

    cardTemplateElement.querySelector('.popup__photo').src = arrayElement.offer.photos;
    cardTemplateElement.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    return cardTemplateElement;
  };


  // Рендер элементов
  window.renderElements = function (data) {

    // Рендер пинов
    var fragmentMapPin = document.createDocumentFragment();

    for (var i = 0; i < window.util.NUMBER_ADS; i++) {
      fragmentMapPin.appendChild(renderMapPinTemplate(data[i]));
    }

    mapPins.appendChild(fragmentMapPin);

    // Рендер объявлений
    var fragmentMapCard = document.createDocumentFragment();

    for (i = 0; i < window.util.NUMBER_ADS; i++) {
      fragmentMapCard.appendChild(renderCardTemplate(data[i]));
    }

    map.appendChild(fragmentMapCard);

    // Деактивация объявлений после загрузки
    var mapCard = document.querySelectorAll('.map__card');

    for (i = 0; i < mapCard.length; i++) {
      mapCard[i].style.display = 'none';
    }

    map.appendChild(document.querySelector('.map__filters-container'));

    // Открытие объявления по клику на пин
    var aciveMapPinClickHandler = function (evt) {

      evt.preventDefault();

      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      for (i = 0; i < mapPin.length; i++) {
        if (mapPin[i].classList.contains('map__pin--active')) {
          mapPin[i].classList.remove('.map__pin--active');
        }
      }

      if (evt.target.tagName === 'IMG' && evt.target.className !== 'map__pin--main') {
        evt.target.closest('.map__pin').classList.add('map__pin--active');
      }

    };

    mapPins.addEventListener('click', aciveMapPinClickHandler);
  };

})();
