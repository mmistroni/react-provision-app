import React, { Component } from 'react';
import { Media } from 'reactstrap';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import RenderGrid from './GridComponent';
import SharesRenderGrid from './SharesGridComponent';
import Home from './HomeComponent';
import PortfolioForm from './PortfolioComponent';
import UpdateShareForm  from './UpdateShareComponent';
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
          const GridPage = () => {
            return(
                  <RenderGrid />
                  );
          
          
         }
         const SharesGrid = () => {
            return(
                  <SharesRenderGrid />
                  );
          
          
         }
         const UpdateSharePage = () => {
            return(
                  <UpdateShareForm />
                  );
          
          
         }
         
         const PortfolioPage = () => {
          return(
                <PortfolioForm />
                 );
          }
         
         
        return (
          <div id="parent">
            <Header />
            <div>
                <Switch>
                  <Route path='/home' component={HomePage} />
                  <Route exact path='/portfolio' component={GridPage}/>
                  <Route exact path='/test_shares' component={SharesGrid}/>
                  <Route exact path='/updateshares' component={UpdateSharePage}/>
                  <Route exact path='/updateportfolio' component={PortfolioPage}/>
                   <Redirect to="/home" />
                </Switch>
            </div>
          </div>
        );
    }
}

export default Main;