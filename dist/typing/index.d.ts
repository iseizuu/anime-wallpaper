import { AnimeSource, hoyolabGames, hoyolabPostType } from "./enum";
import { hoyolabResult } from "./typing";
export interface dataImageFormat {
    title?: string;
    thumbnail?: string;
    image?: string;
}
export interface live2D {
    title?: string;
    thumbnail?: string;
    video?: string;
    url?: string;
}
export interface searchOptions {
    title: string;
    page?: string;
}
export interface searchForWallhaven {
    title: string;
    page: string;
    type: "sfw" | "sketchy" | "both";
    aiArt: boolean;
}
export interface resolutionList {
    resolutions: "1080x1920" | "720x1280" | "1440x2560" | "750x1334" | "1280x800" | "1920x1080" | "2560x1440" | "3840x2160" | "5120x2880" | "0";
}
export interface hoyolabSearchQuery {
    game: "ZenlessZoneZero" | "GenshinImpact" | "HonkaiImpact" | "HonkaiStarRail" | "TearOfThemis";
    postType: "Trending" | "Featured" | "NewPost" | "NewReply";
}
export { hoyolabResult, AnimeSource, hoyolabGames, hoyolabPostType };
