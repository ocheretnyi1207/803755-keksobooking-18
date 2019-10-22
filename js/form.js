'use strict';

(function () {

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
  var selectRoomNumber = document.querySelector('#room_number');
  var selectGuestNumber = document.querySelector('#capacity');

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
  var selectCheckinTime = document.querySelector('#timein');
  var selectCheckoutTime = document.querySelector('#timeout');

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
  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      // Убираем значения полей
      form.querySelector('#title').value = '';
      form.querySelector('#price').value = '';
      form.querySelector('#description').value = '';

      // Удаляем пины и объявления
      var map = document.querySelector('.map');
      var mapCards = document.querySelectorAll('.map__card');
      var mapPins = document.querySelector('.map__pins');
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      function removePinAdsAfterSubmitForm(parent, child) {
        for (var i = 0; i < child.length; i++) {
          parent.removeChild(child[i]);
        }
      }

      removePinAdsAfterSubmitForm(map, mapCards);
      removePinAdsAfterSubmitForm(mapPins, mapPin);

      // Добавляем всем fieldset формы атрибут disabled
      var fieldsetForm = form.querySelectorAll('fieldset');

      for (var i = 0; i < fieldsetForm.length; i++) {
        fieldsetForm[i].disabled = 'disabled';
      }

      // Возвращаем метку map__pin--main в исходное состояние
      var mapPinMain = document.querySelector('.map__pin--main');
      mapPinMain.style.left = 570 + 'px';
      mapPinMain.style.top = 375 + 'px';
      document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));

      // Убираем checked у чекбоксов в фильтре
      var checkboxFilter = document.querySelectorAll('input[type=checkbox]:checked');

      for (i = 0; i < checkboxFilter.length; i++) {
        checkboxFilter[i].checked = '';
      }

      // Добавляем карте класс map--faded
      document.querySelector('.map').classList.add('map--faded');
      form.classList.add('ad-form--disabled');
    });

    evt.preventDefault();
  });

})();
