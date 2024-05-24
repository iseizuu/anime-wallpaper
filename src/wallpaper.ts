import cheerio from "cheerio";
import webUrl, { type } from "./config.json"
import WallError from "./utils/error";
import { AnimeSource, dataImageFormat, hoyoResult, hoyolab, searchForWallhaven, searchOpt } from "./typings";
import Client from "./structure/client";
import Hoyolab from "./hoyo";

export class AnimeWallpaper {
    private client = new Client()
    private hoyo = new Hoyolab()
    public constructor() {
    }


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
    public async search(options: searchOpt | searchForWallhaven, source: AnimeSource = AnimeSource.WallHaven): Promise<dataImageFormat[]> {
        switch (source) {
            case AnimeSource.WallHaven:
                return await this.scrapeFromWallHaven(options as searchForWallhaven);
            case AnimeSource.ZeroChan:
                return await this.scrapeFromZeroChan(options as searchOpt);
            case AnimeSource.Wallpapers:
                return await this.scrapeFromWallpapersDotCom(options as searchOpt)
        }
    }

    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     * 
     * This function will return an array of random Wallpapers
     * 
     * @returns {dataImageFormat}
     */
    public async random(): Promise<dataImageFormat[]> {
        return await this.scrapeRandomWallpaper();
    }

    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolab} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyoResult>} - A promise that resolves to the result of the request.
     */
    public async Hoyolab(params: hoyolab): Promise<hoyoResult> {
        return await this.hoyo.getHoyoArt(params);
    }

    /**
     * Scrapes a random anime wallpaper from free4kWallpaper.
     *
     * @returns {Promise<dataImageFormat[]>} An array of dataImageFormat objects.
     */
    private async scrapeRandomWallpaper(): Promise<dataImageFormat[]> {
        const randomPage = Math.floor(Math.random() * 20) + 1;
        const response = await this.client.get.request(`${webUrl.free4kWallpaper}/anime-wallpapers`, { page: `${randomPage}` });
        const $ = cheerio.load(response.text);

        const wallpapers: dataImageFormat[] = [];
        $("#contents .container .row .cbody a img").each((i, elm) => {
            const title = $(elm).attr("title") as string;
            const imageUrl = `${webUrl.free4kWallpaper}/${$(elm).attr("data-src")}`;
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
     * @returns {dataImageFormat}
     */
    private scrapeFromWallpapersDotCom(search: searchOpt): Promise<dataImageFormat[]> {
        if (!search || !search.title) throw new WallError("title must be specified");

        return new Promise((resolve, reject) => {
            this.client.get.request(`${webUrl.wallpapers}/search/${search.title}`, {})
                .then(x => {
                    const $ = cheerio.load(x.text);
                    const results: dataImageFormat[] = [];
                    $(".tab-content ul.kw-contents li").each((i, elm) => {
                        const title = $(elm).find(" figure").data("title");
                        const thumbnail = $(elm).find(" a").attr("href")
                        const image = `${webUrl.wallpapers}/downloads/high/${$(elm).find("figure").data("key")}.png`
                        results.push({ title, thumbnail, image });
                    });
                    const filteredImage = results.filter(e => { return e.title?.length !== undefined })
                    if (!filteredImage.length) throw new WallError("Image data is empty or can't find the images");
                    else resolve(filteredImage);
                })
                .catch(er => reject(er));
        });
    }

    /**
     * Scraping images wallpaper from WallHaven
     * 
     * @param search.title the title of the anime you want to search.
     * @param search.type the type or purity of image sfw or sketchy image or even both.
     * @param search.page the page for image you want to search, default is 1
     * @param search.aiArt show the ai art included if user input true or false, default is false
     * @returns {dataImageFormat}
     */
    private scrapeFromWallHaven(search: searchForWallhaven): Promise<dataImageFormat[]> {
        if (!search || !search.title) throw new WallError("title must be specified");
        else if (!search.type) search.type = "sfw";
        else if (!Object.keys(type).includes(search.type)) throw new WallError("Please input on of them 'sfw, sketchy, both'");

        return new Promise((resolve, reject) => {
            this.client.get.request(`${webUrl.wallHaven}/search`, { q: search.title, page: search.page, purity: type[search.type], ai_art_filter: !search.aiArt ? 1 : 0 })
                .then(x => {
                    const $ = cheerio.load(x.text);
                    const results: dataImageFormat[] = [];
                    $(".thumb-listing-page ul li .thumb").each((i, elm) => {
                        let formatImg = ".jpg"
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
                .catch(er => reject(er));
        });

    }

    /**
    * Scraping images wallpaper from zerochan
    * 
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat}
    */
    private scrapeFromZeroChan(search: searchOpt): Promise<dataImageFormat[]> {
        if (!search.title) throw new WallError("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${webUrl.zerochan}/${search.title}`, {})
                .then(x => {
                    console.log(x.url)
                    const $ = cheerio.load(x.text);
                    const arr: dataImageFormat[] = [];
                    $("#wrapper #content ul li").each((i, elm) => {
                        const title = $(elm).find("a img").attr("alt") as string;
                        const image = $(elm).find("p a").attr("href") as string;
                        const thumbnail = `https://s1.zerochan.net/${$(elm).find("p a").attr("href")?.replace(/https:\/\/static.zerochan.net/g, "") as string}.600.${$(elm).find("a").attr("href")?.replace(/\//g, "")}.jpg`;
                        arr.push({ title, thumbnail, image });
                    });
                    resolve(arr.filter(data => data.title))
                })
                .catch(er => reject(er));
        });
    }
}

export { AnimeSource };

