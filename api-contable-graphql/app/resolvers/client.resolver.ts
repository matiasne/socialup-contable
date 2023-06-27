import { UserInputError } from "apollo-server-core";
import Client from "../schema/client";
import Business from "../schema/business";

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
        address: args.address,
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
    updateClient: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const client = await Client.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!client) {
        throw new UserInputError("Client not found", {
          invalidArgs: args,
        });
      }
      return client;
    },
    deleteClient: async (root: any, args: any) => {
      const { _id } = args;
      const client = await Client.findByIdAndDelete(_id);
      if (!client) {
        throw new UserInputError("Client not found", {
          invalidArgs: args,
        });
      }
      return "Client deleted successfully";
    },
  },
};
