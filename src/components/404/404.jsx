import React from 'react'


import './404.css'

const NotFound = (props) => {
  return (
    <div className="not-found-container">
 
      <h3 style={{color:'red',marginBottom:'20px',fontWeight:"600"}}>OOPS! PAGE NOT FOUND</h3>
      <div className="not-found-container1">
        <h1 style={{color:'red'}} className="not-found-text1">404</h1>
      </div>
      <div className="not-found-container2">
        <h2 className="not-found-text2">
          WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
        </h2>
      </div>
    </div>
  )
}

export default NotFound
