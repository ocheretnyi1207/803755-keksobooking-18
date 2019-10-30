'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');
  var housePrice = mapFilters.querySelector('#housing-price');
  var houseRooms = mapFilters.querySelector('#housing-rooms');
  var houseGuests = mapFilters.querySelector('#housing-guests');

  // Дефолтный фильтр
  var defaultFilterValue = (houseType.options.value === 'any'.selected || housePrice.options.value === 'any'.selected ||
    houseRooms.options.value === 'any'.selected || houseGuests.options.value === 'any'.selected);


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

    if (defaultFilterValue) {
      window.renderElementsLoad(data);
    }

    houseType.addEventListener('change', function () {

      if (defaultFilterValue) {
        window.renderElementsLoad(data);
      }

      filterTypeHouse(data, houseType, 1, 'palace');
      filterTypeHouse(data, houseType, 2, 'flat');
      filterTypeHouse(data, houseType, 3, 'house');
      filterTypeHouse(data, houseType, 4, 'bungalo');

    });

    housePrice.addEventListener('change', function () {

      if (defaultFilterValue) {
        window.renderElementsLoad(data);
      }

      filterPrice(data, housePrice, 1, 0, 10000);
      filterPrice(data, housePrice, 2, 10000, 50000);
      filterPrice(data, housePrice, 3, 50000, Infinity);

    });
  };


})();
