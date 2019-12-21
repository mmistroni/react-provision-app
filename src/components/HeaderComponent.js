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
                                <NavLink className="nav-link" to='/provisions'><span className="fa fa-database fa-lg"></span>Provisions</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/direct_debit'><span className="fa fa-pencil-square-o fa-lg"></span>Direct Debits</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/graphs'><span className="fa fa-money fa-lg"></span>Graphs</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                  </Navbar>
                </div>
        );
    }
}

export default Header;