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
    }
    mainForm['select-all-btn'].value = 'Deselect All';
  } else {
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    mainForm['select-all-btn'].value = 'Select All';
  }
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
  return (
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year
  );
}
var editedFields = new Set();
function fieldHandler(field) {
  if (((field.id === 'street-name' || field.id === 'suburb') && (!field.value
    || field.value.length < 3 || field.value.length > 50))
    || (field.id === 'postcode' && !/^\d{4}$/.test(field.value))
    || (field.id === 'dob' && !isValidDate(mainForm['dob'].value))) {
    invalidTextInput(field);
  } else {
    validTextInput(field);
  }
}

function invalidTextInput(field) {
  completedFields.delete(mainForm[field.id]);
  editedFields.add(mainForm[field.id]);
  editOutput();
}

function validTextInput(field) {
  completedFields.add(mainForm[field.id]);
  editedFields.delete(mainForm[field.id]);
  editOutput();
}

function editOutput() {
  if (editedFields.size === 0 && completedFields.size < 4) {
    mainForm['form-result'].value = '';
  } else if (editedFields.size > 0 && completedFields.size < 4) {
    let fieldString = editedFields.values().next().value.id;
    if (fieldString === 'street-name') {
      fieldString = 'street name';
    }
    mainForm['form-result'].value = `Please input a valid ${fieldString}`;
  }
}
