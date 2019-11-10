'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var fieldsetMainForm = mainForm.querySelectorAll('fieldset');
  var selectFilterForm = mapFiltersForm.querySelectorAll('select');
  var fieldsetFilterForm = mapFiltersForm.querySelectorAll('fieldset');
  var itAddress = mainForm.querySelector('#address');
  var pinMainCurrentX = pinMain.offsetLeft;
  var pinMainCurrentY = pinMain.offsetTop;
  var cursorX = parseInt(pinMain.style.left, 10);
  var cursorY = parseInt(pinMain.style.top, 10);
  var pinMainXMin = window.util.LEFT_LIMIT - window.util.CENTER_X_PIN;
  var pinMainXMax = window.util.RIGHT_LIMIT - window.util.CENTER_X_PIN;
  var pinMainYMin = window.util.TOP_LIMIT - window.util.HEIGHT_PIN;
  var pinMainYMax = window.util.BOTTOM_LIMIT - window.util.HEIGHT_PIN;


  function getMainPinCoordinate() {
    itAddress.value = Math.round(pinMainCurrentX + window.util.CENTER_X_PIN) + ', ' +
      Math.round(pinMainCurrentY + window.util.HEIGHT_PIN);
  }


  // Function enable elements
  var elementsFormEnable = function (elem) {
    elem.forEach(function (element) {
      return (element.disabled = '');
    });
  };


  // Добавление атрибута disabled полям формы при неактивной странице
  window.render.elementsFormDisable(fieldsetMainForm);
  window.render.elementsFormDisable(selectFilterForm);
  window.render.elementsFormDisable(fieldsetFilterForm);


  // Координаты main__pin--main при неактивной странице
  itAddress.value = (window.util.LOCATION_X_PIN + window.util.CENTER_X_PIN) + ', ' + (window.util.LOCATION_Y_PIN + window.util.CENTER_Y_PIN);


  // Функция активации страницы по нажатию на кнопку мыши
  var activateMapClickHandler = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('ad-form--disabled');
    var inPrice = mainForm.querySelector('#price');

    inPrice.min = window.util.MIN_PRICE_ON_ACTIVATE_PAGE;
    inPrice.placeholder = window.util.MIN_PRICE_ON_ACTIVATE_PAGE;

    // Активация полей формы
    elementsFormEnable(fieldsetMainForm);
    elementsFormEnable(fieldsetFilterForm);
    elementsFormEnable(selectFilterForm);

    // Отрисовка пинов, объявлений, ошибок
    window.backend.load(window.filter.filtrate, window.render.renderError);

    pinMain.removeEventListener('click', activateMapClickHandler);
  };


  // Функция активации страницы по нажатию на Enter
  var activateMapKeydownHandler = function (evt) {

    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      map.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      mapFiltersForm.classList.remove('ad-form--disabled');
      var inPrice = mainForm.querySelector('#price');

      inPrice.min = window.util.MIN_PRICE_ON_ACTIVATE_PAGE;
      inPrice.placeholder = window.util.MIN_PRICE_ON_ACTIVATE_PAGE;

      // Активация полей формы
      elementsFormEnable(fieldsetMainForm);
      elementsFormEnable(fieldsetFilterForm);
      elementsFormEnable(selectFilterForm);

      // Отрисовка пинов, объявлений, ошибок
      window.backend.load(window.filter.filtrate, window.render.renderError);

      pinMain.removeEventListener('click', activateMapKeydownHandler);
    }
  };


  pinMain.addEventListener('click', activateMapClickHandler);
  pinMain.addEventListener('keydown', activateMapKeydownHandler);


  // Перемещение метки по карте
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMainCurrentX = pinMainCurrentX - shift.x;
      pinMainCurrentY = pinMainCurrentY - shift.y;

      cursorX = cursorX - shift.x;
      cursorY = cursorY - shift.y;

      if (pinMainCurrentX > pinMainXMax || cursorX > pinMainXMax) {
        pinMainCurrentX = pinMainXMax;
      } else if (pinMainCurrentX < pinMainXMin || cursorX < pinMainXMin) {
        pinMainCurrentX = pinMainXMin;
      }
      if (pinMainCurrentY > pinMainYMax || cursorY > pinMainYMax) {
        pinMainCurrentY = pinMainYMax;
      } else if (pinMainCurrentY < pinMainYMin || cursorY < pinMainYMin) {
        pinMainCurrentY = pinMainYMin;
      }

      pinMain.style.top = pinMainCurrentY + 'px';
      pinMain.style.left = pinMainCurrentX + 'px';

      getMainPinCoordinate();

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
