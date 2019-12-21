import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
            Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';


class UpdateShareForm extends React.Component {
   constructor(props) {
        super(props);

        this.state = {
            ticker: '',
            name  : '',
            qty   : 0,
            price : 0
            
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

  handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

  handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
  }

  render() {
    return (
            <div className="row row-content">
                   <div className="col-6 col-md-8">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="ticker" md={2}>Ticker</Label>
                                <Col md={6}>
                                    <Input type="text" id="ticker" name="ticker"
                                        placeholder="Ticker"
                                        value={this.state.ticker}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={6}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="qty" md={2}>Quantity</Label>
                                <Col md={6}>
                                    <Input type="tel" id="qty" name="qty"
                                        placeholder="Qty"
                                        value={this.state.qty}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="price" md={2}>Email</Label>
                                <Col md={6}>
                                    <Input type="price" id="price" name="price"
                                        placeholder="price"
                                        value={this.state.price}
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

export default UpdateShareForm;