import { gql } from "apollo-server-express";

export const typeDefsAlbum = gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  type Query {
    albums(limit: Int, offset: Int): [Album]
    album(id: ID!): Album
  }

  type DeletedCount {
    deletedCount: String
    acknowledged: Boolean
  }

  type Mutation {
    createAlbum(
      name: String
      released: Int
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album

    deleteAlbum(id: ID!): DeletedCount

    updateAlbum(
      id: ID!
      name: String
      released: Int
      artistsIds: [String]
      bandsIds: [String]
      trackIds: [String]
      genresIds: [String]
      image: String
    ): Album
  }
`;
