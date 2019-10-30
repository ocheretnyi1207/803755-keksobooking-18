'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('#housing-features');

  // Дефолтный фильтр
  var defaultFilterValues = (housingType.options.value === 'any'.selected || housingPrice.options.value === 'any'.selected ||
    housingRooms.options.value === 'any'.selected || housingGuests.options.value === 'any'.selected);


  // Удаление лишних элементов при фильтрации
  var removeElements = function (childNode, parentNode) {
    Array.from(childNode).forEach(function (element) {
      parentNode.removeChild(element);
    });
  };

  // Функция фильтрации по типу жилья
  var filterTypeHouse = function (data, filterName, index, parameterFilter) {
    if (filterName.options[index].selected) {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return element.offer.type === parameterFilter;
      });

      window.renderElementsLoad(sortAds);
    }
  };

  // Функция фильтрации по цене
  var filterPrice = function (data, filterName, index, min, max) {
    if (filterName.options[index].selected) {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return (element.offer.price >= min && element.offer.price < max);
      });

      window.renderElementsLoad(sortAds);
    }
  };

  // Функция фильтрации по кол-ву комнат
  var filterNumberRooms = function (data, filterName, index, parameterFilter) {
    if (filterName.options[index].selected) {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return element.offer.rooms === parameterFilter;
      });

      window.renderElementsLoad(sortAds);
    }
  };

  // Функция фильтрации по кол-ву гостей
  var filterNumberGuests = function (data, filterName, index, parameterFilter) {
    if (filterName.options[index].selected) {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return element.offer.guests === parameterFilter;
      });

      window.renderElementsLoad(sortAds);
    }
  };

  var filterFeatures = function (data, index, parametrFilter) {
    var checkboxes = housingFeatures.querySelectorAll('input[type=checkbox]');
    if (checkboxes[index].checked === 'checked') {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return element.offer.features === parametrFilter;
      });

      window.renderElementsLoad(sortAds);
    }
  };


  window.filter = function (data) {

    if (defaultFilterValues) {
      window.renderElementsLoad(data);
    }

    housingType.addEventListener('change', function () {

      // Фильтрация по типу дома
      if (defaultFilterValues) {
        window.renderElementsLoad(data);
      }

      filterTypeHouse(data, housingType, 1, 'palace');
      filterTypeHouse(data, housingType, 2, 'flat');
      filterTypeHouse(data, housingType, 3, 'house');
      filterTypeHouse(data, housingType, 4, 'bungalo');

    });

    housingPrice.addEventListener('change', function () {

      // Фильтрация по цене
      if (defaultFilterValues) {
        window.renderElementsLoad(data);
      }

      filterPrice(data, housingPrice, 1, 0, 10000);
      filterPrice(data, housingPrice, 2, 10000, 50000);
      filterPrice(data, housingPrice, 3, 50000, Infinity);

    });

    housingRooms.addEventListener('change', function () {

      // Фильтрация по кол-ву комнат
      if (defaultFilterValues) {
        window.renderElementsLoad(data);
      }

      filterNumberRooms(data, housingRooms, 1, 1);
      filterNumberRooms(data, housingRooms, 2, 2);
      filterNumberRooms(data, housingRooms, 3, 3);
    });

    housingGuests.addEventListener('change', function () {

      // Фильтрация по кол-ву гостей
      if (defaultFilterValues) {
        window.renderElementsLoad(data);
      }
      filterNumberGuests(data, housingGuests, 1, 2);
      filterNumberGuests(data, housingGuests, 2, 1);
      filterNumberGuests(data, housingGuests, 3, 0);
    });

    housingFeatures.addEventListener('change', function () {

      // Фильтрация по кол-ву гостей
      if (defaultFilterValues) {
        window.renderElementsLoad(data);
      }
      filterFeatures(data, 1, 'wi-fi');
    });


  };

})();
