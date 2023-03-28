import Business from "../schema/business";
import Product from "../schema/product";
import User from "../schema/user";
import Sale from "../schema/sale";
import Box from "../schema/box";
import { GraphQLError } from "graphql";

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

  Mutation: {
    //create our mutation:
    addSale: async (root: any, args: any) => {
      const client = await User.findById(args.client);
      const business = await Business.findById(args.business);

      if (!business) {
        return false;
      }

      const product = await Promise.all(
        args.product.map(async (productId: string) => {
          return await Product.findById(productId);
        })
      );
      const box = await Box.findById(args.box);

      const sale = new Sale({
        idBusiness: business,
        actualBusiness: {
          name: business.name,
          address: business.address,
          category: business.category,
          email: business.email,
          image: business.image,
          phone: business.phone,
        },
        client: client,
        product: product,
        total: args.total,
        payments: args.payments,
        variations: args.variations,
        billingDate: args.billingDate,
        satus: args.status,
        box: box,
      });
      console.log(sale);
      return sale.save().catch((error: any) => {
        console.log(error);
        throw new GraphQLError("Error creando la venta.", {
          extensions: {
            code: "ERROR_CREATING_SALE",
          },
        });
      });
    },
  },
};
