const db = require('../models')

module.exports = (req, res) => {
  db.Student.update({
    suspended: true
  }, {
    where: {
      email: req.body.student
    }
  }).then(() => {
    res.status(204).send()
  }).catch((err) => {
    res.status(400).send({
      error: true,
      message: `Something went wrong, ${err.message}`
    })
  })
}