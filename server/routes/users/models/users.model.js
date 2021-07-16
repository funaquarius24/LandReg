const mongoose = require('../../common/services/mongoose.service').mongoose;
const blockchain = require('../../common/services/blockchain.service').blockchainObj;
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
    name: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: {
            unique: true,
            dropDups: true
        }
    },
    key: {
        type: String,
        
    },
    password: String,
    permissionLevel: {
        type: Number,
        max: 4096
    }
    
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    return User.find({email: email})
        .then((result) => {
            // result = result.toJSON();
            console.log(result);
            return result;
        });
};

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

