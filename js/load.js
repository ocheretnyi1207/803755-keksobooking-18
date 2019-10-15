'use strict';

(function () {
  window.load = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      callback(xhr.response);
    });
    xhr.send();
  };
})();
