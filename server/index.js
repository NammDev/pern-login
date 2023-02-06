const express = require('express')
const cors = require('cors')

const port = 5005
const app = express()

// middleware
app.use(express.json()) // req.body
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
