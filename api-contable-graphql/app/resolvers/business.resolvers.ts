import Business from "../schema/business";
import User from "../schema/user";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

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
  },
};
