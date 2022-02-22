import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell,Legend,Tooltip} from 'recharts';

const data = [
  { name: 'MDH', value: 20 },
  { name: 'Non MDH', value: 101 },
  { name: 'Imaging', value: 30 },
  { name: 'SIP', value: 35 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-of-straight-angle-oz0th';

  render() {
    return (
      <div className="piechart">
      <h3 className="piechartTitle">Datasets Count</h3>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
        </div>

    );
  }
}