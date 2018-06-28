const ajax = require('../../common/services/Ajax');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');

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
      resolve(data);
    });
  });
};