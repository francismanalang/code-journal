var $entryForm = document.forms[0];
var $image = document.querySelector('.image');
var $photoUrl = document.querySelector('.photoUrl');

function handleImage(event) {
  var photoUrlValue = $entryForm.elements.photoUrl.value;
  $image.setAttribute('src', photoUrlValue);
}

$photoUrl.addEventListener('input', handleImage);

function handleEntryForm(event) {
  event.preventDefault();
  var formValues = {
    title: $entryForm.elements.title.value,
    photoUrl: $entryForm.elements.photoUrl.value,
    notes: $entryForm.elements.notes.value
  };
  formValues.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formValues);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', handleEntryForm);
