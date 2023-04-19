import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'

function Layout({children}) {
  return (
    <div className = "">
      <NavBar/>
        <div className = "container">
          <Notify/>
          <Modal/>
          {children}
         </div>
    </div>
  )
}

export default Layout

