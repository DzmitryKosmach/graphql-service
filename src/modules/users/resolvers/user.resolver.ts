import { userService } from "../services/user.service";

type CreateArgs = {
  id: string;
  email: string;
  password: string;
};

export const usersResolver = {
  Query: {
    jwt: async (_: any, args: CreateArgs) =>
      await userService.getJWT(args.email, args.password),
    user: async (_: any, args: CreateArgs) =>
      await userService.findOneById(args.id),
  },

  Mutation: {
    register: async (_: any, args: Object) => {
      return await userService.create(args);
    },    
  },
};
