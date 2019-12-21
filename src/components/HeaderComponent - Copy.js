import React, {Component} from 'react';
import {Navbar,NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
       Button, Modal, ModalHeader, ModalBody,
       Form, FormGroup, Input, Label} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen : false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        
    }
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    
    render() {
        
        return(
                <div>
                  <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/portfolio'><span className="fa fa-database fa-lg"></span>All Shares</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/test_shares'><span className="fa fa-pencil-square-o fa-lg"></span>Shares Mgmt</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/updateportfolio'><span className="fa fa-money fa-lg"></span>Portfolio Mgmt</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                  </Navbar>
                  <Jumbotron>
                         <div className="container">
                             <div className="row row-header">
                                 <div className="col-12 col-sm-6">
                                     <h3>Shares Management</h3>
                                     <p>A Simple React Application to manage a portfolio of shares</p>
                                 </div>
                             </div>
                         </div>
                  </Jumbotron>
                </div>
        );
    }
}

export default Header;