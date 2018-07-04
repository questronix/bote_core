"use strict";
const request = require('request');
const Ajax = require('../services/Ajax');
const br = require('../../Branch/model/Branch');



function check_geocoord(input){

  return new Promise((resolve, reject)=>{
    Ajax.setOptions({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${input},+Philippines&key=AIzaSyCk5psk14jw6Rto0wmf5B_i1K6z9TgClWA`
    });
    Ajax.get().then(data=>{
      console.log(data.body);
      
      resolve(data);
    }).catch(error=>{
      reject(error);
    });    
  });
}

module.exports = {
    geocoordinate: check_geocoord
};