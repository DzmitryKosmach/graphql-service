import { gql } from "apollo-server-express";

export const typeDefsFavourites = gql`
  type Favourites {
    id: ID!
    userId: ID!
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  type Query {
    favourites(): Favourites
  }
`;
