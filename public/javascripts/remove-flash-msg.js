$(() => {
  if ($('#flash-message')) {
    setTimeout(() => {
      $('#flash-message').remove();
    }, 4000);
  }
});
