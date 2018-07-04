'use strict';

var crypto = require('crypto');

var SaltLength = 16;

function createHash(password) {
    var salt = generateSalt(SaltLength);
    var hash = sha256(password, salt);
    return {
        salt: salt,
        passwordHash: hash
    };
};

function validateHash(password, hash, salt) {
    var validHash = sha256(password, salt);
    return hash === validHash;
};

function generateSalt(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

function sha256(password, salt) {
    var hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    var passwordHash = hash.digest('hex');
    return passwordHash;
};

module.exports = {
    hash: createHash,
    validate: validateHash
};