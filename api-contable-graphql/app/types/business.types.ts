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
    findBusiness: [Business],
    findOneBusiness(id: ID): Business,
    
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
