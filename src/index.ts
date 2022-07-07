import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import { typeDefsArtist } from "./modules/artists/schemas/artist";
import { typeDefsAlbum } from "./modules/albums/schemas/album";
import { typeDefsBand } from "./modules/bands/schemas/band";
import { typeDefsGenre } from "./modules/genres/schemas/genre";
import { typeDefsTrack } from "./modules/tracks/schemas/track";
import { typeDefsFavourites } from "./modules/favourites/schemas/favourites";
import { typeDefsUser } from "./modules/users/schemas/user";

import { genresResolver } from "./modules/genres/resolvers/genre.resolver";
import { albumsResolver } from "./modules/albums/resolvers/album.resolver";
import { artistsResolver } from "./modules/artists/resolvers/artist.resolver";
import { bandsResolver } from "./modules/bands/resolvers/band.resolver";
import { favouritesResolver } from "./modules/favourites/resolvers/favourites.resolver";
import { tracksResolver } from "./modules/tracks/resolvers/track.resolver";
import { usersResolver } from "./modules/users/resolvers/user.resolver";

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    csrfPrevention: true,
    cache: "bounded",
    typeDefs: [
      typeDefsArtist,
      typeDefsAlbum,
      typeDefsBand,
      typeDefsGenre,
      typeDefsTrack,
      typeDefsFavourites,
      typeDefsUser,
    ],
    resolvers: [
      genresResolver,
      albumsResolver,
      artistsResolver,
      tracksResolver,
      bandsResolver,
      favouritesResolver,
      usersResolver,
    ],
    context: ({ req }) => {
      const jwt = req.headers.authorization || "";
      return { jwt };
    },
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
