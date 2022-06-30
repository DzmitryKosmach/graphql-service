import { gql } from "apollo-server-express";

export const typeDefsBand = gql`
type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: String
}

type Member {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    instrument: String    
}
`;
