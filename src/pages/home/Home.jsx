import React  from 'react'
import FeaturedInfo from '../../compenents/featuredInfo/FeaturedInfo'
import "./home.css"
import Chart from '../../compenents/chart/Chart'
import WidgetLg from '../../compenents/widgetLg/WidgetLg';
import Example from '../../compenents/chart/PieCharts';
import GoogleSheetFetch from '../../data/GoogleSheetFetch'

export default function Home() {

  var a = GoogleSheetFetch()
  const chartdata = a.chart_data
  const pie_chart_data = a.pie_chart_data
  var latest_transaction_data = a.latest_transaction_data
  var refresh_count = a.refresh_count

 return (
    <div className="home">
      <h3 className="header">Data refresh count for last 30 days </h3>
    <FeaturedInfo count_data={refresh_count}/>
    
    <div className="homeWidgets">
        <Example data={pie_chart_data}/>
        <WidgetLg latest_transactions={latest_transaction_data}/>
      </div>
    <Chart data={chartdata} title="DataLoad Trend" dataKey="aggregation"/>
    </div>
  )
}
