import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './compenents/sidebar/Sidebar';
import Topbar from "./compenents/topbar/Topbar";
import "./app.css"
import Home from './pages/home/Home';

function App() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar/>
        <Home/>
      </div>
    </div>
  );
}

export default App;
