//import Jwt from "jsonwebtoken";
import "dotenv/config";

import { favouritesService } from "../services/favourites.service";
import { artistService } from "../../artists/services/artist.service";
import { bandService } from "../../bands/services/band.service";
import { trackService } from "../../tracks/services/track.service";
import { genreService } from "../../genres/services/genre.service";

import { Favourites } from "../enums/favourits.enum";

type CreateArgs = {
  id: string;
};

type Context = {
  jwt: string;
};

export const favouritesResolver = {
  Query: {
    favourites: async (_: any, __: any, context: Context) => {
      const jwt = context.jwt;
      //console.log("favourites: jwt " + jwt);
      if (!jwt) return null;
      /* const jwtString = jwt.slice(7);
      const decodedJwt = Jwt.verify(jwtString, process.env["SECRET"] || "");
      const userId = (decodedJwt as { _id: string })._id;
      if (!userId) return null; */
      return await favouritesService.findOne(jwt);
    },
  },

  Favourites: {
    async bands(parent: { bandsIds: string[] }) {
      const { bandsIds } = parent;
      if (!bandsIds) return null;
      return await Promise.all(
        bandsIds.map((id: string) => {
          return bandService.findOneById(id);
        })
      );
    },

    async artists(parent: { artistsIds: string[] }) {
      const { artistsIds } = parent;
      if (!artistsIds) return null;
      return await Promise.all(
        artistsIds.map((id: string) => {
          return artistService.findOneById(id);
        })
      );
    },

    async tracks(parent: { tracksIds: string[] }) {
      const { tracksIds } = parent;
      if (!tracksIds) return null;
      return await Promise.all(
        tracksIds.map((id: string) => {
          return trackService.findOneById(id);
        })
      );
    },

    async genres(parent: { genresIds: string[] }) {
      const { genresIds } = parent;
      if (!genresIds) return null;
      return await Promise.all(
        genresIds.map((id: string) => {
          return genreService.findOneById(id);
        })
      );
    },
  },

  Mutation: {
    addTrackToFavourites: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      const postTrackFavourites =  getPostData(args, Favourites.TRACKS)
      return await favouritesService.addItem(postTrackFavourites, context.jwt);
    },

    addBandToFavourites: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      const postBandFavourites =  getPostData(args, Favourites.BANDS)
      return await favouritesService.addItem(postBandFavourites, context.jwt);
    },

    addArtistToFavourites: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      const postArtistFavourites =  getPostData(args, Favourites.ARTISTS)
      return await favouritesService.addItem(postArtistFavourites, context.jwt);
    },

    addGenreToFavourites: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      const postGenreFavourites =  getPostData(args, Favourites.GENRES)
      return await favouritesService.addItem(postGenreFavourites, context.jwt);
    },
  }
};

function getPostData(userId: CreateArgs, itemId: string ){
  return JSON.parse(`{"id": "${userId.id}", "type": "${itemId}"}`);
}