# vite-plugin-blurhash
## Install
```bash
npm i vite-plugin-blurhash -D # yarn add vite-plugin-md -D
```

Add it to `vite.config.js`
```js
import Blurhash from 'vite-plugin-blurhash'

export default{
	plugins:[
		...plugins,
		Blurhash() //Hashing images from /src/assets/images
	]
}
```

## Use
Blurhash strings are saved as a camelcase version of the file name and path from the root. For example if you use the default image directory `/src/assets/images`, and your file structure looks like this:
```
- images
--- rick-and-morty.png
--- blog-images
-------- solar-opposites.png
```

You would get blurhash strings at the following variables:
```js
rickAndMortyPng
blogImagesSolarOppositesPng
```
Use the hash strings anywhere inside the app. Maybe with something like [vue-blurhash](https://github.com/damienroche/vue-blurhash).

```html
<template>
  <blur-hash-image
    width="400"
    height="300"
    :hash="rickAndMortyPng"
    src="https://images.unsplash.com/photo-1545910684-8e7c081be9b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
    alt="green lawn grass during daytime"
  />
</template>
```

Your blurhash strings are also stored inside `/src/assets/images/blurhash-map.json`, so you can feel free to import from there as well.

## Options
```js
Blurhash({
	imageDir?:  string  |  boolean, //Where to look for images to hash, or false. Default /src/assets/images
	mapPath?:  string, //Where should the hash map be stored, or false. Default /src/assets/images/blurhash-map.json
	define?:  boolean, //Should we define the hashes as vite variables. Default true
	images?:  Images, //Additional images to hash. { [key: string]: string }
	log?:  boolean, //Should we log progress as we hash
})
```
## Images
You can define images to hash, and their variables names in this option. Images here can be local paths are urls.

```js
Blurhash({
	images: {
		waterMelon:  'https://solidstarts.com/wp-content/uploads/when-can-babies-eat-watermelon.jpg',
		flamingo:  '/src/assets/flamingo.jpg'
	}
})
```
Now you'll have access to waterMelon and flamingo inside the app.

## Other options
* **_Define_**: Should we store the resulting hashes inside of vite variables. Defaults to true.
* **_Log_**: Should we log progress as we hash. Defaults to true.
* **_imageDir_**: Where to look for images to hash, or false to not look for images inside of a directory. This means that we will only look for images inside of the images parameter. Defaults to `/src/assets/images`.
* **_mapPath_**: Where should the hash map be stored, or false to not store it. Defaults to `/src/assets/images/blurhash-map.json`.

## Thanks
* 🌫 [woltapp/blurhash](https://github.com/woltapp/blurhash) - the original blurhash library.
* ⚡️ [vite](vitejs.dev) - it's rad.
* 🙏 [@antfu](https://github.com/antfu) - learned a lot from his work.
* All the other great libs used in this [project](https://github.com/nickgraffis/vite-plugin-blurhash/blob/main/package.json).