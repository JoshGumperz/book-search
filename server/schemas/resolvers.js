const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                const foundUser = await User.findOne({
                    $or: [{ _id: context.user._id }, { username: context.user.username }],
                },
                    "-password");
                return foundUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers;