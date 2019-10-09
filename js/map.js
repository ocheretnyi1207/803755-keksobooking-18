'use strict';

(function () {

  // Добавляем атрибут disabled всем элементам формы (при неактивной странице)
  var formFieldset = document.querySelector('.ad-form').querySelectorAll('.ad-form__element');

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'disabled';
  }

  // Вставляем координаты пина в поле адреса (при неактивной странице)
  document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));

  // Делаем страницу активной. Добавляем обработчик событий на .map__pin--main
  // по нажатию на кнопку мыши
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    for (i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }

    document.querySelector('#address').value = Math.floor(window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + Math.floor(window.util.LOCATION_Y_PIN + window.util.HEIGHT_PIN);
  });

  // по нажатию на Enter
  mapPinMain.addEventListener('keydown', function (evt) {

    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    }

  });

  // Сценарий закрытия карточки объявления
  // по клику на кнопку закрытия
  var buttonCloseAdsClickHandler = function (evt) {

    if (evt.target.className === 'popup__close') {
      evt.target.closest('.map__card').style.display = 'none';
    }

  };

  var map = document.querySelector('.map');
  map.addEventListener('click', buttonCloseAdsClickHandler);

  // по нажатию на ESC
  var articleMapCardKeydownHandler = function (evt) {

    if (evt.target.className === 'popup__close') {

      if (evt.keyCode === window.util.ESC_KEYCODE) {
        evt.target.closest('.map__card').style.display = 'none';
      }

    }
  };

  map.addEventListener('keydown', articleMapCardKeydownHandler);

  // Сценарий открытия карточки объявления по нажатию на Enter
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapCard = document.querySelectorAll('.map__card');

  var cardAdsOpen = function (index) {
    return function (evt) {

      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        mapCard[index].style.display = 'block';
      }

    };
  };

  for (i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener('keydown', cardAdsOpen(i));
  }

})();
