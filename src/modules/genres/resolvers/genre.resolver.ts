//import { GraphQLArgs } from "graphql";
import * as genreService from "../services/genre.service";

type CreateArgs = {
  id: string;
};

export const genresResolver = {
  Query: {
    genres: async () => await genreService.findAll(),
    genre: async (_: any, args: CreateArgs) =>
      await genreService.findOneById(args.id),
  },
};
