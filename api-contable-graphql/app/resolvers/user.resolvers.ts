import User from "../schema/user";
import { UserInputError } from "apollo-server-core";
import jwt from "jsonwebtoken";

module.exports = {
  Query: {
    //personCount: () => User.collection.countDocuments({}),
  },
  Mutation: {
    //create our mutation:
    createUser: (root: any, args: any) => {
      const user = new User({
        username: args.username,
        password: args.password,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root: any, args: any) => {
      const user = await User.findOne({
        username: args.username,
        password: args.password,
      });

      if (!user) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        password: user.password,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, "SOCIALUP"),
      };
    },
  },
};
