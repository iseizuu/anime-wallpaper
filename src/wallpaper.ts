import * as cheerio from "cheerio";
import WallError from "./utils/error";
import { AnimeSource, dataImageFormat, hoyoResult, hoyolab, live2D, searchForWallhaven, searchOpt } from "./typing";
import Client from "./structure/client";

export class AnimeWallpaper {
    private client = new Client();
    public constructor() {
    }

    /**
     * Universal search function for all websites
     * 
     * this function will return an array of queried anime wallpapers
     * 
     * @param {searchOpt | searchForWallhaven} options - The search options.
     * @param {AnimeSource} [source=AnimeSource.WallHaven] - The source to search from.
     * @returns {Promise<dataImageFormat[]>}
     */
    public async search(options: searchOpt | searchForWallhaven, source: AnimeSource = AnimeSource.WallHaven): Promise<dataImageFormat[]> {
        switch (source) {
        case AnimeSource.WallHaven:
            return await this.scrapeFromWallHaven(options as searchForWallhaven);
        case AnimeSource.ZeroChan:
            return await this.scrapeFromZeroChan(options as searchOpt);
        case AnimeSource.Wallpapers:
            return await this.scrapeFromWallpapersDotCom(options as searchOpt);
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
     * @deprecated
     * Scrapes 4kWallpaper for a random Wallpaper
     * 
     * This function will return an array of random Wallpapers
     * 
     * @returns {dataImageFormat}
     */
    public async random(): Promise<dataImageFormat[]> {
        console.warn("The 'random' method is deprecated. Please use 'search' method instead.");
        return await this.scrapeRandomWallpaper();
    }

    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolab} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyoResult>} - A promise that resolves to the result of the request.
     */
    public async hoyolab(params: hoyolab): Promise<hoyoResult> {
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
                this.client.config.pinterest, { autologin: true, q: query },
                "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0")
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
     * Scrapes a random anime wallpaper from free4kWallpaper.
     *
     * @returns {Promise<dataImageFormat[]>} An array of dataImageFormat objects.
     */
    private async scrapeRandomWallpaper(): Promise<dataImageFormat[]> {
        const randomPage = Math.floor(Math.random() * 20) + 1;
        const response: { data: string } = await this.client.get.request(`${this.client.config.free4kWallpaper}/anime-wallpapers`, { page: `${randomPage}` });
        const $ = cheerio.load(response.data);

        const wallpapers: dataImageFormat[] = [];
        $("#contents .container .row .cbody a img").each((i, elm) => {
            const title = $(elm).attr("title") as string;
            const imageUrl = `${this.client.config.free4kWallpaper}/${$(elm).attr("data-src")}`;
            wallpapers.push({ title, image: imageUrl });
        });

        if (!wallpapers.length) {
            throw new WallError("No images found");
        }
        return wallpapers;
    }

    /**
     * Scraping images wallpaper from Wallpapers.com
     * 
     * @param search.title the title of the anime you want to search.
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    private scrapeFromWallpapersDotCom(search: searchOpt): Promise<dataImageFormat[]> {
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
    private scrapeFromZeroChan(search: searchOpt): Promise<dataImageFormat[]> {
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
    }}

export { AnimeSource };
