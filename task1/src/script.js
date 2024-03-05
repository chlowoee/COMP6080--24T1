const mainForm = document.forms[0];

//checkboxes
var checkedCheckboxes = new Set();
function checkboxHandler(event) {
  let checkbox = event.target;
  if (checkbox.checked) {
    checkedCheckboxes.add(checkbox);
  } else {
    checkedCheckboxes.delete(checkbox);
  }
  if (checkedCheckboxes.size != 4) {
    mainForm['select-all-btn'].value = 'Select All';
  } else {
    mainForm['select-all-btn'].value = 'Deselect All';
  }
}

var checkboxes = document.querySelectorAll('input[type = "checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', checkboxHandler);
});

// select all
mainForm['select-all-btn'].addEventListener('click', () => {
  if (mainForm['select-all-btn'].value === 'Select All') {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
      checkedCheckboxes.add(checkboxes[i]);
    }
    mainForm['select-all-btn'].value = 'Deselect All';
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkedCheckboxes.delete(checkboxes[i]);
    }
    mainForm['select-all-btn'].value = 'Select All';
  }
  writeToOutput();
});

var completedFields = new Set();

function getAge(dob) {
  let today = new Date();
  let dobString = dob.split('/');
  let dobReverse = dobString.reverse().join('/');
  let dobFinal = new Date(dobReverse);
  let year = today.getFullYear() - dobFinal.getFullYear();
  let months = today.getMonth() - dobFinal.getMonth();
  let days = today.getDate() - dobFinal.getDate();
  if (months < 0 || (months === 0 && days < 0)) {
    year--;
  }
  return year;
}

//check if dis
function isValidDate(dob) {
  let dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  if (!dateRegex.test(dob)) {
    return false;
  }
  let parts = dob.split('/');
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1;
  let year = parseInt(parts[2], 10);
  let date = new Date(year, month, day);
  if (date.getDate() !== day || date.getMonth() !== month
    || date.getFullYear() !== year) {
    return false;
  }
  let today = new Date();

  let newYear = today.getFullYear() - date.getFullYear();
  let newMonth = today.getMonth() - date.getMonth();
  let newDay = today.getDate() - date.getDate();

  if (newMonth < 0 || (newMonth === 0 && newDay < 0)) {
    newYear--;
  }
  if (newYear < 0) {
    return false;
  }

  return newYear;
}
const isValidStreetnameSuburb = (field) => (field.value !== '' && field.value.length >= 3 && field.value.length <= 50);
const isValidPostcode = (field) => (/^\d{4}$/.test(field.value));
const isValidDob = (field) => isValidDate(field.value);

var editedFields = new Set();
function fieldHandler(field) {
  let fieldString = field.id;
  if (fieldString === 'street-name') {
    fieldString = 'street name';
  }
  editedFields.add(mainForm[field.id]);

  if (((field.id === 'street-name' || field.id === 'suburb') && isValidStreetnameSuburb(field))
    || (field.id === 'postcode' && isValidPostcode(field))
    || (field.id === 'dob' && isValidDob(field))) {
    validTextInput(field);
  } else {
    inputRendering();
  }
}

function inputRendering() {
  if (!mainForm['street-name'].value || !isValidStreetnameSuburb(mainForm['street-name'])) {
    mainForm['form-result'].value = `Please input a valid street name`;
    completedFields.delete(mainForm['street-name']);
  } else if (isValidStreetnameSuburb(mainForm['street-name'])
    && (!mainForm['suburb'].value || !isValidStreetnameSuburb(mainForm['suburb']))) {
    mainForm['form-result'].value = `Please input a valid suburb`;
    completedFields.delete(mainForm['suburb']);
  } else if (isValidStreetnameSuburb(mainForm['street-name'])
    && isValidStreetnameSuburb(mainForm['suburb'])
    && (!mainForm['postcode'].value || !isValidPostcode(mainForm['postcode']))) {
    mainForm['form-result'].value = 'Please input a valid postcode';
    completedFields.delete(mainForm['postcode']);
  } else if (isValidStreetnameSuburb(mainForm['street-name'])
    && isValidStreetnameSuburb(mainForm['suburb'])
    && isValidPostcode(mainForm['postcode'])
    && (!mainForm['dob'].value || !isValidDob(mainForm['dob']))) {
    mainForm['form-result'].value = 'Please input a valid dob';
    completedFields.delete(mainForm['dob']);
  }
}

function validTextInput(field) {
  console.log('invalidtextinput')
  console.log('before add')
  console.log(completedFields)

  console.log(completedFields.size)

  completedFields.add(mainForm[field.id]);
  console.log('after add')
  console.log(completedFields)

  console.log(completedFields.size)
  editedFields.delete(mainForm[field.id]);
  if (editedFields.size === 0 && completedFields.size < 4) {
    mainForm['form-result'].value = '';
  } else {
    inputRendering();
  }
}

mainForm['street-name'].addEventListener('blur', function () {
  fieldHandler(mainForm['street-name']);
});

mainForm['suburb'].addEventListener('blur', function () {
  fieldHandler(mainForm['suburb']);
});

mainForm['postcode'].addEventListener('blur', function () {
  fieldHandler(mainForm['postcode']);
});

mainForm['dob'].addEventListener('blur', function () {
  fieldHandler(mainForm['dob']);
});
