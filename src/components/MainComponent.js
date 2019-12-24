import React, { Component } from 'react';
import { Media } from 'reactstrap';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import ProvisionRenderGrid from './ProvisionGridComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
         const HomePage = () => {
          return(
              <Home />
                 );
          }
          
         const ProvisionGrid = () => {
            return(
                  <ProvisionRenderGrid />
                  );
          
          
         }
         
        return (
          <div id="parent">
            <Header />
            <div>
                <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/provisions' component={ProvisionGrid}/>
                  <Redirect to="/home" />
                </Switch>
            </div>
          </div>
        );
    }
}

export default Main;