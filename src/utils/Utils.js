import React, { Component } from 'react';

var cachedPostData = null;
var cachedData = null;

const postServiceData = (url, params) => {
    console.log('Sending data to :' + url);
    console.log('cache status' + cachedPostData );
    console.log('post-data: requesting data');
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
      }
    
       


const getServiceData = (url) => {
    console.log('cache status' + cachedData );
    console.log('get-data: requesting data');
    fetch(url, {
       
    })
    .then((resp) => resp.json())
    .then(function(response) {
        console.info('fetch()', response);
        console.log('We got:' + response);
        return response;
    })
    //If response is not in json then in error
    .catch(error => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
}


export  { getServiceData, postServiceData };
