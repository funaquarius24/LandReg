const UserModel = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    // console.log(req.body)

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    let errors = [];
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                errors.push("User not in record!");
                res.status(404).send({errors: errors.join(',')});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    if(user[0].lastName === "undefined"){
                        var name;
                        name = user[0].name
                    }
                    else{
                        name = user[0].firstName + ' ' + user[0].lastName
                    }
                    req.body = {
                        userId: user[0]._id,
                        name: name,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        wAddress: user[0].key
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};