import React from 'react';
import "./sidebar.css"
import { Home, Looks3Rounded, LooksOneRounded,Add, TrendingUp } from '@material-ui/icons';

export default function sidebar() {
  return (
    <div className="sidebar">
        <div className="sideWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                    <Home className='sidebarIcon' />
                    <h4>Home</h4>
                    </li>
                    <li className="sidebarListItem">
                    <TrendingUp className='sidebarIcon' />
                    <h4>DatasetList</h4>
                    </li>
                </ul>
            </div>

        </div>
      
    </div>
  )
}
