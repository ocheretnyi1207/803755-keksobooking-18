'use strict';

(function () {

  // Шаблон #pin
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Место для вставки шаблона #pin
  var mapPins = document.querySelector('.map__pins');

  /*
  // Шаблон #error
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  // Место для вставки шаблона #error
  var errorMain = document.querySelector('main');
  */

  // Функция отрисовки шаблона #pin
  var renderMapPinTemplate = function (arrayElement) {
    var mapPinTemplateElement = mapPinTemplate.cloneNode(true);
    mapPinTemplateElement.style.left = arrayElement.location.x + 'px';
    mapPinTemplateElement.style.top = arrayElement.location.y + 'px';
    mapPinTemplateElement.querySelector('img').src = arrayElement.author.avatar;
    mapPinTemplateElement.querySelector('img').alt = arrayElement.offer.title;

    return mapPinTemplateElement;
  };

  // Вставка шаблона #pin в .map__pins в случае получения данных от сервера
  var successPinHandler = function (data) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.NUMBER_ADS; i++) {
      fragment.appendChild(renderMapPinTemplate(data[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.load(successPinHandler);
})();
