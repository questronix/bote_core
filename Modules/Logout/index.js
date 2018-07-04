const express = require('express');
const router = express.Router();

const mw = require('../Common/middleware/Authentication');
const lg = require('./model/Logout');

router.post('/', mw.isAuthenticated, (req, res) => {
    lg.logout(req.session)
    .then(data=>{
        req.session = null;
        res.json({ 
            msg: "Successfully logged out.",
            redirect: 'login' 
        });
    })
    .catch((err) => {
        res.status(400).json({
            error: err,
            msg: "Something went wrong.",
            redirect: 'login'
        });
    });
});

module.exports = router;