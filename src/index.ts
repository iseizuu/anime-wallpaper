import req from "node-superfetch";
import userAgent from "random-useragent";
import cheerio from "cheerio";
import webUrl, { type } from "./config.json"
import WallError from "./utils/Error";
import { dataImageFormat, searchOpt } from "./typings";

export enum AnimeSource {
    WallHaven = 2,
    ZeroChan = 3
}


export class AnimeWallpaper {
    public constructor() { }

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
    public async search(options: searchOpt, source: AnimeSource = AnimeSource.WallHaven): Promise<dataImageFormat[]> {
        switch (source) {
            case AnimeSource.WallHaven:
                return await this.scrapeFromWallHaven(options);
            case AnimeSource.ZeroChan:
                return await this.scrapeFromZeroChan(options);
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
        return await this.scrapeFrom4kWallpaper();
    }

    /**
     * Scraping images wallpaper from free4kWallpaper
     * 
     * this function will be return random anime wallpaper
     * 
     * @returns {dataImageFormat}
     */
    private scrapeFrom4kWallpaper(): Promise<dataImageFormat[]> {
        const random = Math.floor(Math.random() * 20) + 1;
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.free4kWallpaper}/anime-wallpapers`, { page: random })
                .then(x => {
                    const $ = cheerio.load(x.text);
                    const results: dataImageFormat[] = [];
                    $("#contents .container .row .cbody a img").each((i, elm) => {
                        const title = $(elm).attr("title") as string;
                        const image = `${webUrl.free4kWallpaper}/${$(elm).attr("data-src")}`;
                        results.push({ title, image });
                    });
                    if (!results.length) throw new WallError("Images not found");
                    resolve(results);
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
     * @returns {dataImageFormat}
     */
    private scrapeFromWallHaven(search: searchOpt): Promise<dataImageFormat[]> {
        if (!search || !search.title) throw new WallError("title must be specified");
        else if (!search.type) search.type = "sfw";
        else if (!Object.keys(type).includes(search.type)) throw new WallError("Please input on of them 'sfw, sketchy, both'");

        return new Promise((resolve, reject) => {
            this._request(`${webUrl.wallHaven}/search`, { q: search.title, page: search.page, purity: type[search.type] })
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
            this._request(`${webUrl.zerochan}/${search.title}`, {})
                .then(x => {
                    const $ = cheerio.load(x.text);
                    const arr: dataImageFormat[] = [];
                    $("#wrapper #content ul li").each((i, elm) => {
                        const title = $(elm).find("a img").attr("alt") as string;
                        const thumbnail = $(elm).find("a img").attr("src") as string;
                        const image = $(elm).find("p a").attr("href") as string; //`https://static.zerochan.net/${title?.split(" ").join(".")}.full.${$(elm).find("a").attr("href")?.replace(/\//gi, "")}.jpg`
                        arr.push({ title, thumbnail, image });
                    });
                    resolve(arr.filter(data => data.title))
                })
                .catch(er => reject(er));
        });
    }

    private _request(uri: string, options: Record<never, string | number>): Promise<Response> {
        return new Promise((resolve, reject) => {
            void req.get(uri)
                .query(options)
                .set({
                    "user-agent": userAgent.getRandom() as string
                })
                .then(x => resolve(x as unknown as Response))
                .catch(er => reject(`Upss: ${er.message}`));
        });
    }
}
