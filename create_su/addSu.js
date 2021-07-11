const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/rest-tutorial', {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connection.db.dropCollection('users', function(err, result) {console.log("failed to drop collection")});


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

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('Users', userSchema);

let salt = crypto.randomBytes(16).toString('base64');
let hash = crypto.createHmac('sha512', salt).update('suAdmin').digest("base64");
password = salt + "$" + hash;
email = "suAdmin";
name = "suAdmin";
key = "0x746565454a54567";
const adminUser = new User({
    name: name,
    email: email,
    password: password,
    permissionLevel: 4096,
	key: key
})
adminUser.save();

const filter = { name: 'suAdmin' };
const update = { password: password, email: email, permissionLevel: 4096, key: key };

const operation = new Promise((resolve, reject) => {
	User.findOneAndUpdate(filter, update, {new: true, upsert: true}, function(err, doc) {
		if (err) console.log(err);
		console.log(doc);
	});
});
