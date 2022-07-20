var $entryForm = document.forms[0];
var $image = document.querySelector('.image');
var $photoUrl = document.querySelector('.photoUrl');

function handleImage(event) {
  var photoUrlValue = $entryForm.elements.photoUrl.value;
  $image.setAttribute('src', photoUrlValue);
}

$photoUrl.addEventListener('input', handleImage);
