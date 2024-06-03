import { AnimeSource, dataImageFormat, hoyoResult, hoyolab, searchForWallhaven, searchOpt } from "./typings";
export declare class AnimeWallpaper {
    private client;
    private hoyo;
    constructor();
    /**
     * Universal search function for all websites
     *
     * this function will return an array of queried anime wallpapers
     *
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @returns {dataImageFormat}
     */
    search(options: searchOpt | searchForWallhaven, source?: AnimeSource): Promise<dataImageFormat[]>;
    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @returns {dataImageFormat}
     */
    random(): Promise<dataImageFormat[]>;
    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolab} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyoResult>} - A promise that resolves to the result of the request.
     */
    Hoyolab(params: hoyolab): Promise<hoyoResult>;
    /**
     * Retrieves anime wallpapers from Pinterest based on a search query.
     *
     * @param {string} query - The search query for the wallpapers.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects.
     * @throws {WallError} - If the search query is not provided.
     */
    pinterest(query: string): Promise<dataImageFormat[]>;
    /**
     * Scrapes a random anime wallpaper from free4kWallpaper.
     *
     * @returns {Promise<dataImageFormat[]>} An array of dataImageFormat objects.
     */
    private scrapeRandomWallpaper;
    /**
     * Scraping images wallpaper from Wallpapers.com
     *
     * @param search.title the title of the anime you want to search.
     * @returns {dataImageFormat}
     */
    private scrapeFromWallpapersDotCom;
    /**
     * Scraping images wallpaper from WallHaven
     *
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @param search.aiArt show the ai art included if user input true or false, default is false
     * @returns {dataImageFormat}
     */
    private scrapeFromWallHaven;
    /**
    * Scraping images wallpaper from zerochan
    *
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat}
    */
    private scrapeFromZeroChan;
}
export { AnimeSource };
