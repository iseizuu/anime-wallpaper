"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeWallpaper = void 0;
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const Error_1 = __importDefault(require("./utils/Error"));
class AnimeWallpaper {
    constructor() { }
    getAnimeWall1(param) {
        if (!param || !param.search)
            throw new Error_1.default("param must be specified");
        else if (!param.page)
            param.page = 0;
        if (typeof param.page === "string")
            console.warn("Use number instead of string, on page options, this is will not affected");
        return new Promise((resolve, reject) => {
            this._request("https://wall.alphacoders.com/search.php", {
                search: encodeURIComponent(param.search),
                page: param.page
            })
                .then(x => {
                const $ = cheerio_1.default.load(x);
                const arr = [];
                $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                    const title = $(elm).find("a").attr("title");
                    const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
    getAnimeWall2(param) {
        if (!param)
            throw new Error_1.default("param must be specified");
        const baseUrl = "https://wallpapercave.com";
        return new Promise((resolve, reject) => {
            this._request(`${baseUrl}/search`, { q: param.split(" ").join("+") })
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
                this._request(`${baseUrl}${random}`, {})
                    .then(res => {
                    const $$ = cheerio_1.default.load(res);
                    $$("#albumwp .wallpaper").each((i, elm) => {
                        const title = $(elm).find("a.wpinkw img").attr("alt");
                        const image = `${baseUrl}${$(elm).find("a.wpinkw img").attr("src")}`;
                        arr.push({ title, image });
                    });
                    resolve(arr);
                })
                    .catch(er => reject(er));
            })
                .catch(er => reject(er));
        });
    }
    _request(uri, options) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pkg = require("../package.json");
        return new Promise((resolve, reject) => {
            void node_superfetch_1.default.get(uri)
                .query(options).set({
                "user-agent": `${pkg.name}/${pkg.version} (${pkg.repository})`
            })
                .then(x => resolve(x.text))
                .catch(er => reject(er));
        });
    }
}
exports.AnimeWallpaper = AnimeWallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0VBQWtDO0FBQ2xDLHNEQUE4QjtBQUM5QiwwREFBc0M7QUFHdEMsTUFBYSxjQUFjO0lBQ3ZCLGdCQUF1QixDQUFDO0lBQ2pCLGFBQWEsQ0FBQyxLQUFnQjtRQUNqQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxNQUFNLElBQUksZUFBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEVBQTBFLENBQUMsQ0FBQTtRQUM1SCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMseUNBQXlDLEVBQUU7Z0JBQ3JELE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQWM7YUFDN0IsQ0FBQztpQkFDRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsaUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxHQUFpQixFQUFFLENBQUE7Z0JBQzVCLENBQUMsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDaEYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMs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