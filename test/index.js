const { AnimeWallpaper } = require("../dist");
const wall = new AnimeWallpaper();

async function Wallpaper1() {
    const wallpaper = await wall.getAnimeWall1({ search: "Arisa Ichigaya", page: 1 })
    return console.log(wallpaper)
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
    const wallpaper = await wall.getAnimeWall4({ title: "Yukina Minato", type: "sfw", page: 1 })
    return console.log(wallpaper)
}

//Wallpaper4()

async function Wallpaper5() {
    const wallpaper = await wall.getAnimeWall5("makima")
    return console.log(wallpaper)
}

//Wallpaper5()
