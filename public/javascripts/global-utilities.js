/*
 ** Show error or success message
 */
const messageAlert = (message) => {
  const response = `
  <p id="alert-text" class="alert-text">${message}</p>
  `;

  $(response).insertBefore('#button-wrapper');
};

const errorTag = () => {
  $('#alert-text').addClass('alert--error');
};

const successTag = () => {
  $('#alert-text').addClass('alert--success');
};

const dispalyAlertMessage = () => {
  $('#alert-text').fadeIn('slow', () => {});
  setTimeout(() => {
    $('#alert-text').fadeOut('slow', () => {
      $('#alert-text').remove();
    });
  }, 5000);
};
