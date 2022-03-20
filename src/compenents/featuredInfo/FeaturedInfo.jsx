import React from 'react'
import Popup from 'reactjs-popup';
import "./featureInfo.css"
import 'reactjs-popup/dist/index.css';

export default function FeaturedInfo({count_data}) {

const contentStyle = { background: '#000' , width: "50%"};
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' };

  var tablepart = count_data.slice(-1)[0]
  var Details= []
  for (var x of count_data.slice(0,2)) {
    Details.push(
      <div className="featuredItem">
      <div className="featuredCountContainer">
       <span className="featuredCount">
       <Popup 
    trigger={
        <div class="box-2">
        <div class="btn btn-two">
        <span>{x["Dataset onboarding type"]}: #{x["aggregation"]}</span>
        </div>
    </div>
    }
    {...{ overlayStyle,contentStyle, arrowStyle }}
  >
<table class="dataTable">
  <tr>
  {tablepart}
  </tr>
</table>
  </Popup>
       </span>
   </div>
   </div>
  )
  }
  return (
    <div className='featured'>
      {Details}
    </div>
  )
}