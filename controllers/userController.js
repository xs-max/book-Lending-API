const fileUtil = require('./../lib/fileUtil');
const { getOne, getAll, update, deleteOne } = require('./handlerFactory');

exports.createUser = (data, callback) => {
    //validate that all required fields are filled out
    var name = typeof (data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var phone = typeof (data.payload.phone) === 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone : false;
    var email = typeof (data.payload.email) === 'string' && data.payload.email.trim().length > 0 ? data.payload.email : false;
    if(name &&  phone && email){
        fileUtil.create('users/users', data.payload, (err) => {
            if (!err) {
                callback(200, { message: "User added successfully", data: null });
            } else {
                callback(400, { message: "could not add user", err });
            }
        });
    }else {
        callback(400, { message: "Some fields are are compulsory (name, phone and email)" })
    }
};

exports.getAllUsers =  getAll('users/users', 'users');

exports.getOneUser = getOne('users/users', 'user');

exports.updateUser = update('users/users', 'user');

exports.deleteUser = deleteOne('users/users', 'user');