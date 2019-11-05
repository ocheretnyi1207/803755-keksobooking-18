'use strict';

(function () {
  // Добавление атрибута disabled полям формы при неактивной странице
  var formFieldset = document.querySelectorAll('fieldset');

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'disabled';
  }


  // Координаты main__pin--main при неактивной странице
  document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));


  // Активация страницы по нажатию на кнопку мыши
  window.activateMapClickHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    // Активация полей формы
    for (i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }

    // Отрисовка пинов, объявлений, ошибок
    window.load(window.filter, window.renderError);

    pinMain.removeEventListener('click', window.activateMapClickHandler);
  };

  var pinMain = document.querySelector('.map__pin--main');
  pinMain.addEventListener('click', window.activateMapClickHandler);


  // Активация страницы по нажатию на Enter
  window.activateMapKeydownHandler = function (evt) {

    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      document.querySelector('.map').classList.remove('map--faded');
      document.querySelector('.ad-form').classList.remove('ad-form--disabled');

      // Активация полей формы
      for (i = 0; i < formFieldset.length; i++) {
        formFieldset[i].disabled = '';
      }

      // Отрисовка пинов, объявлений, ошибок
      window.load(window.filter, window.renderError);

      pinMain.removeEventListener('click', window.activateMapKeydownHandler);
    }
  };

  pinMain.addEventListener('keydown', window.activateMapKeydownHandler);


  // Перемещение map__pin--main по карте
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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
      var isTopLimit = (pinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) < window.util.TOP_LIMIT;
      var isBottomLimit = (pinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) > window.util.BOTTOM_LIMIT;
      var isLeftLimit = (pinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) < window.util.LEFT_LIMIT;
      var isRightLimit = (pinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) > window.util.RIGHT_LIMIT;

      if (isTopLimit || isBottomLimit || isLeftLimit || isRightLimit) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      } else {
        pinMain.style.left = (pinMain.offsetLeft - displacement.x) + 'px';
        pinMain.style.top = (pinMain.offsetTop - displacement.y) + 'px';
      }

      document.querySelector('#address').value = (pinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) + ', ' + (pinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN);
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
