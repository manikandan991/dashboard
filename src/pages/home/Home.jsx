import React from 'react'
import FeaturedInfo from '../../compenents/featuredInfo/FeaturedInfo'
import "./home.css"
import { userData } from "../../dummyData";
import Chart from '../../compenents/chart/Chart'
import WidgetLg from '../../compenents/widgetLg/WidgetLg';
import Example from '../../compenents/chart/PieCharts';


export default function Home() {
  return (
    <div className="home">
    <FeaturedInfo />
    <Chart data={userData} title="DataLoad Trend" grid dataKey="Active User"/>
    <div className="homeWidgets">
        <Example />
        <WidgetLg />
      </div>
    

    </div>
  )
}
