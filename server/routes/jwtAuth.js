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
      return res.status(401).json('User already exist')
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

router.post('/login', async (req, res) => {
  try {
    // 1. Destructure the req.body (email, password)
    const { email, password } = req.body

    // 2. Check if user exist (if false throw error)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])
    if (user.rows.length === 0) {
      return res.status(401).json('Email is incorrect!')
    }

    // 3. Check if input password is same as database password
    const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
    if (!validPassword) return res.status(401).json('Password is incorrect')

    // 4. Give them jwt token
    const token = jwtGenerator(user.rows[0].user_id)

    // 5. Send respond
    res.json({ accessToken: token })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

module.exports = router
