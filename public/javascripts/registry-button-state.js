const email = document.querySelector('#email-field');
const confirmEmail = document.querySelector('#confirm-email-field');
const password = document.querySelector('#password-field');
const confirmPassword = document.querySelector('#confirm-password-field');
const allInputFields = [email, confirmEmail, password, confirmPassword];
const btn = document.querySelector('#btn');

allInputFields.forEach((inputField) => {
  inputField.addEventListener('keyup', () => {
    if (email.value && confirmEmail.value && password.value && confirmPassword.value) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
});
