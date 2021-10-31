const fileUtil = require('./../lib/fileUtil');


exports.getAll = (dir, model) => (reqData, callback) => {
    fileUtil.read(dir, (err, data) => {
        if (!err && data) {
            callback(200, { message: `${model} retrieved`, data });
        } else {
            callback(404, { err, data, message: `could not retrieve ${model}` });
        }
    });
};

exports.getOne = (dir, model) => (reqData, callback) => {
    if (reqData.query.id) {
        fileUtil.read(dir, (err, data) => {
            if (!err && data) {
                const bookToView = data.findIndex((item) => item.id == reqData.query.id);
                if (bookToView > -1) {
                    const book = data[bookToView];
                    callback(200, { message: `${model} retrieved`, data: book });
                }else {
                    callback(404, { message: `${model} not found`});
                }
                
            } else {
                callback(404, { err, data, message: `could not retrieve ${model}` });
            }
        });
    } else { 
        callback(404, { message: `${model} not found`, data: null });
    }
};

exports.update = (dir, model) => (reqData, callback) => {
    if (reqData.query.id) {
        fileUtil.update(dir, reqData.query.id, reqData.payload,  (err, data) => {
            if (!err) {
                callback(200, {message : `${model} updated successfully`, data})
            }else{
                callback(400, {err, data : null, message : `could not update ${model}`});
            }
        });
    } else {
        callback(404, { message: `${model} not found` });
    }
};

exports.deleteOne = (dir, model) => (reqData, callback) => {
    if(reqData.query.id){
        fileUtil.delete(dir, reqData.query.id, (err) => {
            if(!err){   
                callback(200, {message : `${model} deleted successfully`});
            }else{
                callback(400, {err : err, message : `could not delete book`});
            }
        })
    }else{
        callback(404, {message : `${model} not found`});
    }
 };