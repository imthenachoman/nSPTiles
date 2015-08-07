# nSPTiles

http://nsptiles.js.org || http://imthenachoman.github.io/nSPTiles/

**nSPTiles** is an easy to use JavaScript library for Windows style live tiles for SharePoint with numerous styling options and an admin GUI.

![screenshot](https://cloud.githubusercontent.com/assets/83817/8892362/e50bd494-3322-11e5-9b36-fb0aebf98a1d.PNG)

## Table of Contents

 1. [Overview](#overview)
	 2. [How It Works](#how-it-works)
	 3. [Features](#features)
	 4. [Screenshots](#screenshots)
 5. [How To Use](#how-to-use)
	 6. [Use A CEWP To Render Tiles](#use-a-cewp-to-render-tiles)
	 7. [CEWP JavaScript Reference](#cewp-javascript-reference)
	 8. [GUI](#gui)
	 9. [Use a DVWP To Render Tiles](#use-a-dvwp-to-render-tiles)
	 10. [DVWP Paramater Reference](#dvwp-paramater-reference)
	 11. [nSPTiles List Reference](#nsptiles-list-reference)
 11. [Compatibility](#compatibility)
 12. [Change Log](#change-log)
 13. [To Do / Enhancement Requests](#to-do--enhancement-requests)
 14. [Support / Issues / Contact / Help](#support--issues--contact--help)
 15. [References, Acknowledgement, and Gratitude](#references-acknowledgement-and-gratitude)
 16. [License](#license)

## Overview

You know those live tiles that Windows 8 has? **nSPTiles** is a library that lets you create something like them in SharePoint.

**nSPTiles** is my my own version of (and wouldn't have been possible without) [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz"). You can find his at http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/.

After I started using [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) more and more I had a need for some enhancements and additional features -- specifically a DVWP way to render the tiles so they load faster. And so I set out to address my needs and ended up with **nSPTiles**.

### How It Works

The first time you use **nSPTiles** a SharePoint list is created. The list will be used to hold the tile data. It has numerous fields/columns for the various tile options/settings. There are also numerous calculated columns that are used internally by **nSPTiles**.

After the list is created you can add items to the list. Each item in the list is a different tile. Tiles can be grouped by using the same [`group name`](#groupName). This way you can render different tiles on different pages/sections.

***It is important that you do not change any of the list settings,       especially the calculated columns.***

### Features

 - **nSPTiles** is self-contained and does not need any additional JavaScript libraries like jQuery
 - uses SharePoint's built-in list system
 - [GUI](#gui) to help with tile placement
 - [CEWP/JavaScript](#use-a-cewp-to-render-tiles) or [DVWP](#use-a-dvwp-to-render-tiles) for rendering
 - each tile can [have](#nsptiles-list-reference):
  - a link
  - a background color
  - a tile image
  - a [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ "Font-Awesome") icon (*requires FA be [configured](http://fortawesome.github.io/Font-Awesome/get-started/))
  - a tile heading
  - slider text that slides up on hover
  - different color/image/FA/heading when the mouse is over a tile (hovering)
 - quickly specify [placement](#position) for tile image, Font-Awesome icon, heading text and slider text without custom CSS
 - numerous pre-set styling options
 - additional styling can be applied with custom CSS
 - three tile [animation](#animationTypeOn) options (slide, bounce and elastic)

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

\*\*\* *If this is the first time you're using* ***nSPTiles*** *then download [nSPTiles.min.js](http://imthenachoman.github.io/nSPTiles/files/nSPTiles.min.js) and upload it to a document library in your SharePoint site. You'll need to know it's path later.* \*\*\*

Using a CEWP uses client-side JavaScript to pull information from the `nSPTiles` list using SharePoint's REST API. The code is configured to run on page load which means the tiles will be visible before the page is drawn, however, it does add a slight delay to the page load.

 1. add a CEWP to a WebPart page and add code like below (either directly in the CEWP source code editor or link to an HTML file)

    ```html
    <script src="nSPTiles.1.0.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="font-awesome.min.css">
    <div id="nachoTiles"></div>
    <script type="text/javascript">
        nSPTiles.init("nachoTiles", "group one");
    </script>
    ```
 2. make sure to provide the correct path to `nSPTiles.1.0.min.js`
 3. (*optional*) update the path to the Font-Awesome CSS if you want to use Font-Awesome
 4. update the `id` of the `div` where you want the tiles to be rendered in (`nachoTiles` in the above example)
 5. in the `nSPTiles.init` call update the parameters as necessary (check [below](#cewp-javascript-reference) for details)
 6. save everything and reload the page

\*\*\* *The first time you use* ***nSPTiles*** *you will see a message like this. Follow the instructions to create the `nSPTiles` list.* \*\*\*

![enter image description here](https://cloud.githubusercontent.com/assets/83817/8887698/8747710a-325b-11e5-8107-1c97315c14d6.PNG)

Now you can use the [GUI](#gui) to add/move/edit/delete tiles.

### CEWP JavaScript Reference

The `nSPTiles.init` function takes three parameters:

    nSPTiles.init(ID, groupName)
 
 -- OR --
 
     nSPTiles.init(ID, groupName, configOptions)

Paramater Reference:

parameter | required | explanation
--- | --- | ---
`ID` | yes | the ID of the `div` where you want the tiles to be created
`groupName` | yes | the name of the tiles group to use
`configOptions` | optional | a configuration object with the following options:<br /><br /><table><tbody><tr><th>animationTime</th><td>number</td><td>the number of milliseconds tile animations should take</td></tr><tr><th><a name="animationTypeOn"></a>animationTypeOn</th><td>string</td><td>the type of animation to use when the mouse enters a tile (for [zooming](#zoom) and sliding); options are:<br /><br /><ul><li>slide</li><li>bounce</li><li>elastic</li></ul></td></tr><tr><th>animationTypeOff</th><td>string</td><td>the type of animation to use when the mouse leaves a tile; same options as above</td></tr></tbody></table>

Examples:

    nSPTiles.init("nachoTiles", "group 1", {animationTime: 250});
    nSPTiles.init("nachoTiles", "group 2", {animationTypeOn: "bounce"});
    nSPTiles.init("nachoTiles", "group 3", {animationTypeOff: "slide"});
    nSPTiles.init("nachoTiles", "group 4", {
	    animationTime: 250,
	    animationTypeOn: "bounce",
	    animationTypeOff: "elastic"
    });

### GUI

If you have permissions to add items to the `nSPTiles` list then when you hover over the area where the tiles are (or should/would be) then you'll see admin links that will let you **add**, **move**, **edit**, or **delete** tiles. The **add** and **move** options will let you use a GUI to draw where you want the tile to be within the container. The **move**, **edit**, and **delete** options will let you select a tile you want to work on.

![enter image description here](https://cloud.githubusercontent.com/assets/83817/8887700/874a9c2c-325b-11e5-870f-3b0ba78ded20.PNG)

### Use a DVWP To Render Tiles

UNDER CONSTRUCTION

### DVWP Paramater Reference

UNDER CONSTRUCTION

### nSPTiles List Reference

UNDER CONSTRUCTION

Here are all the tile options and what they mean. Each one maps to a column/field in the `nSPTiles` list. Not all fields are required and not all fields are relevant depending on other settings.

option (field/column name) | description
--- | ---
WIP | WIP

<a name="position">**Position Options**</a>

The various options that have a related position option allow you to have control of placement within the tile. The choices are:

 - top left
 - top center
 - top right
 - middle left
 - middle center
 - middle right
 - bottom left
 - bottom center
 - bottom right

<a name="color">**Color Options**</a>

For the various options that have a color option you can specify a color using an HTML/CSS friendly color name or a CSS class name prefixed with a `.`.

Using a class name makes it easier if you have pre-defined CSS classes in a style-sheet with the colors you want. Keep in mind CSS class definitions that apply other non-color settings could have undesirable effects.

Examples:

 - `#ff00ff`, `#f0f0f0`
 - `#f0f`, `#ff0`
 - `rgb(0, 100, 200)`
 - `yellow`
 - `.themeColor1`, `.themeColor2`, `.themeColor2` (notice the `.` before the class name)

## Compatibility

I have tested **nSPTiles** in the following environments as these are all I have access to.

SharePoint Version | IE | Chrome | FireFox
--- | --- | --- | ---
2010 Foundation | IE 11 | Chrome 44 | Firefox 39
2010 Server | IE 11 | Chrome 44 | -

If anyone is able to test on other SharePoint installations and/or browsers, or knows where I can access/test on other SharePoint installations, I would appreciate feedback.

### Change Log

version | updates
--- | ---
1.0 | initial release

### To Do / Enhancement Requests

 1. [x] publish initial 1.0 release
 2. [x] allow an alternate WebURL to use `nSPTiles` from a different SP site
 3. [x] allow running a custom function on tile click (can be used to run custom code to do things like Piwik click tracking)
 4. [ ] real-time preview of tiles in the data sheet view of the `nSPTiles` list so you can see the effect of your changes immediately
 5. [ ] ...waiting for ideas/enhancement from users

### Support / Issues / Contact / Help

If you are familiar with [GitHub](https://github.com) and know how to submit issues then please do so at https://github.com/imthenachoman/nSPTiles/issues. Or if you prefer you can e-mail me at imthenachoman (at) gmail (dot) com

### References, Acknowledgement, and Gratitude

 - [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") (http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz") for creating the original tiling system for SharePoint
 - [cross-browser requestAnimationFrame](https://gist.github.com/paulirish/1579671) (https://gist.github.com/paulirish/1579671) by Erik Möller
 - [generic animation using requestAnimationFrame](http://www.sitepoint.com/simple-animations-using-requestanimationframe/) (http://www.sitepoint.com/simple-animations-using-requestanimationframe/) by Dmitri Lau
 - [jQuery's easing functions](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js) (https://github.com/danro/jquery-easing/blob/master/jquery.easing.js) by George McGinley Smith

### License

[MIT License](https://github.com/imthenachoman/nSPTiles/blob/master/LICENSE) -  https://github.com/imthenachoman/nSPTiles/blob/master/LICENSE
