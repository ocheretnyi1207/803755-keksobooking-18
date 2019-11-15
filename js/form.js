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
  var isCheckinTimeOptions = isCheckinTime.querySelectorAll('option');
  var isCheckoutTime = document.querySelector('#timeout');
  var isCheckoutTimeOptions = isCheckoutTime.querySelectorAll('option');
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

  var isTypeChangeHandler = function () {
    inPrice.value = typeHouseInPrice[isType.value];
    inPrice.min = typeHouseInPrice[isType.value];
    inPrice.placeholder = typeHouseInPrice[isType.value];
  };


  // Изменение min значения поля цены за ночь в зависимости от типа выбранного жилья
  isType.addEventListener('change', isTypeChangeHandler);


  // Сценарий соответствия количества гостей и количества комнат
  isGuestNumberOptions.forEach(function (element) {
    if (element.value !== '1') {
      element.disabled = 'disabled';
    } else {
      element.selected = 'selected';
    }
  });

  isRoomNumber.addEventListener('change', function (evt) {
    checkCountRoom(evt.target.value);
  });


  // Сценарий соответствия времени заезда и времени выездa
  var checkinCheckoutTime = function (element, target) {
    element.forEach(function (it) {
      if (target.value === it.value) {
        it.selected = 'selected';
      }
    });
  }

  isCheckinTime.addEventListener('change', function (evt) {
    checkinCheckoutTime(isCheckoutTimeOptions, evt.target);
  });

  isCheckoutTime.addEventListener('change', function (evt) {
    checkinCheckoutTime(isCheckinTimeOptions, evt.target);
  });

  // Отправка данных из формы на сервер
  mainForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(mainForm), window.render.renderSuccessUpload, window.render.renderError);
    evt.preventDefault();
    pinMain.addEventListener('click', window.map.activateClickHandler);
    pinMain.addEventListener('keydown', window.map.activateKeydownHandler);
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
    var itAddress = mainForm.querySelector('#address');

    // Сброс полей
    itTitle.value = '';
    inPrice.value = '';
    itxDescription.value = '';
    isRoomNumber.value = '1';


    isGuestNumberOptions.forEach(function (element) {
      if (element.value !== '1') {
        element.disabled = 'disabled';
      } else {
        element.selected = 'selected';
        element.disabled = '';
      }
    });

    window.render.resetCheckboxForm(chkbxFeaturesMainForm);
    window.render.resetCheckboxForm(chkbxFeaturesFilter);

    selectFilterForm.forEach(function (element) {
      return (element.value = 'any');
    });

    // Reset avatars
    window.avatar.previewUserPic.src = window.util.DEFAULT_FOTO;
    window.avatar.previewPhoto.style = '';

    // Удаляем пины и объявления
    window.render.clearMap(ads);
    window.render.clearMap(pins);

    // Добавляем класс map--faded карте и ad_form--disabled формам
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    mapFiltersForm.classList.add('ad-form--disabled');

    // Добавляем всем fieldset атрибут disabled
    window.render.elementsFormDisable(fieldsetMainForm);
    window.render.elementsFormDisable(selectFilterForm);
    window.render.elementsFormDisable(fieldsetFilterForm);

    // Возвращаем метку map__pin--main в исходное состояние
    pinMain.style.left = window.util.LOCATION_X_PIN + 'px';
    pinMain.style.top = window.util.LOCATION_Y_PIN + 'px';
    itAddress.value = Math.round(window.util.LOCATION_X_PIN + window.util.CENTER_X_PIN) + ', ' + Math.round(window.util.LOCATION_Y_PIN + window.util.CENTER_Y_PIN);

    pinMain.addEventListener('click', window.map.activateClickHandler);
    pinMain.addEventListener('keydown', window.map.activateKeydownHandler);
  });

})();
