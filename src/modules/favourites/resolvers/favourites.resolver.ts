import  Jwt  from "jsonwebtoken";
import "dotenv/config";

import { favouritesService } from "../services/favourites.service";
import { artistService } from "../../artists/services/artist.service";
import { bandService } from "../../bands/services/band.service";
import { trackService } from "../../tracks/services/track.service";
import { genreService } from "../../genres/services/genre.service";

/* type CreateArgs = {
  id: string;
}; */

type Context = {
  jwt: string;
};

export const favouritesResolver = {
  Query: {
    favourites: async (_: any, __: any, context: Context) => {
      if (!context.jwt) return null;
      const decoded = Jwt.verify(context.jwt, process.env["SECRET"] || "");  
      //https://stackoverflow.com/questions/56753929/how-to-get-user-id-using-jwt-token
      //@ts-ignore
      const userId = decoded.id;    
      return await favouritesService.findOneById(userId);
    },
  },

  Favourites: {
    async bands(parent: { bands: string[] }) {
        const { bands } = parent;      
        if (!bands) return null;
        return await Promise.all(
          bands.map((id: string) => {
            return bandService.findOneById(id);
          })
        );
    },

    async artists(parent: { artists: string[] }) {
        const { artists } = parent;      
        if (!artists) return null;
        return await Promise.all(
          artists.map((id: string) => {
            return artistService.findOneById(id);
          })
        );
    },

    async tracks(parent: { tracks: string[] }) {
        const { tracks } = parent;      
        if (!tracks) return null;
        return await Promise.all(
            tracks.map((id: string) => {
            return trackService.findOneById(id);
          })
        );
    },

    async genres(parent: { genres: string[] }) {
        const { genres } = parent;      
        if (!genres) return null;
        return await Promise.all(
            genres.map((id: string) => {
            return genreService.findOneById(id);
          })
        );
    },
  },
};
