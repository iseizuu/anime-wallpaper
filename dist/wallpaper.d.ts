import { AnimeSource, dataImageFormat, hoyoResult, hoyolab, live2D, searchForWallhaven, searchOpt } from "./typing";
export declare class AnimeWallpaper {
    private client;
    constructor();
    /**
     * Universal search function for all websites
     *
     * this function will return an array of queried anime wallpapers
     *
     * @param {searchOpt | searchForWallhaven} options - The search options.
     * @param {AnimeSource} [source=AnimeSource.WallHaven] - The source to search from.
     * @returns {Promise<dataImageFormat[]>}
     */
    search(options: searchOpt | searchForWallhaven, source?: AnimeSource): Promise<dataImageFormat[]>;
    /**
     * Scrapes live2D images from moewalls.
     *
     * @param title the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    live2d(title: string): Promise<live2D[]>;
    /**
     * @deprecated
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
    hoyolab(params: hoyolab): Promise<hoyoResult>;
    /**
     * Retrieves images from Pinterest based on a search query.
     *
     * @param {string} query - The search query to use for retrieving images.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
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
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    private scrapeFromWallpapersDotCom;
    /**
     * Scraping images wallpaper from WallHaven
     *
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @param search.aiArt show the ai art included if user input true or false, default is false
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    private scrapeFromWallHaven;
    /**
    * Scraping images wallpaper from zerochan
    *
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
    */
    private scrapeFromZeroChan;
    /**
     * Scrapes live2D images from moewalls.
     *
     * @param search the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    private scrapeFromMoewall;
}
export { AnimeSource };
