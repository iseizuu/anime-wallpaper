import { hoyoApp, hoyoOptions, hoyoResult, hoyolab } from "./typings";
import Client from "./structure/client";
import AnimeWallError from "./utils/error";

export default class Hoyolab {
    private client = new Client();
    public constructor() {
    }

    /**
     * Retrieves the post list from Hoyolab.
     * @param {hoyolab} options - Options for retrieving the post list.
     * @returns {Promise<hoyoResult>} - A Promise that resolves to the hoyoResult object containing the post data.
     * @throws {AnimeWallError} - If result is empty or error.
     */
    public async getHoyoArt(options: hoyolab): Promise<hoyoResult> {
        if (!options.game) throw new AnimeWallError("Please provide the game you want to search");

        const game = hoyoApp[options.game];
        if (!Object.values(hoyoApp).includes(game)) throw new AnimeWallError("Please provide a valid game");
        let postType = hoyoOptions[options.postType];
        if (!Object.values(hoyoOptions).includes(postType)) postType = hoyoOptions.Trending;
        const url = this.client.decode("aHR0cHM6Ly9iYnMtYXBpLW9zLmhveW9sYWIuY29tL2NvbW11bml0eS9wYWludGVyL3dhcGkvY2hhbm5lbC9wb3N0L2xpc3Q=");

        return new Promise((resolve, reject) => {
            this.client.get.request(`${url}${postType}`, {
                gids: game,
                channel_id: this.client.config.channelID[game],
                page_size: 30
            })
                .then(x => {
                    const result = x.body as hoyoResult | null;
                    if (!result) throw new AnimeWallError("Request Failed!");
                    if (!result.data.list) throw new AnimeWallError("Request is successful but no post found, please check the example request in the README.md");
                    resolve(result);
                })
                .catch(er => reject(new AnimeWallError(er)));
        });
    }
}


