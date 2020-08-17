const db = require("../models")

module.exports = (req, res) => {
  db.Student.update({
    suspended: true
  }, {
    where: {
      email: req.body.student
    }
  }).then(() => {
    res.send(204)
  }).catch((err) => {
    res.status(400).send({
      error: true,
      message: `Something went wrong, ${err.message}`
    })
  })
}