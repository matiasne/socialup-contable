import { UserInputError } from "apollo-server-core";
import Business from "../schema/business";
import Product from "../schema/product";
import { GraphQLError } from "graphql/error/GraphQLError";

module.exports = {
  // Query: {
  //   findProduct: async (_: any, _args: any, context: any) => {
  //     console.log(context);
  //     return await Product.find();
  //   },
  //   findOneProduct: async (root: any, args: any, context: any) => {
  //     const idProduct = args.id;
  //     const product = await Product.findById(idProduct);
  //     return product;
  //   },
  // },
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
        throw new GraphQLError("Error creando el producto. " + error, {
          extensions: {
            code: "ERROR_CREATING_PRODUCT",
          },
        });
      });
    },
    updateProduct: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const product = await Product.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!product) {
        throw new UserInputError("Product not found", {
          invalidArgs: args,
        });
      }
      return product;
    },
    deleteProduct: async (root: any, args: any) => {
      const { _id } = args;
      const product = await Product.findByIdAndDelete(_id);
      if (!product) {
        throw new UserInputError("Product not found", {
          invalidArgs: args,
        });
      }
      return "Product deleted successfully";
    },
  },
};
