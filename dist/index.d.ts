import { dataImageFormat, searchOpt } from "./typings";
export declare enum AnimeSource {
    WallHaven = 2,
    ZeroChan = 3,
    Wallpapers = 4
}
export declare class AnimeWallpaper {
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
    search(options: searchOpt, source?: AnimeSource): Promise<dataImageFormat[]>;
    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @returns {dataImageFormat}
     */
    random(): Promise<dataImageFormat[]>;
    /**
     * Scraping images wallpaper from free4kWallpaper
     *
     * this function will be return random anime wallpaper
     *
     * @returns {dataImageFormat}
     */
    scrapeFrom4kWallpaper(): Promise<dataImageFormat[]>;
    /**
     * Scraping images wallpaper from Wallpapers.com
     *
     * @param search.title the title of the anime you want to search.
     * @returns {dataImageFormat}
     */
    scrapeFromWallpapersDotCom(search: searchOpt): Promise<dataImageFormat[]>;
    /**
     * Scraping images wallpaper from WallHaven
     *
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @returns {dataImageFormat}
     */
    scrapeFromWallHaven(search: searchOpt): Promise<dataImageFormat[]>;
    /**
    * Scraping images wallpaper from zerochan
    *
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat}
    */
    scrapeFromZeroChan(search: searchOpt): Promise<dataImageFormat[]>;
    private _request;
}
