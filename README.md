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

Get Anime wallpapers based on scrapping from websites.
* [4K Wallpapers](https://free4kwallpapers.com/)
* [Wall Haven](https://wallhaven.cc)
* [ZeroChan](https://www.zerochan.net)
* [Wallpapers.com](https://wallapapers.com)
<br>

[![Version](https://nodei.co/npm/anime-wallpaper.png?compact=true)](https://nodei.co/npm/anime-wallpaper)
###### [Documentation](https://iseizuu.github.io/anime-wallpaper/)

# Installing
```
npm install anime-wallpaper
```

# Example Usage
At the head of your file, start by importing the necessary classes
```js
const { AnimeWallpaper, AnimeSource } = require('anime-wallpaper');
const wallpaper = new AnimeWallpaper();
```

- Getting a random wallpaper from [4K Wallpapers](https://free4kwallpapers.com/) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.random();
```

- Getting Wallpaper from [WallHaven](https://wallhaven.cc) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Misaka Mikoto" }, AnimeSource.WallHaven);
```

- Getting Wallpaper from [Wallpapers.com](https://wallpapers.com) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Keqing" }, AnimeSource.Wallpapers);
```

- Getting Wallpaper from [ZeroChan](https://www.zerochan.net) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Misaka Mikoto" }, AnimeSource.ZeroChan);
```
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
