import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Business from "../schema/business";
import Product from "../schema/product";

module.exports = {
  Query: {
    findClient: async () => {
      return await Client.find();
    },
    findOneClient: async (root: any, args: any) => {
      const idClient = args.id;
      const client = await Client.findById(idClient);
      return client;
    },
  },
  Mutation: {
    //create our mutation:
    createClient: async (root: any, args: any) => {
      const business = await Business.findById(args.business);

      const client = new Client({
        business: business,
        name: args.name,
        image: args.image,
        city: args.city,
        address: args.adress,
        email: args.email,
        phone: args.phone,
        postCode: args.postCode,
        documentType: args.documentType,
        documentNumber: args.documentNumber,
        surname: args.surname,
      });

      return client.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
  },
};
