"use strict";
const request = require('request');
const Ajax = require('../services/Ajax');

const db = require('../../Common/services/Database');

const TABLE_NAME = 'branch';
const PARAMS = 'PARAMS';

const TABLE_COLUMNS = {
    name: 'string',
    opening: 'string',
    closing: 'string'
};

function checkStoreHours(name){

    return new Promise((resolve, reject) => {
        let cols = TABLE_COLUMNS;
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE MATCH (name,address)
        AGAINST ('${name}' IN NATURAL LANGUAGE MODE)`;
        console.log(sql);
        db.execute(sql,[]).then(rows=>{
            resolve(rows);
        }).catch(error=>{
            reject(error);
        });
    });

}

module.exports = {
    storehours: checkStoreHours
};


