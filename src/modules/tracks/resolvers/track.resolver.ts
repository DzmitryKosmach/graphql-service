import * as tracksService from "../services/track.service";

export const tracksResolver = {
  Query: {
    tracks: async () => await tracksService.findAll(),
  },
};

/* import {} from "";
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
