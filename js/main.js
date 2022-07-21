var $entryForm = document.querySelector('.form-view');
var $image = document.querySelector('.image');
var $photoUrl = document.querySelector('.photoUrl');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $entryTitle = document.querySelector('.entry-title');

function handleImage(event) {
  var photoUrlValue = $entryForm.elements.photoUrl.value;
  $image.setAttribute('src', photoUrlValue);
}

$photoUrl.addEventListener('input', handleImage);

function handleEntryForm(event) {
  event.preventDefault();
  var getUl = document.querySelector('ul');
  var formValues = {
    title: $entryForm.elements.title.value,
    photoUrl: $entryForm.elements.photoUrl.value,
    notes: $entryForm.elements.notes.value
  };

  var $liElement = document.querySelectorAll('li');
  if (data.editing !== null) {
    formValues.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = formValues;
        $liElement[i].replaceWith(journalEntries(formValues));
        data.editing = null;
        viewSwapping('entries');
      }
    }
  } else {
    formValues.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formValues);
    getUl.prepend(journalEntries(formValues));
    viewSwapping('entries');
  }
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
  viewSwapping('entries');
  data.view = 'entries';
}

$entryForm.addEventListener('submit', handleEntryForm);

function journalEntries(entry) {
  var liElement = document.createElement('li');
  liElement.setAttribute('data-entry-id', entry.entryId);

  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'container');
  liElement.appendChild(containerDiv);

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  containerDiv.appendChild(rowDiv);

  var columnHalfImage = document.createElement('div');
  columnHalfImage.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnHalfImage);

  var image = document.createElement('img');
  image.setAttribute('src', entry.photoUrl);
  columnHalfImage.appendChild(image);

  var columnHalfText = document.createElement('div');
  columnHalfText.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnHalfText);

  var h2Element = document.createElement('h2');
  h2Element.textContent = entry.title;
  h2Element.setAttribute('class', 'display-flex');
  columnHalfText.appendChild(h2Element);

  var penIcon = document.createElement('i');
  penIcon.setAttribute('class', 'fa-solid fa-pen pen');
  h2Element.appendChild(penIcon);

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;
  columnHalfText.appendChild(pElement);

  return liElement;
}

var $ulElement = document.querySelector('.entries-list');

function handleUl(event) {
  if (event.target.tagName === 'I') {
    var closestLiAttributeString = event.target.closest('li').getAttribute('data-entry-id');
    var closestLiAttribute = Number(closestLiAttributeString);
    viewSwapping('entry-form');
    data.view = 'entry-form';
  }
  for (var i = 0; i < data.entries.length; i++) {
    if (closestLiAttribute === data.entries[i].entryId) {
      data.editing = data.entries[i];
      $title.value = data.editing.title;
      $photoUrl.value = data.editing.photoUrl;
      $notes.value = data.editing.notes;
      $image.setAttribute('src', data.editing.photoUrl);
      $entryTitle.textContent = 'Edit Entry';
      viewSwapping('entry-form');
    }
  }
}

$ulElement.addEventListener('click', handleUl);

function handleContentLoaded(event) {
  var getUl = document.querySelector('ul');

  for (var i = 0; i < data.entries.length; i++) {
    var ulAppend = journalEntries(data.entries[i]);
    getUl.appendChild(ulAppend);
  }

  var $dataView = data.view;
  if ($dataView === 'entry-form') {
    $entryForm.className = 'form-view';
    entriesContainer.className = 'container entries-view hidden';
  } else if ($dataView === 'entries') {
    $entryForm.className = 'form-view hidden';
    entriesContainer.className = 'container entries-view';
  }
}

window.addEventListener('DOMContentLoaded', handleContentLoaded);

function viewSwapping(event) {
  if (event === 'entry-form') {
    $entryForm.className = 'form-view';
    entriesContainer.className = 'container entries-view hidden';
  } else if (event === 'entries') {
    $entryForm.className = 'form-view hidden';
    entriesContainer.className = 'container entries-view';
  }
}

var viewEntries = document.querySelector('.navbar-button');
var entriesContainer = document.querySelector('.entries-view');
var $noEntries = document.querySelector('.no-entries');

function handleEntries(event) {
  if (event.target === viewEntries) {
    viewSwapping('entries');
  }
  if (data.entries.length === 0) {
    $noEntries.className = 'no-entries';
  } else {
    $noEntries.className = 'no-entries hidden';
  }
  data.view = 'entries';
}

viewEntries.addEventListener('click', handleEntries);

var $newButton = document.querySelector('.new-button');

function handleNewButton(event) {
  if (event.target === $newButton) {
    $noEntries.className = 'no-entries hidden';
    viewSwapping('entry-form');
    $entryForm.reset();
    $image.setAttribute('src', '/images/placeholder-image-square.jpg');
    $entryTitle.textContent = 'New Entry';
    data.editing = null;
    data.view = 'entry-form';
  }
}

$newButton.addEventListener('click', handleNewButton);
