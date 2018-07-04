const branch = require('../../Branch/model/Branch');


module.exports = {
  getNearestLocation: (data, input)=>{
    return new Promise((resolve, reject)=>{
      if(data.context.action == 'fetch_location_lat_lng'){
        branch.getByNearestLatLong(input.lat, input.lng).then(data=>{
          resolve(JSON.parse(JSON.stringify(data)));
        }).catch(error=>{
          reject([]);
        });
      }else{
        reject([]);
      }
    })
  }
};