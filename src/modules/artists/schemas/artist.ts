import { gql } from "apollo-server-express"

export const typeDefsArtist = gql`
type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [ID]
    instruments: String
}`