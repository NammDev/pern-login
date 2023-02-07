const express = require('express')
const cors = require('cors')

const port = 5005
const app = express()

// middleware
app.use(express.json()) // req.body
app.use(cors())

/** ROUTES */
// register and login routes
app.use('/auth', require('./routes/jwtAuth'))
// dashboard routes
app.use('/dashboard', require('./routes/dashboard'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
