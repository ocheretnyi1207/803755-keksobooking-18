'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  // Удаление лишних элементов при фильтрации
  var removeElements = function (childNode, parentNode) {
    Array.from(childNode).forEach(function (element) {
      parentNode.removeChild(element);
    });
  };

  // Очистка карты
  var clearMap = function () {
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapPins = document.querySelector('.map__pins');
    var mapCard = document.querySelectorAll('.map__card');
    var map = document.querySelector('.map');

    removeElements(mapPin, mapPins);
    removeElements(mapCard, map);
  };

  var getPriceRange = function (range) {
    switch (range) {
      case 'high':
        return {
          min: 50000, max: Infinity
        };
      case 'middle':
        return {
          min: 10000, max: 50000
        };
      case 'low':
        return {
          min: 0, max: 10000
        };
      default:
        return {
          min: 0, max: Infinity
        };
    }
  };

  window.filter = function (data) {
    window.renderElementsLoad(data);

    mapFilters.addEventListener('change', function (evt) {
      clearMap();

      var houseType = mapFilters.querySelector('#housing-type');
      var housePrice = mapFilters.querySelector('#housing-price');
      var houseRooms = mapFilters.querySelector('#housing-rooms');
      var houseGuests = mapFilters.querySelector('#housing-guests');
      var priceRange = getPriceRange(housePrice.value);

      if (evt.target === houseType) {
        var sortData = data.filter(function (element) {
          return (element.offer.type === houseType.value);
        });
      }

      if (evt.target === housePrice) {
        sortData = data.filter(function (element) {
          return element.offer.price >= priceRange.min && element.offer.price < priceRange.max;
        });
      }

      if (evt.target === houseRooms) {
        sortData = data.filter(function (element) {
          return (element.offer.rooms === +houseRooms.value);
        });
      }

      if (evt.target === houseGuests) {
        sortData = data.filter(function (element) {
          return (element.offer.guests === +houseGuests.value);
        });
      }

      window.renderElementsLoad(sortData);
    });
  };


})();
