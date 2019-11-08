'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var btnResetForm = mainForm.querySelector('.ad-form__reset');
  var isRoomNumber = document.querySelector('#room_number');
  var isGuestNumber = document.querySelector('#capacity');
  var isGuestNumberOptions = isGuestNumber.querySelectorAll('option');
  var isCheckinTime = document.querySelector('#timein');
  var isCheckoutTime = document.querySelector('#timeout');
  var map = document.querySelector('.map');
  var isType = mainForm.querySelector('#type');
  var inPrice = mainForm.querySelector('#price');

  // Словари
  var typeHouseInPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomsCount = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var isTypeChangeHandler = function () {
    inPrice.value = typeHouseInPrice[isType.value];
    inPrice.min = typeHouseInPrice[isType.value];
    inPrice.placeholder = typeHouseInPrice[isType.value];
  };

  var checkCountRoom = function (value) {
    isGuestNumberOptions.forEach(function (element) {
      return (element.disabled = 'disabled');
    });

    roomsCount[value].forEach(function (userChoice) {
      isGuestNumberOptions.forEach(function (roomsCountUserChoice) {
        if (Number(roomsCountUserChoice.value) === userChoice) {
          roomsCountUserChoice.disabled = '';
          roomsCountUserChoice.selected = 'selected';
        }
      });
    });
  };

  // Изменение min значения поля цены за ночь в зависимости от типа выбранного жилья
  isType.addEventListener('change', isTypeChangeHandler);


  // Сценарий соответствия количества гостей и количества комнат
  isRoomNumber.addEventListener('change', function (evt) {
    checkCountRoom(evt.target.value);
  });


  // Сценарий соответствия времени заезда и времени выездa
  isCheckinTime.addEventListener('change', function () {
    for (var i = 0; i < isCheckinTime.length; i++) {
      if (isCheckinTime[i].selected) {
        isCheckoutTime[i].selected = 'selected';
      }
    }
  });

  isCheckoutTime.addEventListener('change', function () {
    for (var i = 0; i < isCheckoutTime.length; i++) {
      if (isCheckoutTime[i].selected) {
        isCheckinTime[i].selected = 'selected';
      }
    }
  });

  // Отправка данных из формы на сервер
  mainForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(mainForm), window.render.renderSuccessUpload, window.render.renderError);
    evt.preventDefault();
    pinMain.addEventListener('click', window.map.activateMapClickHandler);
    pinMain.addEventListener('keydown', window.map.activateMapKeydownHandler);
  });

  // Сброс страницы при нажатии на кнокпку 'Очистить'
  btnResetForm.addEventListener('click', function () {
    var ads = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fieldsetMainForm = mainForm.querySelectorAll('fieldset');
    var selectFilterForm = mapFiltersForm.querySelectorAll('select');
    var fieldsetFilterForm = mapFiltersForm.querySelectorAll('fieldset');
    var itTitle = mainForm.querySelector('#title');
    var itxDescription = mainForm.querySelector('#description');
    var chkbxFeaturesMainForm = mainForm.querySelectorAll('input[type=checkbox]:checked');
    var chkbxFeaturesFilter = mapFiltersForm.querySelectorAll('input[type=checkbox]:checked');

    // Функция сброса чекбоксов
    var resetCheckboxForm = function (fields) {
      fields.forEach(function (element) {
        return (element.checked = '');
      });
    };

    // Функция очистки карты
    var clearMap = function (childNode) {
      childNode.forEach(function (element) {
        return element.parentNode.removeChild(element);
      });
    };

    // Function disable elements
    var elementsFormDisable = function (elem) {
      elem.forEach(function (element) {
        return (element.disabled = 'disabled');
      });
    };

    // Сброс полей
    itTitle.value = '';
    inPrice.value = '';
    itxDescription.value = '';

    resetCheckboxForm(chkbxFeaturesMainForm);
    resetCheckboxForm(chkbxFeaturesFilter);

    selectFilterForm.forEach(function (element) {
      return (element.value = 'any');
    });

    // Удаляем пины и объявления
    clearMap(ads);
    clearMap(pins);

    // Добавляем класс map--faded карте и ad_form--disabled формам
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('ad-form--disabled');

    // Добавляем всем fieldset атрибут disabled
    elementsFormDisable(fieldsetMainForm);
    elementsFormDisable(selectFilterForm);
    elementsFormDisable(fieldsetFilterForm);

    // Возвращаем метку map__pin--main в исходное состояние
    pinMain.style.left = window.util.LOCATION_X_PIN + 'px';
    pinMain.style.top = window.util.LOCATION_Y_PIN + 'px';
    document.querySelector('#address').value = (window.util.LOCATION_X_PIN + window.util.CENTER_X_PIN) + ', ' + (window.util.LOCATION_Y_PIN + window.util.CENTER_Y_PIN);

    pinMain.addEventListener('click', window.map.activateMapClickHandler);
    pinMain.addEventListener('keydown', window.map.activateMapKeydownHandler);
  });

})();
