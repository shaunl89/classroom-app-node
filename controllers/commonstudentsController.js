const db = require('../models')

module.exports = async (req, res) => {
  const { teacher } = req.query

  try {
    if (!teacher) throw 'No teachers selected'

    let teachers = await db.Teacher.findAll({
      attributes: ['id'],
      where: {
        email: teacher
      }
    })

    if (!teachers.length) throw 'No teachers found'

    const teacherIds = teachers.map((teacher) => teacher.id)

    let studentIds = await db.sequelize.query(`
        SELECT StudentId 
        FROM TeachersStudents
        WHERE TeacherId IN (${[...teacherIds]})
        GROUP BY StudentId
        HAVING count(TeacherId) = ${teacherIds.length};
      `
    )
  
    let studentEmails = await db.Student.findAll({
      attributes: ['email'],
      where: {
        id: studentIds[0].map((ts) => ts.StudentId)
      }
    })

    res.status(200).send({
      students: studentEmails.map((student) => student.email)
    })

  } catch(err) {
    res.status(400).send({
      error: true,
      message: `Something went wrong with GET /commonstudents: ${err}`
    })
  }
}
