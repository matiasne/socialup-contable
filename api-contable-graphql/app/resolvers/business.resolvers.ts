import Business from "../schema/business";
import Product from "../schema/product";
import Client from "../schema/client";
import User from "../schema/user";
import Sale from "../schema/sale";
import Box from "../schema/box";
import { GraphQLError } from "graphql";
import { UserInputError } from "apollo-server-core";

module.exports = {
  Query: {
    findBusiness: async (_: any, _args: any, context: any) => {
      console.log("user", context.user.id);

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
    client: async (business: any) => {
      return await Client.find({ business: business._id });
    },
    box: async (business: any) => {
      return await Box.find({ business: business._id });
    },
    sale: async (business: any) => {
      return await Sale.find({ business: business._id });
    },
  },
  Mutation: {
    //create our mutation:
    addBusiness: async (root: any, args: any) => {
      const user = await User.findById(args.user);
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
        throw new GraphQLError("Error creando el negocio. " + error, {
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
    deleteBusiness: async (root: any, args: any) => {
      const idBusiness = args._id;
      const business = await Business.findById(idBusiness);
      if (business) {
        await Product.deleteMany({ business: business._id });
        await Client.deleteMany({ business: business._id });
        await Business.findByIdAndDelete(business._id);
        return "Negocio Borrado";
      } else {
        throw new GraphQLError("Error eliminando el negocio.", {
          extensions: {
            code: "ERROR_DELETING_BUSINESS",
          },
        });
      }
    },
  },
};
