import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { toast } from 'react-toastify'

const Register = ({ setAuth }) => {
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  })
  const { email, password, name } = inputs

  useEffect(() => {
    setErrMsg('')
  }, [inputs])

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        '/auth/register',
        JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const data = response?.data
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
        setAuth(true)
        setSuccess(true)
        toast.success('Register Successfully')
      } else {
        setAuth(false)
        setErrMsg(data)
      }
    } catch (err) {
      if (err?.response) {
        setErrMsg(err.response.data)
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }
  return (
    <section>
      <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          value={email}
          placeholder='email'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='name'
          value={name}
          placeholder='name'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />

        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to='/login'>login</Link>
    </section>
  )
}

export default Register
