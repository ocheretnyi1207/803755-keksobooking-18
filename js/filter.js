'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');


  var defaultFilter = (housingType.options[0].selected || housingPrice.options[0].selected ||
    housingRooms.options[0].selected || housingGuests.options[0].selected);


  // Удаление лишних элементов при фильтрации по типу жилья
  var removeElements = function (childNode, parentNode) {
    Array.from(childNode).forEach(function (element) {
      parentNode.removeChild(element);
    });
  };

  // Функция фильтрации по типу жилья
  var filterData = function (data, filter, index, parametrFilter) {
    if (filter.options[index].selected) {
      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      removeElements(mapPin, mapPins);
      removeElements(mapCard, map);

      var sortAds = data.filter(function (element) {
        return element.offer.type === parametrFilter;
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

      filterData(data, housingType, 1, 'palace');
      filterData(data, housingType, 2, 'flat');
      filterData(data, housingType, 3, 'house');
      filterData(data, housingType, 4, 'bungalo');

    });
  };

})();
