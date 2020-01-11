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
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class ProvisionRenderGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment().subtract('months', 1).format('YYYY-MM-DD'),
      end_date : moment().format('YYYY-MM-DD'),
      date_picker_start: moment().subtract('months', 1).toDate(),
      date_picker_end: new Date(),
           
      columnDefs: PROVISION_COLUMNDEFS,
      autoGroupColumnDef: {
        headerName: "Athlete",
        width: 300,
        field: "athlete"
      },
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
            { statusPanel: "agFilteredRowCountComponent" },
            { statusPanel: "agSelectedRowCountComponent" }
          ]
      },
      defaultColDef: { filter: true }
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }
    
  handleStartDateChange(selected_dt){
      var date_str = moment(selected_dt).format('YYYY-MM-DD');
      alert('You have selected start date:' + date_str);
      
      this.setState({
              start_date : date_str,
              date_picker_start : selected_dt});
      this.populateGrid(date_str, this.state.end_date );
      this.gridApi.refreshCells();
    }
    
  handleEndDateChange(selected_dt){
      var date_str = moment(selected_dt).format('YYYY-MM-DD');
      alert('You have selected end date ' + date_str);
      this.setState({
              end_date : date_str,
              date_picker_end : selected_dt});
      
      this.populateGrid(this.state.start_date, date_str );
    }  
    
  populateGrid(start_date, end_date) {
        console.log('Populating Grid with start:' + start_date +  "|end:" + end_date);
        var params =   {
                "method": "query",
                "start_date": start_date,
                "end_date": end_date 
              }
   
        console.log("Fetching with:" + JSON.stringify(params));
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
   
    
  componentDidMount() {
   // 'http://localhost:3001/provisions'
   this.populateGrid(this.state.start_date, this.state.end_date );
              
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
     var params = {
      "method": "delete",
      "provisionId": selectedData[0].ID
      }
    console.log('We should delete:' + JSON.stringify(params));
    fetch('https://2qfsbxqbag.execute-api.us-west-2.amazonaws.com/test/rest-provisions/delete', {
                method: 'POST',
                headers: {
                          'Accept': 'application/json',
                           'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)          
          })
          .then(result => result.json())
          .then(jsonData => alert(JSON.stringify(jsonData)));
    this.populateGrid(moment(this.state.start_date).format('YYYY-MM-DD'),
                      moment(this.state.end_date).format('YYYY-MM-DD'));
    }
  
  
  updateSelectedRow(params) {
    const selectedNodes = params.api.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    var params = {
        "method" : "update",
        "provisionId" : selectedData[0].ID,
        "provsionAmount" : selectedData[0].amount,
        "description" : selectedData[0].description,
        "provisionType" : selectedData[0].provisionType,
        "user"          : selectedData[0].user};
    //const selectedDataStringPresentation = selectedData.map( node =>
    //{ FirstName: "Chris", "one": 1,  1: "some value"};)
     //[node.amount, node.ID, node.provisionType,node.ID,node.provisionDate])
    
    
    alert('We should update:' + JSON.stringify(params));
  }



  render()  {
    return (
     <Container>
      <div id="Dates">
        <DatePicker selected={this.state.date_picker_start}
                    onChange={this.handleStartDateChange} 
        />
        <DatePicker selected={this.state.date_picker_end}
                    onChange={this.handleEndDateChange}
        />
      </div>   

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
                autoGroupColumnDef={this.state.autoGroupColumnDef}
                groupIncludeFooter={true}
                groupIncludeTotalFooter={true}
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
