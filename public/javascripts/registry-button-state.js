'use strict'

const email = document.querySelector('#email');
const confirmEmail = document.querySelector('#confirm-email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const allInputFields = [email, confirmEmail, password, confirmPassword];
const btn = document.querySelector('#btn');

allInputFields.forEach(inputField => {
  inputField.addEventListener('keyup', () => {
    if(email.value && confirmEmail.value && password.value && confirmPassword.value) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
});