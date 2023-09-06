import req, { AxiosResponse } from "axios";
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
<<<<<<< Updated upstream
    public async search(options: searchOpt, source: AnimeSource = AnimeSource.WallHaven): Promise<dataImageFormat[]> {
        switch (source) {
            case AnimeSource.WallHaven:
                return await this.scrapeFromWallHaven(options);
            case AnimeSource.ZeroChan:
                return await this.scrapeFromZeroChan(options);
        }
=======
    public getAnimeWall1(title: searchOpt): Promise<dataImageFormat1[]> {
        if (!title || !title.search) throw new WallError("title must be specified");
        else if (!title.page) title.page = 0;
        if (typeof title.page === "string") console.warn("Use number instead of a string on `page` options, this is will not be affected");
        return new Promise((resolve, reject) => {
            this._request(webUrl.alphaCoders, { search: encodeURIComponent(title.search), page: title.page })
                .then(data => {
                    const $ = cheerio.load(data.data);
                    const arr: dataImageFormat1[] = [];
                    $("#big_container .page_container .thumb-container").each((i, elm) => {
                        const title = $(elm).find("img").attr("alt");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        const image = $(elm).find("img").attr("src")?.replace(/thumbbig-/g, "")
                        arr.push({ title, thumbnail, image } as dataImageFormat1);
                    })
                    if (!arr.length) throw new WallError("No result found");
                    resolve(arr)
                })
                .catch(er => reject(er));
        })
>>>>>>> Stashed changes
    }

    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     * 
     * This function will return an array of random Wallpapers
     * 
     * @returns {dataImageFormat}
     */
<<<<<<< Updated upstream
    public async random(): Promise<dataImageFormat[]> {
        return await this.scrapeFrom4kWallpaper();
=======
    private getAnimeWall2(title: string): Promise<dataImageFormat2[]> {
        if (!title) throw new WallError("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.wallpaperCave}/search`, { q: title.split(" ").join("+") })
                .then(x => {
                    const $ = cheerio.load(x.data);
                    const arr: dataImageFormat2[] = [];
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
                            const $$ = cheerio.load(res.data);
                            $$("#albumwp .wallpaper").each((i, elm) => {
                                const title = $$(elm).find("a.wpinkw img").attr("alt");
                                const image = `${webUrl.wallpaperCave}${$$(elm).find("a.wpinkw img").attr("src")}`;
                                arr.push({ title, image } as dataImageFormat2);
                            })
                            resolve(arr)
                        })
                        .catch(er => reject(er));
                })
                .catch(er => reject(er));
        });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    const $ = cheerio.load(x.text);
                    const results: dataImageFormat[] = [];
=======
                    const $ = cheerio.load(x.data);
                    const results: dataImageFormat2[] = [];
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    const $ = cheerio.load(x.text);
                    const results: dataImageFormat[] = [];
=======
                    const $ = cheerio.load(x.data);
                    const results: dataImageFormat3[] = [];
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
      * Scraping images wallpaper from zerochan
      * 
      * @param title the title of anime that you want to search.
      * @returns {dataImageFormat2}
      */
    public getAnimeWall5(title: string): Promise<dataImageFormat1[]> {
        if (!title) throw new WallError("title must be specified");
>>>>>>> Stashed changes
        return new Promise((resolve, reject) => {
            this._request(`${webUrl.zerochan}/${title}`, {})
                .then(x => {
                    const $ = cheerio.load(x.data);
                    const arr: dataImageFormat1[] = [];
                    $("#wrapper #content ul li").each((i, elm) => {
                        const title = $(elm).find("a img").attr("alt") as string;
                        const thumbnail = $(elm).find("a img").attr("src") as string;
                        const image = $(elm).find("p a").attr("href") as string; //`https://static.zerochan.net/${title?.split(" ").join(".")}.full.${$(elm).find("a").attr("href")?.replace(/\//gi, "")}.jpg`
                        arr.push({ title, thumbnail, image });
                    });
                    resolve(arr.filter(data => data.title))
                })
<<<<<<< Updated upstream
                .then(x => resolve(x as unknown as Response))
                .catch((e: Error) => reject(`Upss: ${e.message}`));
=======
                .catch(er => reject(er));
        });
    }

    private _request(uri: string, options: Record<never, string | number>): Promise<AxiosResponse> {
        return new Promise((resolve, reject) => {
            void req.create({
                headers: {
                    
                        
                    "Accept-Encoding": "gzip, deflate, br"
                    
                }
            })
                .get(uri, { params: options })
                .then(x => resolve(x))
                .catch((er: Error) => reject(`Upss: ${er.message}`));
>>>>>>> Stashed changes
        });
    }
}
