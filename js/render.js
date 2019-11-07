'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapPins = document.querySelector('.map__pins');
  var adPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
  var map = document.querySelector('.map');
  var main = document.querySelector('main');


  // Функция отрисовки пинов из шаблона
  var renderPin = function (arrayElement) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = arrayElement.location.x + 'px';
    pinElement.style.top = arrayElement.location.y + 'px';
    pinElement.querySelector('img').src = arrayElement.author.avatar;
    pinElement.querySelector('img').alt = arrayElement.offer.title;

    return pinElement;
  };


  // Функция отрисовки объявления из шаблона
  var renderAd = function (arrayElement) {
    var adElement = adTemplate.cloneNode(true);
    adElement.querySelector('.popup__title').textContent = arrayElement.offer.title;
    adElement.querySelector('.popup__text--address').textContent = arrayElement.offer.address;
    adElement.querySelector('.popup__text--price').textContent = arrayElement.offer.price + ' Р/ночь';
    adElement.querySelector('.popup__type').textContent = arrayElement.offer.type;
    adElement.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' комнаты для ' + arrayElement.offer.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ', ' + 'выезд до ' + arrayElement.offer.checkout;

    for (var i = 0; i < arrayElement.offer.features.length; i++) {
      switch (arrayElement.offer.features[i]) {

        case 'wifi':
          adElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
          break;

        case 'dishwasher':
          adElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
          break;

        case 'parking':
          adElement.querySelector('.popup__feature--parking').textContent = 'parking';
          break;

        case 'washer':
          adElement.querySelector('.popup__feature--washer').textContent = 'washer';
          break;

        case 'elevator':
          adElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
          break;

        case 'conditioner':
          adElement.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
          break;
      }
    }

    var clearNonExistentFeatures = function (features) {
      if (adElement.querySelector('.popup__feature--' + features).textContent === '') {
        adElement.querySelector('.popup__feature--' + features).parentNode.removeChild(adElement.querySelector('.popup__feature--' + features));
      }
    };

    clearNonExistentFeatures('wifi');
    clearNonExistentFeatures('dishwasher');
    clearNonExistentFeatures('parking');
    clearNonExistentFeatures('washer');
    clearNonExistentFeatures('elevator');
    clearNonExistentFeatures('conditioner');

    adElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    switch (arrayElement.offer.type) {
      case 'flat':
        adElement.querySelector('.popup__type').textContent = 'Квартира';
        break;

      case 'bungalo':
        adElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;

      case 'palace':
        adElement.querySelector('.popup__type').textContent = 'Дворец';
        break;

      case 'house':
        adElement.querySelector('.popup__type').textContent = 'Дом';
        break;
    }

    var createPhotos = function (arrayPhotos) {
      var fragmentPhotos = document.createDocumentFragment();

      for (i = 0; i < arrayPhotos.length; i++) {
        var photo = adPhoto.cloneNode(true);
        photo.src = arrayPhotos[i];
        fragmentPhotos.appendChild(photo);
      }

      return fragmentPhotos;
    };

    adElement.querySelector('.popup__photo').parentNode.removeChild(adElement.querySelector('.popup__photo'));
    adElement.querySelector('.popup__photos').appendChild(createPhotos(arrayElement.offer.photos));

    adElement.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    return adElement;
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
  var renderElementsLoad = function (data) {
    var fragmentPin = document.createDocumentFragment();
    var fragmentAd = document.createDocumentFragment();


    // Рендер пинов и объявлений
    var renderPinsAds = function (fragment, funcRender) {
      data.forEach(function (element) {
        return (fragment.appendChild(funcRender(element)));
      });
    };

    renderPinsAds(fragmentPin, renderPin);
    renderPinsAds(fragmentAd, renderAd);

    mapPins.appendChild(fragmentPin);
    map.appendChild(fragmentAd);


    // Деактивация объявлений после загрузки
    var ads = document.querySelectorAll('.map__card');

    ads.forEach(function (element) {
      return (element.style.display = 'none');
    });

    map.appendChild(document.querySelector('.map__filters-container'));


    // Вешаем класс map__pin--active на активную метку
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    var acivePinClickHandler = function (evt) {

      evt.preventDefault();

      for (var i = 0; i < pins.length; i++) {
        if (pins[i].classList.contains('map__pin--active')) {
          pins[i].classList.remove('map__pin--active');
        }
      }

      if (evt.target.tagName === 'IMG' && evt.target.className !== 'map__pin--main') {
        evt.target.closest('.map__pin').classList.add('map__pin--active');
      }

    };

    mapPins.addEventListener('click', acivePinClickHandler);


    // Открытие объявления по клику
    var adOpenClickHandler = function (index) {
      return function () {

        for (var j = 0; j < ads.length; j++) {
          if (ads[j].style.display === 'block') {
            ads[j].style.display = 'none';
          }
        }

        ads[index].style.display = 'block';
      };
    };

    for (var i = 0; i < pins.length; i++) {
      pins[i].addEventListener('click', adOpenClickHandler(i));
    }


    // Открытие объявления по нажатию Enter
    var adOpenKeydownHandler = function (index) {
      return function (evt) {

        if (evt.keyCode === window.ENTER_KEYCODE) {
          for (var j = 0; j < ads.length; j++) {
            if (ads[j].style.display === 'block') {
              ads[j].style.display = 'none';
            }
          }

          ads[index].style.display = 'block';
        }
      };
    };

    for (i = 0; i < pins.length; i++) {
      pins[i].addEventListener('keydown', adOpenKeydownHandler(i));
    }


    // Закрытие объявления по клику на кнопку закрытия
    var adCloseClickHandler = function (evt) {
      if (evt.target.className === 'popup__close') {
        evt.target.closest('.map__card').style.display = 'none';
      }
    };

    map.addEventListener('click', adCloseClickHandler);


    // Закрытие объявления по нажатию Esc
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        for (i = 0; i < ads.length; i++) {
          if (ads[i].style.display === 'block') {
            ads[i].style.display = 'none';
          }
        }
      }
    });
  };

  // Отправка данных на сервер
  var renderSuccessUpload = function (successMessage) {

    var fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(renderSuccessMessage(successMessage));
    main.appendChild(fragmentSuccess);

    // Убираем значения полей
    var form = document.querySelector('.ad-form');
    form.querySelector('#title').value = '';
    form.querySelector('#price').value = '';
    form.querySelector('#description').value = '';

    // Удаляем пины и объявления
    var ads = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

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
    var pinMain = document.querySelector('.map__pin--main');
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

    // Закрываем окно об успешной отправке по нажатию на ESC
    var successWindowKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
      }
      document.removeEventListener('keydown', successWindowKeydownHandler);
    };

    document.addEventListener('keydown', successWindowKeydownHandler);

    // Закрываем окно об успешной отправке по клику
    var successWindowClickHandler = function () {
      document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
      document.removeEventListener('click', successWindowClickHandler);
    };

    document.addEventListener('click', successWindowClickHandler);


  };

  // Рендер ошибки при загрузке данных с сервера
  var renderError = function (errorMessage) {
    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(renderErrorMessage(errorMessage));
    main.appendChild(fragmentError);

    // Закрываем окно об ошибке по нажатию на ESC
    var errorWindowKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
      }
      document.removeEventListener('click', errorWindowKeydownHandler);
    };

    document.addEventListener('keydown', errorWindowKeydownHandler);

    // Закрываем окно об ошибке по клику
    var errorWindowClickHandler = function () {
      document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
      document.removeEventListener('click', errorWindowClickHandler);
    };

    document.addEventListener('click', errorWindowClickHandler);

    // Закрываем окно об ошибке по клику на кнопку .error__button
    var errorBtn = document.querySelector('.error__button');
    errorBtn.addEventListener('click', function () {
      document.querySelector('error').parentNode.removeChild(document.querySelector('.error'));
    });

  };

  window.render = {
    renderElementsLoad: renderElementsLoad,
    renderSuccessUpload: renderSuccessUpload,
    renderError: renderError
  };
})();
