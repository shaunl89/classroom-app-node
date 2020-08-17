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
      return tchr.id
    })
    /* 
      SELECT StudentId 
      FROM TeachersStudents
      WHERE TeacherId IN (1, 2)
      GROUP BY StudentId
      HAVING count(distinct TeacherId) = 2 
    */
    return db.TeachersStudents.findAll({
      attributes: ['StudentId'],
      where: {
        TeacherId: teachersIds
      }
    })
    .then((results) => {
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
