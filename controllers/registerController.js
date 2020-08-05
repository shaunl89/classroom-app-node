const db = require("../models")

module.exports = (req, res) => {
  const { teacher: teacherEmail, students } = req.body
  // TODO: validate emails

  let studentsEmails
  if (!Array.isArray(students)) {
    studentsEmails = [students]
  } else {
    studentsEmails = students
  }

  db.Teacher.findOne({
    where: { email: teacherEmail }
  }).then(function(teacher) {

    if (!teacher) {
      return db.Teacher.create({
        email: teacherEmail
      })
    }

  }).then(function(teacher) {
    studentsEmails.forEach((studentEmail) => {
      db.Student.create({
        email: studentEmail,
        suspended: false
      }).then(function(student) {
        db.TeachersStudents.create({
          TeacherId: teacher.id,
          StudentId: student.id
        })
      })
    })
  }).then(() => {
    res.status(204)
  }).catch(function(err) {
    res.status(400).send({
      error: true,
      message: `Something went wrong! ${err.message}`
    })
  })
}