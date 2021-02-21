"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_superfetch_1 = __importDefault(require("node-superfetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const Error_1 = __importDefault(require("./Error"));
class Wallpaper {
    get(title) {
        if (!title.search)
            throw new Error_1.default("title must be specified");
        else if (!title.page)
            title.page = 0;
        if (typeof title.page === "string")
            console.warn("Use number instead of string, on page options, this is will not affected");
        return new Promise((resolve, reject) => {
            void node_superfetch_1.default.get("https://wall.alphacoders.com/search.php")
                .query({
                search: encodeURIComponent(title.search),
                page: title.page
            })
                .then(x => {
                const $ = cheerio_1.default.load(x.text);
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
}
exports.default = Wallpaper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9XYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQWtDO0FBQ2xDLHNEQUE4QjtBQUM5QixvREFBZ0M7QUFPaEMsTUFBcUIsU0FBUztJQUNuQixHQUFHLENBQUMsS0FBZ0I7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLGVBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLDBFQUEwRSxDQUFDLENBQUE7UUFDNUgsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxLQUFLLHlCQUFHLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDO2lCQUNsRCxLQUFLLENBQUM7Z0JBQ0gsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBYzthQUM3QixDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDTixNQUFNLENBQUMsR0FBRyxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sR0FBRyxHQUFjLEVBQUUsQ0FBQTtnQkFDekIsQ0FBQyxDQUFDLGdFQUFnRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNoRixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDN0MsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDN0UsNEVBQTRFO29CQUM1RSxNQUFNLEdBQUcsR0FBRyxXQUFXLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUE7b0JBQ3ZILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTTtvQkFBRSxNQUFNLElBQUksZUFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDaEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUEzQkQsNEJBMkJDIn0=