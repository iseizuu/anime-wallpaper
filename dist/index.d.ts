import { AnimeWall1, AnimeWall2, searchOpt, searchOpt2 } from "./typings";
export declare class AnimeWallpaper {
    constructor();
    /**
     *
     * @param {searchOpt} title title of anime that you want to search.
     * @returns {AnimeWall1}
     */
    getAnimeWall1(title: searchOpt): Promise<AnimeWall1[]>;
    /**
     *
     * @param param the title of anime that you want to search.
     * @returns {AnimeWall2}
     */
    getAnimeWall2(param: string): Promise<AnimeWall2[]>;
    /**
     * this function will be return random anime wallpaper
     *
     * @returns {AnimeWall2}
     */
    getAnimeWall3(): Promise<AnimeWall2[]>;
    getAnimeWall4(search: searchOpt2): Promise<unknown[]>;
    private _request;
}
