// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String,unique:true},
    password: String,
});

const UserModel = mongoose.model('User', UserSchema);

// eslint-disable-next-line no-undef
module.exports = UserModel;
