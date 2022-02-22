import React from 'react'
import "./featureInfo.css"
import FiberNewIcon from '@mui/icons-material/FiberNew';

export default function FeaturedInfo() {
  return (
    <div className='featured'>
        <div className="featuredItem">
        <span className="featuredTitle">
            Refresh
            </span>
            <div className="featuredCountContainer">
                <span className="featuredCount"># 10</span>
            </div>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">New load</span>
            <div className="featuredCountContainer">
                <span className="featuredCount">
                 # 2 
                </span>
            </div>
        </div>

        <div className="featuredItem">
            <span className="featuredTitle">In Progress</span>
            <div className="featuredCountContainer">
                <span className="featuredCount"> # 3 </span>
            </div>
        </div>
    </div>
  )
}
