$(() => {
  const email = $('#email-field');
  const confirmEmail = $('#confirm-email-field');
  const password = $('#password-field');
  const confirmPassword = $('#confirm-password-field');
  const allInputFields = [email, confirmEmail, password, confirmPassword];
  const btn = $('#btn');

  $.each(allInputFields, (_, value) => {
    value.keyup(() => {
      if (email.val() && confirmEmail.val() && password.val() && confirmPassword.val()) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    });
  });
});
