import Business from "../schema/business";
import Movement from "../schema/movement";
import Product from "../schema/product";
import Box from "../schema/box";
import Client from "../schema/client";
import { GraphQLError } from "graphql";

type ProductInSale = {
  id: string;
  name: string;
  codigo: string;
  costPrice: string;
  salePrice: string;
};

module.exports = {
  // Query: {
  //   findSale: async () => {
  //     return await Sale.find();
  //   },
  //   findOneSale: async (root: any, args: any) => {
  //     const idSale = args.id;

  //     const sale = await Sale.findById(Sale._id);

  //     return Sale;
  //   },
  // },
  // Business: {
  //   products: async (business: any) => {
  //     return await Sale.find({ business: business._id });
  //   },
  // },

  Mutation: {
    //create our mutation:
    addMovement: async (root: any, args: any) => {
      console.log("args: ", args);
      const client = await Client.findById(args.client);
      const business = await Business.findById(args.idbusiness);
      //console.log("Business: ", business);
      if (!business) {
        return false;
      }

      let actualProducts: ProductInSale[] = [];

      if (args.productsIds) {
        for await (let productId of args.productsIds) {
          let p = await Product.findById(productId);
          const producto: ProductInSale = {
            id: p._id,
            name: p.name,
            codigo: p.codigo,
            costPrice: p.costPrice,
            salePrice: p.salePrice,
          };
          actualProducts.push(producto);
        }
      }

      console.log("Product: ", actualProducts);

      const box = await Box.findById(args.box);

      const movement = new Movement({
        idBusiness: business,
        typeMovement: args.typeMovement,
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
        products: actualProducts,
        box: box,
        actualBox: {
          name: box?.name,
        },
        total: args.total,
        payments: args.payments,
        variations: args.variations,
        billingDate: new Date(),
        status: args.status,
      });
      console.log(movement);
      return movement.save().catch((error: any) => {
        console.log(error);
        throw new GraphQLError("Error creando el movimiento. " + error, {
          extensions: {
            code: "ERROR_CREATING_MOVEMENT",
          },
        });
      });
    },
  },
};
