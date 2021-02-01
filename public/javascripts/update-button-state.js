const firstName = document.querySelector('#first-name-field');
const lastName = document.querySelector('#last-name-field');
const aboutMe = document.querySelector('#about-me-field');
const address = document.querySelector('#address-field');
const city = document.querySelector('#city-field');
const postCode = document.querySelector('#postcode-field');
const country = document.querySelector('#country-field');
const button = document.querySelector('#btn-update');

const allFields = [firstName, lastName, aboutMe, address, city, postCode, country];
allFields.forEach((field) => {
  field.addEventListener('keyup', () => {
    if(firstName.value || lastName.value || aboutMe.value || address.value || city.value || postCode.value || country.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
});
