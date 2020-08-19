const db = require('../models')

module.exports = async (req, res) => {
  const { teacher: teacherEmail, students } = req.body
  // TODO: validate emails

  let studentsEmails
  if (!Array.isArray(students)) {
    studentsEmails = [students]
  } else {
    studentsEmails = students
  }

  try {
    if (!studentsEmails.length) throw 'No students were listed'

    let teacher = await db.Teacher.findOne({
      where: {
        email: teacherEmail
      }
    })
  
    if (!teacher) {
      teacher = await db.Teacher.create({
        email: teacherEmail
      })
    }

    await Promise.all(
      studentsEmails.map(async (studentEmail) => {
        let student = await db.Student.create({
          email: studentEmail,
          suspended: false
        })
        await db.TeachersStudents.create({
          TeacherId: teacher.id,
          StudentId: student.id
        })
      })
    )
    res.status(204).send()

  } catch (err) {
    res.status(400).send({
      error: true,
      message: `Something went wrong with POST /register: ${err.message}`
    })
  }
}