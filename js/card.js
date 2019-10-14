/*
'use strict';

(function () {

  // Шаблон #card
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Место для вставки шаблона #card
  var similarMapCardsList = document.querySelector('.map');

  // Функция отрисовки модального окна с объявлением
  var renderCardTemplate = function (arrayElement) {

    var templateCardElement = similarCardTemplate.cloneNode(true);
    templateCardElement.querySelector('.popup__title').textContent = arrayElement.offer.title;
    templateCardElement.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
    templateCardElement.querySelector('.popup__text--price').textContent = (arrayElement.offer.price).toString(10) + ' Р/ночь';
    templateCardElement.querySelector('.popup__type').textContent = arrayElement.offer.type;
    templateCardElement.querySelector('.popup__text--capacity').textContent = (arrayElement.offer.rooms).toString(10) + ' комнаты для ' + (arrayElement.offer.guests).toString(10) + ' гостей';
    templateCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + (arrayElement.offer.checkin).toString(10) + ', ' + 'выезд до ' + (arrayElement.offer.checkout).toString(10);

    var getComfortInAds = function (comfort) {
      templateCardElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
    };

    getComfortInAds('wifi');
    getComfortInAds('dishwasher');
    getComfortInAds('parking');
    getComfortInAds('washer');
    getComfortInAds('elevator');
    getComfortInAds('conditioner');

    templateCardElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    var translationValues = function (typeEnglish, typeRussian) {
      if (arrayElement.offer.type === typeEnglish) {
        templateCardElement.querySelector('.popup__type').textContent = typeRussian;
      }
    };

    translationValues('flat', 'Квартира');
    translationValues('bungalo', 'Бунгало');
    translationValues('palace', 'Дворец');
    translationValues('house', 'Дом');

    templateCardElement.querySelector('.popup__photo').src = arrayElement.offer.photos;
    templateCardElement.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    return templateCardElement;
  };

  // Вставка шаблонов #card в .map-card
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.util.NUMBER_ADS; i++) {
    fragment.appendChild(renderCardTemplate(window.similarAds[i]));
  }

  similarMapCardsList.appendChild(fragment);
  similarMapCardsList.appendChild(document.querySelector('.map__filters-container'));

})();
*/
