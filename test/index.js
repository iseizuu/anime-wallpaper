const { AnimeWallpaper, AnimeSource } = require("../dist");
const wall = new AnimeWallpaper();

<<<<<<< Updated upstream
/**
* Uncomment the snippets below to try out new configurations
*/
async function WallpaperSearch() {
    const wallpaper = await wall.search({ title: "Misaka Mikoto" });
    // const wallpaper = await wall.search({ title: "Misaka Mikoto" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.search({ title: "Misaka Mikoto" }, AnimeSource.ZeroChan);
    // const wallpaper = await wall.random();
    return console.log(wallpaper);
=======
async function Wallpaper1() {
    const wallpaper = await wall.getAnimeWall1({ search: "Layla", page: 2 })
    return console.log(wallpaper)
>>>>>>> Stashed changes
}

WallpaperSearch();