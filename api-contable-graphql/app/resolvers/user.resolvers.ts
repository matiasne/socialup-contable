import User from "../schema/user";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import Business from "../schema/business";
import Product from "../schema/product";

module.exports = {
  Query: {
    findUser: async () => {
      return await User.find();
    },
    findOneUser: async (root: any, args: any) => {
      const idUser = args.id;
      const user = await User.findById(idUser);
      return user;
    },
    findUserBusiness: async (_: any, _args: any, context: any) => {
      console.log("user", context.user.id);
      console.log(_args.pageCount);
      console.log(_args.perPage);

      const offset = (_args.pageCount - 1) * _args.perPage;

      //console.log(pageCount, perPage);

      const business = await Business.find({
        user: context.user.id,
        name: new RegExp(_args.searchWord, "i"),
      })
        .skip(offset)
        .limit(_args.perPage)
        .exec();
      return business;
    },
  },
  User: {
    business: async (_: any, _args: any, context: any) => {
      return await Business.find({ user: context.user.id });
    },
  },
  Business: {
    products: async (business: any) => {
      return await Product.find({ business: business._id });
    },
  },
  Mutation: {
    //create our mutation:
    createUser: async (root: any, args: any) => {
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

      return await user.save().catch((error) => {
        throw new GraphQLError("Error creando el usuario. " + error, {
          extensions: {
            code: "ERROR_CREATING_USER",
          },
        });
      });
    },
    login: async (root: any, args: any) => {
      const user = await User.findOne({
        email: args.email,
        password: args.password,
      });

      if (!user) {
        throw new GraphQLError("wrong credentials");
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };
      console.log(userForToken);
      return {
        value: jwt.sign(userForToken, "SOCIALUP"),
        id: user._id,
      };
    },
    validateToken: async (root: any, args: any) => {
      const decodedToken = jwt.decode(args.token);

      if (!decodedToken || typeof decodedToken !== "object") {
        throw new GraphQLError("Invalid token");
      }
      const user = await User.findOne({
        email: decodedToken.email,
        id: decodedToken.id,
      });
      if (!user) {
        throw new GraphQLError("Invalid token or user not found");
      }
      return "Token Ok";
    },
  },
};
