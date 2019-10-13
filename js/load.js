'use strict';

(function () {
  window.load = function () {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function ()) {

    });

    xhr.send();
  };
})();
