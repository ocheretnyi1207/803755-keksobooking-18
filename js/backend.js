'use strict';

(function () {
  window.load = function (successCallback, errorCallback) {

    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successCallback(xhr.response);
      } else {
        errorCallback('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorCallback('Произошла ошибка соединения');
    });


    xhr.addEventListener('timeout', function () {
      errorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10 sec
  };

  window.upload = function (data, successCallback) {

    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', URL);
    xhr.send(data);
    xhr.addEventListener('load', function () {
      successCallback(xhr);
    });
  };

})();
