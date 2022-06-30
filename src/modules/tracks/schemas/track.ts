import { gql } from "apollo-server-express";

export const typeDefsTrack = gql`
  type Track {
    id: ID!
    title: String
    albums: String
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Query {
    tarcks(limit: Int, offset: Int): [Track]
    track(id: ID!): Track
  }
`;
