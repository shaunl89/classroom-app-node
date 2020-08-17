const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const db = require('./models')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to classroom app' })
})

app.use('/api', routes)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})

// only for development 
db.sequelize.sync({ force: true, match: /_development$/ })
.then(() => {
  console.log('drop and resync db')
}).catch((err) => {
  console.warn('error with sync', err)
})