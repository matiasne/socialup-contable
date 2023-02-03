import Person from "./schema/person";
import User from "./schema/user";
import jwt from 'jsonwebtoken';
import { UserInputError } from "apollo-server-core";



const Resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments({}),
    allPersons: async (root: any, args: any) => {
      return Person.collection.find({});
    },
    findPerson: (root: any, args: any) =>{
      const { name } = args;
      return Person.collection.findOne({ name });
    }
  },
  Mutation: {
    //create our mutation:
    addPerson: (root: any, args: any) => {
      const newPerson = new Person({ ...args });
      
      return newPerson.save(); //return the new object's result
    },
    createUser: (root: any, args: any) => {
      const user = new User({ username: args.username})

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root:any, args:any) => {
      const user = await User.findOne({ username: args.username})

      if (!user || args.password != "midupassword"){
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return {
        value: jwt.sign(userForToken, "SOCIALUP")
      }
    }
  },
    
};
export default Resolvers;
