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

### Compatibility

I only have access to a SharePoint 2010 Foundation server along with IE 11, Chrome and FireFox and **nSPTiles** works fine on those. 

If anyone is able to test on other SharePoint installations and/or browsers I would appreciate feedback.

