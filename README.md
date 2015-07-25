# nSPTiles

**nSPTiles** is JavaScript library for SharePoint to create Windows style live tiles complete with a GUI for tile creation.

http://imthenachoman.github.io/nSPTiles/

## Table of Contents

 1. Overview
 2. d
 3. d

## Overview

You know those live tiles that Windows 8+ has? **nSPTiles** is a library that lets you create something like them in SharePoint.

**nSPTiles** is my my own version of (and wouldn't have been possible without) the [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") created by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz"). You can find his at http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/.

After I started using SPJS-Tiles more and more I had a need for some enhancements and additional features -- specifically a DVWP way to render the tiles so they load faster. And so I set out to address my needs and ended up with **nSPTiles**.

*(todo: I'll add a screenshot of a completed tile group when I get a moment)*

### Features

 - GUI to help with tile placement when creating/moving tiles
 - GUI to help picking the right tile when you want to edit or delete one
 - uses SharePoint's built-in list system to house tile data so the rest of the configuration is super easy
 - multiple tile groups so you can show different tiles on different pages/sections 
 - tiles can be rendered by calling JavaScript in a CEWP or by using a provided DVWP
 - tiles can be links
 - each tile can have:
  - a background color
  - a tile image
  - a [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ "Font-Awesome") icon (*requires the FA configuration/installation)
  - a tile heading
  - a slider content that slides up on hover
 - you can specify a location within the tile for the tile image, Font-Awesome icon, heading text and slider text
 - there are numerous pre-set styling options but you can also style anything however you like using your own CSS

### Screenshots

Screenshot | Description
--- | ---
<img src="https://cloud.githubusercontent.com/assets/83817/8887698/8747710a-325b-11e5-8107-1c97315c14d6.PNG" width="150px"> | On first use **nSPTiles** will ask you to create the list used to store all tile data.
<img src="https://cloud.githubusercontent.com/assets/83817/8887699/87487b86-325b-11e5-86fb-1e2d93ccbedd.PNG" width="150px"> | The list has been created.
<img src="https://cloud.githubusercontent.com/assets/83817/8887700/874a9c2c-325b-11e5-870f-3b0ba78ded20.PNG" width="150px"> | If you have access to add items to the list then when you hover your mouse over the tiles it will let you use a GUI to add, move, edit or delete tiles.
<img src="https://cloud.githubusercontent.com/assets/83817/8887701/874d7384-325b-11e5-8ffc-b62adec148f1.PNG" width="150px""> | The GUI to add a new tile...
<img src="https://cloud.githubusercontent.com/assets/83817/8887703/87503a2e-325b-11e5-9a0f-6367595cd56d.PNG" width="150px"> | The GUI to add a new tile...
<img src="https://cloud.githubusercontent.com/assets/83817/8887702/874fb6c6-325b-11e5-89d0-5f00b31ce54b.PNG" width="150px"> | The added tile.

## How To Use

These instructions assume you know your way around SharePoint: how to upload files and edit them, add CEWPs and edit their configuration options, etc...

### Compatibility

I only have access to a SharePoint 2010 Foundation server along with IE 11, Chrome, and FireFox and **nSPTiles** works fine on those. 

If anyone is able to test on other SharePoint installations and/or browsers I would appreciate feedback.

### Files

\# | File | Purpose
--- | --- | ---
1 | [`nSPTiles.1.0.js`](https://raw.githubusercontent.com/imthenachoman/nSPTiles/master/nSPTiles.1.0.js) or [`nSPTiles.1.0.min.js`](https://raw.githubusercontent.com/imthenachoman/nSPTiles/master/nSPTiles.1.0.min.js) | the main JavaScript file for **nSPTiles**
2 | [`nSPTiles.1.0.html`](https://raw.githubusercontent.com/imthenachoman/nSPTiles/master/nSPTiles.1.0.html) | the HTML file to add to a `CEWP` to create the `nSPTiles` list and render tiles
3 | [`nSPTiles.1.0.webpart`](https://raw.githubusercontent.com/imthenachoman/nSPTiles/master/nSPTiles.1.0.webpart) | a `DVWP` file that can be uploaded and added as a WebPart

* I'll use the `#` as reference below.

### Configure // Use

Before you can use **nSPTiles** a SharePoint list has to be created. To do this:

 1. download and upload `1` and `2` to your SharePoint site
 2. edit `2`:
	- update the `src` to path of `1`
	- (optional) update the `href` for Font-Awesome
	- (optional) update the `id` of the `div` and first paramater in the `nSPTiles.init` call (e.g. `nachoSlider`)
	- update the 2nd parameter in the `nSPTiles.init` call to what you want your first tile group to be called (e.g. `test 1`)
 3. create a WebPart page on your SharePoint site
 4. add a CEWP to the WebPart page
 5. point the CEWP to the path of `2`
 6. refresh the page

If everything worked properly you should see a message like the first [screenshot](#screenshots). Follow the instructions to create the list.

When it is done creating the list if you hover over the `div` where the tiles are (or will be) then you'll see admin links that will let you add, move, edit, or delete tiles.
