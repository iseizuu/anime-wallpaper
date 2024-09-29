const { AnimeWallpaper, AnimeSource } = require("../dist");
const wall = new AnimeWallpaper();
const axios = require("axios");

/**
* Uncomment the snippets below to try out new configurations
*/
async function WallpaperSearch() {
    // const wallpaper = await wall.hoyolab({ game: "ZenlessZoneZero", postType: "Trending" });
    //const wallpaper = await wall.search({ title: "ellen joe", page: 1, type: "sfw", aiArt: true }, AnimeSource.WallHaven);
    // const wallpaper = await wall.search({ title: "Furina" }, AnimeSource.Wallpapers);
    // const wallpaper = await wall.search({ title: "robin honkai star rail" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.random({resolutions: "1440x2560"});
    const wallpaper = await wall.pinterest("ellen joe");
    // const wallpaper = await wall.live2d("furina");
    return console.log(wallpaper);
}

WallpaperSearch();

async function ts(params) {
    const test = await axios.get("xxxx");
    return console.log(test.data);
}

// ts();