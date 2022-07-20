/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('code-journal-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function handleStroage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
}

window.addEventListener('beforeunload', handleStroage);

var $entryForm = document.forms[0];
var $image = document.querySelector('.image');

function handleEntryForm(event) {
  event.preventDefault();
  var formValues = {
    title: $entryForm.elements.title.value,
    photoUrl: $entryForm.elements.photoUrl.value,
    notes: $entryForm.elements.notes.value
  };
  getUl.prepend(journalEntries(formValues));
  entriesContainer.className = 'container view';
  $form.className = 'form-background hidden';

  formValues.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formValues);
  $image.setAttribute('src', '/images/placeholder-image-square.jpg');
  $entryForm.reset();
  data.view = 'entries';
}

$entryForm.addEventListener('submit', handleEntryForm);

function journalEntries(entry) {
  var liElement = document.createElement('li');

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
  columnHalfText.appendChild(h2Element);

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;
  columnHalfText.appendChild(pElement);

  return liElement;
}

var getUl = document.querySelector('ul');

for (var i = 0; i < data.entries.length; i++) {
  var ulAppend = journalEntries(data.entries[i]);
  getUl.appendChild(ulAppend);
}

window.addEventListener('DOMContentLoaded', journalEntries);

var viewEntries = document.querySelector('.navbar-button');
var entriesContainer = document.querySelector('.view');
var $form = document.querySelector('form');
var $noEntries = document.querySelector('.no-entries');

function handleEntries(event) {
  if (event.target === viewEntries) {
    entriesContainer.className = 'container view';
    $form.className = 'form-background hidden';
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
    $form.className = 'form-background';
    entriesContainer.className = 'container view hidden';
    data.view = 'entry-form';
  }
}

$newButton.addEventListener('click', handleNewButton);

var $dataView = data.view;

if ($dataView === 'entry-form') {
  $form.className = 'form-background';
  entriesContainer.className = 'container view hidden';
} else {
  $form.className = 'form-background hidden';
  entriesContainer.className = 'container view';
}
