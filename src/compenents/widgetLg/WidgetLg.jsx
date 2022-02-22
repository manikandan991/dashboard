import React from 'react'
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
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
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://banner2.cleanpng.com/20190421/ljf/kisspng-database-server-computer-icons-clip-art-flat-file-web-2-blue-2-accept-database-icon-free-web-2-blu-5cbd2898cc2b58.2547925815559005688363.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Dag1</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount"></td>
          <td className="widgetLgStatus">
            <Button type="InProgress" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://banner2.cleanpng.com/20190421/ljf/kisspng-database-server-computer-icons-clip-art-flat-file-web-2-blue-2-accept-database-icon-free-web-2-blu-5cbd2898cc2b58.2547925815559005688363.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Dag2</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount"></td>
          <td className="widgetLgStatus">
            <Button type="Queued" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://banner2.cleanpng.com/20190421/ljf/kisspng-database-server-computer-icons-clip-art-flat-file-web-2-blue-2-accept-database-icon-free-web-2-blu-5cbd2898cc2b58.2547925815559005688363.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Dag3</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount"></td>
          <td className="widgetLgStatus">
            <Button type="Assigned" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://banner2.cleanpng.com/20190421/ljf/kisspng-database-server-computer-icons-clip-art-flat-file-web-2-blue-2-accept-database-icon-free-web-2-blu-5cbd2898cc2b58.2547925815559005688363.jpg"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Dag4</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">5 Jun 2021</td>
          <td className="widgetLgStatus">
            <Button type="Completed" />
          </td>
        </tr>
      </table>
    </div>
  );
}