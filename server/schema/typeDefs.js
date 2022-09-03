const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # Converting User model into typeDef schema
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    # Converting Book model into typeDef schema
    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    # Creating an Auth typeDef schema
    type Auth {
        token: ID!
        user: User
    }

    # Creating an input type for the later Mutation, as suggested by the Readme
    input saveBookParameters {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }

    # Query
    type Query {
        me: User
    }

    # Mutation
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: saveBookParameters!): User
        removeBook(bookId: String!): User
    }
`