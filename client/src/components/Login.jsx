import { Link } from 'react-router-dom'

const Login = ({ setAuth }) => {
  return (
    <>
      <h1 className='mt-5 text-center'>Login</h1>
      <>
        <input type='text' name='email' className='form-control my-3' />
        <input type='password' name='password' className='form-control my-3' />
        <button onClick={() => setAuth(true)} class='btn btn-success btn-block'>
          Submit
        </button>
      </>
      <Link to='/register'>register</Link>
    </>
  )
}

export default Login
