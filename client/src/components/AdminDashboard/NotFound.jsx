import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
   <h2>Sorry</h2>
    <p>Page Cannot be found</p>
   <Link to="/"><button className='dBlueBtn'> Go to Home Page</button></Link>
    </div>
 
  )
}

export default NotFound