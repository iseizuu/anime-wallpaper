<h1 align="center">Anime Wallpaper</h1>
<p align="center">
  <a href="https://github.com/beyluta/WinWidgets">
    <img src="https://img.shields.io/npm/v/anime-wallpaper.svg?logo=npm&logoColor=fff&label=Version&color=limegreen" alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/anime-wallpaper">
    <img src="https://img.shields.io/npm/v/anime-wallpaper.svg?logo=npm&logoColor=fff&label=NPM+package&color=red" alt="Anime Wallpaper on npm" />
  </a>
</p>
<p align="center"> 
    <img src="https://i.imgur.com/DeP0Nlv.jpeg">
</p>

#### [[Documentation](https://iseizuu.github.io/anime-wallpaper/)]

Get Anime wallpapers based on scrapping from websites.
* [4K Wallpapers](https://free4kwallpapers.com/)
* [Wall Haven](https://wallhaven.cc)
* [ZeroChan](https://www.zerochan.net)
* [Wallpapers.com](https://wallpapers.com)
* [Hoyolab](https://www.hoyolab.com/) (New)
* [Pinterest](https://pinterest.com/) (New)
<br>

[![Version](https://nodei.co/npm/anime-wallpaper.png?compact=true)](https://nodei.co/npm/anime-wallpaper)

# Installing
```
npm install anime-wallpaper
```
or
```
yarn add anime-wallpaper
```

# Example Usage from Website
At the head of your file, start by importing the necessary classes
```js
const { AnimeWallpaper, AnimeSource } = require('anime-wallpaper');
const wallpaper = new AnimeWallpaper();
```

- Getting a random wallpaper from [4K Wallpapers](https://free4kwallpapers.com/) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.random();
return console.log(wallpaper)
```

- Getting Wallpaper from [WallHaven](https://wallhaven.cc) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wall.search({ title: "firefly honkai", page: 1, type: "sfw", aiArt: true }, AnimeSource.WallHaven);
return console.log(wallpaper)
```

- Getting Wallpaper from [Wallpapers.com](https://wallpapers.com) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Keqing" }, AnimeSource.Wallpapers);
return console.log(wallpaper)
```

- Getting Wallpaper from [ZeroChan](https://www.zerochan.net) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Misaka Mikoto" }, AnimeSource.ZeroChan);
return console.log(wallpaper)
```

# Hoyolab Example
- Get fanart from hoyolab <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wall.hoyolab({ game: "GenshinImpact", postType: "Trending" });
return console.log(wallpaper)
```
#### Result
```txt
{
  data: {
    list: [
      {
        game: {...},
        post: {...},
        topics: [{...}]
        user: {...}
      }
    ]
  }
}

```

# Pinterest
- Getting image from pinterest <img align="center" width="20" src="https://cdn3.emoji.gg/emojis/5505-idle-status.png">

```js
const wallpaper = await wall.pinterest("Ellen Joe ZzZ");
return console.log(wallpaper)
```

- nb: sometimes it might be fail when scraping pinterest, just try again and over again :>

## Warning
In some rare cases, the fetching process might fail due to inconsistencies when scraping websites.<br><br>


# Contributors
Fork then clone the project and install its dependencies:
```
npm i
```

In the root folder of the project type the following to compile the .ts into .js
```
tsc
```

<hr>

© [Aizuu](https://github.com/iseizuu)
