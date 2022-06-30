import { gql } from "apollo-server-express"

export const typeDefsArtist = gql`
type JWT {
  jwt: String!
}

type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String!
    email: String!
}

type Query {
  jwt(email: String!, password: String!): JWT
  user(id: ID!): User
}`