import { gql } from "apollo-server-express";

export const typeDefsTrack = gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Query {
    tracks(limit: Int, offset: Int): [Track]
    track(id: ID!): Track
  }

  type DeletedCount {
    deletedCount: String
    acknowledged: Boolean
  }

  type Mutation {
    createTrack(
      title: String!
      albumId: String!
      artistsIds: [String]
      bandsIds: [String]
      duration: Int!
      released: Int!
      genresIds: [String]!
    ): Track

    deleteTrack(id: ID!): DeletedCount

    updateTrack(
      id: ID!
      title: String
      albumId: String
      artistsIds: [String]
      bandsIds: [String]
      duration: Int
      released: Int
      genresIds: [String]
    ): Track
  }
`;
