import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ setAuth }) => {
  return (
    <>
      <h1 className='mt-5 text-center'>Register</h1>
      <form>
        <input type='text' name='email' placeholder='email' className='form-control my-3' />
        <input
          type='password'
          name='password'
          placeholder='password'
          className='form-control my-3'
        />
        <input type='text' name='name' placeholder='name' className='form-control my-3' />
        <button className='btn btn-success btn-block'>Submit</button>
      </form>
      <Link to='/login'>login</Link>
    </>
  )
}

export default Register
