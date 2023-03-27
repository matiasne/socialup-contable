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
    findSale: async () => {
      return await Sale.find();
    },
    findOneSale: async (root: any, args: any) => {
      const idSale = args.id;

      const sale = await Sale.findById(Sale._id);

      return Sale;
    },
  },
  Business: {
    products: async (business: any) => {
      return await Sale.find({ business: business._id });
    },
  },
  /*
  Client: {
    sale: async (client: any) => {
      return await Sale.find({ client: client._id })
    },
  },
*/
  Mutation: {
    //create our mutation:
    addSale: async (root: any, args: any) => {
      const client = await User.findById(args.client);
      const business = await Business.findById(args.business);
      const product = await Product.findById(args.product);
      const box = await Box.findById(args.box);

      const sale = new Sale({
        business: business,
        client: client,
        product: [product],
        total: args.total,
        payments: [args.payments],
        variations: [args.variations],
        billingDate: args.billingDate,
        satus: args.status,
        box: box
      });

      return sale.save().catch((error: any) => {
        throw new GraphQLError("Error creando la venta.", {
          extensions: {
            code: "ERROR_CREATING_SALE",
          },
        });
      });
    },

    updateBusiness: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const sale = await Sale.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!sale) {
        throw new UserInputError("Sale not found", {
          invalidArgs: args,
        });
      }
      return sale;
    },
    /*
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
*/

  },
};
