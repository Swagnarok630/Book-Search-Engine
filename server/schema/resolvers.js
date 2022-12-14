const { User } = require("../models")
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user found with this email address");
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
              }
        
              const token = signToken(user);
        
              return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) {
                return res.status(400).json({ message: "Something is wrong!" });
              }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { book }, context) => {
                const { savedBooks } = await User.findOneandUpdate(
                    { _id: context.user._id },
                    { $addtoSet: { savedBooks: book } },
                    { new: true }
                );
                return savedBooks;
          },

        removeBook: async (parent, { bookId }, context) => {
            const userRemove = await User.findOneandUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            return userRemove;
        }
    }
}

module.exports = resolvers;