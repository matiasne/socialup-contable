import { UserInputError } from "apollo-server-core";
import Product from "../schema/product";

module.exports = {
  Query: {},
  Mutation: {
    //create our mutation:
    createProduct: (root: any, args: any) => {
      const product = new Product({
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
