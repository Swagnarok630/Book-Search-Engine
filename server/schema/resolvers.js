const { User } = require("../models")

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return User
        }
    },

    Mutation: {
        
    }
}