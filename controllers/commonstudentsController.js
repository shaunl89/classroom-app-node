const db = require('../models')
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  const { teacher } = req.query

  try {
    let teachers = await db.Teacher.findAll({
      attributes: ['id'],
      where: {
        email: teacher
      }
    })

    const teacherIds = teachers.map((teacher) => teacher.id)
  
    let studentIds = await db.sequelize.query(`
        SELECT StudentId 
        FROM TeachersStudents
        WHERE TeacherId IN (${[...teacherIds]})
        GROUP BY StudentId
        HAVING count(distinct TeacherId) = ${teacherIds.length}
      `
    )
  
    let studentEmails = await db.Student.findAll({
      attributes: ['email'],
      where: {
        id: studentIds[0].map((ts) => ts.StudentId)
      }
    })

    console.log('studnet emials', studentEmails)
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
