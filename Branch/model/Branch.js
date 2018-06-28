const db = require('../../common/services/Database');
const gc = require('../../common/services/Geocode');
const async = require('async');
const fs = require('fs');


const TABLE_NAME = 'branch';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    name: 'string',
    address: 'string',
    latitude: 'double',
    longitude: 'double',
    contactno: 'string',
    opening: 'string',
    closing: 'string'
};

module.exports.getByNearestLatLong = (lat, long) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getByNearestLatLong [${PARAMS}]`, JSON.stringify({
        latitude: lat,
        longitude: long
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `
            SELECT ${Object.keys(cols).join(',')}, (
                6371 *
                acos(cos(radians(?)) * 
                cos(radians(latitude)) * 
                cos(radians(longitude) - 
                radians(?)) + 
                sin(radians(?)) * 
                sin(radians(latitude)))
             ) AS distance FROM ${TABLE_NAME} HAVING distance < 25 ORDER BY distance
        `;
        db.execute(sql,[lat, long, lat]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};





// module.exports.getNearestBranch = (input) => {
//     // console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getByNearestLatLong [${PARAMS}]`, JSON.stringify({
//     //     latitude: lat,
//     //     longitude: long
//     // }));
//     var lat = gc.geocoordinate(input).lat;
//     var lng = gc.geocoordinate(input).lng;
   
//     // gc.geocoordinate(input)
//     // .then( data => {
//     //     console.log(data);
//     // })
//     // .catch( error => {
//     //     console.log(error);
//     // })


//     return new Promise((resolve, reject) => {
//         let cols = TABLE_COLUMNS;
//         let sql = `
//             SELECT ${Object.keys(cols).join(',')}, (
//                 6371 *
//                 acos(cos(radians(?)) * 
//                 cos(radians(latitude)) * 
//                 cos(radians(longitude) - 
//                 radians(?)) + 
//                 sin(radians(?)) * 
//                 sin(radians(latitude)))
//              ) AS distance FROM ${TABLE_NAME} HAVING distance < 25 ORDER BY distance
//         `;
//         db.execute(sql,[lat, lng, lat]).then(rows=>{
//             resolve(rows);
//         }).catch(error=>{
//             reject(error);
//         });
//     }   );
// };



// async.auto({
//     latlng: function(gcCallback, results){
//         gc.geocoordinate(function(latlng){
//             console.log('GEOCOORDINATE', latlng);
//             gcCallback(null, latlng);
//         });
//     },

//     nearest: ['geocoordinate', function(result, nearestCallback){
//         getNearestBranch(result.gc.geocoordinate, function(nearest){
//             console.log('NEAREST', nearest);
//             nearestCallback(null, nearest);
//         });
//     }]    

// }, function(err, results){
//     if(err) console.log(err);
//     else console.log('result: ', results);
    
// })