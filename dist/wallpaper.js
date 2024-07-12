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
class AnimeWallpaper {
    constructor() {
        this.client = new client_1.default();
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
    hoyolab(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.mihoyo().getHoyoArt(params);
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
     * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
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
    * @returns {dataImageFormat} A promise that resolves to an array of dataImageFormat objects containing information about the retrieved images.
    */
    scrapeFromZeroChan(search) {
        if (!search.title)
            throw new error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${this.client.config.zerochan}/${search.title}`, {})
                .then(x => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbHBhcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxwYXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMERBQXNDO0FBQ3RDLHVDQUE2RztBQXVNcEcsNEZBdk1BLHFCQUFXLE9BdU1BO0FBdE1wQixnRUFBd0M7QUFFeEMsTUFBYSxjQUFjO0lBRXZCO1FBRFEsV0FBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBRTlCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDVSxNQUFNLENBQUMsT0FBdUMsRUFBRSxTQUFzQixxQkFBVyxDQUFDLFNBQVM7O1lBQ3BHLFFBQVEsTUFBTSxFQUFFO2dCQUNaLEtBQUsscUJBQVcsQ0FBQyxTQUFTO29CQUN0QixPQUFPLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQTZCLENBQUMsQ0FBQztnQkFDekUsS0FBSyxxQkFBVyxDQUFDLFFBQVE7b0JBQ3JCLE9BQU8sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBb0IsQ0FBQyxDQUFDO2dCQUMvRCxLQUFLLHFCQUFXLENBQUMsVUFBVTtvQkFDdkIsT0FBTyxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFvQixDQUFDLENBQUM7YUFDMUU7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFlOztZQUNoQyxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ1UsU0FBUyxDQUFDLEtBQWE7O1lBQ2hDLElBQUksQ0FBQyxLQUFLO2dCQUFF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