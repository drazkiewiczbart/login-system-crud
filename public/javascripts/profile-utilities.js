/*
 ** Switch between profile and actions
 */
$(
  '#menu-wrapper-content-text-profile, #menu-wrapper-content-text-actions',
).click(function () {
  let target;
  let noTarget;
  if ($(this).is('#menu-wrapper-content-text-profile')) {
    target = '#menu-wrapper-content-text-profile';
    noTarget = '#menu-wrapper-content-text-actions';
  } else {
    target = '#menu-wrapper-content-text-actions';
    noTarget = '#menu-wrapper-content-text-profile';
  }

  if (!$(target).hasClass('menu-wrapper-content-text--activate')) {
    $(target).toggleClass('menu-wrapper-content-text--activate');
    $(noTarget).toggleClass('menu-wrapper-content-text--activate');
    $('#profile-wrapper').toggleClass('wrapper--hide');
    $('#actions-wrapper').toggleClass('wrapper--hide');
    if ($(target).is('#menu-wrapper-content-text-profile')) {
      $('#menu-wrapper-content-description').text('This is your profile data.');
    } else {
      $('#menu-wrapper-content-description').text(
        'In this place you can update or delete account.',
      );
    }
  }
});

/*
 ** Disable/Enable update button
 */
$(() => {
  const firstName = $('#first-name');
  const lastName = $('#last-name');
  const aboutMe = $('#about-me');
  const address = $('#address');
  const city = $('#city');
  const postCode = $('#postcode');
  const country = $('#country');
  const btn = $('#button');
  $.each(
    [firstName, lastName, aboutMe, address, city, postCode, country],
    (_, value) => {
      value.keyup(() => {
        if (
          firstName.val() ||
          lastName.val() ||
          aboutMe.val() ||
          address.val() ||
          city.val() ||
          postCode.val() ||
          country.val()
        ) {
          btn.attr('disabled', false);
        } else {
          btn.attr('disabled', true);
        }
      });
    },
  );
});

/*
 ** Show delete option
 */
$('#delete-account-link').click(() => {
  $('#actions-wrapper').toggleClass('wrapper--hide');
  $('#delete-wrapper').toggleClass('wrapper--hide');
  $('#menu-wrapper').toggleClass('wrapper--hide');
});

/*
 ** Hide delete option
 */
$('#keep-account-button').click(() => {
  $('#delete-wrapper').toggleClass('wrapper--hide');
  $('#actions-wrapper').toggleClass('wrapper--hide');
  $('#menu-wrapper').toggleClass('wrapper--hide');
});
