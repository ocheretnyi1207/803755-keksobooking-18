'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  window.filter = function (data) {

    if (housingType.options[0].selected) {
      window.renderElementsLoad(data);
    }

    housingType.addEventListener('change', function () {

      var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var mapPins = document.querySelector('.map__pins');
      var mapCard = document.querySelectorAll('.map__card');
      var map = document.querySelector('.map');

      if (housingType.options[0].selected) {
        window.renderElementsLoad(data);
      }

      if (housingType.options[1].selected) {

        Array.from(mapPin).forEach(function (element) {
          mapPins.removeChild(element);
        });

        Array.from(mapCard).forEach(function (element) {
          map.removeChild(element);
        });

        var sortAds = data.filter(function (element) {
          return element.offer.type === 'palace';
        });

        window.renderElementsLoad(sortAds);
      }


      if (housingType.options[2].selected) {

        Array.from(mapPin).forEach(function (element) {
          mapPins.removeChild(element);
        });

        Array.from(mapCard).forEach(function (element) {
          map.removeChild(element);
        });


        sortAds = data.filter(function (element) {
          return element.offer.type === 'flat';
        });

        window.renderElementsLoad(sortAds);
      }


      if (housingType.options[3].selected) {

        Array.from(mapPin).forEach(function (element) {
          mapPins.removeChild(element);
        });

        Array.from(mapCard).forEach(function (element) {
          map.removeChild(element);
        });

        sortAds = data.filter(function (element) {
          return element.offer.type === 'house';
        });

        window.renderElementsLoad(sortAds);
      }

      if (housingType.options[4].selected) {

        Array.from(mapPin).forEach(function (element) {
          mapPins.removeChild(element);
        });

        Array.from(mapCard).forEach(function (element) {
          map.removeChild(element);
        });

        sortAds = data.filter(function (element) {
          return element.offer.type === 'bungalo';
        });

        window.renderElementsLoad(sortAds);
      }
    });
  };

})();
