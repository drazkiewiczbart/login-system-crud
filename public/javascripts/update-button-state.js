$(() => {
  const firstName = $('#first-name-field');
  const lastName = $('#last-name-field');
  const aboutMe = $('#about-me-field');
  const address = $('#address-field');
  const city = $('#city-field');
  const postCode = $('#postcode-field');
  const country = $('#country-field');
  const btn = $('#btn-update');
  const allFields = [firstName, lastName, aboutMe, address, city, postCode, country];

  $.each(allFields, (_, value) => {
    value.keyup(() => {
      if(firstName.val() || lastName.val() || aboutMe.val() || address.val() || city.val() || postCode.val() || country.val()) {
        btn.attr('disabled', false);
      } else {
        btn.attr('disabled', true);
      }
    });
  });
});
