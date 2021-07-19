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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeWallpaper = void 0;
/* eslint-disable @typescript-eslint/unbound-method */
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const random_useragent_1 = __importDefault(require("random-useragent"));
const cheerio_1 = __importDefault(require("cheerio"));
const config_json_1 = __importStar(require("./config.json"));
const Error_1 = __importDefault(require("./utils/Error"));
class AnimeWallpaper {
    constructor() { }
    /**
     * Scraping images wallpaper from AlphaCoders
     *
     * @param {Object}
     * @param {string} title.search the title of anime you want to search.
     * @param {string|number} title.page the page for image you want to search.
     * @returns {AnimeWall1}
     */
    getAnimeWall1(title) {
        if (!title || !title.search)
            throw new Error_1.default("title must be specified");
        else if (!title.page)
            title.page = 0;
        if (typeof title.page === "string")
            console.warn("Use number instead of a string on `page` options, this is will not be affected");
        return new Promise((resolve, reject) => {
            this._request(config_json_1.default.alphaCoders, { search: encodeURIComponent(title.search) })
                .then(x => {
                void this._request(`${x.url}&page=${title.page}`, {})
                    .then((data) => {
                    const $ = cheerio_1.default.load(data.text);
                    const arr = [];
                    $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                        var _a;
                        const title = $(elm).find("a").attr("title");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        const image = (_a = $(elm).find("[class=\"boxgrid\"] a img").attr("src")) === null || _a === void 0 ? void 0 : _a.replace(/thumbbig-/g, "");
                        void this.delay(4e3);
                        arr.push({ title, thumbnail, image });
                    });
                    if (!arr.length)
                        throw new Error_1.default("No result found");
                    resolve(arr);
                })
                    .catch(er => reject(er));
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
    getAnimeWall2(title) {
        if (!title)
            throw new Error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.wallpaperCave}/search`, { q: title.split(" ").join("+") })
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
                const arr = [];
                const results = [];
                $("#content #popular a").each((i, elm) => {
                    const title = $(elm).attr("href");
                    results.push(title);
                });
                const filteredRes = results.filter(x => !x.startsWith("/w/") && !x.startsWith("/latest-upload"));
                if (!filteredRes.length)
                    throw new Error_1.default("No result found");
                const random = filteredRes[Math.floor(Math.random() * filteredRes.length)];
                this._request(`${config_json_1.default.wallpaperCave}${random}`, {})
                    .then(res => {
                    const $$ = cheerio_1.default.load(res);
                    $$("#albumwp .wallpaper").each((i, elm) => {
                        const title = $(elm).find("a.wpinkw img").attr("alt");
                        const image = `${config_json_1.default.wallpaperCave}${$(elm).find("a.wpinkw img").attr("src")}`;
                        arr.push({ title, image });
                    });
                    resolve(arr);
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
    getAnimeWall3() {
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
     * @returns {AnimeWall3}
     */
    getAnimeWall4(search) {
        if (!search || !search.title)
            throw new Error_1.default("title must be specified");
        else if (!search.type)
            search.type === "sfw";
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
    _request(uri, options) {
        return new Promise((resolve, reject) => {
            void node_superfetch_1.default.get(uri)
                .query(options).set({
                "user-agent": random_useragent_1.default.getRandom()
            })
                .then(x => resolve(x))
                .catch(er => reject(er));
        });
    }
    delay(amount) {
        return new Promise(resolve => setTimeout(resolve, amount));
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFzRDtBQUN0RCxzRUFBa0M7QUFDbEMsd0VBQXlDO0FBQ3pDLHNEQUE4QjtBQUM5Qiw2REFBNEM7QUFDNUMsMERBQXNDO0FBR3RDLE1BQWEsY0FBYztJQUN2QixnQkFBdUIsQ0FBQztJQUV4Qjs7Ozs7OztPQU9HO0lBQ0ksYUFBYSxDQUFDLEtBQWdCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1FBQ25JLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDMUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNOLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztxQkFDaEQsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ1gsTUFBTSxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29C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