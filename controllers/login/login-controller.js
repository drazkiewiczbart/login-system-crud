/*
** Get method
*/

const getLoginPage = (req, res) => {
  const flashSuccessMsg = req.flash('suc').toString();
  const flashErrorMsg = req.flash('err').toString() || req.flash('error').toString();

  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('index-view', {
      suc: flashSuccessMsg,
      err: flashErrorMsg,
    });
  }
};

module.exports = {
  getLoginPage,
};
