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
    }

    formSubmit(params) {
      fetch(' https://2qfsbxqbag.execute-api.us-west-2.amazonaws.com/test/rest-provisions/insert', {
                method: 'POST',
                headers: {
                          'Accept': 'application/json',
                           'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)          
          })
          .then(response => response.json())
         .then(response => {
          alert(JSON.stringify(response));
          })
     .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
        return [{"CASH" : -1}];
      });     
     }
    
    handleForm(values) {
      var params = {
          "method": "insert",
          "description": values["description"],
          "provisionType": values["provisionType"],
          "provisionDate": values["provisionDate"],
          "provisionAmount": values["provisionAmount"],
          "user"           : values["user"]
        }
      alert('Submitting the following:' + JSON.stringify(params));
      this.formSubmit(params);
      //this.props.handleSubmit(values)
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
                                  <Control.input type="date" model=".provisionDate" id="provisionDate"
                                              name="provisionDate"/>
                                  
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
                                    <Control.select model=".provisionType" name="provisionType"
                                        className="form-control">
                                         <option value="0">HOUSE_INSURANCE</option>
                                         <option value="1">PHONE</option>
                                         <option value="2">TISCALI</option>
                                         <option value="3">INSURANCE</option>
                                         <option value="4">HOLIDAYS</option>
                                         <option value="5">WATER</option>
                                         <option value="6">GAS</option>
                                         <option value="7">ELECTRICITY</option>
                                         <option value="8">CAR</option>
                                         <option value="9">COUNCIL</option>
                                         <option value="10">TV_LICENSE</option>
                                         <option value="11">PRESENTS</option>
                                         <option value="12">EXTRAS</option>
                                         <option value="13">OTHERS</option>
                                         <option value="14">UNKNOWN</option>
                                        
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:8, offset:1}}>
                                    <Control.text model=".provisionAmount" id="provisionAmount" name="provisionAmount"
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
                                    <Control.input type="hidden" model=".method" id="method" name="method" value="insert"/> 
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