import React from 'react'

const Header = () => {
  return (
    <div >
        <header>
        <img src={require('../yoke-logo.png')} />
        <div className='page-name'>
        <h3>Travel Order</h3>
        </div>
        </header>
    </div>
  )
}

export default Header