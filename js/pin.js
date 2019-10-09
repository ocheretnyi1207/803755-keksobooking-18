'use strict';

(function () {

  // Шаблон #pin
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Место для вставки шаблона #pin
  var similarMapPinsList = document.querySelector('.map__pins');

  // Функция отрисовки шаблона #pin
  var renderMapPinTemplate = function (arrayElement) {
    var templateMapPinElement = similarMapPinTemplate.cloneNode(true);
    templateMapPinElement.style.left = arrayElement.location.x + 'px';
    templateMapPinElement.style.top = arrayElement.location.y + 'px';
    templateMapPinElement.querySelector('img').src = arrayElement.author.avatar;
    templateMapPinElement.querySelector('img').alt = arrayElement.offer.title;

    return templateMapPinElement;
  };

  // Вставка шаблона #pin в .map__pins
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.util.NUMBER_ADS; i++) {
    fragment.appendChild(renderMapPinTemplate(window.similarAds[i]));
  }

  similarMapPinsList.appendChild(fragment);

})();
