'use strict';

(function () {
  var SERVER_RESPONCE_SUCCESS = 200;
  var TIMEOUT = 10000;

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

    xhr.timeout = TIMEOUT;
  };

  window.upload = function (data, successCallback, errorCallback) {

    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', URL);
    xhr.send(data);
    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_RESPONCE_SUCCESS) {
        successCallback('Данные были успешно отправлены');
      } else {
        errorCallback('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }


      xhr.addEventListener('error', function () {
        errorCallback('Произошла ошибка соединения');
      });


      xhr.addEventListener('timeout', function () {
        errorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;
    });
  };

})();
