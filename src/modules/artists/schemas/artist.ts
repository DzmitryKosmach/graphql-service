import { gql } from "apollo-server-express";

export const typeDefsArtist = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  type Query {
    artists(limit: Int, offset: Int): [Artist]
    artist(id: ID!): Artist
  }

  type DeletedCount {
    deletedCount: String
    acknowledged: Boolean
  }

  type Mutation {
    createArtist(
      firstName: String
      secondName: String
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bands: [String]
      instruments: [String]
    ): Artist

    deleteArtist(id: ID!): DeletedCount

    updateArtist(
      id: ID!
      firstName: String
      secondName: String
      middleName: String
      birthDate: String
      birthPlace: String
      country: String
      bands: [String]
      instruments: [String]
    ): Artist
  }
`;
