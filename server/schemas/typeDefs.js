const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input Book {
    bookId: Int!
    authors: [String]
    description: String!
    title: String!
    image: String
    Link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: [User]
    user(userId: ID!): [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(usernmae: String!, email: String!, password: String!): Auth
    saveBook(input: Book): User
    removeBook(bookId: Int!)
  }
`;

module.exports = typeDefs;
