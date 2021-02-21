# Anime Wallpaper
<p align="center"> 
    <img src="https://i.imgur.com/DeP0Nlv.jpeg">
</p>

Get Anime wallpapers based on scapping from websites [Alphacoders](https://alphacoders.com) and [Wallpaper Cave](https://wallpapercave.com).

- Documentation

# Example Usage
- Getting Wallpaper from [Alphacoders](https://alphacoders.com)
```js
const { AnimeWallpaper } = require("../dist");
const wall = new AnimeWallpaper();

async function Wallpaper1() {
    const wallpaper = await wall.getAnimeWall1({ search: "to love ru", page: 1 })
    return console.log(wallpaper)
}

Wallpaper1()
```
- Getting Wallpaper from [Wallpaper Cave](https://wallpapercave.com)
```js
async function Wallpaper2() {
    const wallpaper = await wall.getAnimeWall2("keqing")
    return console.log(wallpaper)
}

Wallpaper2()
```

<hr>

© [Aizuu](https://github.com/iseizuu)