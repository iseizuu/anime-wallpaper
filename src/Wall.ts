import req from "node-superfetch";
import cheerio from "cheerio";
import WallError from "./utils/Error";
import { STATUS_CODES } from "http";
import { AnimeWall1, searchOpt } from "./typings";

export default class Wallpaper {
    public constructor () {}
    public get(param: searchOpt): Promise<AnimeWall1[]> {
        if (!param || !param.search) throw new WallError("param must be specified");
        else if (!param.page) param.page = 0;
        if (typeof param.page === "string") console.warn("Use number instead of string, on page options, this is will not affected")
        return new Promise((resolve, reject) => {
            this._request("https://wall.alphacoders.com/search.php", {
                search: encodeURIComponent(param.search),
                page: param.page as string
            })
                .then(x => {
                    const $ = cheerio.load(x);
                    const arr: AnimeWall1[] = []
                    $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                        const title = $(elm).find("a").attr("title");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        const url = `https://${thumbnail?.split("/")[2]}/${thumbnail?.split("/")[3]}/${thumbnail?.split("/")[4].split("-")[2]}`
                        arr.push({ title, thumbnail, url } as AnimeWall1 );
                    })
                    if (!arr.length) throw new WallError("No result found");
                    resolve(arr)
                })
                .catch(er => reject(er));
        });
    }

    private _request(uri: string, options: Record<string, string>): Promise<Response> {
        const pkg: { name: string; version: string; repository:string } = require("../package.json");
        return new Promise((resolve, reject) => {
            void req.get(uri)
                .query(options)
                .set({
                    "user-agent": `${pkg.name}/${pkg.version} (${pkg.repository})`
                })
                .then(x => {
                    resolve(x.text as unknown as Response)
                })
                .catch(er => {
                    if (er.status !== 200) throw new WallError(STATUS_CODES[er.status]!)
                    reject(er)
                });
        });
    }
}