const { AnimeWallpaper } = require("../dist");
const wall = new AnimeWallpaper();

async function Wallpaper1() {
    const wallpaper = await wall.getAnimeWall1({ search: "genshin Impact", page: 7 })
    return console.log(wallpaper[0])
}

Wallpaper1()

async function Wallpaper2() {
    const wallpaper = await wall.getAnimeWall2("keqing")
    return console.log(wallpaper)
}

//Wallpaper2()

async function Wallpaper3() {
    const wallpaper = await wall.getAnimeWall3()
    return console.log(wallpaper)
}

//Wallpaper3()

async function Wallpaper4() {
    const wallpaper = await wall.getAnimeWall4({ title: "keqing", type: "sfw" })
    return console.log(wallpaper)
}

//Wallpaper4()