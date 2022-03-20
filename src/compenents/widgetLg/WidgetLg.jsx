import React from 'react'
import "./widgetLg.css";

export default function WidgetLg({latest_transactions}) {
  var Y= []

  for (var x of latest_transactions) {

    let status;
    var current_timestamp = new Date().getTime() - (10 * 24 * 60 * 60 * 1000)
    var start_date_timestamp = Date.parse(eval(x["Requested date"]))
    if (x["Completed date"]){
      status = 'Completed'
    } else if (start_date_timestamp > current_timestamp){
      status = 'Queued'
    }else if (start_date_timestamp < current_timestamp){
      status = 'InProgress'
    }
    Y.push(
      <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <img
          src="https://banner2.cleanpng.com/20190421/ljf/kisspng-database-server-computer-icons-clip-art-flat-file-web-2-blue-2-accept-database-icon-free-web-2-blu-5cbd2898cc2b58.2547925815559005688363.jpg"
          alt=""
          className="widgetLgImg"
        />
        <span className="widgetLgName">{x["Dataset name"]}</span>
      </td>
      <td className="widgetLgDate">{x["Requested date"]}</td>
      <td className="widgetLgAmount">{x["Completed date"]}</td>
      <td className="widgetLgStatus">
      <button className={"widgetLgButton " + status}>{status}</button>
      </td>
    </tr>)
  }

  if (Y.length === 0){
    Y.push(<td colspan="4" ng-show="if $Y.length == 0" className="widgetNoData"> 
    <h3>There's no latest refresh request on last 7 days </h3>
    </td>)
  }
 
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest DataLoads</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Dataset</th>
          <th className="widgetLgTh">StartDate</th>
          <th className="widgetLgTh">ClosureDate</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {Y}
      </table>
    </div>
  );
}