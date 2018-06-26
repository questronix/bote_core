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

// module.exports.getByNearestLatLong = (lat, long) => {
//     console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getByNearestLatLong [${PARAMS}]`, JSON.stringify({
//         latitude: lat,
//         longitude: long
//     }));
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
//         db.execute(sql,[lat, long, lat]).then(rows=>{
//             resolve(rows);
//         }).catch(error=>{
//             reject(error);
//         });
//     });
// };


module.exports.getStoreHours = (open, close) => {
    console.log(`[${new Date()}][MODEL - ${TABLE_NAME}].getStoreHours [${PARAMS}]`, JSON.stringify({
        opening: open,
        closing: close
    }));
    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `
            SELECT ${Object.keys(cols).join('-')}, AS Store Hours FROM ${TABLE_NAME}`;
        db.execute(sql,[open, close]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });
};

