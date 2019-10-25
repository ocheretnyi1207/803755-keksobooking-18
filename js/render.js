'use strict';

(function () {
  // Шаблон #pin
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');


  // Шаблон #card
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');


  // Шаблон #error
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  // Шаблон #success
  var successTemplate = document.querySelector('#success').content.querySelector('.success');


  // Функция отрисовки пинов
  var renderMapPinTemplate = function (arrayElement) {
    var mapPinTemplateElement = mapPinTemplate.cloneNode(true);
    mapPinTemplateElement.style.left = arrayElement.location.x + 'px';
    mapPinTemplateElement.style.top = arrayElement.location.y + 'px';
    mapPinTemplateElement.querySelector('img').src = arrayElement.author.avatar;
    mapPinTemplateElement.querySelector('img').alt = arrayElement.offer.title;

    return mapPinTemplateElement;
  };

  // Функция отрисовки объявления
  var renderCardTemplate = function (arrayElement) {

    var cardTemplateElement = cardTemplate.cloneNode(true);
    cardTemplateElement.querySelector('.popup__title').textContent = arrayElement.offer.title;
    cardTemplateElement.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
    cardTemplateElement.querySelector('.popup__text--price').textContent = (arrayElement.offer.price).toString(10) + ' Р/ночь';
    cardTemplateElement.querySelector('.popup__type').textContent = arrayElement.offer.type;
    cardTemplateElement.querySelector('.popup__text--capacity').textContent = (arrayElement.offer.rooms).toString(10) + ' комнаты для ' + (arrayElement.offer.guests).toString(10) + ' гостей';
    cardTemplateElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + (arrayElement.offer.checkin).toString(10) + ', ' + 'выезд до ' + (arrayElement.offer.checkout).toString(10);

    var getComfortInAds = function (comfort) {
      cardTemplateElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
    };

    getComfortInAds('wifi');
    getComfortInAds('dishwasher');
    getComfortInAds('parking');
    getComfortInAds('washer');
    getComfortInAds('elevator');
    getComfortInAds('conditioner');

    cardTemplateElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    var translationValues = function (typeEnglish, typeRussian) {
      if (arrayElement.offer.type === typeEnglish) {
        cardTemplateElement.querySelector('.popup__type').textContent = typeRussian;
      }
    };

    translationValues('flat', 'Квартира');
    translationValues('bungalo', 'Бунгало');
    translationValues('palace', 'Дворец');
    translationValues('house', 'Дом');

    cardTemplateElement.querySelector('.popup__photo').src = arrayElement.offer.photos;
    cardTemplateElement.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    return cardTemplateElement;
  };

  // Функция отрисовки сообщения об ошибке
  var renderErrorMessageTemplate = function (message) {
    var errorTemplateElement = errorTemplate.cloneNode(true);
    errorTemplateElement.querySelector('.error__message').textContent = message;

    return errorTemplateElement;
  };

  // Функция отрисовки сообщения об успешной отправке данных
  var renderSuccessMessageTemplate = function (message) {
    var successTemplateElement = successTemplate.cloneNode(true);
    successTemplateElement.querySelector('.success__message').textContent = message;

    return successTemplateElement;
  };

  // Рендер элементов при загрузке данных с сервера
  window.renderElementsLoad = function (data) {

    // Рендер пинов
    var fragmentMapPin = document.createDocumentFragment();

    for (var i = 0; i < window.util.NUMBER_ADS; i++) {
      fragmentMapPin.appendChild(renderMapPinTemplate(data[i]));
    }

    mapPins.appendChild(fragmentMapPin);

    // Рендер объявлений
    var fragmentMapCard = document.createDocumentFragment();

    for (i = 0; i < window.util.NUMBER_ADS; i++) {
      fragmentMapCard.appendChild(renderCardTemplate(data[i]));
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
    var cardAdsCloseKeydownHandler = function (index) {
      return function (evt) {

        if (evt.keyCode === window.ESC_KEYCODE) {
          mapCard[index].style.display = 'none';
        }
      };
    };

    for (i = 0; i < mapCard.length; i++) {

      if (mapCard[i].style.display === 'block') {
        mapCard[i].addEventListener('keydown', cardAdsCloseKeydownHandler);
      }
    }
  };

  // Отправка данных на сервер
  window.renderSuccessUpload = function (successMessage) {

    var fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(renderSuccessMessageTemplate(successMessage));
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
  };

  // Рендер ошибки
  window.renderError = function (errorMessage) {
    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(renderErrorMessageTemplate(errorMessage));
    main.appendChild(fragmentError);
  };

})();
