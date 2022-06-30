import { gql } from "apollo-server-express"

export const typeDefsArtist = gql`
type Favourites {
    id: ID!
    userId: ID!
    bands: [ID]
    genres: [ID]
    artists: [ID]
    tracks: [ID]
}

type Query {
  
}`
