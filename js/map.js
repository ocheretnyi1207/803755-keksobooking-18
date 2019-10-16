'use strict';

(function () {

  // Делаем все пины и карточки с объявлениями неактивными
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapCard = document.querySelectorAll('.map__card');

  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].style.display = 'none';
  }

  // Добавляем атрибут disabled всем элементам формы (при неактивной странице)
  var formFieldset = document.querySelector('.ad-form').querySelectorAll('.ad-form__element');

  for (i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'disabled';
  }

  // Вставляем координаты пина в поле адреса (при неактивной странице)
  document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));

  // Делаем страницу активной
  // по нажатию на кнопку мыши
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    for (i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }

    // Сценарий перемещения метки
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var displacement = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Ограничение перемещения метки по вертикали и горизонтали
      var isTopLimit = (mapPinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) < 130;
      var isBottomLimit = (mapPinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) > 630;
      var isLeftLimit = (mapPinMain.offsetLeft - displacement.x) < 0;
      var isRightLimit = (mapPinMain.offsetLeft - displacement.x + window.util.WIDTH_PIN) > 1200;

      if (isTopLimit || isBottomLimit || isLeftLimit || isRightLimit) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - displacement.x).toString(10) + 'px';
        mapPinMain.style.top = (mapPinMain.offsetTop - displacement.y).toString(10) + 'px';
      }


      document.querySelector('#address').value = (mapPinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) + ', ' + (mapPinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
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
  function cardAdsOpen(index) {
    return function (evt) {

      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        mapCard[index].style.display = 'block';
      }

    };
  }


  for (i = 0; i < window.util.NUMBER_ADS; i++) {
    mapPin[i].addEventListener('keydown', cardAdsOpen(i));
  }

})();
