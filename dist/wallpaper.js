"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const cheerio = __importStar(require("cheerio"));
const error_1 = __importDefault(require("./utils/error"));
const typing_1 = require("./typing");
Object.defineProperty(exports, "AnimeSource", { enumerable: true, get: function () { return typing_1.AnimeSource; } });
const client_1 = __importDefault(require("./structure/client"));
class AnimeWallpaper {
    constructor() {
        this.client = new client_1.default();
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
    search(options_1) {
        return __awaiter(this, arguments, void 0, function* (options, source = typing_1.AnimeSource.WallHaven) {
            switch (source) {
                case typing_1.AnimeSource.WallHaven:
                    return yield this.scrapeFromWallHaven(options);
                case typing_1.AnimeSource.ZeroChan:
                    return yield this.scrapeFromZeroChan(options);
                case typing_1.AnimeSource.Wallpapers:
                    return yield this.scrapeFromWallpapersDotCom(options);
            }
        });
    }
    /**
     * Scrapes live2D images from moewalls.
     *
     * @param title the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    live2d(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scrapeFromMoewall(title);
        });
    }
    /**
     * @deprecated
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @returns {dataImageFormat}
     */
    random() {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("The 'random' method is deprecated. Please use 'search' method instead.");
            return yield this.scrapeRandomWallpaper();
        });
    }
    /**
     * Retrieves fanart from the Hoyolab.
     *
     * @param {hoyolab} params - Parameters for the Hoyolab request.
     * @returns {Promise<hoyoResult>} - A promise that resolves to the result of the request.
     */
    hoyolab(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.mihoyo(params);
        });
    }
    /**
     * Retrieves images from Pinterest based on a search query.
     *
     * @param {string} query - The search query to use for retrieving images.
     * @returns {Promise<dataImageFormat[]>} - A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    pinterest(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query)
                throw new error_1.default("Please provide a search query");
            return new Promise((resolve, reject) => {
                this.client.get.request(this.client.config.pinterest, { autologin: true, q: query }, "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0")
                    .then(x => {
                    const results = [];
                    const $ = cheerio.load(x.data);
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
                    .catch((er) => reject(new error_1.default(er.message)));
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
            const $ = cheerio.load(response.data);
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
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
     */
    scrapeFromWallpapersDotCom(search) {
        if (!search || !search.title)
            throw new error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.wallpapers}/search/${search.title}`, {})
                .then((x) => {
                const $ = cheerio.load(x.data);
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
                .catch((er) => reject(new error_1.default(er.message)));
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
                .then((x) => {
                const $ = cheerio.load(x.data);
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
                .catch((er) => reject(new error_1.default(er.message)));
        });
    }
    /**
    * Scraping images wallpaper from zerochan
    *
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
    */
    scrapeFromZeroChan(search) {
        if (!search.title)
            throw new error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.zerochan}/${search.title}`, {})
                .then((x) => {
                const $ = cheerio.load(x.data);
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
                .catch((er) => reject(new error_1.default(er.message)));
        });
    }
    /**
     * Scrapes live2D images from moewalls.
     *
     * @param search the title of anime that you want to search.
     * @returns {Promise<live2D[]>} A promise that resolves to an array of live2D objects containing information about the retrieved images.
     * @throws {WallError} - If the search query is empty or no images are found.
     */
    scrapeFromMoewall(search) {
        if (!search)
            console.log("[Anime Wallpaper] search is empty, showing random images");
        const regex = /\/(\d{4})\/\d{2}\/([a-z0-9-]+)-thumb/;
        return new Promise((resolve, reject) => {
            this.client.get.request(!search ? `${this.client.config.moewall}` : this.client.config.moewall, { s: search })
                .then((x) => {
                const $ = cheerio.load(x.data);
                const arr = [];
                $("#primary ul li").each((i, elm) => {
                    var _a, _b;
                    const title = $(elm).find("a").attr("title");
                    const url = $(elm).find("a").attr("href");
                    const thumbnail = $(elm).find("img").attr("src");
                    const video = `https://static.moewalls.com/videos/preview/${(_a = regex.exec(thumbnail)) === null || _a === void 0 ? void 0 : _a[1]}/${(_b = regex.exec(thumbnail)) === null || _b === void 0 ? void 0 : _b[2]}-preview.mp4`;
                    arr.push({ title, thumbnail, video, url });
                });
                resolve(arr.filter(res => res.title));
            })
                .catch((er) => reject(new error_1.default(er.message)));
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbHBhcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxwYXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtQztBQUNuQywwREFBc0M7QUFDdEMscUNBQW9IO0FBOE8zRyw0RkE5T0Esb0JBQVcsT0E4T0E7QUE3T3BCLGdFQUF3QztBQUV4QyxNQUFhLGNBQWM7SUFFdkI7UUFEUSxXQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7SUFFOUIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ1UsTUFBTTs2REFBQyxPQUF1QyxFQUFFLFNBQXNCLG9CQUFXLENBQUMsU0FBUztZQUNwRyxRQUFRLE1BQU0sRUFBRSxDQUFDO2dCQUNqQixLQUFLLG9CQUFXLENBQUMsU0FBUztvQkFDdEIsT0FBTyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUE2QixDQUFDLENBQUM7Z0JBQ3pFLEtBQUssb0JBQVcsQ0FBQyxRQUFRO29CQUNyQixPQUFPLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQW9CLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxvQkFBVyxDQUFDLFVBQVU7b0JBQ3ZCLE9BQU8sTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBb0IsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNLENBQUMsS0FBYTs7WUFDN0IsT0FBTyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ1UsTUFBTTs7WUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7WUFDdkYsT0FBTyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVEOzs7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