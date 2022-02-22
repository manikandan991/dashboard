import React from 'react'
import "./topbar.css"

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topRight">
                <span className="logo">statusBoard</span>    
            </div> 
            <div className="topLeft"><h3>{new Date().toLocaleString() + ""}</h3></div>
        </div>
    </div>
  )
}
