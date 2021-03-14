/*
 ** Disable/Enable login button
 */
$(() => {
  const email = $('#login-email');
  const password = $('#login-password');
  const btn = $('#button');
  $.each([email, password], (_, value) => {
    value.keyup(() => {
      if (email.val() && password.val()) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    });
  });
});
