import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem,
            Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import Modal from 'react-awesome-modal';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Refactor this into a component as we need to set the state for the react popup




class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            start_date: new Date() ,
            
        }
        const selectedNodes = props.grid;
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    handleChange(selected_dt){
      var date_str = moment(selected_dt).format('YYYY-MM-DD');
      
      alert('You have selected:' + date_str);
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
                    <div style={{ width:300, height: 400, justifyContent:'center' }}>
                        <h4 align="center">Shares Management</h4>
                        <LocalForm onSubmit={(values) => this.handleForm(values)}>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                  <DatePicker
                                        selected={this.state.start_date}
                                        onChange={this.handleChange} />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".description" id="description" name="description"
                                        placeholder="Description"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>GAS</option>
                                        <option>INSURANCE</option>
                                        <option>PHONE</option>
                                        <option>COUNCIL</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".amount" id="amount" name="amount"
                                        placeholder="Amount"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".user" id="user" name="user"
                                        placeholder="User"
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