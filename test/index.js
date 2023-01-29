const { AnimeWallpaper, AnimeSource } = require("../dist");
const wall = new AnimeWallpaper();

/**
* Uncomment the snippets below to try out new configurations
*/
async function WallpaperSearch() {
    // const wallpaper = await wall.search({ title: "Misaka Mikoto" });
    const wallpaper = await wall.search({ title: "Misaka Mikoto" }, AnimeSource.WallHaven);
    // const wallpaper = await wall.search({ title: "Misaka Mikoto" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.random();
    return console.log(wallpaper);
}

WallpaperSearch();