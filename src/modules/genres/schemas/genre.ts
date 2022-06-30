import { gql } from "apollo-server-express"

export const typeDefsGenre = gql`
type Genre {
  id: ID!
  name: String
  description: String
  country: String
  year: Int
}

type Query {
  genres(limit: Int, offset: Int): [Genre]
  genre(id: ID!): Genre
}

type Mutation {
  createGenre(
    name: String
    description: String
    country: String
    year: Int
  ): Genre
}`
