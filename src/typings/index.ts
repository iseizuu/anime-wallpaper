import { AnimeSource, hoyoApp, hoyoOptions } from "./enum";
import { hoyoResult } from "./typing";

export interface dataImageFormat {
    title?: string,
    thumbnail?: string,
    image?: string,
}

export interface searchOpt {
    title: string,
    page: string,
}

export interface searchForWallhaven {
    title: string,
    page: string,
    type: "sfw" | "sketchy" | "both",
    aiArt: boolean
}

export interface hoyolab {
    game: "ZenlessZoneZero" | "GenshinImpact" | "HonkaiImpact" | "HonkaiStarRail" | "TearOfThemis",
    postType: "Trending" | "Featured" | "NewPost" | "NewReply"
}

export { hoyoResult, AnimeSource, hoyoApp, hoyoOptions };