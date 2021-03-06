'use strict';

(function () {
  var ifAvatar = document.querySelector('#avatar');
  var ifPhoto = document.querySelector('#images');
  var previewUserPic = document.querySelector('.ad-form-header__preview img');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var changePhoto = function (evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.util.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (evt.target === ifAvatar) {
          previewUserPic.src = reader.result;
        }
        if (evt.target === ifPhoto) {
          previewPhoto.style.backgroundImage = 'url(' + reader.result + ')';
          previewPhoto.style.backgroundRepeat = 'no-repeat';
          previewPhoto.style.backgroundSize = 'cover';
        }
      });

      reader.readAsDataURL(file);
    }
  };

  ifAvatar.addEventListener('change', changePhoto);
  ifPhoto.addEventListener('change', changePhoto);

  window.avatar = {
    previewUserPic: previewUserPic,
    previewPhoto: previewPhoto
  };
})();
