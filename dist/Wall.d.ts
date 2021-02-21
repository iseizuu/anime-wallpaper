import { AnimeWall1 } from "./typings";
interface searchOpt {
    search: string;
    page: string | number;
}
export default class Wallpaper {
    constructor();
    get(param: searchOpt): Promise<AnimeWall1[]>;
    private _request;
}
export {};
