const Dashboard = ({ setAuth }) => {
  return (
    <div>
      <h1 className='mt-5'>Dashboard</h1>
      <h2>Welcome</h2>
      <button onClick={() => setAuth(false)} className='btn btn-primary'>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
