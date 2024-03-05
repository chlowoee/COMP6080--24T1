const mainForm = document.forms[0];

//checkboxes
const checkedCheckboxes = new Set();

/**
 * Handles checkboxes and updates value of select-all-btn
 * @param {*} event 
 */
const checkboxHandler = (event) => {
  let checkbox = event.target;
  checkbox.checked ? checkedCheckboxes.add(checkbox) : checkedCheckboxes.delete(checkbox);
  mainForm['select-all-btn'].value = checkedCheckboxes.size !== 4 ? 'Select All' : 'Deselect All';
}

const checkboxes = document.querySelectorAll('input[type = "checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', checkboxHandler);
});

// select all
mainForm['select-all-btn'].addEventListener('click', () => {
  if (mainForm['select-all-btn'].value === 'Select All') {
    checkboxes.forEach(cb => {
      cb.checked = true;
      checkedCheckboxes.add(cb);
    })
    mainForm['select-all-btn'].value = 'Deselect All';
  } else {
    checkboxes.forEach(cb => {
      cb.checked = false;
      checkedCheckboxes.add(cb);
    })
    mainForm['select-all-btn'].value = 'Select All';
  }
  writeToOutput();
});

const completedFields = new Set();

/**
 * If a date is valid, returns age. Else returns false.
 * @param {String} dob 
 * @returns {Number}
 */
const isValidDate = (dob) => {
  if (!isValidDateFormat(dob)) {
    return false;
  }
  let parts = dob.split('/');
  let day = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10) - 1;
  let year = parseInt(parts[2], 10);
  let date = new Date(year, month, day);
  if (!isValidParsedDate(date, day, month, year)) {
    return false;
  }
  return calculateAge(date);
}

/**
 * Validates the dob format
 * @param {Number} dob 
 * @returns 
 */
const isValidDateFormat = (dob) => {
  let dateRegex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return dateRegex.test(dob);
}

/**
 * Validates parsed date
 * @param {Number} date 
 * @param {Number} day 
 * @param {Number} month 
 * @param {Number} year 
 * @returns 
 */
const isValidParsedDate = (date, day, month, year) => date.getDate() === day
  && date.getMonth() === month && date.getFullYear() === year;

/**
 * Calculates age based on date
 * @param {Number} date 
 * @returns age if valid, false if invalid
 */
const calculateAge = (date) => {
  let today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  let months = today.getMonth() - date.getMonth();
  let days = today.getDate() - date.getDate();
  if (months < 0 || (months === 0 && days < 0)) {
    age--;
  }
  if (age < 0) {
    return false;
  }
  return age;
}

const isValidStreetnameSuburb = (field) => (field.value !== '' && field.value.length >= 3 && field.value.length <= 50);
const isValidPostcode = (field) => (/^\d{4}$/.test(field.value));

const editedFields = new Set();

/**
 * Handler for text inputs
 * @param {} field 
 */
const fieldHandler = (field) => {
  editedFields.add(mainForm[field.id]);
  if (((field.id === 'street-name' || field.id === 'suburb') && isValidStreetnameSuburb(field))
    || (field.id === 'postcode' && isValidPostcode(field))
    || (field.id === 'dob' && isValidDate(field.value))) {
    validTextInput(field);
  } else {
    inputRendering();
  }
}

const inputRendering = () => {
  if (!mainForm['street-name'].value || !isValidStreetnameSuburb(mainForm['street-name'])) {
    mainForm['form-result'].value = `Please input a valid street name`;
    completedFields.delete(mainForm['street-name']);
  } else if (!mainForm['suburb'].value || !isValidStreetnameSuburb(mainForm['suburb'])) {
    mainForm['form-result'].value = `Please input a valid suburb`;
    completedFields.delete(mainForm['suburb']);
  } else if (!mainForm['postcode'].value || !isValidPostcode(mainForm['postcode'])) {
    mainForm['form-result'].value = 'Please input a valid postcode';
    completedFields.delete(mainForm['postcode']);
  } else if (!mainForm['dob'].value || !isValidDate(mainForm['dob'].value)) {
    mainForm['form-result'].value = 'Please input a valid dob';
    completedFields.delete(mainForm['dob']);
  }
}

/**
 * Carries out checks when valid text is inputted
 * @param {*} field 
 */
const validTextInput = (field) => {
  completedFields.add(mainForm[field.id]);
  editedFields.delete(mainForm[field.id]);
  (editedFields.size === 0 && completedFields.size < 4)
    ? mainForm['form-result'].value = '' : inputRendering();
}

mainForm['street-name'].addEventListener('blur', function () {
  fieldHandler(mainForm['street-name']);
  writeToOutput();
});

mainForm['suburb'].addEventListener('blur', function () {
  fieldHandler(mainForm['suburb']);
  writeToOutput();
});

mainForm['postcode'].addEventListener('blur', function () {
  fieldHandler(mainForm['postcode']);
  writeToOutput();
});

mainForm['dob'].addEventListener('blur', function () {
  fieldHandler(mainForm['dob']);
  writeToOutput();
});

mainForm.addEventListener('change', () => {
  writeToOutput();
});

/**
 * Creates the form result string from all form info
 * @returns 
 */
const writeToOutput = () => {
  if (completedFields.size <= 3) return;

  let checkedFeatures = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
  let buildingType = mainForm['building-type'].value === 'apartment' ? 'an Apartment' : 'a House';
  let age = isValidDate(mainForm['dob'].value);
  let address = `${mainForm['street-name'].value} St, ${mainForm['suburb'].value}, ${mainForm['postcode'].value}, Australia`;
  let featuresString = checkedFeatures.length === 0 ? 'no features.' :
    checkedFeatures.length === 1 ? `${checkedFeatures[0]}.` :
      `${checkedFeatures.slice(0, -1).join(', ')} and ${checkedFeatures.slice(-1)[0]}.`;

  let finalOutput = `You are ${age} years old, and your address is ${address}. Your building is ${buildingType}, and it has ${featuresString}`;
  mainForm['form-result'].value = finalOutput;
}

