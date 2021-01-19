'use strict'

const email = document.querySelector('#email-field');
const password = document.querySelector('#password-field');
const allInputFields = [email, password];
const btn = document.querySelector('#btn');

allInputFields.forEach(inputField => {
  inputField.addEventListener('keyup', () => {
    if(email.value && password.value) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
});