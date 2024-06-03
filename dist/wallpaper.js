"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeSource = exports.AnimeWallpaper = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const error_1 = __importDefault(require("./utils/error"));
const typings_1 = require("./typings");
Object.defineProperty(exports, "AnimeSource", { enumerable: true, get: function () { return typings_1.AnimeSource; } });
const client_1 = __importDefault(require("./structure/client"));
const hoyo_1 = __importDefault(require("./hoyo"));
class AnimeWallpaper {
    constructor() {
        this.client = new client_1.default();
        this.hoyo = new hoyo_1.default();
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
    search(options, source = typings_1.AnimeSource.WallHaven) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (source) {
                case typings_1.AnimeSource.WallHaven:
                    return yield this.scrapeFromWallHaven(options);
                case typings_1.AnimeSource.ZeroChan:
                    return yield this.scrapeFromZeroChan(options);
                case typings_1.AnimeSource.Wallpapers:
                    return yield this.scrapeFromWallpapersDotCom(options);
            }
        });
    }
    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @returns {dataImageFormat}
     */
    random() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scrapeRandomWallpaper();
        });
    }
    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolab} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyoResult>} - A promise that resolves to the result of the request.
     */
    Hoyolab(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.mihoyo().getHoyoArt(params);
        });
    }
    /**
     * Retrieves anime wallpapers from Pinterest based on a search query.
     *
     * @param {string} query - The search query for the wallpapers.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects.
     * @throws {WallError} - If the search query is not provided.
     */
    pinterest(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new error_1.default("Please provide a search query");
            return new Promise((resolve, reject) => {
                this.client.get.request(this.client.config.pinterest, {
                    autologin: true, q: query
                })
                    .then(x => {
                    const results = [];
                    const $ = cheerio_1.default.load(x.text);
                    $("img").each((i, elm) => {
                        var _a, _b;
                        const title = ((_a = $(elm).attr("alt")) === null || _a === void 0 ? void 0 : _a.length) === 0
                            ? `Anime-Wallpaper: Title for ${query} isn't loaded`
                            : $(elm).attr("alt");
                        const thumbnail = (_b = $(elm).attr("src")) === null || _b === void 0 ? void 0 : _b.replace(/https:\/\/i\.pinimg\.com\/[^/]+\//, "https://i.pinimg.com/736x/");
                        const image = thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.replace(/https:\/\/i\.pinimg\.com\/[^/]+\//, "https://i.pinimg.com/originals/");
                        results.push({ title, thumbnail, image });
                    });
                    if (!results.length)
                        throw new error_1.default("No images found");
                    return resolve(results);
                })
                    .catch(er => reject(new error_1.default(er)));
            });
        });
    }
    /**
     * Scrapes a random anime wallpaper from free4kWallpaper.
     *
     * @returns {Promise<dataImageFormat[]>} An array of dataImageFormat objects.
     */
    scrapeRandomWallpaper() {
        return __awaiter(this, void 0, void 0, function* () {
            const randomPage = Math.floor(Math.random() * 20) + 1;
            const response = yield this.client.get.request(`${this.client.config.free4kWallpaper}/anime-wallpapers`, { page: `${randomPage}` });
            const $ = cheerio_1.default.load(response.text);
            const wallpapers = [];
            $("#contents .container .row .cbody a img").each((i, elm) => {
                const title = $(elm).attr("title");
                const imageUrl = `${this.client.config.free4kWallpaper}/${$(elm).attr("data-src")}`;
                wallpapers.push({ title, image: imageUrl });
            });
            if (!wallpapers.length) {
                throw new error_1.default("No images found");
            }
            return wallpapers;
        });
    }
    /**
     * Scraping images wallpaper from Wallpapers.com
     *
     * @param search.title the title of the anime you want to search.
     * @returns {dataImageFormat}
     */
    scrapeFromWallpapersDotCom(search) {
        if (!search || !search.title)
            throw new error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.wallpapers}/search/${search.title}`, {})
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const results = [];
                $(".tab-content ul.kw-contents li").each((i, elm) => {
                    const title = $(elm).find(" figure").data("title");
                    const thumbnail = $(elm).find(" a").attr("href");
                    const image = `${this.client.config.wallpapers}/downloads/high/${$(elm).find("figure").data("key")}.png`;
                    results.push({ title, thumbnail, image });
                });
                const filteredImage = results.filter(e => { var _a; return ((_a = e.title) === null || _a === void 0 ? void 0 : _a.length) !== undefined; });
                if (!filteredImage.length)
                    throw new error_1.default("Image data is empty or can't find the images");
                else
                    resolve(filteredImage);
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
    scrapeFromWallHaven(search) {
        if (!search || !search.title)
            throw new error_1.default("title must be specified");
        else if (!search.type)
            search.type = "sfw";
        else if (!Object.keys(this.client.config.type).includes(search.type))
            throw new error_1.default("Please input on of them 'sfw, sketchy, both'");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.wallHaven}/search`, {
                q: search.title, page: search.page, purity: this.client.config.type[search.type], ai_art_filter: !search.aiArt ? 1 : 0
            })
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const results = [];
                $(".thumb-listing-page ul li .thumb").each((i, elm) => {
                    var _a;
                    let formatImg = ".jpg";
                    const isPng = $(elm).find(".thumb-info .png span").text();
                    if (isPng)
                        formatImg = ".png";
                    const parseUrl = $(elm).find(".preview").attr("href");
                    const image = `https://w.wallhaven.cc/full/${(_a = parseUrl === null || parseUrl === void 0 ? void 0 : parseUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split("").splice(0, 2).join("")}/wallhaven-${parseUrl === null || parseUrl === void 0 ? void 0 : parseUrl.split("/").pop()}${formatImg}`;
                    results.push({ image });
                });
                if (!results.length)
                    throw new error_1.default("Images not found");
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
    scrapeFromZeroChan(search) {
        if (!search.title)
            throw new error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.zerochan}/${search.title}`, {})
                .then(x => {
                console.log(x.url);
                const $ = cheerio_1.default.load(x.text);
                const arr = [];
                $("#wrapper #content ul li").each((i, elm) => {
                    var _a, _b;
                    const title = $(elm).find("a img").attr("alt");
                    const image = $(elm).find("p a").attr("href");
                    const thumbnail = `https://s1.zerochan.net/${(_a = $(elm).find("p a").attr("href")) === null || _a === void 0 ? void 0 : _a.replace(/https:\/\/static.zerochan.net/g, "")}.600.${(_b = $(elm).find("a").attr("href")) === null || _b === void 0 ? void 0 : _b.replace(/\//g, "")}.jpg`;
                    arr.push({ title, thumbnail, image });
                });
                resolve(arr.filter(data => data.title));
            })
                .catch(er => reject(er));
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbHBhcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxwYXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMERBQXNDO0FBQ3RDLHVDQUE2RztBQTBNcEcsNEZBMU1BLHFCQUFXLE9BME1BO0FBek1wQixnRUFBd0M7QUFDeEMsa0RBQTZCO0FBRTdCLE1BQWEsY0FBYztJQUd2QjtRQUZRLFdBQU0sR0FBRyxJQUFJLGdCQUFNLEVBQUUsQ0FBQztRQUN0QixTQUFJLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztJQUU3QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ1UsTUFBTSxDQUFDLE9BQXVDLEVBQUUsU0FBc0IscUJBQVcsQ0FBQyxTQUFTOztZQUNwRyxRQUFRLE1BQU0sRUFBRTtnQkFDWixLQUFLLHFCQUFXLENBQUMsU0FBUztvQkFDdEIsT0FBTyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUE2QixDQUFDLENBQUM7Z0JBQ3pFLEtBQUsscUJBQVcsQ0FBQyxRQUFRO29CQUNyQixPQUFPLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQW9CLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxxQkFBVyxDQUFDLFVBQVU7b0JBQ3ZCLE9BQU8sTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBb0IsQ0FBQyxDQUFDO2FBQzFFO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsTUFBTTs7WUFDZixPQUFPLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFDVSxPQUFPLENBQUMsTUFBZTs7WUFDaEMsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FN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