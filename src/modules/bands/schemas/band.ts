import { gql } from "apollo-server-express";

export const typeDefsBand = gql`
  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {    
    artist: String
    instrument: String
    years: [String]
  }

  input MemberInput {
    artist: String
    instrument: String
    years: [String]
  }

  type Query {
    bands(limit: Int, offset: Int): [Band]
    band(id: ID!): Band
  }

  type DeletedCount {
    deletedCount: String
    acknowledged: Boolean
  }

  type Mutation {
    createBand(
      name: String!
      origin: String
      members: [MemberInput]
      website: String
      genresIds: [String]
    ): Band

    deleteBand(id: ID!): DeletedCount

    updateBand(
      id: ID!
      name: String
      origin: String
      members: [MemberInput]
      website: String
      genresIds: [String]
    ): Band
  }
`;
