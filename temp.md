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

After the list is created you can add items to the list. Each item in the list is a different tile. Tiles can be grouped by using the same `group name`. This way you can render different tiles on different pages/sections.

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

\*\*\* *If this is the first time you're using **nSPTiles** then download nSPTiles.1.0.zip and extract the files to a document library in your SharePoint site* \*\*\*

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

\*\*\* *The first time you use* ***nSPTiles*** *you will see a message like this. Follow the instructions to create the `nSPTiles` list.* \*\*\*

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
`configOptions` | optional | a configuration object with the following options:<br /><br /><table><thead><tr><th>option</th><th>type</th></tr></thead><tbody><tr><th>animationTime</th><td>number</td><td>the number of milliseconds tile animations should take</td></tr><tr><th><a name="animationTypeOn"></a>animationTypeOn</th><td>string</td><td>the type of animation to use when the mouse enters a tile (for zooming and sliding); options are:<br /><br /><ul><li>slide</li><li>bounce</li><li>elastic</li></ul></td></tr><tr><th>animationTypeOff</th><td>string</td><td>the type of animation to use when the mouse leaves a tile; same options as above</td></tr></tbody></table>

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

\*\*\*\*\*\* **IMPORTANT** \*\*\*\*\*\*

**DO NOT add the DVWP WebPart to a page until [you've used a CEWP](#use-a-cewp-to-render-tiles) at least once so the `nSPTiles` list has been created.**

\*\*\*\*\*\* **IMPORTANT** \*\*\*\*\*\*

 1. extract the `nSPTiles.1.0.webpart` file from nSPTiles.1.0.zip to your computer somewhere
 2. add a WebPart to the page like you normally would
 3. in the section where you would select a WebPart to add upload the `nSPTiles.1.0.webpart` file and add it to the page (after it uploads you may have to go back to the add a WebPart wizard)
 4. edit the `nSPTiles` webpart and under `Parameters Editor` change the `DefaultValue` for each line:

    ```xml
    <ParameterBinding Name="nSPTilesJSPath" Location="None" DefaultValue="nSPTiles.1.0.js"/>
    <ParameterBinding Name="FontAwesomeCSSPath" Location="None" DefaultValue="font-awesome.min.css"/>
    <ParameterBinding Name="GroupName" Location="None" DefaultValue="group one"/>
    <ParameterBinding Name="AnimationSpeedInMillisecond" Location="None" DefaultValue="100"/>
    <ParameterBinding Name="AnimationTypeOn" Location="None" DefaultValue="slide"/>
    <ParameterBinding Name="AnimationTypeOff" Location="None" DefaultValue="bounce"/>
    ```

Paramater Reference:

parameter name | required | explanation
--- | --- | ---
nSPTilesJSPath | yes | the path to `nSPTiles.1.0.min.js` or `nSPTiles.1.0.js`
FontAwesomeCSSPath | optional | the path to the Font-Awesome CSS
GroupName | yes | the name of the tiles group to use
AnimationSpeedInMillisecond | optional | the number of milliseconds tile animations should take
AnimationTypeOn | optional | the type of animation to use when the mouse enters a tile; check [above](#animationTypeOn) for options
AnimationTypeOff | optional | the type of animation to use when the mouse enters a tile; check [above](#animationTypeOn) for options

### List Reference

Here are all the tile options and what they mean. Each one maps to a column/field in the `nSPTiles` list.

option (field/column name) | description
--- | ---
group name | the group this tile belongs to
active | inactive tiles are not rendered
tile custom ID | lets you override the default tile ID of "nTile_ID" where ID is the ID of item in the list
tile custom class(es) | if you want to add custom classes to the main `div` of the tile
tile width | the width of the tile in pixels
tile height | the height of the tile in pixels
tile left offset | how far from the left the tile should be in pixels
tile top offset | how far from the top the tile should be in pixels
tile border width | if you want an empty gap/white-space beteween tiles
tile zoom on hover | zoom effect for the tile by temporarilly making the tile border width 0 when the mouse is over the tile 
tile background color | background color for the tile (check here for details)
tile background opacity | opacity for the background
tile background color on hover | same as above but for when the mouse is over the tile
tile background opacity on hover | same as above but for when the mouse is over the tile
tile image URL | the URL of an image to show on the tile
tile image opacity | 
tile image URL on hover | 
tile image opacity on hover | 
tile image position | 
tile image width | 
tile image height | 
tile image padding | 
tile FA class | 
tile FA color | 
tile FA style | 
tile FA opacity | 
tile FA class on hover | 
tile FA color on hover | 
tile FA style on hover | 
tile FA opacity on hover | 
tile FA position | 
tile FA padding | 
tile link type | 
tile Link URL | 
is heading | 
heading content | 
heading font color | 
heading content on hover | 
heading font color on hover | 
heading position | 
heading padding | 
heading font size | 
bold heading | 
heading style | 
slider heading height | 
tile image and FA slider heading push | 
slider body content | 
slider body position | 
slider body padding | 
slider body font size | 
slider body font color | 
slider body style | 
slider background color | 
slider background opacity | 
slider background color on hover | 
slider background opacity on hover | 
cc tile style | 
cc tile content wrapper style | 
cc tile right edge | 
cc tile bottom edge | 
cc tile background class | 
cc tile background style | 
cc tile background class on hover | 
cc tile background style on hover | 
cc tile image and fa table style | 
cc tile image position style | 
cc tile image class | 
cc tile image style | 
cc tile image class on hover | 
cc tile image style on hover | 
cc tile FA position style | 
cc tile FA class | 
cc tile FA style | 
cc tile FA class on hover | 
cc tile FA style on hover | 
cc heading position style | 
cc heading class | 
cc heading style | 
cc heading class on hover | 
cc heading style on hover | 
cc slider content style | 
cc slider position style | 
cc slider body class | 
cc slider body style | 
cc slider background class | 
cc slider background style | 
cc slider background class on hover | 
cc slider background style on hover | 


## Compatibility

I have tested **nSPTiles** in the following environments as these are all I have access to.

SharePoint Version | IE | Chrome | FireFox
--- | --- | --- | ---
2010 Foundation | IE 11 | Chrome 44 | Firefox 39
2010 Server | IE 11 | Chrome 44 | -

If anyone is able to test on other SharePoint installations and/or browsers I would appreciate feedback.
