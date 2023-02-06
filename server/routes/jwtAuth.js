const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')

router.post('/register', async (req, res) => {
  try {
    // 1. Destructure the req.body (name, email, password)
    const { name, email, password } = req.body

    // 2. Check if user exist (if true throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])
    if (user.rows.length !== 0) {
      console.log(user.rows.length)
      return res.status(401).send('User already exist')
    }

    // 3. Bcrypt the user password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // 4. Insert the new user in side our database
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hash]
    )

    // 5. Generating the jwt token
    const token = jwtGenerator(newUser.rows[0].user_id)

    // 6. Send respond
    res.json({ accessToken: token })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
