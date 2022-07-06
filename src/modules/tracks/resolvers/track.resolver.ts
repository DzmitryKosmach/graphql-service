import { trackService } from "../services/track.service";
import { artistService } from "../../artists/services/artist.service";
import { bandService } from "../../bands/services/band.service";
import { genreService } from "../../genres/services/genre.service";
import { albumService } from "../../albums/services/album.service";

type CreateArgs = {
  id: string;
};

type Context = {
  jwt: string;
};

export const tracksResolver = {
  Query: {
    tracks: async () => {
      return await trackService.findAll();
    },
    track: async (_: any, args: CreateArgs) =>
      await trackService.findOneById(args.id),
  },

  Track: {
    async bands(parent: { bandsIds: string[] }) {
      const { bandsIds } = parent;
      if (!bandsIds) return null;
      return await Promise.all(
        bandsIds.map((id: string) => {
          return bandService.findOneById(id);
        })
      );
    },

    async album(parent: { albumId: string }) {
      const { albumId } = parent;
      if (!albumId) return null;
      console.log("Track.album: start");
      return albumService.findOneById(albumId);
    },

    async artists(parent: { artistsIds: string[] }) {
      const { artistsIds } = parent;
      if (!artistsIds) return null;
      return await Promise.all(
        artistsIds.map((id: string) => {
          console.log("Track.artists: start");
          return artistService.findOneById(id);
        })
      );
    },

    async genres(parent: { genresIds: string[] }) {
      const { genresIds } = parent;
      if (!genresIds) return null;
      return await Promise.all(
        genresIds.map((id: string) => {
          console.log("Track.genres: start");
          return genreService.findOneById(id);
        })
      );
    },
  },

  Mutation: {
    createTrack: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      return await trackService.create(args, context.jwt);
    },
    deleteTrack: async (_: any, args: CreateArgs, context: Context) => {
      if (!context.jwt) return null;
      return await trackService.remove(args.id, context.jwt);
    },
    updateTrack: async (_: any, args: Object, context: Context) => {
      if (!context.jwt) return null;
      const { id } = args as CreateArgs;
      return await trackService.update(id, args, context.jwt);
    },
  },
};

/* //import {Resolver} from "graphql";
import { TracksService } from "../services/tacks.service";
import { GenresService } from "../../genres/services/genres.service";
import { ArtistsService } from "../../artists/services/artists.service";
import { BandsService } from "../../bands/services/bands.service";
import { resolveReadonlyArrayThunk } from "graphql";

@Resolver('Track')
export class TracksResolver {
    constructor(
        private readonly tracksService: TracksService,
        private readonly bandsService: BandsService,
        private readonly artistsService: ArtistsService,
        private readonly genresService: GenresService,
    )

    @Query()
    async track(@Args ('id') id:syting) {
        return this.tracksService.findOneById(id);
    }

    @Query()
    async tracks() {
        return this.tracksService.findAll();
    }

    @Resolver()
    @ResolveField()
    async bands(@Parent() track) {
        const {bandsIds} = track;
        return await Promise.all(bandsIds.map id => {
            return this.bandsService.findOneById(id);
        })
    }
} */
