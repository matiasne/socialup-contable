import Business from "../schema/business";
import Product from "../schema/product";
import User from "../schema/user";
import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server-core";

module.exports = {
  Query: {
    findBusiness: async () => {
      return await Business.find();
    },
    findOneBusiness: async (root: any, args: any) => {
      const idBusiness = args.id;

      const business = await Business.findById(idBusiness);

      return business;
    },
  },
  Business: {
    products: async (business: any) => {
      return await Product.find({ business: business._id });
    },
  },
  Mutation: {
    //create our mutation:
    addBusiness: async (root: any, args: any) => {
      const user = await User.findById(args.user);
      console.log(user);
      const business = new Business({
        user: user,
        name: args.name,
        address: args.address,
        category: args.category,
        email: args.email,
        image: args.image,
        phone: args.phone,
      });

      return business.save().catch((error) => {
        throw new GraphQLError("Error creando el negocio.", {
          extensions: {
            code: "ERROR_CREATING_BUSINESS",
          },
        });
      });
    },
    updateBusiness: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const business = await Business.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!business) {
        throw new UserInputError("Business not found", {
          invalidArgs: args,
        });
      }
      return business;
    },
  },
};
