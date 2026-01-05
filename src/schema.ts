export const typeDefs = `#graphql
  type Dog {
    id: ID!
    name: String!
    dateOfBirth: String!
    breed: String!
    owner: String!
  }

  type Query {
    dogs(name: String, breed: String): [Dog!]!
  }

  type Mutation {
    updateDogName(id: ID!, name: String!): Dog
  }
`;
