'use strict';

(function () {
  // Добавление атрибута disabled полям формы при неактивной странице
  var formFieldset = document.querySelector('.ad-form').querySelectorAll('.ad-form__element');

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'disabled';
  }


  // Координаты main__pin--main при неактивной странице
  document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));


  // Активация страницы по нажатию на кнопку мыши
  var activateMapClickHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    // Активация полей формы
    for (i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }

    // Отрисовка пинов на карте
    window.load(window.renderElements);

    mapPinMain.removeEventListener('click', activateMapClickHandler);
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('click', activateMapClickHandler);


  // Активация страницы по нажатию на Enter
  var activateMapKeydownHandler = function (evt) {

    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      // Активация полей формы
      for (i = 0; i < formFieldset.length; i++) {
        formFieldset[i].disabled = '';
      }

      // Отрисовка пинов на карте
      window.load(window.renderElements);

      mapPinMain.removeEventListener('click', activateMapClickHandler);
    }
  };

  mapPinMain.addEventListener('keydown', activateMapKeydownHandler);


  // Перемещение map__pin--main по карте
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Перемещение метки по карте
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

      // Ограничение перемещения метки
      var isTopLimit = (mapPinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) < 130;
      var isBottomLimit = (mapPinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) > 630;
      var isLeftLimit = (mapPinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) < 0;
      var isRightLimit = (mapPinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) > 1200;

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

})();
