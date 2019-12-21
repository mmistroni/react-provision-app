import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

import { Navbar, NavbarBrand, Nav, NavLink, NavItem, NavbarToggler, Collapse } from 'reactstrap';

class App extends Component {
    
  constructor(props) {
    super(props);
    
  }    
    
    
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
