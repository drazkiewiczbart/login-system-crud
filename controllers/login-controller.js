const getController = (req, res) => {
  res.render('login-view');
}

const postController = (req, res) => {
  res.status(200).send('login post');
}

module.exports = {
  getController,
  postController
}