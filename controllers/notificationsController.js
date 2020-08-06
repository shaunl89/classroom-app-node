const db = require('../models')
const { Op } = require('sequelize');

module.exports = (req, res) => {
  const { teacher, notification } = req.body
  
  // find students in notification @mentioned
  const emailRegex = /@\S+@\S+/g;
  const mentions = req.body.notification.match(emailRegex)
  
  // check student is registered to teacher
  db.Teacher.findOne({
    where: {
      email: teacher
    }
  }).then((teacher) => {

    db.Student.findAll({
      where: {
        email: mentions
      }
    }).then((students) => {
      const studentsIds = students.map((student) => {
        return student.id
      })

      db.TeachersStudents.findAll({
        attributes: ['StudentId'],
        where: {
          [Op.and]: [
            { teacherId: teacher.id},
            { studentId: studentsIds }
          ]
        }
      }).then((studentIds) => {
        db.Student.findAll({
          where: {
            [Op.and]: [
              { id: studentIds },
              { suspended: 0 }
            ],
          }
        }).then((students) => {
          res.status(200).send({
            students: students
          })
        })
      })
    })
  }
  
  ).catch((err) => {
    res.status(400).send({
      error: true,
      message: `An error occured, ${err.message}`
    })
  })
}
