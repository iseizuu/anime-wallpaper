<h1 align="center">Anime Wallpaper</h1>
<p align="center"> 
    <img src="https://i.imgur.com/DeP0Nlv.jpeg">
</p>

Get Anime wallpapers based on scrapping from websites.
* [4K Wallpapers](https://free4kwallpapers.com/)
* [Wall Haven](https://wallhaven.cc)
* [ZeroChan](https://www.zerochan.net)
<br>

[![Version](https://nodei.co/npm/anime-wallpaper.png?compact=true)](https://nodei.co/npm/anime-wallpaper)
###### [Documentation](https://iseizuu.github.io/anime-wallpaper/)

# Installing
```
npm install anime-wallpaper
```

# Example Usage
- Getting a random wallpaper from [4K Wallpapers](https://free4kwallpapers.com/) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.random();
```

- Getting Wallpaper from [WallHaven](https://wallhaven.cc) <img align="center" width="15" src="https://cdn.discordapp.com/emojis/735119429016485920.webp?size=128&quality=lossless">

```js
const wallpaper = await wallpaper.search({ title: "Misaka Mikoto" }, AnimeSource.WallHaven);
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
