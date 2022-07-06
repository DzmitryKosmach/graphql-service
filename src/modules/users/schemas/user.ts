import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
  type JWT {
    jwt: String!
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    password: String
    email: String!
  }

  type Query {
    jwt(email: String!, password: String!): JWT
    user(id: ID!): User
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      password: String!
      email: String!
    ): User
  }
`;
