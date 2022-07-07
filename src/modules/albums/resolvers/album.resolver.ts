import { albumService } from "../services/album.service";
import { artistService } from "../../artists/services/artist.service";
import { bandService } from "../../bands/services/band.service";
import { trackService } from "../../tracks/services/track.service";
import { genreService } from "../../genres/services/genre.service";

type CreateArgs = {
  id: string;
};

type Context = {
    jwt: string;
};

export const albumsResolver = {
  Query: {
    albums: async () => await albumService.findAll(),
    album: async (_: any, args: CreateArgs) =>
      await albumService.findOneById(args.id),
  },

  Album: {
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

  Mutation: {
    createAlbum: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      return await albumService.create(args, context.jwt);
    },

    deleteAlbum: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      return await albumService.remove(args.id, context.jwt);
    },
    
    updateAlbum: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      const { id } = args as CreateArgs;      
      return await albumService.update(id, args, context.jwt);
    },
  },
};
