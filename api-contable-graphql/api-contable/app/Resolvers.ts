import Person from "./models/person";

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
  },
};
export default Resolvers;
