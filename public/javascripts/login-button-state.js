$(() => {
  const email = $('#email-field');
  const password = $('#password-field');
  const allInputFields = [email, password];
  const btn = $('#btn');

  $.each(allInputFields, (_, value) => {
    value.keyup(() => {
      if (email.val() && password.val()) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    });
  });
});
