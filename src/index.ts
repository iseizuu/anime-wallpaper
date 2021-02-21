import req from "node-superfetch";
import cheerio from "cheerio";
import WallError from "./utils/Error";
import { AnimeWall1, AnimeWall2, searchOpt } from "./typings";

export class AnimeWallpaper {
    public constructor () {}
    public getAnimeWall1(param: searchOpt): Promise<AnimeWall1[]> {
        if (!param || !param.search) throw new WallError("param must be specified");
        else if (!param.page) param.page = 0;
        if (typeof param.page === "string") console.warn("Use number instead of a string on `page` options, this is will not be affected");
        return new Promise((resolve, reject) => {
            this._request("https://wall.alphacoders.com/search.php", {
                search: encodeURIComponent(param.search),
                page: param.page as string
            })
                .then(x => {
                    const $ = cheerio.load(x);
                    const arr: AnimeWall1[] = [];
                    $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                        const title = $(elm).find("a").attr("title");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        const image = `https://${thumbnail?.split("/")[2]}/${thumbnail?.split("/")[3]}/${thumbnail?.split("/")[4].split("-")[2]}`
                        arr.push({ title, thumbnail, image } as AnimeWall1 );
                    })
                    if (!arr.length) throw new WallError("No result found");
                    resolve(arr)
                })
                .catch(er => reject(er));
        });
    }

    public getAnimeWall2(param: string): Promise<AnimeWall2[]> {
        if (!param) throw new WallError("param must be specified");
        const baseUrl = "https://wallpapercave.com";
        return new Promise((resolve, reject) => {
            this._request(`${baseUrl}/search`, { q: param.split(" ").join("+") })
                .then(x => {
                    const $ = cheerio.load(x);
                    const arr: AnimeWall2[] = [];
                    const results: string[] = [];
                    $("#content #popular a").each((i, elm) => {
                        const title = $(elm).attr("href");
                        results.push(title as string);
                    });
                    const filteredRes = results.filter(x => !x.startsWith("/w/") && !x.startsWith("/latest-upload"));
                    if (!filteredRes.length) throw new WallError("No result found");
                    const random = filteredRes[Math.floor(Math.random() * filteredRes.length)]
                    this._request(`${baseUrl}${random}`, {})
                        .then(res => {
                            const $$ = cheerio.load(res);
                            $$("#albumwp .wallpaper").each((i, elm) => {
                                const title = $(elm).find("a.wpinkw img").attr("alt");
                                const image = `${baseUrl}${$(elm).find("a.wpinkw img").attr("src") as string}`;
                                arr.push({ title, image } as AnimeWall2);
                            })
                            resolve(arr)
                        })
                        .catch(er => reject(er));
                })
                .catch(er => reject(er));
        });
    }

    private _request(uri: string, options: Record<string, string>): Promise<Response> {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pkg: { name: string; version: string; repository:string } = require("../package.json");
        return new Promise((resolve, reject) => {
            void req.get(uri)
                .query(options).set({
                    "user-agent": `${pkg.name}/${pkg.version} (${pkg.repository})`
                })
                .then(x => resolve(x.text as unknown as Response))
                .catch(er => reject(er));
        });
    }
}
