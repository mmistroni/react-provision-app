import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {COLUMNDEFS, ROWDATA, INSERT_URL} from '../resources/grid-data.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Card, CardText,CardBody, CardTitle} from 'reactstrap';
import { Container, Row, Col, Button } from 'reactstrap';
import MyModal from './ModalComponent';
import { getServiceData, postServiceData } from '../utils/Utils';
import "ag-grid-enterprise";




class RenderGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: COLUMNDEFS,
      rowData: ROWDATA,
      test: 'passing props',
      sideBar: {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel"
          },
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel"
          }
        ]},
        statusBar: {
          statusPanels: [
            {
              statusPanel: "agAggregationComponent",
              align: "left"
            },
            {
              statusPanel: "agTotalRowCountComponent",
              align: "center"
            },
            { statusPanel: "agFilteredRowCountComponent" },
            { statusPanel: "agSelectedRowCountComponent" }
          ]
      },
      defaultColDef: { filter: true }
    }
  }
    
  componentDidMount() {
   fetch('http://localhost:3001/cars')
  .then(result => result.json())
  .then(jsonData => this.setState({
         rowData: jsonData}))
  }  


  handleSubmit(values) {
        var params = {
          "method": "insert",
          "ticker": values["ticker"],
          "name": values["name"],
          "qty": values["qty"],
          "price": values["price"]
        }
        alert('XParams to send are:' + JSON.stringify(params));
        postServiceData(INSERT_URL, params);
        
    }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model + ' ' + node.price).join(', ')
    this.gridApi.refreshCells();
  }
  
  updateSelectedRow(params) {
    const selectedNodes = params.api.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model + ' ' + node.price).join(', ')
    alert('We should update:' + selectedDataStringPresentation);
  }



  render()  {
    return (
     <Container>
      <div 
        className="ag-theme-balham"
        style={{ 
          width: "100%", 
          height: "500px",
          align: 'center'}}
        >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                defaultColDef={this.state.defaultColDef}
                sideBar={this.state.sideBar}
                statusBar={this.state.statusBar}
                rowSelection="single"
                pagination="true"
                paginationPageSize="10"
                onGridReady={ params => this.gridApi = params.api }
                onCellValueChanged={params => this.updateSelectedRow(params)}>
              </AgGridReact>
              <Button color="primary" onClick={this.onButtonClick}>Update</Button>
              <MyModal handleSubmit={this.handleSubmit}/>
                  
           
           
      </div>
     </Container>
    );
                     
  }
}
export default RenderGrid;
