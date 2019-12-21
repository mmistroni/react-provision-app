export const INSERT_URL = 'https://k1k1xtrm88.execute-api.us-west-2.amazonaws.com/test/insertshares'

function callFun(car_make) {
  alert('You clicked on Make:' + car_make);
  }


export const COLUMNDEFS =  [
      { headerName: "ID", field: "ID", sortable:true, checkboxSelection: true}, 
      { headerName: "DESCRIPTION", field: "description", sortable:false, enableValue:true}, 
      { headerName: "TYPE", field: "type" , editable:false, filter:true, allowedAggFuncs: ["sum"]},
      { headerName: "AMOUNT", field: "amount" , editable:true, type: "numericColumn"},
      { headerName: "ASOFDATE", 
        valueGetter: function(params) {
            return params.data.provisionDate;
          } 
      
      },
      { headerName: "USER", field: "user" , editable:true},
      
      
      ];


export const PROVISIONS_ROWDATA=  []

