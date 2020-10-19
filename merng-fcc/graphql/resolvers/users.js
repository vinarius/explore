const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

function generateToken(user) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY, { expiresIn: '1h' });

    return token;
}

module.exports = {
    Mutation: {
        // register(parent, args, context, info) {
        async register(parent,
        {
            registerInput: { username, email, password, confirmPassword }
        }) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) throw new UserInputError('Errors', { errors });

            // Make sure user doesn't already exist
            const user = await User.findOne({ username });

            if(user) throw new UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            })

            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save();

            const token = generateToken(result);

            return {
                ...result._doc,
                id: result._id,
                token
            }
        },
        async login(parent, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) throw new UserInputError('Errors', { errors });

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token   
            }
        }
    }
}