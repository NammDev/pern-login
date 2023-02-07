import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axiosConfig'
import { toast } from 'react-toastify'

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  })
  const { email, password, name } = inputs

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
        toast.success('Register Successfully')
      } else {
        setAuth(false)
        toast.error(data)
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response')
      } else {
        console.log('Registration Failed')
      }
    }
  }
  return (
    <>
      <h1 className='mt-5 text-center'>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          name='email'
          value={email}
          placeholder='email'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <input
          type='password'
          name='password'
          value={password}
          placeholder='password'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <input
          type='text'
          name='name'
          value={name}
          placeholder='name'
          onChange={(e) => onChange(e)}
          className='form-control my-3'
        />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to='/login'>login</Link>
    </>
  )
}

export default Register
