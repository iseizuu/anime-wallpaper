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
exports.AnimeWallpaper = exports.AnimeSource = void 0;
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const random_useragent_1 = __importDefault(require("random-useragent"));
const cheerio_1 = __importDefault(require("cheerio"));
const config_json_1 = __importStar(require("./config.json"));
const Error_1 = __importDefault(require("./utils/Error"));
var AnimeSource;
(function (AnimeSource) {
    AnimeSource[AnimeSource["WallHaven"] = 2] = "WallHaven";
    AnimeSource[AnimeSource["ZeroChan"] = 3] = "ZeroChan";
})(AnimeSource = exports.AnimeSource || (exports.AnimeSource = {}));
class AnimeWallpaper {
    constructor() { }
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
    search(options, source = AnimeSource.WallHaven) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (source) {
                case AnimeSource.WallHaven:
                    return yield this.scrapeFromWallHaven(options);
                case AnimeSource.ZeroChan:
                    return yield this.scrapeFromZeroChan(options);
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
            return yield this.scrapeFrom4kWallpaper();
        });
    }
    /**
     * Scraping images wallpaper from free4kWallpaper
     *
     * this function will be return random anime wallpaper
     *
     * @returns {dataImageFormat}
     */
    scrapeFrom4kWallpaper() {
        const random = Math.floor(Math.random() * 20) + 1;
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.free4kWallpaper}/anime-wallpapers`, { page: random })
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const results = [];
                $("#contents .container .row .cbody a img").each((i, elm) => {
                    const title = $(elm).attr("title");
                    const image = `${config_json_1.default.free4kWallpaper}/${$(elm).attr("data-src")}`;
                    results.push({ title, image });
                });
                if (!results.length)
                    throw new Error_1.default("Images not found");
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
    scrapeFromWallHaven(search) {
        if (!search || !search.title)
            throw new Error_1.default("title must be specified");
        else if (!search.type)
            search.type = "sfw";
        else if (!Object.keys(config_json_1.type).includes(search.type))
            throw new Error_1.default("Please input on of them 'sfw, sketchy, both'");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.wallHaven}/search`, { q: search.title, page: search.page, purity: config_json_1.type[search.type] })
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
                    throw new Error_1.default("Images not found");
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
            throw new Error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.zerochan}/${search.title}`, {})
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const arr = [];
                $("#wrapper #content ul li").each((i, elm) => {
                    const title = $(elm).find("a img").attr("alt");
                    const thumbnail = $(elm).find("a img").attr("src");
                    const image = $(elm).find("p a").attr("href"); //`https://static.zerochan.net/${title?.split(" ").join(".")}.full.${$(elm).find("a").attr("href")?.replace(/\//gi, "")}.jpg`
                    arr.push({ title, thumbnail, image });
                });
                resolve(arr.filter(data => data.title));
            })
                .catch(er => reject(er));
        });
    }
    _request(uri, options) {
        return new Promise((resolve, reject) => {
            void node_superfetch_1.default.get(uri)
                .query(options)
                .set({
                "user-agent": random_useragent_1.default.getRandom()
            })
                .then(x => resolve(x))
                .catch(er => reject(`Upss: ${er.message}`));
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBa0M7QUFDbEMsd0VBQXlDO0FBQ3pDLHNEQUE4QjtBQUM5Qiw2REFBNEM7QUFDNUMsMERBQXNDO0FBR3RDLElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQix1REFBYSxDQUFBO0lBQ2IscURBQVksQ0FBQTtBQUNoQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFHRCxNQUFhLGNBQWM7SUFDdkIsZ0JBQXVCLENBQUM7SUFFeEI7Ozs7Ozs7OztPQVNHO0lBQ1UsTUFBTSxDQUFDLE9BQWtCLEVBQUUsU0FBc0IsV0FBVyxDQUFDLFNBQVM7O1lBQy9FLFFBQVEsTUFBTSxFQUFFO2dCQUNaLEtBQUssV0FBVyxDQUFDLFNBQVM7b0JBQ3RCLE9BQU8sTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25ELEtBQUssV0FBVyxDQUFDLFFBQVE7b0JBQ3JCLE9BQU8sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckQ7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDVSxNQUFNOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSyxxQkFBcUI7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FB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