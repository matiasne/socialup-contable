import { UserInputError } from "apollo-server-core";
import Business from "../schema/business";
import Box from "../schema/box";
import path from "path";
import * as fs from "fs";

const fileRenamer = (filename: string): string => {
  const queHoraEs = Date.now();
  const regex = /[\s_-]/gi;
  console.log(filename);
  const fileTemp = filename.replace(regex, ".");
  let arrTemp = [fileTemp.split(".")];
  return `${arrTemp[0]
    .slice(0, arrTemp[0].length - 1)
    .join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
};

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

      console.log(box);

      return box.save().catch((error: any) => {
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
    addBoxPhoto: async (root: any, args: any) => {
      console.log(args);
      const { ID, file } = args;
      console.log("lalala1");
      console.log(file);
      console.log("lalala1.5");
      const { createReadStream, filename, mimetype } = await file;
      console.log(filename);
      const stream = createReadStream;
      const assetUniqName = fileRenamer(filename);
      console.log("lalala");
      const pathName = path.join(__dirname, `./upload/${assetUniqName}`);
      console.log(pathName);
      await stream.pipe(fs.createWriteStream(pathName));
      const urlForArray = `http://localhost:4000/${assetUniqName}`;
      return urlForArray;
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
