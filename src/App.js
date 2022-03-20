import React from 'react';
import Sidebar from './compenents/sidebar/Sidebar';
import Topbar from "./compenents/topbar/Topbar";
import "./app.css"
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataListEdit from './pages/datasetlist/DataListCURD';


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/datasetList">
            <DataListEdit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
