'use strict'

const email = document.querySelector('#email');
const password = document.querySelector('#password');
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