const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to classroom app' })
})

app.use('/api', routes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
