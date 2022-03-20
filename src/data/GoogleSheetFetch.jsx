import React,{ useEffect, useState } from "react"
import DataFrame from "dataframe-js";
import Dexie from 'dexie'

//set the database 
const db=new Dexie('SheetDatabase')

//create the database store
db.version(1).stores({
        SheetDatabase: "key"
})

db.open().catch((err) => {
       console.log(err.stack || err)
})

const GoogleSheetFetch = () => {
  const [output_result, setresult] = useState([])
  const [chart_data, setchart_data] = useState([])
  const [pie_chart_data, setpie_chart_data] = useState([])
  const [latest_transaction_data, setlatest_transaction_data] = useState([])
  const [refresh_count, setrefresh] = useState(['test'])

  const base = 'https://docs.google.com/spreadsheets/d/10PFbp50O-yYCuvLT09DLZUQ4JLuyZHs7l_ZSAMAh0PI/gviz/tq?';
  var output = []
  var array2 = []

  var result = ''
  var rows = ''
  const query = encodeURIComponent('Select *');
  const url = base + '&tq=' + query;

  const fetchData = async () => {
    const response = await fetch(url)
    const res = await response.text()
    const data = JSON.parse(res.substr(47).slice(0,-2));

    let columns = []
    columns.push('_id')
    data.table.cols.forEach((heading)=>{
        let cell = heading.label;
        columns.push(cell);
    })

    data.table.rows.forEach((main,i)=>{
        var container = []
        container.push(i)
        
        main.c.forEach((ele)=>{
            let cell = '';
            if (ele != null) {
                    var str = ele.v;
                }
            else {
                    str = null;
                }
            cell = str;
            container.push(cell);
        })
        result =  container.reduce(function(result, container_cell, index) {
        result[columns[index]] = container_cell;
        return result;}, {});
        output.push(result);
        setresult(output)
        window.localStorage.setItem('output', JSON.stringify(output));
        
        rows =  container.reduce(function(rows, container_cell, index) {
        rows[index] = container_cell;
        return rows;}, []);
        array2.push(rows);

    })
    const chart_data = df(array2,columns)
    setchart_data(chart_data)

    const pie_chart_data = pie_chart_df(array2,columns)
    setpie_chart_data(pie_chart_data)

    var latest_transaction_data = latest_transactions_df(array2,columns)
    setlatest_transaction_data(latest_transaction_data)
  
    const refresh_ct = refresh_count_df(array2,columns)
    setrefresh(refresh_ct)

      db.SheetDatabase.put({'key':'columns', 'value': columns})
      db.SheetDatabase.put({'key':'rows', 'value': array2})
      db.SheetDatabase.put({'key':'result', 'value': output})
      db.SheetDatabase.put({'key':'pie_chart_data', 'value': chart_data})
  }
  useEffect(() => {
    fetchData()  
  }, [])
  return {
    output_result, chart_data, pie_chart_data, latest_transaction_data , refresh_count
  }
}

export function refresh_data() {
    var dbColumns, dbRows;
    dbColumns = []
    dbRows = db.transaction('rw', db.SheetDatabase, async () => {
    var dbColumns = await db.SheetDatabase.get('columns')
    var dbRows = await db.SheetDatabase.get('rows')
    console.log('refresh_data called in googlesheet fetch')
    console.log(dbColumns)
    console.log(dbRows)
    return  dbRows ;
  });
    return dbColumns, dbRows
  }

export function df (r,c) {
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  const df = new DataFrame(r, c);
  var df_1 = df.dropMissingValues(['Requested date'])
  df_1 = df_1.map(row => row.set('Requested date',  month[row.get('Requested date').split(',')[1]]
  +'-'+(row.get('Requested date').split(',')[0]).match(/\d+/)))
  var data = df_1.groupBy('Requested date').aggregate((group) => group.count()).toCollection();
  return data;
}

export function pie_chart_df (r,c) {
  const df = new DataFrame(r, c);
  var pie_data = df.groupBy('Requester team').aggregate((group) => group.count()).toCollection();
  return pie_data;
}

export function latest_transactions_df (r,c) {
  const df = new DataFrame(r, c);
  let current_timestamp = new Date().getTime() - (7 * 24 * 60 * 60 * 1000)
  var df1 = df.dropMissingValues(['Requested date'])
  df1 = df1.withColumn('Requested_date', (row) => "new "+row.get('Requested date'))
  var latest_transactions = df1.select('Dataset name','Requested date','Completed date','Requested_date')
                              .where(row => Date.parse(eval(row.get('Requested_date'))) < current_timestamp)
                              .slice(0,10)
                              .toCollection();
  return latest_transactions;
}

export function refresh_count_df (r,c) {
const df = new DataFrame(r, c);
let last_month = new Date().getTime() - (30 * 24 * 60 * 60 * 1000)
var df2 = df.dropMissingValues(['Requested date'])
df2 = df2.withColumn('Requested_date', (row) => "new "+row.get('Requested date'))
var df3 = df2.select('Dataset onboarding type','Jira ticket(s) #','Dataset name','Requested_date')
.where(row => Date.parse(eval(row.get('Requested_date'))) < last_month)
var refreshCount = df3.groupBy('Dataset onboarding type').aggregate((group) => group.count()).toCollection()
var html_result = DFHtml(df3)
refreshCount.push(html_result)
return refreshCount
}

const DFHtml = function(df){
var columns = df.listColumns();

  return (<table class="dataTable">
  <caption>{"List"}</caption>
  <thead>
  <tr>{columns.map((column)=><th>{column}</th>)}</tr>
  </thead>
  <tbody>
  {df.toArray().map((row)=><tr>{columns.map((column,index)=><td>{row[index]?.replace('new ','')}</td>)}</tr>)}
  </tbody>
  </table>); 
};

export default GoogleSheetFetch