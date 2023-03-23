import { UserInputError } from "apollo-server-core";
import Business from "../schema/business";
import Box from "../schema/box";

module.exports = {
  Query: {
    findBox: async () => {
      return await Box.find();
    },
    findOneBox: async (root: any, args: any) => {
      const idBox = args.id;
      const box = await Box.findById(idBox);
      return box;
    },
  },
  Mutation: {
    //create our mutation:
    createBox: async (root: any, args: any) => {
      const business = await Business.findById(args.business);

      const box = new Box({
        business: business,
        name: args.name,
        status: args.status,
        actualAmount: args.actualAmount,
        image: args.image,
        dailyAmount: args.dailyAmount,
      });
      console.log(box)

      return box.save().catch((error: any) => {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    updateBox: async (root: any, args: any) => {
      const { _id, ...updates } = args;
      const box = await Box.findByIdAndUpdate(_id, updates, {
        new: true,
      });
      if (!box) {
        throw new UserInputError("Box not found", {
          invalidArgs: args,
        });
      }
      return box;
    },
    deleteBox: async (root: any, args: any) => {
      const { _id } = args;
      const box = await Box.findByIdAndDelete(_id);
      if (!box) {
        throw new UserInputError("Box not found", {
          invalidArgs: args,
        });
      }
      return "Box deleted successfully";
    },
  },
};
