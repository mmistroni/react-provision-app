"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Athlete",
          field: "athlete",
          width: 150
        },
        {
          headerName: "Age",
          field: "age",
          width: 90,
          minWidth: 50,
          filter: "number"
        },
        {
          headerName: "Country",
          field: "country",
          width: 120,
          enableRowGroup: true
        },
        {
          headerName: "Year",
          field: "year",
          width: 90,
          enableRowGroup: true
        },
        {
          headerName: "Date",
          field: "date",
          width: 110
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110
        },
        {
          headerName: "Gold",
          field: "gold",
          width: 100,
          enableValue: true
        },
        {
          headerName: "Silver",
          field: "silver",
          width: 100,
          enableValue: true
        },
        {
          headerName: "Bronze",
          field: "bronze",
          width: 100,
          enableValue: true
        },
        {
          headerName: "Total",
          field: "total",
          width: 100,
          enableValue: true
        }
      ],
      defaultColDef: { filter: true },
      rowData: null,
      statusBar: {
        statusPanels: [
          {
            statusPanel: "agTotalAndFilteredRowCountComponent",
            align: "left"
          },
          {
            statusPanel: "agTotalRowCountComponent",
            align: "center"
          },
          { statusPanel: "agFilteredRowCountComponent" },
          { statusPanel: "agSelectedRowCountComponent" },
          { statusPanel: "agAggregationComponent" }
        ]
      },
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
        ]
      }
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-balham"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            enableRangeSelection={true}
            statusBar={this.state.statusBar}
            sideBar={this.state.sideBar}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}
export default GridExample;