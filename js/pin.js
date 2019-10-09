'use strict';

(function () {
  // Шаблон #pin
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  // Место для вставки шаблона #pin
  var similarMapPinsList = document.querySelector('.map__pins');


  // Функция отрисовки шаблона #pin
  var renderMapPinTemplate = function (elementArrayObject) {
    var templateMapPinElement = similarMapPinTemplate.cloneNode(true);
    templateMapPinElement.style.left = elementArrayObject.window.similarAds.location.x + 'px';
    templateMapPinElement.style.top = elementArrayObject.window.similarAds.location.y + 'px';
    templateMapPinElement.querySelector('img').src = elementArrayObject.window.similarAds.author.avatar;
    templateMapPinElement.querySelector('img').alt = elementArrayObject.window.similarAds.offer.title;

    return templateMapPinElement;
  };


  // Вставка шаблона #pin в .map__pins
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.util.NUMBER_ADS; i++) {
    fragment.appendChild(renderMapPinTemplate(window.similarAds[i]));
  }

  similarMapPinsList.appendChild(fragment);
})();
