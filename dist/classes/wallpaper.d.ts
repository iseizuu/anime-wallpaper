import { AnimeSource, dataImageFormat, hoyolabResult, hoyolabSearchQuery, live2D, resolutionList, searchForWallhaven, searchOptions } from "../typing";
export declare class AnimeWallpaper {
    private client;
    constructor();
    /**
     * Universal search function for all websites
     *
     * this function will return an array of queried anime wallpapers
     *
     * @param {searchOptions | searchForWallhaven} options - The search options.
     * @param {AnimeSource} [source=AnimeSource.WallHaven] - The source to search from.
     * @returns {Promise<dataImageFormat[]>}
     */
    search(options: searchOptions | searchForWallhaven, source?: AnimeSource): Promise<dataImageFormat[]>;
    /**
     * Scrapes live2D images from moewalls.
     *
     * @param title the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    live2d(title: string): Promise<live2D[]>;
    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @param {resolutionList} [resolution] - The resolution to use for scrapping.
     * @returns {Promise<dataImageFormat[]>}
     */
    random(resolution?: resolutionList): Promise<dataImageFormat[]>;
    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolabSearchQuery} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyolabResult>} - A promise that resolves to the result of the request.
     */
    hoyolab(params: hoyolabSearchQuery): Promise<hoyolabResult>;
    /**
     * Retrieves images from Pinterest based on a search query.
     *
     * @param {string} query - The search query to use for retrieving images.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    pinterest(query: string): Promise<dataImageFormat[]>;
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
    /**
     * Scrapes images from hdqwalls.com
     * @param resolution Resolutions of image that you want to search.
     * @returns {Promise<dataImageFormat[]>} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    private scrapeHdqWallpaper;
}
export { AnimeSource };
