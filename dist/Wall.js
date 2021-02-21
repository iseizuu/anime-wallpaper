"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const Error_1 = __importDefault(require("./utils/Error"));
const http_1 = require("http");
class Wallpaper {
    constructor() { }
    get(param) {
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
                    const url = `https://${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[2]}/${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[3]}/${thumbnail === null || thumbnail === void 0 ? void 0 : thumbnail.split("/")[4].split("-")[2]}`;
                    arr.push({ title, thumbnail, url });
                });
                if (!arr.length)
                    throw new Error_1.default("No result found");
                resolve(arr);
            })
                .catch(er => reject(er));
        });
    }
    _request(uri, options) {
        const pkg = require("../package.json");
        return new Promise((resolve, reject) => {
            void node_superfetch_1.default.get(uri)
                .query(options)
                .set({
                "user-agent": `${pkg.name}/${pkg.version} (${pkg.repository})`
            })
                .then(x => {
                resolve(x.text);
            })
                .catch(er => {
                if (er.status !== 200)
                    throw new Error_1.default(http_1.STATUS_CODES[er.status]);
                reject(er);
            });
        });
    }
}
exports.default = Wallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9XYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQWtDO0FBQ2xDLHNEQUE4QjtBQUM5QiwwREFBc0M7QUFDdEMsK0JBQW9DO0FBUXBDLE1BQXFCLFNBQVM7SUFDMUIsZ0JBQXVCLENBQUM7SUFDakIsR0FBRyxDQUFDLEtBQWdCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxlQUFTLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN2RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO1lBQUUsT0FBTyxDQUFDLElBQUksQ0FBQywwRUFBMEUsQ0FBQyxDQUFBO1FBQzVILE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5Q0FBeUMsRUFBRTtnQkFDckQsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBYzthQUM3QixDQUFDO2lCQUNHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDTixNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxHQUFHLEdBQWlCLEVBQUUsQ0FBQTtnQkFDNUIsQ0FBQyxDQUFDLGdFQUFnRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNoRixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDN0UsNEVBQTRFO29CQUM1RSxNQUFNLEdBQUcsR0FBRyxXQUFXLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7b0JBQ3ZILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBZ0IsQ0FBRSxDQUFDO2dCQUN2RCxDQUFDLENBQUMsQ0FBQTtnQkFDRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU07b0JBQUUsTUFBTSxJQUFJLGVBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDaEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXLEVBQUUsT0FBK0I7UUFDekQsTUFBTSxHQUFHLEdBQXlELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsS0FBSyx5QkFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7aUJBQ1osS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDZCxHQUFHLENBQUM7Z0JBQ0QsWUFBWSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxVQUFVLEdBQUc7YUFDakUsQ0FBQztpQkFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ04sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUEyQixDQUFDLENBQUE7WUFDMUMsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDUixJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssR0FBRztvQkFBRSxNQUFNLElBQUksZUFBUyxDQUFDLG1CQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUE7Z0JBQ3BFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE3Q0QsNEJBNkNDIn0=