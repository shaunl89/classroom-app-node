const db = require('../models')
const { Op } = require('sequelize');

module.exports = (req, res) => {
  const { teacher } = req.query

  db.Teacher.findAll({
    where: {
      email: teacher
    }
  }).then((teacher) => {
    const teachersIds = teacher.map((tchr) => {
      return { teacherId: tchr.id }
    })
    return db.TeachersStudents.findAll({
      where: {
        [Op.and]: teachersIds
      }
    }).then((results) => {
      let studArr = results.map((result) => {
        return { id: result.StudentId }
      })
      return db.Student.findAll({
        where: {
          [Op.or]: studArr
        }
      })
    }).then((students) => {
      const emails = students.map((student) => student.email)
      res.status(200).send({
        students: emails
      })
    }).catch((err) => {
      res.status(400).send({
        error: true,
        message: `No students found from ${teacher}, ${err.message}`
      })  
    })
  }).catch((err) => {
    res.status(400).send({
      error: true,
      message: `Cannot find teachers, ${teacher}, ${err.message}`
    })
  })
}
