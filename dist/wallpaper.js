"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const cheerio_1 = __importDefault(require("cheerio"));
const config_json_1 = __importStar(require("./config.json"));
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
            return yield this.hoyo.getHoyoArt(params);
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
            const response = yield this.client.get.request(`${config_json_1.default.free4kWallpaper}/anime-wallpapers`, { page: `${randomPage}` });
            const $ = cheerio_1.default.load(response.text);
            const wallpapers = [];
            $("#contents .container .row .cbody a img").each((i, elm) => {
                const title = $(elm).attr("title");
                const imageUrl = `${config_json_1.default.free4kWallpaper}/${$(elm).attr("data-src")}`;
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
            this.client.get.request(`${config_json_1.default.wallpapers}/search/${search.title}`, {})
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const results = [];
                $(".tab-content ul.kw-contents li").each((i, elm) => {
                    const title = $(elm).find(" figure").data("title");
                    const thumbnail = $(elm).find(" a").attr("href");
                    const image = `${config_json_1.default.wallpapers}/downloads/high/${$(elm).find("figure").data("key")}.png`;
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
        else if (!Object.keys(config_json_1.type).includes(search.type))
            throw new error_1.default("Please input on of them 'sfw, sketchy, both'");
        return new Promise((resolve, reject) => {
            this.client.get.request(`${config_json_1.default.wallHaven}/search`, { q: search.title, page: search.page, purity: config_json_1.type[search.type], ai_art_filter: !search.aiArt ? 1 : 0 })
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
            this.client.get.request(`${config_json_1.default.zerochan}/${search.title}`, {})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbHBhcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dhbGxwYXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDZEQUE0QztBQUM1QywwREFBc0M7QUFDdEMsdUNBQTZHO0FBdUtwRyw0RkF2S0EscUJBQVcsT0F1S0E7QUF0S3BCLGdFQUF3QztBQUN4QyxrREFBNkI7QUFFN0IsTUFBYSxjQUFjO0lBR3ZCO1FBRlEsV0FBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFBO1FBQ3JCLFNBQUksR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO0lBRTVCLENBQUM7SUFHRDs7Ozs7Ozs7O09BU0c7SUFDVSxNQUFNLENBQUMsT0FBdUMsRUFBRSxTQUFzQixxQkFBVyxDQUFDLFNBQVM7O1lBQ3BHLFFBQVEsTUFBTSxFQUFFO2dCQUNaLEtBQUsscUJBQVcsQ0FBQyxTQUFTO29CQUN0QixPQUFPLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQTZCLENBQUMsQ0FBQztnQkFDekUsS0FBSyxxQkFBVyxDQUFDLFFBQVE7b0JBQ3JCLE9BQU8sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBb0IsQ0FBQyxDQUFDO2dCQUMvRCxLQUFLLHFCQUFXLENBQUMsVUFBVTtvQkFDdkIsT0FBTyxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFvQixDQUFDLENBQUE7YUFDekU7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNVLE9BQU8sQ0FBQyxNQUFlOztZQUNoQyxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsQ0FBQztL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