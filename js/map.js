'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('fieldset');

  // Добавление атрибута disabled полям формы при неактивной странице
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = 'disabled';
  }

  // Координаты main__pin--main при неактивной странице
  document.querySelector('#address').value = (window.util.LOCATION_X_PIN + window.util.CENTER_X_PIN) + ', ' + (window.util.LOCATION_Y_PIN + window.util.CENTER_Y_PIN);

  // Функция активации страницы по нажатию на кнопку мыши
  var activateMapClickHandler = function () {
    var map = document.querySelector('.map');
    var mainForm = document.querySelector('.ad-form');
    var mapFiltersForm = document.querySelector('.map__filters');

    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('ad-form--disabled');

    // Активация полей формы
    for (i = 0; i < formFieldset.length; i++) {
      formFieldset[i].disabled = '';
    }

    // Отрисовка пинов, объявлений, ошибок
    window.backend.load(window.filter.filtrate, window.render.renderError);

    pinMain.removeEventListener('click', activateMapClickHandler);
  };

  // Функция активации страницы по нажатию на Enter
  var activateMapKeydownHandler = function (evt) {

    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      var map = document.querySelector('.map');
      var mainForm = document.querySelector('.ad-form');
      var mapFiltersForm = document.querySelector('.map__filters');

      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      mapFiltersForm.classList.remove('ad-form--disabled');

      // Активация полей формы
      for (i = 0; i < formFieldset.length; i++) {
        formFieldset[i].disabled = '';
      }

      // Отрисовка пинов, объявлений, ошибок
      window.backend.load(window.filter.filtrate, window.render.renderError);

      pinMain.removeEventListener('click', activateMapKeydownHandler);
    }
  };

  pinMain.addEventListener('click', activateMapClickHandler);
  pinMain.addEventListener('keydown', activateMapKeydownHandler);


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
      var isTopLimit = (pinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) <= window.util.TOP_LIMIT;
      var isBottomLimit = (pinMain.offsetTop - displacement.y + window.util.HEIGHT_PIN) >= window.util.BOTTOM_LIMIT;
      var isLeftLimit = (pinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) <= window.util.LEFT_LIMIT;
      var isRightLimit = (pinMain.offsetLeft - displacement.x + (window.util.WIDTH_PIN / 2)) >= window.util.RIGHT_LIMIT;

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

  window.map = {
    activateMapClickHandler: activateMapClickHandler,
    activateMapKeydownHandler: activateMapKeydownHandler
  };
})();
