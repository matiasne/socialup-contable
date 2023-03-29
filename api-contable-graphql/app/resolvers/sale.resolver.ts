import Business from "../schema/business";
import Product from "../schema/product";
import Sale from "../schema/sale";
import Box from "../schema/box";
import Client from "../schema/client";
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
      const client = await Client.findById(args.client);
      const business = await Business.findById(args.business);

      if (!business) {
        return false;
      }

      const product = await Promise.all(
        args.product.map(async (productId: string) => {
          return await Product.findById(productId);
        })
      );

      const actualProducts = await Promise.all(
        args.product.map(async (productId: string) => {
          let p = await Product.findById(productId);
          const producto = {
            name: p.name,
            codigo: p.codigo,
            costPrice: p.costPrice,
            salePrice: p.salePrice,
            image: p.image,
          };
          return producto;
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
        actualClient: {
          name: client?.name,
          image: client?.image,
          city: client?.city,
          address: client?.adress,
          email: client?.email,
          phone: client?.phone,
          postCode: client?.postCode,
          documentType: client?.documentType,
          documentNumber: client?.documentNumber,
          surname: client?.surname,
        },
        product: product,
        actualProduct: actualProducts,
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
