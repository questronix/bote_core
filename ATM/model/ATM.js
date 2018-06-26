const db = require('../../common/services/Database');

const TABLE_NAME = 'atm';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    id: 'int',
    name: 'string',
    address: 'string',
    latitude: 'double',
    longitude: 'double'
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


module.exports.getNearestATM = (lat, long) => {
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