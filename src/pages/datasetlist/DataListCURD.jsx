import React from 'react';
import {
  DataGrid, Column, Editing, SearchPanel, Summary, TotalItem,Popup,RequiredRule, Form
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import { SelectBox } from 'devextreme-react/select-box';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import { Item } from 'devextreme-react/form';

const URL = 'http://localhost:3000';

const REFRESH_MODES = ['full'];

const notesEditorOptions = { height: 100 };

class DataListEdit extends React.Component {
  constructor(props) {
    super(props);

    this.renderResult = window.localStorage.getItem('output');
    this.ordersData = JSON.parse(this.renderResult);

    this.state = {
      ordersData: new CustomStore({
        key: 'DatasetID',
        load: () => this.sendRequest(`${URL}/Orders`),
        insert: (values) => this.sendRequest(`${URL}/InsertOrder`, 'POST', {
          values: JSON.stringify(values),
        }),
        update: (key, values) => this.sendRequest(`${URL}/UpdateOrder`, 'PUT', {
          key,
          values: JSON.stringify(values),
        }),
        remove: (key) => this.sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
          key,
        }),
      }),
      requests: [],
      refreshMode: 'reshape',
    };

    this.clearRequests = this.clearRequests.bind(this);
    this.handleRefreshModeChange = this.handleRefreshModeChange.bind(this);
  }

  sendRequest(url, method = 'GET', data = {}) {
    this.logRequest(method, url, data);

    if (method === 'GET') {
      return this.getData()
        }
    
    if (method === 'DELETE'){
      return this.handleDelete(data['key'])
    }

    if (method === 'PUT'){
      return this.handleUpdate(data)
    }
    
    if (method === 'POST'){
      return this.handleCreate(data)
    } 

    const params = Object.keys(data).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');

    return fetch(url, {
      method,
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      credentials: 'include',
    }).then((result) => {
      if (result.ok) {
        return result.text().then((text) => text && JSON.parse(text));
      }
      return result.json().then((json) => {
        throw json.Message;
      });
    });
  }

  logRequest(method, url, data) {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');
    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(URL.length), args].join(' ');
    this.setState((state) => ({ requests: [request].concat(state.requests) }));
  }

  clearRequests() {
    this.setState({ requests: [] });
  }

  handleRefreshModeChange(e) {
    this.setState({ refreshMode: e.value });
  }

  getData = async () => {
    try {
      const res = await fetch(
        "https://sheet.best/api/sheets/6108802f-f606-4997-a2c4-a9056a72b858"
      );
      const data = await res.json();
      return data
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async (datasetId) => {
      try{
      const response = await fetch(
        `https://sheet.best/api/sheets/6108802f-f606-4997-a2c4-a9056a72b858/DatasetID/${datasetId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log(datasetId+' is deleted');
        return response.text().then((text) => text && JSON.parse(text));
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdate = async (data) => {
    try{
    const response = await fetch(
      `https://sheet.best/api/sheets/6108802f-f606-4997-a2c4-a9056a72b858/DatasetID/${data['key']}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: data['values'],
      }
    );
    if (response.ok) {
      console.log(data+' is updated');
      return response.text().then((text) => text && JSON.parse(text));
    }
  } catch (error) {
    console.log(error);
  }
};

handleCreate = async (data) => {
  try{
  const response = await fetch(
    `https://sheet.best/api/sheets/6108802f-f606-4997-a2c4-a9056a72b858`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: data['values'],
    }
  );
  if (response.ok) {
    console.log(data+' is created');
    return response.text().then((text) => text && JSON.parse(text));
  }
} catch (error) {
  console.log(error);
}
};

  render() { 
    const {
      refreshMode, ordersData,
    } = this.state;
    return (
      <React.Fragment>
        <DataGrid
          id="grid"
          showBorders={true}
          dataSource={ordersData}  
          repaintChangesOnly={true}
          >
          <SearchPanel visible={true} />
          <Editing
            mode="popup"
            allowAdding={true}
            allowDeleting={true}
            allowUpdating={true}>
          <Popup title="Datasets Info" showTitle={true} width={700} height={525} />
          <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="Jira ticket(s) #" />
                <Item dataField="Requester team" /> 
                <Item dataField="Dataset name" />
                <Item dataField="DatasetID" />
                <Item dataField="Requested date"  />
                <Item dataField="Completed date"  />
                <Item dataField="Last Refresh time" />
                <Item
                  dataField="Description"
                  editorType="dxTextArea"
                  colSpan={2}
                  editorOptions={notesEditorOptions} />
                </Item>

              <Item itemType="group" caption="Additional Info" colCount={2} colSpan={2}>
                <Item dataField="Dataset onboarding type" />
                <Item dataField="FlyWheel" />
                <Item dataField="Redshift DB schema name" />
                <Item dataField="Prod S3 bucket name" />
                <Item dataField="Dag Name" />
              </Item>
            </Form>
          </Editing>

          <Column dataField="Jira ticket(s) #" caption="Ticket" width={100} ><RequiredRule /></Column>
          <Column dataField="Requester team" width={100} ><RequiredRule /></Column>
          <Column dataField="Dataset name" width={300} ><RequiredRule /></Column>
          <Column dataField="DatasetID" width={100} ><RequiredRule /></Column>
          <Column dataField="Description" width={400} />
          <Column dataField="Requested date" width={120} dataType="date" ><RequiredRule /></Column>
          <Column dataField="Dataset onboarding type" visible={false} />
          <Column dataField="FlyWheel" visible={false} />
          <Column dataField="Redshift DB schema name" visible={false} />
          <Column dataField="Prod S3 bucket name" visible={false} />
          <Column dataField="Dag Name" visible={false} />
          <Column dataField="Last Refresh time" visible={false} dataType="date" ><RequiredRule /></Column>
          <Column dataField="Completed date" visible={false} dataType="date" />
          
          <Summary>
            <TotalItem column="Dataset name" summaryType="count" />
          </Summary>
        </DataGrid>
        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <span>Refresh Mode: </span>
            <SelectBox
              value={refreshMode}
              items={REFRESH_MODES}
              onValueChanged={this.handleRefreshModeChange}
            />
          </div>
          <div id="requests">
            <div>
              <div className="caption">Network Requests</div>
              <Button id="clear" text="Clear" onClick={this.clearRequests} />
            </div>
            <ul>
              {this.state.requests.map((request, index) => <li key={index}>{request}</li>)}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DataListEdit;
