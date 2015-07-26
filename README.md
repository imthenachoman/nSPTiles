# nSPTiles

http://imthenachoman.github.io/nSPTiles/

**nSPTiles** is an easy to use JavaScript library for Windows style live tiles for SharePoint with numerous styling options and an admin GUI.

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

You know those live tiles that Windows 8 has? **nSPTiles** is a library that lets you create something like them in SharePoint.

**nSPTiles** is my my own version of (and wouldn't have been possible without) [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz"). You can find his at http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/.

After I started using [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) more and more I had a need for some enhancements and additional features -- specifically a DVWP way to render the tiles so they load faster. And so I set out to address my needs and ended up with **nSPTiles**.

### How It Works

The first time you use **nSPTiles** a SharePoint list is created. The list will be used to hold the tile data. It has numerous fields/columns for the various tile options/settings. There are also numerous calculated columns that are used by **nSPTiles**.

***It is important that you do not change any of the list settings,       especially the calculated columns.***

### Features

 - **nSPTiles** is self-contained and does not need any additional JavaScript libraries like jQuery
 - uses SharePoint's built-in list system
 - GUI to help with tile placement
 - CEWP/JavaScript or DVWP for rendering
 - each tile can have:
  - a link
  - a background color
  - a tile image
  - a [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ "Font-Awesome") icon (*requires FA be [configured](http://fortawesome.github.io/Font-Awesome/get-started/))
  - a tile heading
  - slider text that slides up on hover
  - different color/image/FA/heading when the mouse is over a tile (hovering)
 - quickly specify placement for tile image, Font-Awesome icon, heading text and slider text without custom CSS
 - numerous pre-set styling options
 - additional styling can be applied with custom CSS
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

These instructions assume you know your way around SharePoint (how to upload files and edit them, add CEWPs or DVWPs and edit their configuration options, call JavaScript functions, etc...)

The very first time you use **nSPTiles** follow the [CEWP](#use-a-cewp-to-render-tiles) instructions.

### Use A CEWP To Render Tiles

*If this is the first time you're using **nSPTiles** then download nSPTiles.1.0.zip and extract the files to a document library in your SharePoint site*

 1. add a CEWP to a WebPart page and add code like below (either directly in the CEWP source code editor or link to an HTML file)

    ```
    <script src="nSPTiles.1.0.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="font-awesome.min.css">
    <div id="nachoTiles"></div>
    <script type="text/javascript">
        nSPTiles.init("nachoTiles", "group one");
    </script>
    ```
 2. make sure to provide the correct path to `nSPTiles.1.0.min.js` or `nSPTiles.1.0.js`
 3. (*optional*) update the path to the Font-Awesome CSS if you want to use Font-Awesome
 4. update the `id` of the `div` where you want the tiles to be rendered in (`nachoTiles` in the above example)
 5. in the `nSPTiles.init` call update the parameters as necessary (check [below](#cewp-javascript-configuration) for details)
 6. save everything and reload the page

*The first time you use **nSPTiles** you will see a message like this. Follow the instructions to create the `nSPTiles` list.*

![enter image description here](https://cloud.githubusercontent.com/assets/83817/8887698/8747710a-325b-11e5-8107-1c97315c14d6.PNG)

### CEWP JavaScript Configuration

The `nSPTiles.init` function takes three parameters:

    nSPTiles.init(ID, groupName)
 
 -- OR --
 
     nSPTiles.init(ID, groupName, configOptions)

Paramater Reference:

parameter | required | explanation
--- | --- | ---
`ID` | yes | the ID of the `div` where you want the tiles to be created
`groupName` | yes | the name of the tiles group to use
`configOptions` | optional | a configuration object with the following options:<br /><br /><table><thead><tr><th>option</th><th>type</th></tr></thead><tbody><tr><th>animationTime</th><td>number</td><td>the number of milliseconds tile animations should take</td></tr><tr><th>animationTypeOn</th><td>string</td><td>the type of animationt to use when the mouse enters a tile (for zooming and sliding); options are:<ul><li>slide</li><li>bounce</li><li>elastic</li></ul></td></tr><tr><th>animationTypeOff</th><td>string</td><td>the animation type to use when the mouse leaves a tile; same options as above</td></tr></tbody></table>

Examples:

    nSPTiles.init("nachoTiles", "group 1", {animationTime: 250});
    nSPTiles.init("nachoTiles", "group 2", {animationTypeOn: "bounce"});
    nSPTiles.init("nachoTiles", "group 3", {animationTypeOff: "slide"});
    nSPTiles.init("nachoTiles", "group 4", {
	    animationTime: 250,
	    animationTypeOn: "bounce",
	    animationTypeOff: "elastic"
    });

### Use a DVWP To Render Tiles

The above method uses a CEWP to 

## Compatibility

I have tested **nSPTiles** in the following environments as these are all I have access to.

SharePoint Version | IE | Chrome | FireFox
--- | --- | --- | ---
2010 Foundation | IE 11 | Chrome 44 | Firefox 39
2010 Server | IE 11 | Chrome 44 | -

If anyone is able to test on other SharePoint installations and/or browsers I would appreciate feedback.
