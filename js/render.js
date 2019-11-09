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
  var mainForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var pinMain = document.querySelector('.map__pin--main');

  // Функция сброса чекбоксов
  var resetCheckboxForm = function (fields) {
    fields.forEach(function (element) {
      return (element.checked = '');
    });
  };

  // Function remove Child Nodes
  var removeChilds = function (node) {
    while (node.firstChild) {
      node.firstChild.remove();
    }
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


    removeChilds(adElement.querySelector('.popup__features'));

    var createLi = function (featureArr) {
      var liElement = adTemplate.querySelector('.popup__feature');
      var fragmentLi = document.createDocumentFragment();
      for (var i = 0; i < featureArr.length; i++) {
        var featureElement = liElement.cloneNode(true);
        featureElement.className = 'popup__feature';
        featureElement.classList.add('popup__feature--' + featureArr[i]);
        fragmentLi.appendChild(featureElement);
      }
      return fragmentLi;
    };

    adElement.querySelector('.popup__features').appendChild(createLi(arrayElement.offer.features));


    adElement.querySelector('.popup__description').textContent = arrayElement.offer.description;

    var translationTypeHouse = {
      'bungalo': 'Бунгало',
      'flat': 'Квартирa',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    adElement.querySelector('.popup__type').textContent = translationTypeHouse[arrayElement.offer.type];


    var createPhotos = function (arrayPhotos) {
      var fragmentPhotos = document.createDocumentFragment();

      for (var i = 0; i < arrayPhotos.length; i++) {
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

    var renderPinsAds = function (fragment, funcRender) {
      data.forEach(function (element) {
        return (fragment.appendChild(funcRender(element)));
      });
    };

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

    var adCloseClickHandler = function (evt) {
      if (evt.target.className === 'popup__close') {
        evt.target.closest('.map__card').style.display = 'none';
      }
    };

    var adCloseKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        for (i = 0; i < ads.length; i++) {
          if (ads[i].style.display === 'block') {
            ads[i].style.display = 'none';
          }
        }
      }
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
    mapPins.addEventListener('click', acivePinClickHandler);


    // Открытие объявления по клику
    for (var i = 0; i < pins.length; i++) {
      pins[i].addEventListener('click', adOpenClickHandler(i));
    }

    // Открытие объявления по нажатию Enter
    for (i = 0; i < pins.length; i++) {
      pins[i].addEventListener('keydown', adOpenKeydownHandler(i));
    }

    // Закрытие объявления по клику на кнопку закрытия
    map.addEventListener('click', adCloseClickHandler);


    // Закрытие объявления по нажатию Esc
    document.addEventListener('keydown', adCloseKeydownHandler);
  };


  // Отправка данных на сервер
  var renderSuccessUpload = function (successMessage) {
    var fragmentSuccess = document.createDocumentFragment();
    var ads = document.querySelectorAll('.map__card');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fieldsetMainForm = mainForm.querySelectorAll('fieldset');
    var selectFilterForm = mapFiltersForm.querySelectorAll('select');
    var fieldsetFilterForm = mapFiltersForm.querySelectorAll('fieldset');
    var itTitle = mainForm.querySelector('#title');
    var inPrice = mainForm.querySelector('#price');
    var itxDescription = mainForm.querySelector('#description');
    var chkbxFeaturesMainForm = mainForm.querySelectorAll('input[type=checkbox]:checked');
    var chkbxFeaturesFilter = mapFiltersForm.querySelectorAll('input[type=checkbox]:checked');

    fragmentSuccess.appendChild(renderSuccessMessage(successMessage));
    main.appendChild(fragmentSuccess);

    var successWindowKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
      }
      document.removeEventListener('keydown', successWindowKeydownHandler);
    };

    var successWindowClickHandler = function () {
      document.querySelector('.success').parentNode.removeChild(document.querySelector('.success'));
      document.removeEventListener('click', successWindowClickHandler);
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

    // Reset avatars
    window.avatar.previewAvatar.src = window.util.DEFAULT_FOTO;
    window.avatar.previewPhoto.style = '';

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

    // Закрываем окно об успешной отправке по клику
    document.addEventListener('click', successWindowClickHandler);

    // Закрываем окно об успешной отправке по нажатию на ESC
    document.addEventListener('keydown', successWindowKeydownHandler);
  };


  // Рендер ошибки при загрузке данных с сервера
  var renderError = function (errorMessage) {
    var fragmentError = document.createDocumentFragment();

    fragmentError.appendChild(renderErrorMessage(errorMessage));
    main.appendChild(fragmentError);

    var errorWindowKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
      }
      document.removeEventListener('click', errorWindowKeydownHandler);
    };

    var errorWindowClickHandler = function () {
      document.querySelector('.error').parentNode.removeChild(document.querySelector('.error'));
      document.removeEventListener('click', errorWindowClickHandler);
    };

    // Закрываем окно об ошибке по нажатию на ESC
    document.addEventListener('keydown', errorWindowKeydownHandler);

    // Закрываем окно об ошибке по клику
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
    renderError: renderError,
    resetCheckboxForm: resetCheckboxForm,
    clearMap: clearMap,
    elementsFormDisable: elementsFormDisable
  };
})();
