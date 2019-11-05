'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var btnResetForm = form.querySelector('.ad-form__reset');
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
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), window.renderSuccessUpload, window.renderError);
    evt.preventDefault();
    pinMain.addEventListener('click', window.activateMapClickHandler);
    pinMain.addEventListener('keydown', window.activateMapKeydownHandler);
  });

  // Сброс страницы при нажатии на кнокпку 'Очистить'
  btnResetForm.addEventListener('click', function () {
    // Убираем значения полей
    form.querySelector('#title').value = '';
    form.querySelector('#price').value = '';
    form.querySelector('#description').value = '';

    // Удаляем пины и объявления
    var ads = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');

    function removePinsAds(parent, child) {
      for (var i = 0; i < child.length; i++) {
        child[i].parentNode.removeChild(child[i]);
      }
    }

    removePinsAds(map, ads);
    removePinsAds(mapPins, pins);

    // Добавляем всем fieldset формы атрибут disabled
    var fieldsetForm = form.querySelectorAll('fieldset');

    for (var i = 0; i < fieldsetForm.length; i++) {
      fieldsetForm[i].disabled = 'disabled';
    }

    // Возвращаем метку map__pin--main в исходное состояние
    pinMain.style.left = window.util.LOCATION_X_PIN + 'px';
    pinMain.style.top = window.util.LOCATION_Y_PIN + 'px';
    document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));

    // Убираем checked у чекбоксов в фильтре
    var checkboxFilter = document.querySelectorAll('input[type=checkbox]:checked');

    for (i = 0; i < checkboxFilter.length; i++) {
      checkboxFilter[i].checked = '';
    }

    // Добавляем карте класс map--faded
    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    pinMain.addEventListener('click', window.activateMapClickHandler);
    pinMain.addEventListener('keydown', window.activateMapKeydownHandler);
  });

})();
