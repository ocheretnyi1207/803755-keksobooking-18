'use strict';

(function () {
  window.load = function (url, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
  };
})();
