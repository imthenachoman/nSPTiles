# nSPTiles

**nSPTiles** is an customizable and easy to use JavaScript library for Windows style live tiles for SharePoint complete with an admin GUI.

http://imthenachoman.github.io/nSPTiles/

![screenshot](https://cloud.githubusercontent.com/assets/83817/8892362/e50bd494-3322-11e5-9b36-fb0aebf98a1d.PNG)

## Table of Contents

 1. Overview
	 2. Features
	 3. Screenshots
 4. How To Use
	 5. Compatibility
	 6. Configuration / Installation
	 7. 

## Overview

You know those live tiles that Windows 8+ has? **nSPTiles** is a library that lets you create something like them in SharePoint.

**nSPTiles** is my my own version of (and wouldn't have been possible without) [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz"). You can find his at http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/.

After I started using [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) more and more I had a need for some enhancements and additional features -- specifically a DVWP way to render the tiles so they load faster. And so I set out to address my needs and ended up with **nSPTiles**.



### Features

 - uses SharePoint's built-in list system to house tile data so tile configuration is super easy
 - the list can store multiple tile groups so you can have different sets of tiles for different pages/sections 
 - GUI to help with tile placement when creating/moving tiles
 - GUI to help picking the right tile when you want to edit or delete one
 - tiles can be rendered by calling JavaScript in a CEWP or by using a provided DVWP
 - tiles can be links
 - each tile can have:
  - a background color
  - a tile image
  - a [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ "Font-Awesome") icon (*requires FA be [configured](http://fortawesome.github.io/Font-Awesome/get-started/))
  - a tile heading
  - slider content that slides up on hover
 - you can specify a location within the tile for the tile image, Font-Awesome icon, heading text and slider text without having to use custom CSS
 - there are numerous pre-set styling options but you can also style anything however you like using your own CSS
 - **nSPTiles** is self-contained and does not need any additional JavaScript libraries like jQuery
 - three tile animation options (slide, bounce and elastic)

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

These instructions assume you know your way around SharePoint (how to upload files and edit them, add CEWPs and edit their configuration options, call JavaScript functions, etc...)

### Compatibility

I have tested **nSPTiles** in the following environments as these are all I have access to.

SharePoint Version | IE | Chrome | FireFox
--- | --- | --- | ---
2010 Foundation | IE 11 | Chrome 44 | Firefox 39
2010 Server | IE 11 | Chrome 44 | -

If anyone is able to test on other SharePoint installations and/or browsers I would appreciate feedback.

### Configuration / Installation

 1. download the [nSPTiles.1.0.zip](https://github.com/imthenachoman/nSPTiles/blob/master/nSPTiles.1.0.zip?raw=true), extract the files to a document library in your SharePoint site
 2. add a CEWP to a WebPart page and add code like below (either directly in the CEWP source code editor or link to an HTML file)

    ```
    <script src="nSPTiles.1.0.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="font-awesome.min.css">
    <div id="nachoTiles"></div>
    <script type="text/javascript">
        nSPTiles.init("nachoTiles", "group one");
    </script>
    ```
 3. make sure to provide the correct path to `nSPTiles.1.0.min.js` or `nSPTiles.1.0.js`
 4. (*optional*) update the path to the Font-Awesome CSS if you want to use Font-Awesome
 5. update the `id` of the `div` as you want (`nachoTiles` in the above example)
 6. in the `nSPTiles.init` call update the parameters as necessary (check here for details)
 7. save everything and reload the page

If everything worked properly you should see a message like the first [screenshot](#screenshots). Follow the instructions to create the list. 

When it is done creating the list if you hover over the `div` where the tiles are (or will be) then you'll see admin links that will let you add, move, edit, or delete tiles.

You can use a [CEWP](#cewp) or a [DVWP](#dvwp) to show tiles on a page.

### CEWP

To use a CEWP follow the same instructions in [Configuration / Installation](#configuration--installation). The `nSPTiles.init` function takes three parameters:

    nSPTiles.init(ID, groupName)
 
 -- OR --
 
     nSPTiles.init(ID, groupName, configOptions)

parameter | required | explanation
--- | --- | ---
`ID` | yes | the ID of the `div` where you want the tiles to be created
`groupName` | yes | the name of the tiles group to use
`configOptions` | optional | a configuration object<table><tr><th>option</th></tr><tr><td>a</td></tr></table>

a configuration object with these options:

option | type | explanation
--- | --- | ---
`animationTime` | number | 
`animationType` | string | 


### DVWP

The above method uses a CEWP to 
