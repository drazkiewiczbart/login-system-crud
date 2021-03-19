/*
 ** Disable or enable registry button
 */

$(() => {
  const email = $('#registry-email');
  const confirmEmail = $('#registry-confirm-email');
  const password = $('#registry-password');
  const confirmPassword = $('#registry-confirm-password');
  const btn = $('#button');
  $.each([email, confirmEmail, password, confirmPassword], (_, value) => {
    value.keyup(() => {
      if (
        email.val() && confirmEmail.val() && password.val() && confirmPassword.val()
      ) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    });
  });
});
