import { gql } from "apollo-server-express";

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

  type DeletedCount {
    deletedCount: String
    acknowledged: Boolean
  }

  type Mutation {
    createGenre(
      name: String
      description: String
      country: String
      year: Int
    ): Genre

    deleteGenre(id: ID!): DeletedCount

    updateGenre(
      id: ID!
      name: String
      description: String
      country: String
      year: Int
    ): Genre
  }
`;
