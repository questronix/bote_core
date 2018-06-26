"use strict";
const request = require('request');
const Ajax = require('../services/Ajax');

const db = require('../../common/services/Database');


function checkStoreHours(name){

    const TABLE_NAME = 'branch';
    const PARAMS = 'PARAMS';

    const TABLE_COLUMNS = {
        name: 'string',
        opening: 'string',
        closing: 'string'
    };


    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `
            
            SELECT opening, closing FROM ${TABLE_NAME} WHERE ${TABLE_NAME}.name = ? 
            `;
        db.execute(sql,[name]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });

}

module.exports = {
    storehours: checkStoreHours
};


