import req from "node-superfetch";
import userAgent from "random-useragent";
import cheerio from "cheerio";
import webUrl, { type } from "./config.json"
import WallError from "./utils/Error";
import { AnimeWall1, AnimeWall2, AnimeWall3, searchOpt, searchOpt2 } from "./typings";

export class AnimeWallpaper {
    public constructor() { }

    /**
     * Scraping images wallpaper from AlphaCoders
     * 
     * @param {Object}
     * @param {string} title.search the title of anime you want to search.
     * @param {string|number} title.page the page for image you want to search.
     * @returns {AnimeWall1}
     */
    public getAnimeWall1(title: searchOpt): Promise<AnimeWall1[]> {
        if (!title || !title.search) throw new WallError("title must be specified");
        else if (!title.page) title.page = 0;
        if (typeof title.page === "string") console.warn("Use number instead of a string on `page` options, this is will not be affected");
        return new Promise((resolve, reject) => {
            this._request(webUrl.alphaCoders, {
                search: encodeURIComponent(title.search),
                page: title.page as string
            })
                .then(x => {
                    const $ = cheerio.load(x);
                    const arr: AnimeWall1[] = [];
                    $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                        const title = $(elm).find("a").attr("title");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        const image = `https://${thumbnail?.split("/")[2]}/${thumbnail?.split("/")[3]}/${thumbnail?.split("/")[4].split("-")[2]}`
                        arr.push({ title, thumbnail, image } as AnimeWall1);
                    })
                    if (!arr.length) throw new WallError("No result found");
                    resolve(arr)
                })
                .catch(er => reject(er));
        });
    }

    /**
     * Scraping images wallpaper from WallpaperCave
     * 
     * @param title the title of anime that you want to search.
     * @returns {AnimeWall2}
     */
    public getAnimeWall2(title: string): Promise<AnimeWall2[]> {
        if (!title) throw new WallError("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.wallpaperCave}/search`, { q: title.split(" ").join("+") })
                .then(x => {
                    const $ = cheerio.load(x);
                    const arr: AnimeWall2[] = [];
                    const results: string[] = [];
                    $("#content #popular a").each((i, elm) => {
                        const title = $(elm).attr("href");
                        results.push(title as string);
                    });
                    const filteredRes = results.filter(x => !x.startsWith("/w/") && !x.startsWith("/latest-upload"));
                    if (!filteredRes.length) throw new WallError("No result found");
                    const random = filteredRes[Math.floor(Math.random() * filteredRes.length)]
                    this._request(`${webUrl.wallpaperCave}${random}`, {})
                        .then(res => {
                            const $$ = cheerio.load(res);
                            $$("#albumwp .wallpaper").each((i, elm) => {
                                const title = $(elm).find("a.wpinkw img").attr("alt");
                                const image = `${webUrl.wallpaperCave}${$(elm).find("a.wpinkw img").attr("src") as string}`;
                                arr.push({ title, image } as AnimeWall2);
                            })
                            resolve(arr)
                        })
                        .catch(er => reject(er));
                })
                .catch(er => reject(er));
        });
    }

    /**
     * Scraping images wallpaper from free4kWallpaper
     * 
     * this function will be return random anime wallpaper
     * 
     * @returns {AnimeWall2}
     */
    public getAnimeWall3(): Promise<AnimeWall2[]> {
        const random = Math.floor(Math.random() * 20) + 1;
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.free4kWallpaper}/anime-wallpapers`, { page: random as unknown as string })
                .then(x => {
                    const $ = cheerio.load(x);
                    const results: AnimeWall2[] = [];
                    $("#contents .container .row .cbody a img").each((i, elm) => {
                        const title = $(elm).attr("title") as string;
                        const image = `${webUrl.free4kWallpaper}/${$(elm).attr("data-src") as string}`;
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
     * @returns {AnimeWall3}
     */
    public getAnimeWall4(search: searchOpt2): Promise<AnimeWall3[]> {
        if (!search || !search.title) throw new WallError("title must be specified");
        else if (!search.type) search.type === "sfw";
        else if (!Object.keys(type).includes(search.type)) throw new WallError("Please input on of them 'sfw, sketchy, both'");
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.wallHaven}/search`, { q: search.title, page: search.page, purity: type[search.type] })
                .then(x => {
                    const $ = cheerio.load(x);
                    const results: AnimeWall3[] = [];
                    $(".thumb-listing-page ul li .thumb").each((i, elm) => {
                        let formatImg = ".jpg"
                        const isPng = $(elm).find(".thumb-info .png span").text();
                        if (isPng) formatImg = ".png";
                        const parseUrl = $(elm).find(".preview").attr("href");
                        const image = `https://w.wallhaven.cc/full/${parseUrl?.split("/").pop()?.split("").splice(0, 2).join("")}/wallhaven-${parseUrl?.split("/").pop()}${formatImg}`;
                        // console.log(image)
                        results.push({ image });
                    });
                    if (!results.length) throw new WallError("Images not found");
                    resolve(results);
                })
                .catch(er => reject(er));
        });

    }

    private _request(uri: string, options: Record<string, string>): Promise<string> {
        return new Promise((resolve, reject) => {
            void req.get(uri)
                .query(options).set({
                    "user-agent": userAgent.getRandom() as string
                })
                .then(x => resolve(x.text))
                .catch(er => reject(er));
        });
    }
}
