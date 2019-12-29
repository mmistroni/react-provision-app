import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {PROVISION_COLUMNDEFS, PROVISION_ROWDATA, INSERT_URL} from '../resources/grid-data.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Card, CardText,CardBody, CardTitle} from 'reactstrap';
import { Container, Row, Col, Button } from 'reactstrap';
import MyModal from './ModalComponent';
import { getServiceData, postServiceData } from '../utils/Utils';
import "ag-grid-enterprise";




class ProvisionRenderGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: PROVISION_COLUMNDEFS,
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
   var params =   {
                "method": "query",
                "start_date": "2019-10-20",
                "end_date": "2019-11-26"
              }
   
   
   // 'http://localhost:3001/provisions'
    
              
   fetch('https://2qfsbxqbag.execute-api.us-west-2.amazonaws.com/test/rest-provisions/query', {
                method: 'POST',
                headers: {
                          'Accept': 'application/json',
                           'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)          
          })
  .then(result => result.json())
  .then(jsonData => this.setState({
         rowData: jsonData}))
  }  


  handleSubmit(values) {
        alert('XParams to send are:' + JSON.stringify(values));
        //postServiceData(INSERT_URL, params);
        
    }

  onButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model + ' ' + node.price).join(', ')
    this.gridApi.refreshCells();
  }
  
  onDeleteRow = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model + ' ' + node.price).join(', ')
    alert('We should delete:' + selectedDataStringPresentation);
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
                paginationPageSize="14"
                onGridReady={ params => this.gridApi = params.api }
                onCellValueChanged={params => this.updateSelectedRow(params)}>
              </AgGridReact>
              <Button color="primary" onClick={this.updateSelectedRow}>Update</Button>
              <Button color="primary" onClick={this.onDeleteRow}>Delete</Button>
              <MyModal handleSubmit={this.handleSubmit}/>
                  
           
           
      </div>
     </Container>
    );
                     
  }
}
export default ProvisionRenderGrid;
