import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { toast } from 'react-toastify'

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })

  const { email, password } = inputs

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const body = { email, password }

      const response = await axios.post(
        '/auth/login',
        JSON.stringify({ email: email, password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      const data = response?.data

      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken)
        setAuth(true)
        toast.success('Login Successfully')
      } else {
        setAuth(false)
        toast.error(data)
      }
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <Fragment>
      <h1 className='mt-5 text-center'>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to='/register'>register</Link>
    </Fragment>
  )
}

export default Login
