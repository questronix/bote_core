const branch = require('../../Branch/model/Branch');


module.exports = {
  getNearestLocation: (data, input)=>{
    console.log('input', input);
    if(data.context.action == 'check_location_to_use'){
      branch.getByNearestLatLong(input.lat, input.lng).then(data=>{
        console.log('Data', data);
        return data;
      }).catch(error=>{
        return error;
      });
    }
  }
};