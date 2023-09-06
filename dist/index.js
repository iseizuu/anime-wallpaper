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
<<<<<<< Updated upstream
exports.AnimeWallpaper = exports.AnimeSource = void 0;
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const random_useragent_1 = __importDefault(require("random-useragent"));
=======
exports.AnimeWallpaper = void 0;
const axios_1 = __importDefault(require("axios"));
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    search(options, source = AnimeSource.WallHaven) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (source) {
                case AnimeSource.WallHaven:
                    return yield this.scrapeFromWallHaven(options);
                case AnimeSource.ZeroChan:
                    return yield this.scrapeFromZeroChan(options);
            }
=======
    getAnimeWall1(title) {
        if (!title || !title.search)
            throw new Error_1.default("title must be specified");
        else if (!title.page)
            title.page = 0;
        if (typeof title.page === "string")
            console.warn("Use number instead of a string on `page` options, this is will not be affected");
        return new Promise((resolve, reject) => {
            this._request(config_json_1.default.alphaCoders, { search: encodeURIComponent(title.search), page: title.page })
                .then(data => {
                const $ = cheerio_1.default.load(data.data);
                const arr = [];
                $("#big_container .page_container .thumb-container").each((i, elm) => {
                    var _a;
                    const title = $(elm).find("img").attr("alt");
                    const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                    const image = (_a = $(elm).find("img").attr("src")) === null || _a === void 0 ? void 0 : _a.replace(/thumbbig-/g, "");
                    arr.push({ title, thumbnail, image });
                });
                if (!arr.length)
                    throw new Error_1.default("No result found");
                resolve(arr);
            })
                .catch(er => reject(er));
>>>>>>> Stashed changes
        });
    }
    /**
     * Scrapes 4kWallpaper for a random Wallpaper
     *
     * This function will return an array of random Wallpapers
     *
     * @returns {dataImageFormat}
     */
<<<<<<< Updated upstream
    random() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scrapeFrom4kWallpaper();
=======
    getAnimeWall2(title) {
        if (!title)
            throw new Error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.wallpaperCave}/search`, { q: title.split(" ").join("+") })
                .then(x => {
                const $ = cheerio_1.default.load(x.data);
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
                    const $$ = cheerio_1.default.load(res.data);
                    $$("#albumwp .wallpaper").each((i, elm) => {
                        const title = $$(elm).find("a.wpinkw img").attr("alt");
                        const image = `${config_json_1.default.wallpaperCave}${$$(elm).find("a.wpinkw img").attr("src")}`;
                        arr.push({ title, image });
                    });
                    resolve(arr);
                })
                    .catch(er => reject(er));
            })
                .catch(er => reject(er));
>>>>>>> Stashed changes
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
                const $ = cheerio_1.default.load(x.data);
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
                const $ = cheerio_1.default.load(x.data);
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
<<<<<<< Updated upstream
    * Scraping images wallpaper from zerochan
    *
    * @param search.title the title of anime that you want to search.
    * @returns {dataImageFormat}
    */
    scrapeFromZeroChan(search) {
        if (!search.title)
=======
      * Scraping images wallpaper from zerochan
      *
      * @param title the title of anime that you want to search.
      * @returns {dataImageFormat2}
      */
    getAnimeWall5(title) {
        if (!title)
>>>>>>> Stashed changes
            throw new Error_1.default("title must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.zerochan}/${search.title}`, {})
                .then(x => {
                const $ = cheerio_1.default.load(x.data);
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
            void axios_1.default.create({
                headers: {
                    "Accept-Encoding": "gzip, deflate, br"
                }
            })
                .get(uri, { params: options })
                .then(x => resolve(x))
<<<<<<< Updated upstream
                .catch((e) => reject(`Upss: ${e.message}`));
=======
                .catch((er) => reject(`Upss: ${er.message}`));
>>>>>>> Stashed changes
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
<<<<<<< Updated upstream
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNFQUFrQztBQUNsQyx3RUFBeUM7QUFDekMsc0RBQThCO0FBQzlCLDZEQUE0QztBQUM1QywwREFBc0M7QUFHdEMsSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ25CLHVEQUFhLENBQUE7SUFDYixxREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQUdELE1BQWEsY0FBYztJQUN2QixnQkFBdUIsQ0FBQztJQUV4Qjs7Ozs7Ozs7O09BU0c7SUFDVSxNQUFNLENBQUMsT0FBa0IsRUFBRSxTQUFzQixXQUFXLENBQUMsU0FBUzs7WUFDL0UsUUFBUSxNQUFNLEVBQUU7Z0JBQ1osS0FBSyxXQUFXLENBQUMsU0FBUztvQkFDdEIsT0FBTyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxXQUFXLENBQUMsUUFBUTtvQkFDckIsT0FBTyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNyRDtRQUNMLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNVLE1BQU07O1lBQ2YsT0FBTyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNLLHFCQUFxQjtRQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcscUJBQU0sQ0FBQyxlQUFlLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUN4RSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDO2dCQUN0QyxDQUFDLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ3hELE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7b0JBQzdDLE1BQU0sS0FBSyxHQUFHLEdBQUcscUJBQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO29CQUNyRSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFBRSxNQUFNLElBQUksZUFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzdELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLG1CQUFtQixDQUFDLE1BQWlCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksZUFBUyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFFdkgsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcscUJBQU0sQ0FBQyxTQUFTLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUN6RyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDO2dCQUN0QyxDQUFDLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7O29CQUNsRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUE7b0JBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDMUQsSUFBSSxLQUFLO3dCQUFFLFNBQVMsR0FBRyxNQUFNLENBQUM7b0JBQzlCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0RCxNQUFNLEtBQUssR0FBRywrQkFBK0IsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLDRDQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO29CQUMvSixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRDs7Ozs7TUFLRTtJQUNNLGtCQUFrQixDQUFDLE1BQWlCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxxQkFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUNsRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixNQUFNLEdBQUcsR0FBc0IsRUFBRSxDQUFDO2dCQUNsQyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDO29CQUN6RCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQztvQkFDN0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUMsQ0FBQyw2SEFBNkg7b0JBQ3RMLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7WUFDM0MsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXLEVBQUUsT0FBdUM7UUFDakUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxLQUFLLHlCQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztpQkFDWixLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNkLEdBQUcsQ0FBQztnQkFDRCxZQUFZLEVBQUUsMEJBQVMsQ0FBQyxTQUFTLEVBQVk7YUFDaEQsQ0FBQztpQkFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBd0IsQ0FBQyxDQUFDO2lCQUM1QyxLQUFLLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFsSUQsd0NBa0lDIn0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEyQztBQUUzQyxzREFBOEI7QUFDOUIsNkRBQTRDO0FBQzVDLDBEQUFzQztBQUd0QyxNQUFhLGNBQWM7SUFDdkIsZ0JBQXVCLENBQUM7SUFFeEI7Ozs7Ozs7T0FPRztJQUNJLGFBQWEsQ0FBQyxLQUFnQjtRQUNqQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksZUFBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztRQUNuSSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzVGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDVCxNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sR0FBRyxHQUF1QixFQUFFLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTs7b0JBQ2pFLE1BQU0sS0FBSyxH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
>>>>>>> Stashed changes
