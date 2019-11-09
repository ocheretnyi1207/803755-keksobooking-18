'use strict';

(function () {
  var createXhr = function (method, url, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(method, url);

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

    return xhr;
  };


  var load = function (successCallback, errorCallback) {
    createXhr('GET', window.util.URL_LOAD, successCallback, errorCallback).send();
  };


  var upload = function (data, successCallback, errorCallback) {
    createXhr('POST', window.util.URL_UPLOAD, successCallback, errorCallback).send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };

})();
