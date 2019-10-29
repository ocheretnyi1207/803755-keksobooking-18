'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  // Дефолтный фильтр
  var defaultFilter = (housingType.options[0].selected || housingPrice.options[0].selected ||
    housingRooms.options[0].selected || housingGuests.options[0].selected);


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


  window.filter = function (data) {

    if (defaultFilter) {
      window.renderElementsLoad(data);
    }

    housingType.addEventListener('change', function () {

      // Фильтрация по типу дома
      if (defaultFilter) {
        window.renderElementsLoad(data);
      }

      filterTypeHouse(data, housingType, 1, 'palace');
      filterTypeHouse(data, housingType, 2, 'flat');
      filterTypeHouse(data, housingType, 3, 'house');
      filterTypeHouse(data, housingType, 4, 'bungalo');

    });

    housingPrice.addEventListener('change', function () {

      // Фильтрация по цене
      if (defaultFilter) {
        window.renderElementsLoad(data);
      }

      filterPrice(data, housingPrice, 1, 0, 10000);
      filterPrice(data, housingPrice, 2, 10000, 50000);
      filterPrice(data, housingPrice, 3, 50000, Infinity);

    });
  };

})();
