import { genreService } from "../services/genre.service";

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

export const genresResolver = {
  Query: {
    genres: async (_: any, params: CreateParams) => {
      return await genreService.findAll(params.limit, params.offset);
    },
    genre: async (_: any, args: CreateArgs) =>
      await genreService.findOneById(args.id),
  },
  Mutation: {
    createGenre: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      return await genreService.create(args, context.jwt);
    },
    deleteGenre: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      return await genreService.remove(args.id, context.jwt);
    },
    updateGenre: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      const { id } = args as CreateArgs;
      return await genreService.update(id, args, context.jwt);
    },
  },
};
