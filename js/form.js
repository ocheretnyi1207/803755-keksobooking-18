'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var btnResetForm = mainForm.querySelector('.ad-form__reset');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectGuestNumber = document.querySelector('#capacity');
  var selectCheckinTime = document.querySelector('#timein');
  var selectCheckoutTime = document.querySelector('#timeout');

  // Изменение min значения поля цены за ночь в зависимости от типа выбранного жилья
  var dependPriceChangeOfTypeHouse = function (idSelect, idPriceFieldForm, indexOption, valueMinPrice, valuePlaceholder) {
    if (document.querySelector(idSelect).options[indexOption].selected) {
      document.querySelector(idPriceFieldForm).min = valueMinPrice;
      document.querySelector(idPriceFieldForm).placeholder = valuePlaceholder;
    }
  };

  document.querySelector('#type').addEventListener('change', function () {
    dependPriceChangeOfTypeHouse('#type', '#price', 0, 0, '0');
    dependPriceChangeOfTypeHouse('#type', '#price', 1, 1000, '1000');
    dependPriceChangeOfTypeHouse('#type', '#price', 2, 5000, '5000');
    dependPriceChangeOfTypeHouse('#type', '#price', 3, 10000, '10000');
  });


  // Сценарий соответствия количества гостей и количества комнат
  selectGuestNumber.options[0].disabled = 'disabled';
  selectGuestNumber.options[1].disabled = 'disabled';
  selectGuestNumber.options[2].selected = 'selected';
  selectGuestNumber.options[3].disabled = 'disabled';

  selectRoomNumber.addEventListener('change', function () {
    if (selectRoomNumber.options[0].selected) {
      selectGuestNumber.options[0].disabled = 'disabled';
      selectGuestNumber.options[1].disabled = 'disabled';
      selectGuestNumber.options[2].disabled = '';
      selectGuestNumber.options[2].selected = 'selected';
      selectGuestNumber.options[3].disabled = 'disabled';
    }
    if (selectRoomNumber.options[1].selected) {
      selectGuestNumber.options[0].disabled = 'disabled';
      selectGuestNumber.options[1].disabled = '';
      selectGuestNumber.options[1].selected = 'selected';
      selectGuestNumber.options[2].disabled = '';
      selectGuestNumber.options[3].disabled = 'disabled';
    }
    if (selectRoomNumber.options[2].selected) {
      selectGuestNumber.options[0].disabled = '';
      selectGuestNumber.options[1].disabled = '';
      selectGuestNumber.options[2].disabled = '';
      selectGuestNumber.options[0].selected = 'selected';
      selectGuestNumber.options[3].disabled = 'disabled';
    }
    if (selectRoomNumber.options[3].selected) {
      selectGuestNumber.options[0].disabled = 'disabled';
      selectGuestNumber.options[1].disabled = 'disabled';
      selectGuestNumber.options[2].disabled = 'disabled';
      selectGuestNumber.options[3].disabled = '';
      selectGuestNumber.options[3].selected = 'selected';
    }
  });


  // Сценарий соответствия времени заезда и времени выезда
  selectCheckinTime.addEventListener('change', function () {
    for (var i = 0; i < selectCheckinTime.length; i++) {
      if (selectCheckinTime[i].selected) {
        selectCheckoutTime[i].selected = 'selected';
      }
    }
  });

  selectCheckoutTime.addEventListener('change', function () {
    for (var i = 0; i < selectCheckoutTime.length; i++) {
      if (selectCheckoutTime[i].selected) {
        selectCheckinTime[i].selected = 'selected';
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
    var map = document.querySelector('.map');
    var mapFiltersForm = document.querySelector('.map__filters');
    var fieldsetMainForm = mainForm.querySelectorAll('fieldset');
    var selectFilterForm = mapFiltersForm.querySelectorAll('select');
    var fieldsetFilterForm = mapFiltersForm.querySelectorAll('fieldset');
    var itTitle = mainForm.querySelector('#title');
    var inPrice = mainForm.querySelector('#price');
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
