module.exports = `#graphql
  type Business {
    user: User
    name: String
    address: String
    category: String
    email: String
    image: String
    phone: String
    _id: ID!
    products: [Product]
    client: [Client]
    sale: [Sale]
    box: [Box]
  }

  type Query {
    findUserBusiness(id: ID, pageCount: Int, perPage: Int, searchWord: String): [Business],
    findOneBusiness(_id: ID, user:String, name: String): Business,
    
  }

  type Mutation {
    addBusiness(
      user: String!
      name: String!
      address: String
      category: String
      email: String
      image: String
      phone: String
    ): Business
    updateBusiness(
      _id: String!
      name: String
      address: String
      category: String
      email: String
      image: String
      phone: String
    ): Business
    deleteBusiness(
      _id: String!
    ): String
  }
`;
