export const INSERT_URL = 'https://k1k1xtrm88.execute-api.us-west-2.amazonaws.com/test/insertshares'
export const ROWDATA=  [
      { make: "Toyota", model: "Celica", price: 35000}, {
        make: "Ford", model: "Mondeo", price: 32000 }, 
      { make: "Porsche", model: "Boxter", price: 72000}
      ]

function callFun(car_make) {
  alert('You clicked on Make:' + car_make);
  }

export const COLUMNDEFS =  [
      { headerName: "Make", field: "make", filter: "agTextColumnFilter", sortable:true, checkboxSelection: true,
              enableRowGroup:true}, 
      { headerName: "Model", field: "model", sortable:true, enableValue:true}, 
      { headerName: "Price", field: "price" , editable:true, filter:false, type: "numericColumn" ,allowedAggFuncs: ["sum"], enableValue:true},
      { headerName: "NewCol", 
        valueGetter: function(params) {
            return params.data.price * 10;
          } 
      
      },
      
      
      { headerName: "Action", cellRenderer: (params) => {
                      const data = params.node.data;
                      var mk =  data.make 
                      var md = data.model
                      var pc = data.price
                      const element = document.createElement('span');
                        element.innerHTML = '<Button color="secondary" >Update</Button>';
                        
                      return element
                  }
            } 
      ];


export const SHARES_COLUMNDEFS =  [
      { headerName: "Ticker", field: "TICKER", filter: "agTextColumnFilter", sortable:true, checkboxSelection: true,
              enableRowGroup:true}, 
      { headerName: "Name", field: "NAME",  enableValue:true}, 
      { headerName: "Quantity", field: "QTY" , 
                  editable:true, sortable:true, 
                  filter: "agNumberColumnFilter",
                  filterParams: {
                    applyButton: true,
                    clearButton: true
                  }},
      { headerName: "Price", field: "PRICE" , editable:true, filter:false, type: "numericColumn" ,allowedAggFuncs: ["sum"], enableValue:true}
       
      ];

export const SHARES_ROWDATA=  []

