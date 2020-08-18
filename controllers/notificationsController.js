const db = require('../models')

module.exports = async (req, res) => {
  const { teacher, notification } = req.body
  
  // find students in notification @mentioned
  const emailRegex = /@\S+@\S+/g;
  const mentions = notification.match(emailRegex)
  
  try {
    const teacherId = await db.Teacher.findOne({
      attributes: ['id'],
      where: {
        email: teacher
      }
    })

    if (!teacherId) throw 'No teacher found'

    // find students under the teacher
    const teachersStudents = await db.sequelize.query(`
      SELECT email
      FROM Students LEFT JOIN TeachersStudents
      ON Students.id = TeachersStudents.StudentId
      WHERE TeacherId = ${teacherId.id} AND suspended = false;
    `)
  
    // find students in @mentioned
    const studentsMentioned = await db.Student.findAll({
      attributes: ['email'],
      where: {
        email: mentions.map((mention) => mention.slice(1)),
        suspended: false
      }
    })

    const mentioned = []
    teachersStudents[0].forEach((student) => {
      if (!mentioned.includes(student.email)) {
        mentioned.push(student.email)
      }
    })
    studentsMentioned.forEach((student) => {
      if (!mentioned.includes(student.email)) {
        mentioned.push(student.email)
      }
    })

    res.status(200).send({
      recipients: mentioned
    })

  } catch(err) {
    res.status(400).send({
      error: true,
      message: `Something went wrong with POST /notifications: ${err}`
    })
  }
}
