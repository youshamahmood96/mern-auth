const {check} = require('express-validator')

class Validation{
    name(){
    return check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    }
    email(){
        return check('email')
        .isEmail()
        .withMessage('Email format invalid')
    }
    password(){
        return check('password')
        .isLength({min:6})
        .withMessage('Must be at least 6 characters long')
    }
}

const validator = new Validation()

exports.userSignupValidator = [
    validator.name(),
    validator.email(),
    validator.password()
]

exports.userSigninValidator = [
    validator.email(),
    validator.password()
]