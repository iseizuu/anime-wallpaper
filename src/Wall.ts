import req from "node-superfetch";
import cheerio from "cheerio";
import WallError from "./Error";

interface searchOpt {
    search: string,
    page: string|number,
}

export default class Wallpaper {
    public constructor () {}
    public get(param: searchOpt): Promise<unknown> {
        if (!param || !param.search) throw new WallError("param must be specified");
        else if (!param.page) param.page = 0;
        if (typeof param.page === "string") console.warn("Use number instead of string, on page options, this is will not affected")
        return new Promise((resolve, reject) => {
            void req.get("https://wall.alphacoders.com/search.php")
                .query({ 
                    search: encodeURIComponent(param.search),
                    page: param.page as string
                })
                .then(x => {
                    const $ = cheerio.load(x.text);
                    const arr: unknown[] = []
                    $("#page_container [class=\"center\"] [class=\"thumb-container\"]").each((i, elm) => {
                        const title = $(elm).find("a").attr("param");
                        const thumbnail = $(elm).find("[class=\"boxgrid\"] a source").attr("srcset");
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        const url = `https://${thumbnail?.split("/")[2]}/${thumbnail?.split("/")[3]}/${thumbnail?.split("/")[4].split("-")[2]}`
                        arr.push({ title, thumbnail, url });
                    })
                    if (!arr.length) throw new WallError("No result found");
                    resolve(arr)
                })
                .catch(er => reject(er))
        })
    }
}