import User from "../schema/user";
import { UserInputError } from "apollo-server-core";
import jwt from "jwt-simple";

module.exports = {
  Query: {
    //personCount: () => User.collection.countDocuments({}),
  },
  Mutation: {
    //create our mutation:
    createUser: (root: any, args: any, contextValue: any) => {

      const user = new User({
        name: args.name,
        surname: args.surname,
        email: args.email,
        password: args.password,
        role: args.role,
        image: args.image,
        address: args.address,
        gender: args.gender,
        phone: args.phone,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root: any, args: any, contextValue: any) => {

      if (contextValue.user) return null;
      
      const user = await User.findOne({
        email: args.email,
        password: args.password,
      });

      if (!user) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        email: user.email,
        password: user.password,
        id: user._id,
      };

      return {
        value: jwt.encode(userForToken, "SOCIALUP"),
      };
    },
  },
};
