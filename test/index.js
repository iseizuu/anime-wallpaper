const { AnimeWallpaper, AnimeSource } = require("../dist");
const wall = new AnimeWallpaper();

/**
* Uncomment the snippets below to try out new configurations
*/
async function WallpaperSearch() {
    // const wallpaper = await wall.Hoyolab({ game: "HonkaiStarRail", postType: "Trending" });
    // const wallpaper = await wall.search({ title: "firefly honkai", page: 1, type: "both", aiArt: true }, AnimeSource.WallHaven);
    // const wallpaper = await wall.search({ title: "Furina" }, AnimeSource.Wallpapers);
    // const wallpaper = await wall.search({ title: "robin honkai star rail" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.random();
    const wallpaper = await wall.pinterest("Firefly Hsr");
    return console.log(wallpaper);
}

WallpaperSearch();