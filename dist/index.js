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
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const random_useragent_1 = __importDefault(require("random-useragent"));
const cheerio_1 = __importDefault(require("cheerio"));
const config_json_1 = __importStar(require("./config.json"));
const Error_1 = __importDefault(require("./utils/Error"));
class AnimeWallpaper {
    constructor() { }
    /**
     *
     * @param {searchOpt} title title of anime that you want to search.
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
            this._request(config_json_1.default.alphaCoders, {
                search: encodeURIComponent(title.search),
                page: title.page
            })
                .then(x => {
                const $ = cheerio_1.default.load(x);
                const arr = [];
                $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                    const title = $(elm).find("a").attr("title");
                    const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                    const image = `https://${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[2]}/${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[3]}/${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[4].split("-")[2]}`;
                    arr.push({ title, thumbnail, image });
                });
                if (!arr.length)
                    throw new Error_1.default("No result found");
                resolve(arr);
            })
                .catch(er => reject(er));
        });
    }
    /**
     *
     * @param param the title of anime that you want to search.
     * @returns {AnimeWall2}
     */
    getAnimeWall2(param) {
        if (!param)
            throw new Error_1.default("param must be specified");
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.wallpaperCave}/search`, { q: param.split(" ").join("+") })
                .then(x => {
                const $ = cheerio_1.default.load(x);
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
     * this function will be return random anime wallpaper
     *
     * @returns {AnimeWall2}
     */
    getAnimeWall3() {
        const random = Math.floor(Math.random() * 20) + 1;
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.free4kWallpaper}/anime-wallpapers`, { page: random })
                .then(x => {
                const $ = cheerio_1.default.load(x);
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
    getAnimeWall4(search) {
        if (!search || !search.title)
            throw new Error_1.default("title must be specified");
        else if (!search.type)
            search.type === "sfw";
        else if (!Object.keys(config_json_1.type).includes(search.type))
            throw new Error_1.default("Please input on of them 'sfw, sketchy, both'");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const getPurity = config_json_1.type[search.type];
        return new Promise((resolve, reject) => {
            this._request(`${config_json_1.default.wallHaven}/search`, { q: search.title, page: search.page, purity: getPurity })
                .then(x => {
                const $ = cheerio_1.default.load(x);
                const results = [];
                $(".thumb-listing-page ul li .thumb").each((i, elm) => {
                    var _a;
                    let formatImg = ".jpg";
                    const isPng = $(elm).find(".thumb-info .png span").text();
                    if (isPng)
                        formatImg = ".png";
                    const parseUrl = (_a = $(elm).find(".preview").attr("href")) === null || _a === void 0 ? void 0 : _a.split("/").pop();
                    const image = `https://w.wallhaven.cc/full/${parseUrl === null || parseUrl === void 0 ? void 0 : parseUrl.split("").splice(0, 2).join("")}/wallhaven-${parseUrl}${formatImg}`;
                    // console.log(image)
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
                .then(x => resolve(x.text))
                .catch(er => reject(er));
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFFQUFxRTtBQUNyRSxzRUFBa0M7QUFDbEMsd0VBQXlDO0FBQ3pDLHNEQUE4QjtBQUM5Qiw2REFBNEM7QUFDNUMsMERBQXNDO0FBR3RDLE1BQWEsY0FBYztJQUN2QixnQkFBdUIsQ0FBQztJQUV4Qjs7OztPQUlHO0lBQ0ksYUFBYSxDQUFDLEtBQWdCO1FBQ2pDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1FBQ25JLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBYzthQUM3QixDQUFDO2lCQUNHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDTixNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLEdBQWlCLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLGdFQUFnRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO29C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