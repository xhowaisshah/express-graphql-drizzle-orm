import { makeExecutableSchema } from "@graphql-tools/schema";
import Mutations from "./resolvers/Mutation";
import Queries from "./resolvers/Qurey";

const typeDefs = `
  type User {
    email: String!
    name: String
    id: Int!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(email: String!, name: String!): MutationResponse!
    updateUser(id: Int!, name: String, email: String): MutationResponse!
    deleteUser(id: Int!): MutationResponse!
  }

  type MutationResponse {
    success: Boolean!
    user: User
    message: String
  }
`;

const resolvers = {
  Query: Queries,
  Mutation: Mutations
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});