import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
            Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

import Modal from 'react-awesome-modal';

// Refactor this into a component as we need to set the state for the react popup




class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
        const selectedNodes = props.grid;
    }

    openModal() {
        this.setState({
            visible : true
        });
    }


    handleForm(values) {
      this.props.handleSubmit(values)
      this.closeModal()
    }
    
    closeModal() {
        this.setState({
            visible : false
        });
    }
    
    
    render() {
        return (
            <React.Fragment>  
              <Button color="primary" onClick={() => this.openModal()}>Add</Button>
              <Modal visible={this.state.visible}  effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{ width:300, height: 350, justifyContent:'center' }}>
                        <h4 align="center">Shares Management</h4>
                        <LocalForm onSubmit={(values) => this.handleForm(values)}>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".ticker" id="ticker" name="ticker"
                                        placeholder="Ticker"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".qty" id="qty" name="qty"
                                        placeholder="Qty"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".price" id="price" name="price"
                                        placeholder="Price"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                            
                                <Col md={{size:10, offset: 2}} align="center">
                                    <Button type="submit" color="primary">
                                        Add Share
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                        
                    </div>
                </Modal>
               </React.Fragment>
            
        );
    }
}
export default MyModal;