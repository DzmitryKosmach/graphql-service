import { artistService } from "../services/artist.service";
import { bandService } from "../../bands/services/band.service";

type CreateArgs = {
  id: string;
};

type Context = {
  jwt: string;
};

export const artistsResolver = {
  Query: {
    artists: async () => await artistService.findAll(),
    artist: async (_: any, args: CreateArgs) =>
      await artistService.findOneById(args.id),
  },

  Artist: {
    async bands(parent: { bands: string[] }) {
      const { bands } = parent;
      if (!bands) return null;
      return await Promise.all(
        bands.map((id: string) => {
          return bandService.findOneById(id);
        })
      );
    },
  },

  Mutation: {
    createArtist: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      return await artistService.create(args, context.jwt);
    },
    deleteArtist: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      return await artistService.remove(args.id, context.jwt);
    },
    updateArtist: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      const { id } = args as CreateArgs;
      return await artistService.update(id, args, context.jwt);
    },
  },
};
