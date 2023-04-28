const { bookSchema, User } = require('../models');

const resolvers = {
    Query: {
      user: async () => {
        return User.find({});
      },
      
    },
    Mutation: {
      getSingleUser: async (parent, args) => {
        const foundUser = await User.findOne(args);
        return foundUser;
      },
      createUser: async (parent, { username, email, password }) => {
        const user = await User.create({username, email, password});
        const token = signToken(user);
        return user, token;
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, { userId, book }) => {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      deleteBook: async (parent, { userId, book }) => {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: book } },
          { new: true }
        );
      },
    },
  };
  
  module.exports = resolvers;
  