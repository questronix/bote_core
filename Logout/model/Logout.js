module.exports.logout = (session) => {
    return new Promise ((resolve, reject) => {
        if(typeof session !== 'undefined'){
            session.destroy();
            resolve({
                status: 1,
                msg: 'Session destroyed.'
            });
        }else{
            reject({
                status: 0,
                msg: 'No session found.'
            });
        }
    });
}