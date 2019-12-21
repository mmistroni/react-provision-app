import React, {Component} from 'react';
import {Navbar,NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
       Button, Modal, ModalHeader, ModalBody,
       Form, FormGroup, Input, Label, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { getServiceData, postServiceData } from '../utils/Utils';



class PortfolioManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolio: 'MAIN',
            cash : 0
            
        };
        
    }
    
    updateScreen(params) {
    
        fetch('https://k1k1xtrm88.execute-api.us-west-2.amazonaws.com/test/fetch-main-portfolio', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({
              cash: response[0].CASH
              
              });
         })
         .catch(error => {
            //Error
            alert(JSON.stringify(error));
            console.error(error);
            return [{"CASH" : -1}];
          });     
    }
     
    
    
    componentDidMount() {
      var params = {
          "method": "fetch_portfolio"
        }
        
      this.updateScreen(params);
    
    }
    
    
    
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handlePortfolio(event) {
        this.toggleModal();
        alert("Cash: " + this.cash.value);
        event.preventDefault();
        
    }
    render() {
        
        return(
                    <div className="row row-content">
                       <div className="col-6 col-md-5" align="right">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="portfolio" md={5}>Ticker</Label>
                                    <Col md={6}>
                                        <Input type="text" id="portfolio" name="portfolio"
                                            placeholder="Portfolio"
                                            value={this.state.portfolio}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="cash" md={5}>Cash</Label>
                                    <Col md={6}>
                                        <Input type="text" id="cash" name="cash"
                                            placeholder="0"
                                            value={this.state.cash}
                                            onChange={this.handleInputChange} />
                                    </Col>                        
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 6, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Update
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
               </div>


        );
    }
}

export default PortfolioManagement;