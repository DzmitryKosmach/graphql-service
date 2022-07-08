import { bandService } from "../services/band.service";

type CreateArgs = {
  id: string;
};

type CreateParams = {
  limit: string;
  offset: string;
};

type Context = {
  jwt: string;
};

export const bandsResolver = {
  Query: {
    bands: async (_: any, params: CreateParams) => {
      return await bandService.findAll(params.limit, params.offset);
    },

    band: async (_: any, args: CreateArgs) =>
      await bandService.findOneById(args.id),
  },

  Mutation: {
    createBand: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      return await bandService.create(args, context.jwt);
    },
    deleteBand: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      return await bandService.remove(args.id, context.jwt);
    },
    updateBand: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      const { id } = args as CreateArgs;
      return await bandService.update(id, args, context.jwt);
    },
  },
};
