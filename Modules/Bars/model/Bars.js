const TAG     = '[Bars]';

const db      = require('../../Common/services/Database');
const err     = require('../../Common/services/Errors');
const logger  = require('../../Common/services/Logger');

function getBars(args){
  // search for bars
  const ACTION = '[getBars]'

  let db_query = 'select * from store';
  if(args){
    if (args.address){
      db_query += ` where address like '%${args.address}%'`;
    }else if(args.name){
      db_query += ` where name like '%${args.name}%'`;
    }
  }

  return new Promise( (resolve, reject)=>{
    db.execute(db_query)
    .then( data=>{
      resolve(data);
    })
    .catch(error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    })
  });
}

function getBarItems(name){
  const ACTION = '[getBaritems]';

  return new Promise( (resolve, reject)=> {
    db.execute(`select * from store_items
      where store_id=(select id from store where name=?)`,
      [name])
    .then( data=>{
      resolve(data);
    }).catch( error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    })
  });
}

function getBar(name){
  const ACTION = '[getBaritems]';

  return new Promise( (resolve, reject) =>{
    db.execute(`select * from store where name=?`, [name])
    .then( bar_data=>{
      getBarItems(name)
      .then( bar_items=>{
        let data = bar_data[0];
        data.items = bar_items;
        console.log(data);
        resolve(data);
      }).catch( error=>{
        logger.log('error', TAG+ACTION, error);
        reject(err.raise('INTERNAL_SERVER_ERROR'));
      })
    }).catch( error=>{
      logger.log('error', TAG+ACTION, error);
      reject(err.raise('INTERNAL_SERVER_ERROR'));
    })
  })
}

module.exports = {
  searchBar: getBars,
  viewBar  : getBar,
  viewBarItems: getBarItems
}