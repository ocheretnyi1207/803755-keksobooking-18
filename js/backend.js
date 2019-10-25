'use strict';

(function () {
  window.load = function (successCallback, errorCallback) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', window.util.URL_LOAD);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SERVER_RESPONCE_SUCCESS) {
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

    xhr.timeout = window.util.TIMEOUT;
  };

  window.upload = function (data, successCallback, errorCallback) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('POST', window.URL_UPLOAD);
    xhr.send(data);
    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.SERVER_RESPONCE_SUCCESS) {
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

      xhr.timeout = window.util.TIMEOUT;
    });
  };

})();
