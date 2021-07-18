const { AnimeWallpaper } = require("../dist");
const wall = new AnimeWallpaper();

async function Wallpaper1() {
    const wallpaper = await wall.getAnimeWall1({ search: "to love ru", page: 1 })
    return console.log(wallpaper)
}

// Wallpaper1()

async function Wallpaper2() {
    const wallpaper = await wall.getAnimeWall2("keqing")
    return console.log(wallpaper)
}

//Wallpaper2()

async function Wallpaper4() {
    const wallpaper = await wall.getAnimeWall4({ title: "ganyu", type: "sketchy"})
    return console.log(wallpaper)
}

Wallpaper4()