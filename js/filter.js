'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  housingType.addEventListener('change', function () {
    if (housingType.options[4].selected) {
      var sortAds = window.similarAds.filter(function (elements) {
        return elements.offer.type === 'bungalo';
      });

      window.renderElementsLoad(sortAds);
    }
  });


})();
