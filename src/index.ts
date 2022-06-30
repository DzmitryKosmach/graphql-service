import express, { Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import "dotenv/config";
import { typeDefsArtist } from "./modules/artists/schemas/artist";
//import { typeDefsAlbum } from "./modules/albums/schemas/album";
import { typeDefsBand } from "./modules/bands/schemas/band";
import { typeDefsGenre } from "./modules/genres/schemas/genre";
import { typeDefsTrack } from "./modules/tracks/schemas/track";

import { genresResolver } from "./modules/genres/resolvers/genre.resolver";

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Query {
    hello2: String
  }
`;

const resolver1 = {
  Query: {
    hello: () => {
      return "Hello World!!!".toString();
    },
  },
};

const resolver2 = {
  Query: {
    hello2: () => {
      return "Hello World2!!!";
    },
  },
};

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: [
      typeDefs,
      typeDefsArtist,
      typeDefsBand,
      typeDefsGenre,
      typeDefsTrack,
    ],
    resolvers: [resolver1, resolver2, genresResolver],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  const PORT = process.env["PORT"];

  app.listen(PORT, () => console.log(`Server is runing on port ${PORT}`));

  app.use((_: Request, res: Response) => {
    res.send("Hello from express appolo server");
  });
}

startServer();
