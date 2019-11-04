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
    window.upload(new FormData(form), window.renderSuccessUpload, window.renderError);
    evt.preventDefault();
    var mapPinMain = document.querySelector('.map__pin--main');
    mapPinMain.addEventListener('click', window.activateMapClickHandler);
  });

})();
