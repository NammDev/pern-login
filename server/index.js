const express = require('express')
const cors = require('cors')

const port = 5005
const app = express()

// middleware
app.use(express.json()) // req.body
app.use(cors())

// routers
// register and logins route
app.use('/auth', require('./routes/jwtAuth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
