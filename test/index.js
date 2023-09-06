const { AnimeWallpaper, AnimeSource } = require("../dist");
const wall = new AnimeWallpaper();

/**
* Uncomment the snippets below to try out new configurations
*/
async function WallpaperSearch() {
    // const wallpaper = await wall.search({ title: "hu tao" }, AnimeSource.Wallpapers);
    // const wallpaper = await wall.search({ title: "Aika" }, AnimeSource.WallHaven);
    const wallpaper = await wall.search({ title: "keqing" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.random();
    return console.log(wallpaper);
}

WallpaperSearch();