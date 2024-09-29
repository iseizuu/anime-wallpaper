import * as cheerio from "cheerio";
import WallError from "../utils/error";
import { AnimeSource, dataImageFormat, hoyolabResult, hoyolabSearchQuery, live2D, resolutionList, searchForWallhaven, searchOptions } from "../typing";
import Client from "../structure/client";
import { desktopResolution } from "../config";

export class AnimeWallpaper {
    private client = new Client();
    public constructor() {
    }

    /**
     * Universal search function for all websites
     * 
     * this function will return an array of queried anime wallpapers
     * 
     * @param {searchOptions | searchForWallhaven} options - The search options.
     * @param {AnimeSource} [source=AnimeSource.WallHaven] - The source to search from.
     * @returns {Promise<dataImageFormat[]>}
     */
    public async search(options: searchOptions | searchForWallhaven, source: AnimeSource = AnimeSource.WallHaven): Promise<dataImageFormat[]> {
        switch (source) {
        case AnimeSource.WallHaven:
            return await this.scrapeFromWallHaven(options as searchForWallhaven);
        case AnimeSource.ZeroChan:
            return await this.scrapeFromZeroChan(options as searchOptions);
        case AnimeSource.Wallpapers:
            return await this.scrapeFromWallpapersDotCom(options as searchOptions);
        }
    }

    /**
     * Scrapes live2D images from moewalls.
     * 
     * @param title the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    public async live2d(title: string): Promise<live2D[]> {
        return await this.scrapeFromMoewall(title);
    }

    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     * 
     * This function will return an array of random Wallpapers
     * 
     * @param {resolutionList} [resolution] - The resolution to use for scrapping.
     * @returns {Promise<dataImageFormat[]>}
     */
    public async random(resolution?: resolutionList): Promise<dataImageFormat[]> {
        return await this.scrapeHdqWallpaper(resolution);
    }

    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolabSearchQuery} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyolabResult>} - A promise that resolves to the result of the request.
     */
    public async hoyolab(params: hoyolabSearchQuery): Promise<hoyolabResult> {
        return await this.client.mihoyo(params);
    }

    /**
     * Retrieves images from Pinterest based on a search query.
     *
     * @param {string} query - The search query to use for retrieving images.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    public async pinterest(query: string): Promise<dataImageFormat[]> {
        if (!query) throw new WallError("Please provide a search query");

        return new Promise((resolve, reject) => {
            this.client.get.request(
                this.client.config.pinterest, { autologin: true, q: query }, this.client.config.cookie)
                .then(x => {
                    const results: dataImageFormat[] = [];
                    const $ = cheerio.load(x.data as string);
                    $("img").each((i, elm) => {
                        const title = $(elm).attr("alt")?.length === 0
                            ? `Anime-Wallpaper: Title for ${query} isn't loaded`
                            : $(elm).attr("alt");
                        const thumbnail = $(elm).attr("src")
                            ?.replace(/https:\/\/i\.pinimg\.com\/[^/]+\//, "https://i.pinimg.com/736x/");
                        const image = thumbnail
                            ?.replace(/https:\/\/i\.pinimg\.com\/[^/]+\//, "https://i.pinimg.com/originals/");
                        results.push({ title, thumbnail, image });
                    });
                    if (!results.length) throw new WallError("No images found");
                    return resolve(results);
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });
    }

    /**
     * Scraping images wallpaper from Wallpapers.com
     * 
     * @param search.title the title of the anime you want to search.
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    private scrapeFromWallpapersDotCom(search: searchOptions): Promise<dataImageFormat[]> {
        if (!search || !search.title) throw new WallError("title must be specified");

        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.wallpapers}/search/${search.title}`, {})
                .then((x: { data: string }) => {
                    const $ = cheerio.load(x.data);
                    const results: dataImageFormat[] = [];
                    $(".tab-content ul.kw-contents li").each((i, elm) => {
                        const title = $(elm).find(" figure").data("title") as string;
                        const thumbnail = $(elm).find(" a").attr("href");
                        const image = `${this.client.config.wallpapers}/downloads/high/${$(elm).find("figure").data("key") as string}.png`;
                        results.push({ title, thumbnail, image });
                    });
                    const filteredImage = results.filter(e => { return e.title?.length !== undefined; });
                    if (!filteredImage.length) throw new WallError("Image data is empty or can't find the images");
                    else resolve(filteredImage);
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });
    }

    /**
     * Scraping images wallpaper from WallHaven
     * 
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @param search.aiArt show the ai art included if user input true or false, default is false
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    private scrapeFromWallHaven(search: searchForWallhaven): Promise<dataImageFormat[]> {
        if (!search || !search.title) throw new WallError("title must be specified");
        else if (!search.type) search.type = "sfw";
        else if (!Object.keys(this.client.config.type).includes(search.type)) throw new WallError("Please input on of them 'sfw, sketchy, both'");

        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.wallHaven}/search`, {
                q: search.title, page: search.page, purity: this.client.config.type[search.type], ai_art_filter: !search.aiArt ? 1 : 0
            })
                .then((x: { data: string }) => {
                    const $ = cheerio.load(x.data);
                    const results: dataImageFormat[] = [];
                    $(".thumb-listing-page ul li .thumb").each((i, elm) => {
                        let formatImg = ".jpg";
                        const isPng = $(elm).find(".thumb-info .png span").text();
                        if (isPng) formatImg = ".png";
                        const parseUrl = $(elm).find(".preview").attr("href");
                        const image = `https://w.wallhaven.cc/full/${parseUrl?.split("/").pop()?.split("").splice(0, 2).join("")}/wallhaven-${parseUrl?.split("/").pop()}${formatImg}`;
                        results.push({ image });
                    });
                    if (!results.length) throw new WallError("Images not found");
                    console.log(`Wallhaven: Ai Art is: ${search.aiArt ? "enabled" : "disabled"}`);
                    resolve(results);
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });

    }

    /**
    * Scraping images wallpaper from zerochan
    * 
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
    */
    private scrapeFromZeroChan(search: searchOptions): Promise<dataImageFormat[]> {
        if (!search.title) throw new WallError("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.zerochan}/${search.title}`, {})
                .then((x: { data: string }) => {
                    const $ = cheerio.load(x.data);
                    const arr: dataImageFormat[] = [];
                    $("#wrapper #content ul li").each((i, elm) => {
                        const title = $(elm).find("a img").attr("alt") as string;
                        const image = $(elm).find("p a").attr("href") as string;
                        const thumbnail = `https://s1.zerochan.net/${$(elm).find("p a").attr("href")?.replace(/https:\/\/static.zerochan.net/g, "") as string}.600.${$(elm).find("a").attr("href")?.replace(/\//g, "")}.jpg`;
                        arr.push({ title, thumbnail, image });
                    });
                    resolve(arr.filter(data => data.title));
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });
    }

    /**
     * Scrapes live2D images from moewalls.
     * 
     * @param search the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    private scrapeFromMoewall(search?: string): Promise<live2D[]> {
        if (!search) console.log("[Anime Wallpaper] search is empty, showing random images");
        const regex = /\/(\d{4})\/\d{2}\/([a-z0-9-]+)-thumb/;
        return new Promise((resolve, reject) => {
            this.client.get.request(!search ? `${this.client.config.moewall}` : this.client.config.moewall, { s: search })
                .then((x: { data: string }) => {
                    const $ = cheerio.load(x.data);
                    const arr: live2D[] = [];
                    $("#primary ul li").each((i, elm) => {
                        const title = $(elm).find("a").attr("title");
                        const url = $(elm).find("a").attr("href");
                        const thumbnail = $(elm).find("img").attr("src") as string;
                        const video = `https://static.moewalls.com/videos/preview/${regex.exec(thumbnail)?.[1]}/${regex.exec(thumbnail)?.[2]}-preview.mp4`;
                        arr.push({ title, thumbnail, video, url });
                    });
                    resolve(arr.filter(res => res.title));
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });
    }

    /**
     * Scrapes images from hdqwalls.com
     * @param resolution Resolutions of image that you want to search.
     * @returns {Promise<dataImageFormat[]>} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    private scrapeHdqWallpaper(resolution?: resolutionList): Promise<dataImageFormat[]> {
        if (!resolution) resolution = { resolutions: "0" };
        const resolutionLength = this.client.config.resolution[resolution.resolutions] || this.client.config.resolution["0"];
        const page = Math.floor(Math.random() * resolutionLength);
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.hdqwall}/${resolution.resolutions == "0" ? "" : resolution.resolutions}/page/${page}`, {})
                .then((x: { data: string }) => {
                    const $ = cheerio.load(x.data);
                    const arr: dataImageFormat[] = [];
                    $("img.thumbnail").each((i, elm) => {
                        const title = $(elm).attr("alt");
                        const thumbnail = $(elm).attr("src");
                        const image = desktopResolution.includes(resolution.resolutions)
                            ? $(elm).attr("src")!.replace("/thumb", "")
                            : $(elm).attr("src");
                        arr.push({ title, thumbnail, image });
                    });
                    resolve(arr);
                })
                .catch((er: Error) => reject(new WallError(er.message)));
        });
    }
}

export { AnimeSource };
