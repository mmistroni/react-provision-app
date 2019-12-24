export const QUERY_URL = ' https://2qfsbxqbag.execute-api.us-west-2.amazonaws.com/test/rest-provisions/query'
export const ROWDATA=  [
      { make: "Toyota", model: "Celica", price: 35000}, {
        make: "Ford", model: "Mondeo", price: 32000 }, 
      { make: "Porsche", model: "Boxter", price: 72000}
      ]

function callFun(car_make) {
  alert('You clicked on Make:' + car_make);
  }

export const PROVISION_COLUMNDEFS =  [
      { headerName: "ID", field: "ID", filter: "agTextColumnFilter",checkboxSelection: true,
              enableRowGroup:true}, 
      { headerName: "DESCRIPTION", field: "description",  enableValue:true},
      { headerName: "TYPE", field: "provisionType", enableRowGroup:true}, 
      { headerName: "AMOUNT", field: "amount",  enableValue:true, type: "numericColumn", allowedAggFuncs: ["sum"]},
      { headerName: "DATE", field: "provisionDate",  enableValue:true},
      { headerName: "USER", field: "user",  enableValue:true},
      
      ];

export const PROVISION_ROWDATA=  []

