import React from 'react';
import "./sidebar.css"
import { Home, TrendingUp } from '@material-ui/icons';
import { Link } from "react-router-dom";

export default function sidebar() {
  return (
    <div className="sidebar">
      <div className="sideWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem" >
                <Home className='sidebarIcon' />
                <h4>Home</h4>
              </li>
            </Link>
            <Link to="/datasetList" className="link">
              <li className="sidebarListItem">
                <TrendingUp className='sidebarIcon' />
                <h4>DatasetList</h4>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div >
  )
}
