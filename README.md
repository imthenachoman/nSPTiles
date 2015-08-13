# nSPTiles

**nSPTiles** is an easy to use JavaScript library for Windows style live tiles for SharePoint with numerous styling options and an admin GUI.

![screenshot](https://cloud.githubusercontent.com/assets/83817/8892362/e50bd494-3322-11e5-9b36-fb0aebf98a1d.PNG)

## Table of Contents

 1. [Overview](#overview)
	 2. [How It Works](#how-it-works)
	 3. [Features](#features)
	 4. [Screenshots](#screenshots)
 5. [How To Use](#how-to-use)
	 6. [Download / Files](#download--files)
	 7. [First Time Use / Use A CEWP To Render Tiles](#first-time-use--use-a-cewp-to-render-tiles)
	 8. [CEWP JavaScript Reference](#cewp-javascript-reference)
	 9. [GUI](#gui)
	 10. [Use a DVWP To Render Tiles](#use-a-dvwp-to-render-tiles)
	 11. [DVWP Paramater Reference](#dvwp-paramater-reference)
	 12. [nSPTiles List Reference](#nsptiles-list-reference)
 11. [Compatibility](#compatibility)
 12. [Change Log](#change-log)
 13. [To Do / Enhancement Requests](#to-do--enhancement-requests)
 14. [Support / Issues / Contact / Help](#support--issues--contact--help)
 15. [References, Acknowledgement, and Gratitude](#references-acknowledgement-and-gratitude)
 16. [License](#license)
 17. [Disqus](#disqus)

## Overview

You know those live tiles that Windows 8 has? **nSPTiles** is a library that lets you create something like them in SharePoint.

**nSPTiles** is my my own version of (and wouldn't have been possible without) [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz"). You can find his at http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/.

After I started using [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) more and more I had a need for some enhancements and additional features -- specifically a DVWP way to render the tiles so they load faster. And so I set out to address my needs and ended up with **nSPTiles**.

### How It Works

The first time you use **nSPTiles** a SharePoint list called `nSPTiles#` is created. The list will be used to hold the tile data. It has numerous fields/columns for the various tile options/settings. There are also numerous calculated columns that are used internally by **nSPTiles**.

After the list is created you can add items to the list. Each item in the list is a different tile. Tiles can be grouped by using the same [`group name`](#groupName). This way you can render different tiles on different pages/sections.

***It is important that you do not change any of the list settings,       especially the calculated columns.***

### Features

 - **nSPTiles** is self-contained and does not need any additional JavaScript libraries like jQuery
 - uses SharePoint's built-in list system
 - [GUI](#gui) to help with tile placement
 - [CEWP/JavaScript](#first-time-use--use-a-cewp-to-render-tiles) or [DVWP](#use-a-dvwp-to-render-tiles) for rendering
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

The very first time you use **nSPTiles** follow the [CEWP](#first-time-use--use-a-cewp-to-render-tiles) instructions.

### Download / Files

Download the latest `nSPTiles.#.#.zip` file from https://github.com/imthenachoman/nSPTiles/releases. It consists of:

File Name | Description | Destination
--- | --- | ---
nSPTiles.min.js | **nSPTiles** javascript (packed using http://dean.edwards.name/packer/) | upload to your SharePoint site; you will need it's path
dvwp.webpart | DVWP WebPart to use if the **nSPTiles** list exists on the same SharePoint site | save on your computer
dvwp_webURL.webpart | DVWP WebPart to use if the **nSPTiles** list exists on another WebURL/site | save on your computer

### Installation

Upload the `nSPTiles.min.js` file to a document library in your SharePoint site. You will need to know it's path later.

### First Time Use / Use A CEWP To Render Tiles

\*\*\*
*The first time you use* ***nSPTiles*** *you will see a message like this. Follow the instructions to create the `nSPTiles#` list.
* \*\*\*

![enter image description here](https://cloud.githubusercontent.com/assets/83817/8887698/8747710a-325b-11e5-8107-1c97315c14d6.PNG)

A CEWP uses client-side JavaScript to pull information from the `nSPTiles#` list using SharePoint's REST API. The code is configured to run on page load which means the tiles should be visible before the page is drawn, however, this does add a slight delay to the page load.

 1. add a CEWP to a WebPart page and add code like below (either directly in the CEWP source code editor or link to an HTML file)

    ```html
    <script src="<nSPTiles.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="font-awesome.min.css">
    <div id="nachoTiles"></div>
    <script type="text/javascript">
        nSPTiles.init("nachoTiles", "group one");
    </script>
    ```
 2. make sure to provide the correct path to `nSPTiles.min.js`
 3. (*optional*) update the path to the Font-Awesome CSS if you want to use Font-Awesome
 4. update the `id` of the `div` where you want the tiles to be rendered in (`nachoTiles` in the above example)
 5. in the `nSPTiles.init` call update the parameters as necessary (check [below](#cewp-javascript-reference) for details)
 6. save everything and reload the page

Now you can use the [GUI](#gui) to add/move/edit/delete tiles.

### CEWP JavaScript Reference

The `nSPTiles.init` function takes three parameters:

    nSPTiles.init(ID, groupName)
 
 -- OR --
 
     nSPTiles.init(ID, groupName, configOptions)

Paramater Reference:

parameter | required | explanation
--- | --- | ---
`ID` | yes | the ID of the `div` where you want the tiles to be created in (`nachoTiles` in the above example)
<a name="groupName">`groupName`</a> | yes | the name of the tiles group to use (`group one` in the above example)
`configOptions` | optional | a configuration object with the following options:<br /><br /><table><tbody><tr><th><a name="animationTime">animationTime</a></th><td>number</td><td>the number of milliseconds tile animations should take</td></tr><tr><th><a name="animationTypeOn"></a>animationTypeOn</th><td>string</td><td>the type of animation to use when the mouse enters a tile (for [zooming](#zoom) and sliding)<br /><br />options are:<br /><br /><ul><li>slide</li><li>bounce</li><li>elastic</li></ul></td></tr><tr><th><a name="animationTypeOff">animationTypeOff</a></th><td>string</td><td>the type of animation to use when the mouse leaves a tile; same options as above</td></tr><tr><th><a name="webURL">webURL</a></th><td>string</td><td>URL of the web where the nSPTiles list is (or should be created) (e.g. `'/'`, `'/subsite1'`, `'/subsite1/subsite2'`)</td></tr><tr><th><a name="onclick">onclick</a></th><td>function</td><td>function to call on tile clicks. can be used to run custom code like you would need for [Piwik](http://piwik.org/)'s click tracking. the function will be passed two paramaters: the url and the type of link the tile is.<br /><br />example:<br />`function(url, link){...}`</td></tr></tbody></table>

Examples:

    nSPTiles.init("nachoTiles", "group 1", {animationTime: 250});
    nSPTiles.init("nachoTiles", "group 2", {animationTypeOn: "bounce"});
    nSPTiles.init("nachoTiles", "group 3", {animationTypeOff: "slide"});
    nSPTiles.init("nachoTiles", "group 4", {
	    animationTime: 250,
	    animationTypeOn: "bounce",
	    animationTypeOff: "elastic"
    });
    nSPTiles.init("nachoTiles", "group 4", {
	    webURL: "/subsite"
    });
    nSPTiles.init("nachoTiles", "group 4", {
	    webURL: "/subsite/subsite",
	    onclick: function(url, type)
	    {
	        // register a click event in Piwik
	        _paq.push(['trackLink', url, 'link']);
	    }
    });

### GUI

If you have permissions to add items to the `nSPTiles#` list then when you hover over the area where the tiles are (or should/would be) then you'll see admin links that will let you **add**, **move**, **edit**, or **delete** tiles. The **add** and **move** options will let you use a GUI to draw where you want the tile to be within the container. The **move**, **edit**, and **delete** options will let you select a tile you want to work on.

![enter image description here](https://cloud.githubusercontent.com/assets/83817/8887700/874a9c2c-325b-11e5-870f-3b0ba78ded20.PNG)

### Use a DVWP To Render Tiles

\*\*\*\*\*\* **IMPORTANT** \*\*\*\*\*\*

**DO NOT add the DVWP WebPart to a page until [you've used a CEWP](#first-time-use--use-a-cewp-to-render-tiles) at least once so the `nSPTiles#` list has been created.**

\*\*\*\*\*\* **IMPORTANT** \*\*\*\*\*\*

A DVWP pulls the tile data on the server side in an XML format then passes it through an XSL transformation before it it sends to the browser for rendering. Because it is done server-side the page load should be slightly faster.

**NOTE**: Because of deficiencies in how SharePoint manages DVWP WebParts, if you need to use `dvwp_webURL.webpart` because your `nSPTiles#` list is on a different SharePoint site then you need to edit the file before you can upload it to a WebPart page. Open the file in any text editor, search for the string `/test` (should be line 269) and change it to the webURL path you need then save the file. For example: `/subsite`, `/sites/teamSite`, etc...

To add the DVWP to a WebPart page:

 1. add a WebPart like you normally would to the page
 2. use the upload option to upload and then add the DVWP file you want: `dvwp.webpart` or `dvwp_webURL.webpart`
 3. use the Parameters Editor option to change the parameters to your needs.

### DVWP Paramater Reference

DVWP paramaters look like this:

    ```xml
    <ParameterBinding Name="nSPTilesJSPath" Location="None" DefaultValue="nSPTiles.1.0.min.js"/>
    <ParameterBinding Name="FontAwesomeCSSPath" Location="None" DefaultValue="font-awesome.min.css"/>
    <ParameterBinding Name="GroupName" Location="None" DefaultValue="group one"/>
    <ParameterBinding Name="AnimationSpeedInMillisecond" Location="None" DefaultValue="100"/>
    <ParameterBinding Name="AnimationTypeOn" Location="None" DefaultValue="slide"/>
    <ParameterBinding Name="AnimationTypeOff" Location="None" DefaultValue="bounce"/>
    <ParameterBinding Name="TileOnClick" Location="None" DefaultValue="function(url,type){}"/>
    ```

Change the `DefaultValue` as you need.

Check [CEWP JavaScript Reference](#cewp-javascript-reference) for details on each parameter. The DVWP parameters match the respective JavaScript paramaters:

DVWP paramater name | CEWP paramater name | Note
--- | ---
nSPTilesJSPath | n/a | the path to the `nSPTiles.min.js` file
FontAwesoeCSSPath | n/a | optional path to the Font-Awesome CSS
GroupName | [groupName](#groupName)
AnimationSpeedInMillisecond | [animationTime](#animationTime)
AnimationTypeOn | [animationTypeOn](#animationTypeOn)
AnimationTypeOff | [animationTypeOff](#animationTypeOff)
TileOnClick | [onclick](#onclick) | the string value of `TileOnClick` can be a function string or a function name (i.e. `"function(url, type){}"` or `"someFunction"`)

### nSPTiles List Reference

Here are all the tile options and what they mean. Each one maps to a column/field in the `nSPTiles#` list. Not all fields are required and not all fields are relevant depending on other settings.

option (field/column name) | description
--- | ---
group name | the group this tile belongs to
active | can be used hide a tile without having to remove this entry
tile width | the width of the tile in px
tile height | the height of the tile in px
tile left offset | the left offset of the tile in px
tile top offset | the top offset of the tile in px
tile border width | the empty space around the tile in px
<a name="zoom">tile zoom on hover</a> | zoom effect for the tile by making the tile border width 0 when the mouse is over the tile
tile link type | the type of link to make
tile link URL | the URL for the link
is heading | heading tiles have no slider
tile background color | HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)
tile background opacity | opacity from 0 (transparent) to 100 (solid)<br /><br />leave blank for none
tile background color on hover | undefined
tile background opacity on hover | undefined
tile image URL | URL of image to use in tile (must be less then 255 characters)
tile image width | width of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)<br /><br />helpful if the image is larger then the icon
tile image height | height of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)<br />helpful if the image is larger then the icon
tile image opacity | opacity from 0 (transparent) to 100 (solid)<br />leave blank for none
tile image padding | how far from the edge of the tile should the image be in px
tile image style | css style to apply to the tile image (overrides above tile image options)
tile image position | position of the image in the tile
tile image URL on hover | undefined
tile image style on hover | undefined
tile FA class | Font Awesome icon class name
tile FA color | HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)
tile FA opacity | opacity from 0 (transparent) to 100 (solid)<br /><br />leave blank for none
tile FA padding | how far from the edge of the tile should the icon be in px
tile FA style | css style to apply to the FA icon (overrides above tile FA options)
tile FA position | position of the icon in the tile
tile FA class on hover | undefined
tile FA style on hover | undefined
heading content | can use HTML
heading bolded | should the heading text be bold
heading font color | HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)
heading font size | font size for the heading in px
heading padding | padding for the heading in px
heading style | css style to apply to heading (overrides above heading options)
heading position | position of the heading in the tile or slider heading
heading content on hover | undefined
heading style on hover | undefined
slider heading height | height of the header for the slider in px
slider body content | can use HTML
slider body font color | HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)
slider body font size | font size for the slider body in px
slider body padding | padding of the slider body in px
slider body style | css style to apply to slider body (overrides above slider body options)
slider body position | position of the slider body in the slider
slider background color | HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)
slider background opacity | opacity from 0 (transparent) to 100 (solid)<br /><br />leave blank for none
slider background color on hover | undefined
slider background opacity on hover | undefined
tile image and FA slider heading push | if the tile image and/or FA are positioned on the bottom then push them on top of the slider heading
tile custom ID | custom ID to use for the tile<br /><br />default is nTile_[ID] where ID is the ID of the entry in the list
tile custom class(es) | custom class(s) to add to the tile

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

## Change Log

version | updates
--- | ---
1.0 | initial release

## To Do / Enhancement Requests

 1. [x] publish initial 1.0 release
 2. [x] allow an alternate WebURL to use `nSPTiles#` from a different SP site
 3. [x] allow running a custom function on tile click (can be used to run custom code to do things like Piwik click tracking)
 4. [ ] real-time preview of tiles in the data sheet view of the `nSPTiles#` list so you can see the effect of your changes immediately
 5. [ ] ...waiting for ideas/enhancement from users

## Support / Issues / Contact / Help

If you are familiar with [GitHub](https://github.com) and know how to submit issues then please do so at https://github.com/imthenachoman/nSPTiles/issues. Or if you prefer you can e-mail me at imthenachoman (at) gmail (dot) com

## References, Acknowledgement, and Gratitude

 - [SPJS-Tiles](http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/ "SPJS-Tiles") (http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/) by [Alexander Bautz](http://spjsblog.com/about/ "about Alexander Bautz") for creating the original tiling system for SharePoint
 - [cross-browser requestAnimationFrame](https://gist.github.com/paulirish/1579671) (https://gist.github.com/paulirish/1579671) by Erik Möller
 - [generic animation using requestAnimationFrame](http://www.sitepoint.com/simple-animations-using-requestanimationframe/) (http://www.sitepoint.com/simple-animations-using-requestanimationframe/) by Dmitri Lau
 - [jQuery's easing functions](https://github.com/danro/jquery-easing/blob/master/jquery.easing.js) (https://github.com/danro/jquery-easing/blob/master/jquery.easing.js) by George McGinley Smith

## License

[MIT License](https://github.com/imthenachoman/nSPTiles/blob/master/LICENSE) -  https://github.com/imthenachoman/nSPTiles/blob/master/LICENSE

## Disqus

