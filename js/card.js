'use strict';

(function () {

  // Шаблон #card
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Место для вставки шаблона #card
  var map = document.querySelector('.map');

  // Функция отрисовки модального окна с объявлением
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

  // Вставка шаблонов #card в .map-card
  window.load(function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.NUMBER_ADS; i++) {
      fragment.appendChild(renderCardTemplate(data[i]));
    }

    map.appendChild(fragment);
    map.appendChild(document.querySelector('.map__filters-container'));
  });
})();
