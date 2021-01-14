const getController = (req, res) => {
  console.log(req.session);
  res.status(200).send('login get');
}

const postController = (req, res) => {
  res.status(200).send('login post');
}

module.exports = {
  getController,
  postController
}