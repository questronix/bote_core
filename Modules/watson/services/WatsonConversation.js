const ajax = require('../../Common/services/Ajax');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const actions = require('../services/WatsonActions');

const conversation = new ConversationV1({
  username: process.env.CHAT_USER,
  password: process.env.CHAT_PASS,
  url: process.env.CHAT_URL,
  version_date: process.env.CHAT_VERSION
});

module.exports.sendMessage = (context, input)=> {

  const payload = {
    workspace_id: process.env.CHAT_ID,
    context: context || {},
    input: input || {}
  };

  return new Promise((resolve, reject)=>{
    conversation.message(payload, (err, data)=>{
      if (err) {
        console.log('Watson Error', err);
        reject({
          status: err.code || 500,
          error: err
        });
      }
      console.log('Watson Success', data);
      switch(data.context.action){
        case 'fetch_location_lat_lng':
          actions.getNearestLocation(data, {lat: context.lat, lng: context.lng}).then(latlngdata=>{
            data.locations = latlngdata;
            resolve(data);
          }).catch(error=>{
            reject({
              status: 500,
              error: error
            })
          });
        break;
        default:
          resolve(data);
        break;
      }
    });
  });
};