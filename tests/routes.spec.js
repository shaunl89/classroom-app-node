const request = require('supertest')
const app = require('../index')
const db = require('../models')

describe('Routes', () => {
  it('POST /suspend should suspend a student', async () => {
    const mockEmail = 'student1@email.com'
    const res = await request(app)
      .post('/api/suspend')
      .send({
        'student': mockEmail
      })
    const student = await db.Student.findOne({
      where: {
        email: mockEmail
      }
    })
    expect(res.statusCode).toEqual(204)
    expect(student.suspended).toBe(true)
  })

  it('POST /register should add students', async () => {
    const mockTeacher = 'teacher1@email.com'
    const mockStudents = ['student9@email.com', 'student10@email.com']
    const res = await request(app)
      .post('/api/register')
      .send({
        teacher: mockTeacher,
        students: mockStudents
      })
    const student = await db.Student.findAll({
      where: {
        email: mockStudents
      }
    })
    expect(res.statusCode).toEqual(204)
    expect(student.length).toBe(2)
  })

  it('POST /register throws error if no students are added', async () => {
    const res = await request(app)
    .post('/api/register')
    .send({
      teacher: 'teacher1@email.com',
    })
    expect(res.statusCode).toEqual(400)
  })

  it('GET /commonstudents should get common students', async () => {
    const res = await request(app)
      .get('/api/commonstudents')
      .query({
        teacher: 'teacher1@email.com',
        teacher: 'teacher2@email.com'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.students).toEqual(['student2@email.com', 'student3@email.com'])
  })

  it('GET /commonstudents should throw error if no teacher found', async () => {
    const res = await request(app)
    .get('/api/commonstudents')
    .query({
      teacher: 'nonexistent.teacher@email.com',
      teacher: 'nonexistent.teacher2@email.com'
    })
    expect(res.statusCode).toEqual(400)
  })

  it('POST /retrievefornotifications should get correct students', async () => {
    const res = await request(app)
      .post('/api/retrievefornotifications')
      .send({
        teacher: 'teacher1@email.com',
        notification: 'please come to class today @student1@email.com, @student2@email.com'
      })
    expect(res.statusCode).toEqual(200)
    // student1 is suspended
    // teacher1 has students 1, 2, 3, 9, 10
    expect(res.body.recipients).toEqual(['student2@email.com', 'student3@email.com', 'student9@email.com', 'student10@email.com'])
  })

  it('POST /retrievefornotifications should throw error if teacher not found', async () => {
    const res = await request(app)
      .post('/api/retrievefornotifications')
      .send({
        teacher: 'nonexistent.teacher@email.com',
        notification: 'please skip to class today @student1@email.com, @student2@email.com'
      })
    expect(res.statusCode).toEqual(400)
  })
})