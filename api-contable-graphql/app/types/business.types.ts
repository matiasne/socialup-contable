module.exports = `#graphql
  type Business {
    user: User!
    name: String!
    address: String
    category: String
    email: String
    image: String
    phone: String
    _id: ID!
    product: [Product]
  }

  type Query {
    findBusiness: [Business],
    findOneBusiness(id: ID!): Business,
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
  }
`;
