'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');


  // Функция отрисовки пинов из шаблона
  var renderMapPin = function (arrayElement) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = arrayElement.location.x + 'px';
    mapPinElement.style.top = arrayElement.location.y + 'px';
    mapPinElement.querySelector('img').src = arrayElement.author.avatar;
    mapPinElement.querySelector('img').alt = arrayElement.offer.title;

    return mapPinElement;
  };

  // Функция отрисовки объявления из шаблона
  var renderCard = function (arrayElement) {

    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = arrayElement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arrayElement.offer.price + ' Р/ночь';
    cardElement.querySelector('.popup__type').textContent = arrayElement.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' комнаты для ' + arrayElement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', ' + 'выезд до ' + arrayElement.offer.checkout;


    for (var i = 0; i < arrayElement.offer.features.length; i++) {

      switch (arrayElement.offer.features[i]) {

        case 'wifi':
          cardElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
          break;

        case 'dishwasher':
          cardElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
          break;

        case 'parking':
          cardElement.querySelector('.popup__feature--parking').textContent = 'parking';
          break;

        case 'washer':
          cardElement.querySelector('.popup__feature--washer').textContent = 'washer';
          break;

        case 'elevator':
          cardElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
          break;

        case 'conditioner':
          cardElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
          break;
      }

    }

    var clearMissingFeatures = function (features) {
      if (cardElement.querySelector('.popup__feature--' + features).textContent === '') {
        cardElement.querySelector('.popup__feature--' + features).parentNode.removeChild(cardElement.querySelector('.popup__feature--' + features));
      }
    };

    clearMissingFeatures('wifi');
    clearMissingFeatures('dishwasher');
    clearMissingFeatures('parking');
    clearMissingFeatures('washer');
    clearMissingFeatures('elevator');
    clearMissingFeatures('conditioner');

    cardElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    switch (arrayElement.offer.type) {
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;

      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;

      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;

      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
    }

    cardElement.querySelector('.popup__photo').src = arrayElement.offer.photos;
    cardElement.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    return cardElement;
  };

  // Функция отрисовки сообщения об ошибке из шаблона
  var renderErrorMessage = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;

    return errorElement;
  };

  // Функция отрисовки сообщения об успешной отправке данных из шаблона
  var renderSuccessMessage = function (message) {
    var successElement = successTemplate.cloneNode(true);
    successElement.querySelector('.success__message').textContent = message;

    return successElement;
  };

  // Рендер элементов при загрузке данных с сервера
  window.renderElementsLoad = function (data) {

    // Рендер пинов
    var fragmentMapPin = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragmentMapPin.appendChild(renderMapPin(data[i]));
    }

    mapPins.appendChild(fragmentMapPin);

    // Рендер объявлений
    var fragmentMapCard = document.createDocumentFragment();

    for (i = 0; i < data.length; i++) {
      fragmentMapCard.appendChild(renderCard(data[i]));
    }

    map.appendChild(fragmentMapCard);

    // Деактивация объявлений после загрузки
    var mapCard = document.querySelectorAll('.map__card');

    for (i = 0; i < mapCard.length; i++) {
      mapCard[i].style.display = 'none';
    }

    map.appendChild(document.querySelector('.map__filters-container'));

    // Вешаем класс map__pin--active на активную метку
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    var aciveMapPinClickHandler = function (evt) {

      evt.preventDefault();

      for (i = 0; i < mapPin.length; i++) {
        if (mapPin[i].classList.contains('map__pin--active')) {
          mapPin[i].classList.remove('map__pin--active');
        }
      }

      if (evt.target.tagName === 'IMG' && evt.target.className !== 'map__pin--main') {
        evt.target.closest('.map__pin').classList.add('map__pin--active');
      }

    };

    mapPins.addEventListener('click', aciveMapPinClickHandler);

    // Открытие объявления по клику
    var cardAdsOpenClickHandler = function (index) {
      return function () {

        for (var j = 0; j < mapCard.length; j++) {
          if (mapCard[j].style.display === 'block') {
            mapCard[j].style.display = 'none';
          }
        }

        mapCard[index].style.display = 'block';

      };
    };

    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', cardAdsOpenClickHandler(i));
    }

    // Открытие объявления по нажатию Enter
    var cardAdsOpenKeydownHandler = function (index) {
      return function (evt) {

        if (evt.keyCode === window.ENTER_KEYCODE) {

          for (var j = 0; j < mapCard.length; j++) {
            if (mapCard[j].style.display === 'block') {
              mapCard[j].style.display = 'none';
            }
          }

          mapCard[index].style.display = 'block';
        }

      };
    };

    for (i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('keydown', cardAdsOpenKeydownHandler(i));
    }

    // Закрытие объявления по клику на кнопку закрытия
    var cardAdsCloseClickHandler = function (evt) {

      if (evt.target.className === 'popup__close') {
        evt.target.closest('.map__card').style.display = 'none';
      }

    };

    map.addEventListener('click', cardAdsCloseClickHandler);

    // Закрытие объявления по нажатию Esc
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        for (i = 0; i < mapCard.length; i++) {
          if (mapCard[i].style.display === 'block') {
            mapCard[i].style.display = 'none';
          }
        }
      }
    });
  };

  // Отправка данных на сервер
  window.renderSuccessUpload = function (successMessage) {

    var fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(renderSuccessMessage(successMessage));
    main.appendChild(fragmentSuccess);

    // Убираем значения полей
    var form = document.querySelector('.ad-form');
    form.querySelector('#title').value = '';
    form.querySelector('#price').value = '';
    form.querySelector('#description').value = '';

    // Удаляем пины и объявления
    var mapCards = document.querySelectorAll('.map__card');
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
    mapPinMain.style.left = window.util.LOCATION_X_PIN + 'px';
    mapPinMain.style.top = window.util.LOCATION_Y_PIN + 'px';
    document.querySelector('#address').value = (window.util.LOCATION_X_PIN + (window.util.WIDTH_PIN / 2)) + ', ' + (window.util.LOCATION_Y_PIN + ((window.util.HEIGHT_PIN - window.util.HEIGHT_POINTER_PIN) / 2));

    // Убираем checked у чекбоксов в фильтре
    var checkboxFilter = document.querySelectorAll('input[type=checkbox]:checked');

    for (i = 0; i < checkboxFilter.length; i++) {
      checkboxFilter[i].checked = '';
    }

    // Добавляем карте класс map--faded
    document.querySelector('.map').classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    // Закрываем окно об успешной отправке сообщения по нажатию на ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
      }
    });

    // Закрываем окно об успешной отправке сообщения по клику
    document.addEventListener('click', function () {
      document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
    });
  };

  // Рендер ошибки при загрузке с сервера
  window.renderError = function (errorMessage) {
    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(renderErrorMessage(errorMessage));
    main.appendChild(fragmentError);

    // Закрываем окно об ошибке по нажатию на ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
      }
    });

    // Закрываем окно об ошибке по клику
    document.addEventListener('click', function () {
      document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
    });

    // Закрываем окно об ошибке по клику на кнопку .error__button
    var errorBtn = document.querySelector('.error__button');
    errorBtn.addEventListener('click', function () {
      document.querySelector('error').parentNode.removeChild(document.querySelector('.error'));
    });

  };

})();
