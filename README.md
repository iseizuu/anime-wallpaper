<h1 align="center">Anime Wallpaper</h1>
<p align="center"> 
    <img src="https://i.imgur.com/DeP0Nlv.jpeg">
</p>

Get Anime wallpapers based on scrapping from websites.
* ~~[Alphacoders](https://alphacoders.com)~~
* [Wallpaper Cave](https://wallpapercave.com)
* [4K Wallpapers](https://free4kwallpapers.com/)

[![Version](https://nodei.co/npm/anime-wallpaper.png?compact=true)](https://nodei.co/npm/anime-wallpaper)
###### [Documentation](https://iseizuu.github.io/anime-wallpaper/)

# Example Usage
 - Getting Wallpaper from ~~[Alphacoders](https://alphacoders.com)~~ _currently not work_

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

- Getting Ramdon Wallpaper from [4K Wallpapers](https://free4kwallpapers.com/)

```js
async function Wallpaper3() {
    const wallpaper = await wall.getAnimeWall3()
    return console.log(wallpaper)
}

Wallpaper3()
```

<hr>

© [Aizuu](https://github.com/iseizuu)
