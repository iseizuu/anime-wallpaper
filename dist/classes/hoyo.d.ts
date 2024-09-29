import { hoyolabResult, hoyolabSearchQuery } from "../typing";
export default class Hoyolab {
    private client;
    constructor();
    /**
     * Retrieves the post list from Hoyolab.
     * @param {hoyolab} options - Options for retrieving the post list.
     * @returns {Promise<hoyoResult>} - A Promise that resolves to the hoyoResult object containing the post data.
     * @throws {AnimeWallError} - If result is empty or error.
     */
    getHoyoArt(options: hoyolabSearchQuery): Promise<hoyolabResult>;
}
