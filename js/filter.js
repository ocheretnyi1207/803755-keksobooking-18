'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  // Функция фильтрации по цене
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

  var filtrate = function (data) {

    var visibleData = data.slice(0, window.util.MAX_VISIBLE_PIN);
    window.render.renderElementsLoad(visibleData);

    mapFilters.addEventListener('change', function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var ads = document.querySelectorAll('.map__card');
      var houseType = mapFilters.querySelector('#housing-type');
      var housePrice = mapFilters.querySelector('#housing-price');
      var houseRooms = mapFilters.querySelector('#housing-rooms');
      var houseGuests = mapFilters.querySelector('#housing-guests');
      var houseFeatures = mapFilters.querySelectorAll('#housing-features input');
      var priceRange = getPriceRange(housePrice.value);

      window.render.clearMap(ads);
      window.render.clearMap(pins);

      var selectedFeatures = [];
      for (var i = 0; i < houseFeatures.length; i++) {
        if (houseFeatures[i].checked) {
          selectedFeatures.push(houseFeatures[i].value);
        }
      }

      var sortData = data.filter(function (element) {
        return (element.offer.type === houseType.value || houseType.value === 'any') &&
          (element.offer.rooms === +houseRooms.value || houseRooms.value === 'any') &&
          (element.offer.guests === +houseGuests.value || houseGuests.value === 'any') &&
          element.offer.price >= priceRange.min && element.offer.price < priceRange.max &&
          selectedFeatures.every(function (feature) {
            return element.offer.features.includes(feature);
          });

      });

      var visibleFilterData = sortData.slice(0, window.util.MAX_VISIBLE_PIN);

      // Устранение дребезга
      var lastTimeout;
      var debounce = function (cb) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(cb, window.util.DEBOUNCE_INTERVAL);
      };

      debounce((function () {
        window.render.renderElementsLoad(visibleFilterData);
      }));

    });
  };

  window.filter = {
    filtrate: filtrate
  };

})();
