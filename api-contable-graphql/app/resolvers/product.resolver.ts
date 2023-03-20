import { UserInputError } from "apollo-server-core";
import Business from "../schema/business";
import Product from "../schema/product";

module.exports = {
  Query: {
    findProduct: async () => {
      return await Product.find();
    },
    findOneProduct: async (root: any, args: any) => {
      const idProduct = args.id;
      const product = await Product.findById(idProduct);
      return product;
    },
  },
  Mutation: {
    //create our mutation:
    createProduct: async (root: any, args: any) => {
      const business = await Business.findById(args.business);

      const product = new Product({
        business: business,
        name: args.name,
        description: args.description,
        codigo: args.codigo,
        costPrice: args.costPrice,
        salePrice: args.salePrice,
        image: args.image,
      });

      return product.save().catch((error: any) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
  },
};
