/* nSPTiles
 * ----------------------------------------------------------------------------
 * a JavaScript library for Window 8 style live tiles
 *
 * version : 1.0
 * author  : Anchal Nigam
 * e-mail  : imthenachoman@gmail.com
 * url     : https://github.com/imthenachoman/nSPTiles
 *
 * Copyright (c) 2015 Anchal Nigam
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 * ----------------------------------------------------------------------------
 * Compressed using packer by Dean Edwards (http://dean.edwards.name/packer/)
 *
 * SPJS-Tiles - http://spjsblog.com/2013/11/13/sharepoint-2013-style-tiles/
 * requestAnimationFrame - https://gist.github.com/paulirish/1579671
 * animations - http://www.sitepoint.com/simple-animations-using-requestanimationframe/
 * jquery easing functions - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
 */
 var nSPTiles = nSPTiles || (function()
{
    "use strict";

    // some constants
    // the site URL
    var SITE_URL = location.protocol + "//" + location.hostname + (_spPageContextInfo.webServerRelativeUrl === "/" ? "" : _spPageContextInfo.webServerRelativeUrl) + "/";
    var ANIMATION_TIME = 250;
    var LIST_NAME = "nSPTiles";

    // CSS
    var CSS_STYLE = ".nTilesWrapper,.nTilesContainer,.nTile,.nTileContentWrapper,.nTileBackground,.nTileHTMLContent{margin:0;padding:0;overflow:hidden}.nTilesWrapper{position:relative}.nTilesContainer{position:relative;display:inline-block}.nTile,.nTileContentWrapper,.nTileBackground,.nTileHTMLContent{position:absolute;top:0;left:0;bottom:0;right:0}.nTilePositionTable{position:absolute;display:table;width:100%;height:100%}.nTilePositionRow{display:table-row}.nTilePositionCell{display:table-cell;width:100%;height:100%}.nHoverOption1,.nTileHovering .nHoverOption2{display:inline-block!important}.nHoverOption2,.nTileHovering .nHoverOption1{display:none!important}.nTileSliderContent{position:absolute;height:100%;width:100%}.nTileLink{cursor:pointer}.nTileAdminLinks{position:absolute;top:0;right:0;padding:5px;display:none;z-index:50;background-color:#ff9;border:1px solid #000;filter:alpha(opacity=30);opacity:.3}.nTilesWrapper:hover .nTileAdminLinks{display:inline-block}.nTileAdminLinks:hover{filter:(alpha=100);opacity:1}.nTileGridBox{position:absolute;filter:alpha(opacity=30);opacity:.3;background-color:#ff0;z-index:100;top:0;left:0}.nTileGridBox.clicked{background-color:blue}.nTileOverlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#0f0;filter:alpha(opacity=10);opacity:.1;z-index:95}#nTilesHelp{position:fixed;top:10px;left:10px;padding:5px;z-index:999999;background-color:#ffb;border:1px solid #000}#nTilesToolTip{font-family:'Lucida Console';position:fixed;top:0;left:0;padding:5px;z-index:999999;background-color:#ffb;border:1px solid #000}.nTileHoverBox{position:absolute;top:0;left:0;width:100%;height:100%;z-index:50;background-color:#ff0;filter:alpha(opacity=50);opacity:.5}.nTileFocus .nTileHoverBox{background-color:#0ff;font-weight:700;text-decoration:underline}";

    // table settings
    var TABLE_FIELDS = [
        {
            DisplayName: "active",
            Type: "Boolean",
            Description: "can be used hide a tile without having to remove this entry",
            Default: "1"
        },
        {
            DisplayName: "tile custom ID",
            Type: "Text",
            Description: "custom ID to use for the tile &#xD;&#xA;&#xD;&#xA;default is nTile_[ID] where ID is the ID of the entry in the list",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile custom class(es)",
            Type: "Text",
            Description: "custom class(s) to add to the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile width on grid",
            Type: "Number",
            Description: "the number of horizontal grid boxes",
            Required: "TRUE",
            Min: "0",
            Default: "2",
            Validation:
            {
                Message: "Please enter a number greater than 0.",
                Function: "=[tile width on grid]&gt;0"
            }
        },
        {
            DisplayName: "tile height on grid",
            Type: "Number",
            Description: "the number of vertical grid boxes",
            Required: "TRUE",
            Min: "0",
            Default: "2",
            Validation:
            {
                Message: "Please enter a number greater than 0.",
                Function: "=[tile height on grid]&gt;0"
            }
        },
        {
            DisplayName: "tile left offset",
            Type: "Number",
            Description: "number of grid boxes over from the right (0 = first column)",
            Required: "TRUE",
            Min: "0",
            Default: "0"
        },
        {
            DisplayName: "tile top offset",
            Type: "Number",
            Description: "number of grid boxes down from the top (0 = first row)",
            Required: "TRUE",
            Min: "0",
            Default: "0"
        },
        {
            DisplayName: "tile border width",
            Type: "Number",
            Description: "the empty space around the tile in px",
            Required: "TRUE",
            Min: "0",
            Decimals: "0",
            Default: "2"
        },
        {
            DisplayName: "tile zoom on hover",
            Type: "Boolean",
            Description: "zoom effect for the tile by making the tile border width 0 when the mouse is over the tile",
            Required: "FALSE",
            Default: "1"
        },
        {
            DisplayName: "tile background color",
            Type: "Text",
            Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",
            Required: "FALSE",
            Default: "rgb(0,114,198)",
            MaxLength: "255"
        },
        {
            DisplayName: "tile background opacity",
            Type: "Choice",
            Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "none",
            Choices: 100
        },
        {
            DisplayName: "tile background color on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile background opacity on hover",
            Type: "Choice",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        /*
        {
            DisplayName: "tile html content",
            Type: "Note",
            Description: "advanced users only&#xD;&#xA;&#xD;&#xA;HTML to use for the tile contents&#xD;&#xA;&#xD;&#xA;overrides everything below 'tile image URL'",
            Required: "FALSE",
            NumLines: "5",
            RichText: "FALSE"
        },
        {
            DisplayName: "tile html content on hover",
            Type: "Note",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            NumLines: "5",
            RichText: "FALSE"
        },
        */
        {
            DisplayName: "tile image URL",
            Type: "Text",
            Description: "URL of image to use in tile (must be less then 255 characters)",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile image opacity",
            Type: "Choice",
            Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        {
            DisplayName: "tile image URL on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile image opacity on hover",
            Type: "Choice",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        {
            DisplayName: "tile image position",
            Type: "Choice",
            Description: "position of the image in the tile",
            Required: "TRUE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "top left",
            Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"
        },
        {
            DisplayName: "tile image width",
            Type: "Text",
            Description: "width of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)&#xD;&#xA;&#xD;&#xA;helpful if the image is larger then the icon",
            Required: "FALSE",
            MaxLength: "255",
            Validation:
            {
                Message: "Please enter a whole number or a percent.",
                Function: '=OR([tile image width]="",AND(ISNUMBER([tile image width]+0),ROUND([tile image width]+0,0)=([tile image width]+0)),AND(RIGHT([tile image width],1)="%",ISNUMBER(LEFT([tile image width],LEN([tile image width])-1)+0)))'
            }
        },
        {
            DisplayName: "tile image height",
            Type: "Text",
            Description: "height of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)&#xD;&#xA;&#xD;&#xA;helpful if the image is larger then the icon",
            Required: "FALSE",
            MaxLength: "255",
            Validation:
            {
                Message: "Please enter a whole number or a percent.",
                Function: '=OR([tile image height]="",AND(ISNUMBER([tile image height]+0),ROUND([tile image height]+0,0)=([tile image height]+0)),AND(RIGHT([tile image height],1)="%",ISNUMBER(LEFT([tile image height],LEN([tile image height])-1)+0)))'
            }
        },
        {
            DisplayName: "tile image padding",
            Type: "Number",
            Description: "how far from the edge of the tile should the image be in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "5"
        },
        {
            DisplayName: "tile FA class",
            Type: "Text",
            Description: "Font Awesome icon class name",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile FA style",
            Type: "Text",
            Description: "css style to apply to the FA icon",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile FA opacity",
            Type: "Choice",
            Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        {
            DisplayName: "tile FA class on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile FA style on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "tile FA opacity on hover",
            Type: "Choice",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        {
            DisplayName: "tile FA position",
            Type: "Choice",
            Description: "position of the icon in the tile",
            Required: "TRUE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "top left",
            Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"
        },
        {
            DisplayName: "tile FA padding",
            Type: "Number",
            Description: "how far from the edge of the tile should the icon be in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "5"
        },
        {
            DisplayName: "tile link type",
            Type: "Choice",
            Description: "the type of link to make",
            Required: "TRUE  ",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "none",
            Choices: "none,current window,new window,dialog,dialog (refresh window after save),dialog (refresh tiles after save)"
        },
        {
            DisplayName: "tile Link URL",
            Type: "Note",
            Description: "the URL for the link",
            Required: "FALSE",
            NumLines: "3",
            RichText: "FALSE"
        },
        {
            DisplayName: "is heading",
            Type: "Boolean",
            Description: "heading tiles have no slider",
            Default: "0"
        },
        {
            DisplayName: "heading content",
            Type: "Text",
            Description: "can use HTML",
            Required: "FALSE",
            Default: "heading",
            MaxLength: "255"
        },
        {
            DisplayName: "heading font color",
            Type: "Text",
            Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",
            Required: "FALSE",
            Default: "white",
            MaxLength: "255"
        },
        {
            DisplayName: "heading content on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "heading font color on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "heading position",
            Type: "Choice",
            Description: "position of the heading in the tile or slider heading",
            Required: "TRUE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "bottom left",
            Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"
        },
        {
            DisplayName: "heading padding",
            Type: "Number",
            Description: "padding for the heading in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "5"
        },
        {
            DisplayName: "heading font size",
            Type: "Number",
            Description: "font size for the heading in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "10"
        },
        {
            DisplayName: "bold heading",
            Type: "Boolean",
            Description: "should the heading text be bold",
            Default: "1"
        },
        {
            DisplayName: "heading style",
            Type: "Text",
            Description: "css style to apply to heading",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "slider heading height",
            Type: "Number",
            Description: "height of the header for the slider in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "25"
        },
        {
            DisplayName: "slider body content",
            Type: "Note",
            Description: "can use HTML",
            Required: "FALSE",
            NumLines: "5",
            Default: "body",
            RichText: "FALSE"
        },
        {
            DisplayName: "slider body position",
            Type: "Choice",
            Description: "position of the slider body in the slider",
            Required: "TRUE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "top left",
            Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"
        },
        {
            DisplayName: "slider body padding",
            Type: "Number",
            Description: "padding of the slider body in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "5"
        },
        {
            DisplayName: "slider body font size",
            Type: "Number",
            Description: "font size for the slider body in px",
            Required: "FALSE",
            Min: "0",
            Decimals: "0",
            Default: "10"
        },
        {
            DisplayName: "slider body font color",
            Type: "Text",
            Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",
            Required: "FALSE",
            Default: "white",
            MaxLength: "255"
        },
        {
            DisplayName: "slider body style",
            Type: "Text",
            Description: "css style to apply to slider body",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "slider background color",
            Type: "Text",
            Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",
            Required: "FALSE",
            Default: "black",
            MaxLength: "255"
        },
        {
            DisplayName: "slider background opacity",
            Type: "Choice",
            Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Default: "50",
            Choices: 100
        },
        {
            DisplayName: "slider background color on hover",
            Type: "Text",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            MaxLength: "255"
        },
        {
            DisplayName: "slider background opacity on hover",
            Type: "Choice",
            Description: "same as above but for when the mouse is over the tile",
            Required: "FALSE",
            Format: "Dropdown",
            FillInChoice: "FALSE",
            Choices: 100
        },
        {
            DisplayName: "cc tile right edge",
            Type: "Calculated",
            ResultType: "Number",
            Decimals: "0",
            Formula: "=[tile left offset]+[tile width on grid]"
        },
        {
            DisplayName: "cc tile bottom edge",
            Type: "Calculated",
            ResultType: "Number",
            Decimals: "0",
            Formula: "=[tile top offset]+[tile height on grid]"
        },
        {
            DisplayName: "cc tile background class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile background color]&lt;&gt;"","nTileBackground"&amp;IF([tile background color on hover]&lt;&gt;""," nHoverOption1","")&amp;IF(LEFT([tile background color],1)="."," "&amp;REPLACE([tile background color],1,1,""),""),"")'
        },
        {
            DisplayName: "cc tile background style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile background color]&lt;&gt;"",IF(AND([tile background opacity]&lt;&gt;"",[tile background opacity]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile background opacity]&amp;"); opacity: "&amp;[tile background opacity]/100&amp;"; ","")&amp;IF(AND([tile background color]&lt;&gt;"",LEFT([tile background color],1)&lt;&gt;"."),"background-color: "&amp;[tile background color]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc tile background class on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile background color]&lt;&gt;"",[tile background color on hover]&lt;&gt;""),"nTileBackground nHoverOption2"&amp;IF(LEFT([tile background color on hover],1)="."," "&amp;REPLACE([tile background color on hover],1,1,""),""),"")'
        },
        {
            DisplayName: "cc tile background style on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile background color]&lt;&gt;"",[tile background color on hover]&lt;&gt;""),IF(AND([tile background opacity on hover]&lt;&gt;"",[tile background opacity on hover]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile background opacity on hover]&amp;"); opacity: "&amp;[tile background opacity on hover]/100&amp;"; ","")&amp;IF(AND([tile background color on hover]&lt;&gt;"",LEFT([tile background color on hover],1)&lt;&gt;"."),"background-color: "&amp;[tile background color on hover]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc tile image position style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile image URL]&lt;&gt;"","vertical-align: "&amp;LEFT([tile image position],SEARCH(" ",[tile image position])-1)&amp;"; text-align: "&amp;RIGHT([tile image position],LEN([tile image position])-SEARCH(" ",[tile image position])),"")'
        },
        {
            DisplayName: "cc tile image class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile image URL]&lt;&gt;"","nTileImage"&amp;IF([tile image URL on hover]&lt;&gt;""," nHoverOption1",""),"")'
        },
        {
            DisplayName: "cc tile image style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile image URL]&lt;&gt;"",IF([tile image width]&lt;&gt;"","width: "&amp;IF(RIGHT([tile image width],1)="%",[tile image width],[tile image width]&amp;"px")&amp;"; ","")&amp;IF([tile image height]&lt;&gt;"","height: "&amp;IF(RIGHT([tile image height],1)="%",[tile image height],[tile image height]&amp;"px")&amp;"; ","")&amp;IF([tile image padding]&lt;&gt;"","padding: "&amp;[tile image padding]&amp;"px; ","")&amp;IF(AND([tile image opacity]&lt;&gt;"",[tile image opacity]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile image opacity]&amp;"); opacity: "&amp;[tile image opacity]/100&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc tile image class on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile image URL]&lt;&gt;"",[tile image URL on hover]&lt;&gt;""),"nTileImage nHoverOption2","")'
        },
        {
            DisplayName: "cc tile image style on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile image URL]&lt;&gt;"",[tile image URL on hover]&lt;&gt;""),IF([tile image width]&lt;&gt;"","width: "&amp;IF(RIGHT([tile image width],1)="%",[tile image width],[tile image width]&amp;"px")&amp;"; ","")&amp;IF([tile image height]&lt;&gt;"","height: "&amp;IF(RIGHT([tile image height],1)="%",[tile image height],[tile image height]&amp;"px")&amp;"; ","")&amp;IF([tile image padding]&lt;&gt;"","padding: "&amp;[tile image padding]&amp;"px; ","")&amp;IF(AND([tile image opacity on hover]&lt;&gt;"",[tile image opacity on hover]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile image opacity on hover]&amp;"); opacity: "&amp;[tile image opacity on hover]/100&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc tile FA position style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile FA class]&lt;&gt;"","vertical-align: "&amp;LEFT([tile FA position],SEARCH(" ",[tile FA position])-1)&amp;"; text-align: "&amp;RIGHT([tile FA position],LEN([tile FA position])-SEARCH(" ",[tile FA position])),"")'
        },
        {
            DisplayName: "cc tile FA class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile FA class]&lt;&gt;"","nTileFA fa "&amp;[tile FA class]&amp;IF([tile FA class on hover]&lt;&gt;""," nHoverOption1",""),"")'
        },
        {
            DisplayName: "cc tile FA style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([tile FA class]&lt;&gt;"",[tile FA style]&amp;"; "&amp;IF(AND([tile FA opacity]&lt;&gt;"",[tile FA opacity]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile FA opacity]&amp;"); opacity: "&amp;[tile FA opacity]/100&amp;"; ","")&amp;IF([tile FA padding]&lt;&gt;"","padding: "&amp;[tile FA padding]&amp;"px",""),"")'
        },
        {
            DisplayName: "cc tile FA class on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile FA class]&lt;&gt;"",[tile FA class on hover]&lt;&gt;""),"nTileFA fa "&amp;[tile FA class on hover]&amp;" nHoverOption2","")'
        },
        {
            DisplayName: "cc tile FA style on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([tile FA class]&lt;&gt;"",[tile FA class on hover]&lt;&gt;""),[tile FA style on hover]&amp;"; "&amp;IF(AND([tile FA opacity on hover]&lt;&gt;"",[tile FA opacity on hover]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[tile FA opacity on hover]&amp;"); opacity: "&amp;[tile FA opacity on hover]/100&amp;"; ","")&amp;IF([tile FA padding]&lt;&gt;"","padding: "&amp;[tile FA padding]&amp;"px",""),"")'
        },
        {
            DisplayName: "cc heading position style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([heading content]&lt;&gt;"","vertical-align: "&amp;LEFT([heading position],SEARCH(" ",[heading position])-1)&amp;"; text-align: "&amp;RIGHT([heading position],LEN([heading position])-SEARCH(" ",[heading position]))&amp;"; "&amp;IF(NOT([is heading]),"height: "&amp;[slider heading height]&amp;"px; ",""),"")'
        },
        {
            DisplayName: "cc heading class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([heading content]&lt;&gt;"","nTileHeading"&amp;IF([heading content on hover]&lt;&gt;""," nHoverOption1","")&amp;IF(LEFT([heading font color])="."," "&amp;REPLACE([heading font color],1,1,""),""),"")'
        },
        {
            DisplayName: "cc heading style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF([heading content]&lt;&gt;"",[heading style]&amp;"; "&amp;IF([bold heading],"font-weight: bold; ","")&amp;IF([heading padding]&lt;&gt;"","padding: "&amp;[heading padding]&amp;"px; ","")&amp;IF([heading font size]&lt;&gt;"","font-size: "&amp;[heading font size]&amp;"px; ","")&amp;IF(AND([heading font color]&lt;&gt;"",LEFT([heading font color],1)&lt;&gt;"."),"color: "&amp;[heading font color]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc heading class on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([heading content]&lt;&gt;"",[heading content on hover]&lt;&gt;""),"nTileHeading nHoverOption2"&amp;IF(LEFT([heading font color on hover])="."," "&amp;REPLACE([heading font color on hover],1,1,""),""),"")'
        },
        {
            DisplayName: "cc heading style on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND([heading content]&lt;&gt;"",[heading content on hover]&lt;&gt;""),[heading style]&amp;"; "&amp;IF([bold heading],"font-weight: bold; ","")&amp;IF([heading padding]&lt;&gt;"","padding: "&amp;[heading padding]&amp;"px; ","")&amp;IF([heading font size]&lt;&gt;"","font-size: "&amp;[heading font size]&amp;"px; ","")&amp;IF(AND([heading font color on hover]&lt;&gt;"",LEFT([heading font color on hover],1)&lt;&gt;"."),"color: "&amp;[heading font color on hover]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc slider position style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(NOT([is heading]),"vertical-align: "&amp;LEFT([slider body position],SEARCH(" ",[slider body position])-1)&amp;"; text-align: "&amp;RIGHT([slider body position],LEN([slider body position])-SEARCH(" ",[slider body position]))&amp;"; ","")'
        },
        {
            DisplayName: "cc slider body class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(NOT([is heading]),"nTileSlider"&amp;IF(LEFT([slider body font color],1)="."," "&amp;REPLACE([slider body font color],1,1,""),""),"")'
        },
        {
            DisplayName: "cc slider body style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(NOT([is heading]),[slider body style]&amp;"; "&amp;IF([slider body padding]&lt;&gt;"","padding: "&amp;[slider body padding]&amp;"px; ","")&amp;IF([slider body font size]&lt;&gt;"","font-size: "&amp;[slider body font size]&amp;"px; ","")&amp;IF(AND([slider body font color]&lt;&gt;"",LEFT([slider body font color],1)&lt;&gt;"."),"color: "&amp;[slider body font color]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc slider background class",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND(NOT([is heading]),[slider background color]&lt;&gt;""),"nTileBackground"&amp;IF([slider background color on hover]&lt;&gt;""," nHoverOption1","")&amp;IF(LEFT([slider background color],1)="."," "&amp;REPLACE([slider background color],1,1,""),""),"")'
        },
        {
            DisplayName: "cc slider background style",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND(NOT([is heading]),[slider background color]&lt;&gt;""),IF(AND([slider background opacity]&lt;&gt;"",[slider background opacity]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[slider background opacity]&amp;"); opacity: "&amp;[slider background opacity]/100&amp;"; ","")&amp;IF(AND([slider background color]&lt;&gt;"",LEFT([slider background color],1)&lt;&gt;"."),"background-color: "&amp;[slider background color]&amp;"; ",""),"")'
        },
        {
            DisplayName: "cc slider background class on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND(NOT([is heading]),[slider background color]&lt;&gt;"",[slider background color on hover]&lt;&gt;""),"nTileBackground nHoverOption2"&amp;IF(LEFT([slider background color on hover],1)="."," "&amp;REPLACE([slider background color on hover],1,1,""),""),"")'
        },
        {
            DisplayName: "cc slider background style on hover",
            Type: "Calculated",
            ResultType: "Text",
            Formula: '=IF(AND(NOT([is heading]),[slider background color]&lt;&gt;"",[slider background color on hover]&lt;&gt;""),IF(AND([slider background opacity on hover]&lt;&gt;"",[slider background opacity on hover]&lt;&gt;"none"),"filter: alpha(opacity="&amp;[slider background opacity on hover]&amp;"); opacity: "&amp;[slider background opacity on hover]/100&amp;"; ","")&amp;IF(AND([slider background color on hover]&lt;&gt;"",LEFT([slider background color on hover],1)&lt;&gt;"."),"background-color: "&amp;[slider background color on hover]&amp;"; ",""),"")'
        }];

    // the object for the main functions
    var tiles = {};

    // keep track of all the tiles and data for each tile
    var tilesTracker = {};

    // an empty function with which to override functions later
    var emptyFunction = function(){};

    // delete an element from the DOM
    var deleteElement = function(element)
    {
        element.parentNode.removeChild(element);
    };

    // animation helper
    // http://www.sitepoint.com/simple-animations-using-requestanimationframe/
    // https://gist.github.com/paulirish/1579671
    // https://gist.github.com/gre/1650294
    var animate = (function()
    {
        var animationCounter = 0, animationIDTracker = {}, lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'];
        // https://gist.github.com/gre/1650294
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
        {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if(!window.requestAnimationFrame)
        {
            window.requestAnimationFrame = function(callback)
            {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function()
                {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if(!window.cancelAnimationFrame)
        {
            window.cancelAnimationFrame = function(id)
            {
                clearTimeout(id);
            };
        }

        var easingFunctions = {
            one: function(t, b, c, d)
            {
                return -c * (t /= d) * (t - 2) + b;
            },
            two: function(t, b, c, d)
            {
                if ((t /= d) < (1 / 2.75))
                {
                    return c * (7.5625 * t * t) + b;
                }
                else if (t < (2 / 2.75))
                {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                }
                else if (t < (2.5 / 2.75))
                {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                }
                else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
                }
            }
        };

        return {
            stop: function(id)
            {
                cancelAnimationFrame(animationIDTracker[id]);
                delete animationIDTracker[id];
            },
            start: function(duration, action, mode)
            {
                var currentAnimationID = animationCounter++;
                var start = +new Date();
                var step = function()
                {
                    var elapsed = +new Date() - start;

                    if(elapsed >= duration)
                    {
                        action(1);
                        animate.stop(currentAnimationID);
                    }
                    else
                    {
                        action(easingFunctions[mode ? "one" : "two"](elapsed, 0, 1, duration));
                        animationIDTracker[currentAnimationID] = requestAnimationFrame(step);
                    }
                };
                step();
                return currentAnimationID;
            }
        };
    })();

    // helper function
    var createElement = function(tagName, parentNode, className, attributes)
    {
        // create the element
        var element = document.createElement(tagName);
        // if there is a classname then set it
        if(className)
        {
            element.className = className;
        }
        // iterate through the other attributes
        if(attributes)
        {
            for(var attribute in attributes)
            {
                if(/^(inner|on)\w+$/i.test(attribute))
                {
                    element[attribute] = attributes[attribute];
                }
                else
                {
                    element.setAttribute(attribute, attributes[attribute]);
                }
            }
        }
        // if there is a parent node then add it
        if(parentNode)
        {
            parentNode.appendChild(element);
        }
        // return the element
        return element;
    };

    // helper function to make sharepoint web service calls
    var SPWebServiceCall = function(service, serviceSOAPAction, soapBody, completeFunc, async)
    {
        // open an xhr
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open("post", SITE_URL + "_vti_bin/" + service, typeof(async) !== "undefined" && async !== null ? async : false);
        xhr.setRequestHeader("SOAPAction", serviceSOAPAction);
        xhr.setRequestHeader("Content-Type", "text/xml; charset=\"utf-8\"");

        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4) // DONE
            {
                completeFunc(xhr.status == 200, xhr);
            }
        };

        // create the data and send it
        xhr.send('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' + soapBody + '</soap:Body></soap:Envelope>');
    };

    // get nodes of an xml document by tag name using a namespace if needed
    var getXMLNodesByTagName = function(rootNode, tagName, ns)
    {
        var nodes = rootNode.getElementsByTagName(tagName);
        if(!nodes.length)
        {
            nodes = rootNode.getElementsByTagName(ns + ":" + tagName);
        }
        return nodes;
    };

    // get mouse position with respect to the document AND with respecto an element
    var getMousePositionProperties = function(e, element)
    {
        var ret = {"e" : e || window.event, "pageX" : 0, "pageY" : 0, "elementX" : 0, "elementY" : 0};

        if(ret.e.pageX || ret.e.pageY)
        {
            ret.pageX = ret.e.pageX;
            ret.pageY = ret.e.pageY;
        }
        else if(ret.e.clientX || ret.e.clientY)
        {
            ret.pageX = ret.e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            ret.pageY = ret.e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if(element)
        {
            var b = element.getBoundingClientRect();
            ret.elementX = ret.pageX - b.left;
            ret.elementY = ret.pageY - b.top;
        }
        return ret;
    };

    // make divs that specify position if needed
    var makePositionHTML = function(className, row1Style, cell1Content, row2Style, cell2Content)
    {
        var returnHTML = '<div class="nTilePositionTable ' + className + '">';
        returnHTML += '<div class="nTilePositionRow nTilePositionRow1"><div class="nTilePositionCell" style="width: 100%; height: 100%;' + row1Style + ';">' + cell1Content + '</div></div>';
        if(row2Style)
        {
            returnHTML += '<div class="nTilePositionRow nTilePositionRow2"><div class="nTilePositionCell" style="width: 100%; height: 100%;' + row2Style + '">' + cell2Content + '</div></div>';
        }

        return returnHTML + '</div>';

    };

    // reloads tile data
    // 0 = done successfully
    // 2 = list does not exist
    // 3 = unknown
    var reload = function(holderID, async, completeFunc)
    {
        // get the tile data and some other things
        var tilesData = tilesTracker[holderID];
        // reset cached tile specific data
        tilesData.tiles = {};
        var tilesWrapper = tilesData.tilesWrapper;
        var nTilesContainer = tilesWrapper.querySelector(".nTilesContainer");

        // find all the tiles in this container and remove any events to avoid memory leaks
        var nTiles = nTilesContainer.querySelectorAll(".nTile");

        for(var i = 0, num = nTiles.length; i < num; ++i)
        {
            nTiles[i].onclick = null;
            nTiles[i].onmouseenter = null;
            nTiles[i].onmouseleave = null;
        }

        // let the user know we're loading
        nTilesContainer.innerText = "Please wait while I reload the data...";

        // get the list items
        // the soap body to get the list items for the tile group we want
        var soapBody = '';
        soapBody += '<GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
        soapBody += '<listName>' + LIST_NAME + '</listName>';
        soapBody += '<query><Query><Where><And><Eq><FieldRef Name="Title"/><Value Type="Text">' + tilesData.groupName + '</Value></Eq><Eq><FieldRef Name="nActive"/><Value Type="Boolean">1</Value></Eq></And></Where></Query></query>';
        soapBody += '<viewFields><ViewFields><FieldRef Name="ID" /><FieldRef Name="nTileWidthOnGrid" /><FieldRef Name="nTileHeightOnGrid" /><FieldRef Name="nTileLeftOffset" /><FieldRef Name="nTileTopOffset" /><FieldRef Name="nCcTileBottomEdge" /><FieldRef Name="nCcTileRightEdge" /><FieldRef Name="nTileBorderWidth" /><FieldRef Name="nTileZoomOnHover" /><FieldRef Name="nTileLinkType" /><FieldRef Name="nTileLinkURL" /><FieldRef Name="nTileImageURL" /><FieldRef Name="nTileImageURLOnHover" /><FieldRef Name="nIsHeading" /><FieldRef Name="nHeadingContent" /><FieldRef Name="nHeadingContentOnHover" /><FieldRef Name="nSliderHeadingHeight" /><FieldRef Name="nSliderBodyContent" /><FieldRef Name="nCcTileBackgroundClass" /><FieldRef Name="nCcTileBackgroundStyle" /><FieldRef Name="nCcTileBackgroundClassOnHover" /><FieldRef Name="nCcTileBackgroundStyleOnHover" /><FieldRef Name="nCcTileImagePositionStyle" /><FieldRef Name="nCcTileImageClass" /><FieldRef Name="nCcTileImageStyle" /><FieldRef Name="nCcTileImageClassOnHover" /><FieldRef Name="nCcTileImageStyleOnHover" /><FieldRef Name="nCcTileFAPositionStyle" /><FieldRef Name="nCcTileFAClass" /><FieldRef Name="nCcTileFAStyle" /><FieldRef Name="nCcTileFAClassOnHover" /><FieldRef Name="nCcTileFAStyleOnHover" /><FieldRef Name="nCcHeadingPositionStyle" /><FieldRef Name="nCcHeadingClass" /><FieldRef Name="nCcHeadingStyle" /><FieldRef Name="nCcHeadingClassOnHover" /><FieldRef Name="nCcHeadingStyleOnHover" /><FieldRef Name="nCcSliderBackgroundClass" /><FieldRef Name="nCcSliderBackgroundStyle" /><FieldRef Name="nCcSliderBackgroundClassOnHover" /><FieldRef Name="nCcSliderBackgroundStyleOnHover" /><FieldRef Name="nCcSliderPositionStyle" /><FieldRef Name="nCcSliderBodyClass" /><FieldRef Name="nCcSliderBodyStyle" /><FieldRef Name="nTileCustomID" /><FieldRef Name="nTileCustomClassEs" /></ViewFields></viewFields>';
        soapBody += '<rowLimit>0</rowLimit>';
        soapBody += '</GetListItems>';

        // execute the call
        SPWebServiceCall("Lists.asmx?op=GetListItems", "http://schemas.microsoft.com/sharepoint/soap/GetListItems", soapBody, function(status, data)
        {
            var xml = data.responseXML;
            // if there was an error
            if(!status)
            {
                if(completeFunc)
                {
                    completeFunc(getXMLNodesByTagName(xml, "errorcode")[0].childNodes[0].nodeValue == "0x82000006" ? 2 : 3);
                }
                return;
            }

            // get all the rows from the XML and create the HTML
            var rows = getXMLNodesByTagName(xml, "row", "z");

            var tilesHTML = "";

            // default height and width
            var width = 100;
            var height = 100;

            // are there rows
            if(rows.length)
            {
                var maxRightEdge = -1;
                var maxBottomEdge = -1;

                // loop through each tile
                for(var i = 0, num = rows.length; i < num; ++i)
                {
                    var thisTileHTML = "";

                    var row = rows[i];

                    var ID = row.getAttribute("ows_ID");
                    var nTileWidthOnGrid = parseFloat(row.getAttribute("ows_nTileWidthOnGrid"));
                    var nTileHeightOnGrid = parseFloat(row.getAttribute("ows_nTileHeightOnGrid"));
                    var nTileLeftOffset = parseFloat(row.getAttribute("ows_nTileLeftOffset"));
                    var nTileTopOffset = parseFloat(row.getAttribute("ows_nTileTopOffset"));

                    var nCcTileBottomEdge = parseFloat(row.getAttribute("ows_nCcTileBottomEdge").replace(/^[a-z]*?;#/i, ""));
                    var nCcTileRightEdge = parseFloat(row.getAttribute("ows_nCcTileRightEdge").replace(/^[a-z]*?;#/i, ""));
                    var nTileBorderWidth = parseInt(row.getAttribute("ows_nTileBorderWidth"), 10);
                    var nTileZoomOnHover = row.getAttribute("ows_nTileZoomOnHover");
                    var nTileLinkType = row.getAttribute("ows_nTileLinkType");
                    var nTileLinkURL = row.getAttribute("ows_nTileLinkURL") ? row.getAttribute("ows_nTileLinkURL").replace(/\s|\r|\n/g, "") : row.getAttribute("ows_nTileLinkURL");
                    var nTileImageURL = row.getAttribute("ows_nTileImageURL");
                    var nTileImageURLOnHover = row.getAttribute("ows_nTileImageURLOnHover") ? row.getAttribute("ows_nTileImageURLOnHover") : row.getAttribute("ows_nTileImageURLOnHover");
                    var nIsHeading = row.getAttribute("ows_nIsHeading");
                    var nHeadingContent = row.getAttribute("ows_nHeadingContent");
                    var nHeadingContentOnHover = row.getAttribute("ows_nHeadingContentOnHover");
                    var nSliderHeadingHeight = parseInt(row.getAttribute("ows_nSliderHeadingHeight"), 10);
                    var nSliderBodyContent = row.getAttribute("ows_nSliderBodyContent");

                    var nCcTileBackgroundClass = row.getAttribute("ows_nCcTileBackgroundClass").replace(/^[a-z]*?;#/i, "");
                    var nCcTileBackgroundStyle = row.getAttribute("ows_nCcTileBackgroundStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcTileBackgroundClassOnHover = row.getAttribute("ows_nCcTileBackgroundClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcTileBackgroundStyleOnHover = row.getAttribute("ows_nCcTileBackgroundStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcTileImagePositionStyle = row.getAttribute("ows_nCcTileImagePositionStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcTileImageClass = row.getAttribute("ows_nCcTileImageClass").replace(/^[a-z]*?;#/i, "");
                    var nCcTileImageStyle = row.getAttribute("ows_nCcTileImageStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcTileImageClassOnHover = row.getAttribute("ows_nCcTileImageClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcTileImageStyleOnHover = row.getAttribute("ows_nCcTileImageStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcTileFAPositionStyle = row.getAttribute("ows_nCcTileFAPositionStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcTileFAClass = row.getAttribute("ows_nCcTileFAClass").replace(/^[a-z]*?;#/i, "");
                    var nCcTileFAStyle = row.getAttribute("ows_nCcTileFAStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcTileFAClassOnHover = row.getAttribute("ows_nCcTileFAClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcTileFAStyleOnHover = row.getAttribute("ows_nCcTileFAStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcHeadingPositionStyle = row.getAttribute("ows_nCcHeadingPositionStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingClass = row.getAttribute("ows_nCcHeadingClass").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingStyle = row.getAttribute("ows_nCcHeadingStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingClassOnHover = row.getAttribute("ows_nCcHeadingClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingStyleOnHover = row.getAttribute("ows_nCcHeadingStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcSliderBackgroundClass = row.getAttribute("ows_nCcSliderBackgroundClass").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBackgroundStyle = row.getAttribute("ows_nCcSliderBackgroundStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBackgroundClassOnHover = row.getAttribute("ows_nCcSliderBackgroundClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBackgroundStyleOnHover = row.getAttribute("ows_nCcSliderBackgroundStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcSliderPositionStyle = row.getAttribute("ows_nCcSliderPositionStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBodyClass = row.getAttribute("ows_nCcSliderBodyClass").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBodyStyle = row.getAttribute("ows_nCcSliderBodyStyle").replace(/^[a-z]*?;#/i, "");

                    var tileOuterHeight = nTileHeightOnGrid * tilesData.gridHeight;
                    var tileOuterWidth = nTileWidthOnGrid * tilesData.gridWidth;

                    var sliderPush = (tileOuterHeight - nTileBorderWidth - nTileBorderWidth) - nSliderHeadingHeight;
                    var tileID = row.getAttribute("ows_nTileCustomID") || "nTile_" + ID;
                    var tileClass = (row.getAttribute("ows_nTileCustomClassEs") || "") + " nTile nTile_" + ID;
                    var tileStyle = "width:" + tileOuterWidth + "px;height:" + tileOuterHeight + "px;top:" + (nTileTopOffset * tilesData.gridHeight) + "px;left:" + (nTileLeftOffset * tilesData.gridWidth) + "px;";

                    var tileOnMouseEnter = "nSPTiles.hover(true, this, '" + holderID + "', " + ID + ", '" + nIsHeading + "', '" + nTileZoomOnHover + "')";
                    var tileOnMouseLeave = "nSPTiles.hover(false, this, '" + holderID + "', " + ID + ", '" + nIsHeading + "', '" + nTileZoomOnHover + "')";

                    if(nTileLinkType != "none")
                    {
                        tileClass += " nTileLink";
                    }
                    var tileOnClick = "nSPTiles.openLink(this, '" + nTileLinkType + "', '" + nTileLinkURL + "')";

                    if(maxRightEdge < nCcTileRightEdge)
                    {
                        maxRightEdge = nCcTileRightEdge;
                    }
                    if(maxBottomEdge < nCcTileBottomEdge)
                    {
                        maxBottomEdge = nCcTileBottomEdge;
                    }

                    thisTileHTML += '<div class="nTileContentWrapper" style="margin:' + nTileBorderWidth + 'px">';

                    if(nCcTileBackgroundClass)
                    {
                        thisTileHTML += '<div class="' + nCcTileBackgroundClass + '" style="' + nCcTileBackgroundStyle + '"></div>';
                        if(nCcTileBackgroundClassOnHover)
                        {
                            thisTileHTML += '<div class="' + nCcTileBackgroundClassOnHover + '" style="' + nCcTileBackgroundStyleOnHover + '"></div>';
                        }
                    }

                    if(nTileImageURL)
                    {
                        var thisTilePositionContent = '<img class="' + nCcTileImageClass + '" style="' + nCcTileImageStyle +'" src="' + nTileImageURL + '" />';
                        if(nTileImageURLOnHover)
                        {
                            thisTilePositionContent += '<img class="' + nCcTileImageClassOnHover + '" style="' + nCcTileImageStyleOnHover +'" src="' + nTileImageURLOnHover + '" />';
                        }
                        thisTileHTML += makePositionHTML("nTileImagePositionWrapper", nCcTileImagePositionStyle, '<div>' + thisTilePositionContent + '</div>');
                    }

                    if(nCcTileFAClass)
                    {
                        var thisTilePositionContent = '<span class="' + nCcTileFAClass  + '" style="' + nCcTileFAStyle +'"></span>';
                        if(nCcTileFAClassOnHover)
                        {
                            thisTilePositionContent += '<span class="' + nCcTileFAClassOnHover  + '" style="' + nCcTileFAStyleOnHover +'"></span>';
                        }
                        thisTileHTML += makePositionHTML("nTileFAPositionWrapper", nCcTileFAPositionStyle, thisTilePositionContent);
                    }

                    if(nIsHeading == "1")
                    {
                        tileClass += " nHeadingTile";
                        var thisTilePositionContent = '<div class="' + nCcHeadingClass + '" style="' + nCcHeadingStyle + '">' + (nHeadingContent || "") + '</div>';
                        if(nHeadingContentOnHover)
                        {
                            thisTilePositionContent += '<div class="' + nCcHeadingClassOnHover + '" style="' + nCcHeadingStyleOnHover + '">' + (nHeadingContentOnHover || "") + '</div>';
                        }
                        thisTileHTML += makePositionHTML("nTileHeadingPositionWrapper", nCcHeadingPositionStyle, thisTilePositionContent);
                    }
                    else
                    {
                        tileClass += " nSliderTile";
                        thisTileHTML += '<div class="nTileSliderContent" style="top:' + sliderPush + 'px">';

                        if(nCcSliderBackgroundClass)
                        {
                            thisTileHTML += '<div class="' + nCcSliderBackgroundClass + '" style="' + nCcSliderBackgroundStyle + '"></div>';
                            if(nCcSliderBackgroundClassOnHover)
                            {
                                thisTileHTML += '<div class="' + nCcSliderBackgroundClassOnHover + '" style="' + nCcSliderBackgroundStyleOnHover + '"></div>';
                            }
                        }

                        var thisTilePositionContent1 = '<div class="' + nCcHeadingClass + '" style="' + nCcHeadingStyle + '">' + (nHeadingContent || "") + '</div>';
                        if(nHeadingContentOnHover)
                        {
                            thisTilePositionContent1 += '<div class="' + nCcHeadingClassOnHover + '" style="' + nCcHeadingStyleOnHover + '">' + (nHeadingContentOnHover || "") + '</div>';
                        }
                        var thisTilePositionContent2 = '<div class="' + nCcSliderBodyClass + '" style="' + nCcSliderBodyStyle + '">' + nSliderBodyContent + '</div>';

                        thisTileHTML += makePositionHTML("nTileSliderPositionWrapper", nCcHeadingPositionStyle, thisTilePositionContent1, nCcSliderPositionStyle, thisTilePositionContent2);

                        thisTileHTML += '</div>';
                    }
                    thisTileHTML += '</div>';

                    tilesHTML += '<div id="' + tileID +'" class="' + tileClass + '" style="' + tileStyle + '" onmouseenter="' + tileOnMouseEnter + '" onmouseleave="' + tileOnMouseLeave + '" onclick="' + tileOnClick + '">' + thisTileHTML + '</div>';
                }

                width = maxRightEdge * tilesData.gridWidth;
                height = maxBottomEdge * tilesData.gridHeight;

                nTilesContainer.innerHTML = tilesHTML;
            }
            // we don't have any tiles to render
            else
            {
                nTilesContainer.innerHTML = "";
            }

            // set the height of the container
            tilesWrapper.style.height = height + "px";
            nTilesContainer.style.height = height + "px";
            nTilesContainer.style.width = width + "px";
            if(completeFunc)
            {
                completeFunc(0);
            }
        }, async);
    };

    // add or remove yellow boxes to all the tiles for the GUI
    var addRemoveTileHoverBoxes = function(nTilesWrapper, add, cursor, onMouseOver)
    {
        // if we're adding
        if(add)
        {
            // get all the tiles
            var allTiles = nTilesWrapper.querySelectorAll(".nTile");
            // create a blank hover box
            var nTileHoverBox = createElement("div", null, "nTileHoverBox", {"style" : "text-align: center;", "innerText" : "tile"});
            if(cursor)
            {
                nTileHoverBox.style.cursor = cursor;
            }
            // clone and add a hover box to each tile
            for(var i = 0, num = allTiles.length; i < num; ++i)
            {
                var thisTile = allTiles[i];
                var tempHoverBox = nTileHoverBox.cloneNode(true);

                tempHoverBox.style.lineHeight = thisTile.style.height;

                if(onMouseOver)
                {
                    tempHoverBox.onmousemove = onMouseOver;
                }

                thisTile.appendChild(tempHoverBox);
            }
        }
        // we're removing
        else
        {
            var allTileHoverBoxes = nTilesWrapper.querySelectorAll(".nTileHoverBox");
            for(var i = 0, num = allTileHoverBoxes.length; i < num; ++i)
            {
                var nTileHoverBox = allTileHoverBoxes[i];
                nTileHoverBox.onmousemove = null;
                deleteElement(nTileHoverBox);
            }
        }
    };

    // run the query to add, edit, or delete a tile
    var addEditDeleteTile = function(action, fields, completeFunc)
    {
        var soapBody = '<UpdateListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
        soapBody += '<listName>' + LIST_NAME + '</listName>';
        soapBody += '<updates>';
        soapBody += '<Batch OnError="Continue">';
        soapBody += '<Method ID="1" Cmd="' + action + '">';

        for(var i in fields)
        {
            if(fields.hasOwnProperty(i))
            {
                soapBody += '<Field Name="' + i + '">' + fields[i] + '</Field>';
            }
        }

        soapBody += '</Method>';
        soapBody += '</Batch>';
        soapBody += '</updates>';
        soapBody += '</UpdateListItems>';

        SPWebServiceCall("Lists.asmx?op=UpdateListItems", "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems", soapBody, completeFunc, true);
    };

    /*
    // this isn't needed anymore since we're using :hover to show/hide the admin box
    var showAdmin = tiles.showAdmin = function(div, hide)
    {
        div.querySelector(".nTileAdminLinks").style.display = hide ? "none" : "inline-block";
    };
    */

    // opens a tile link
    var openLink = tiles.openLink = function(tile, type, url)
    {
        var options = {"url" : url};
        switch(type)
        {
            case "none":
                break;
            case "current window":
                location.href = url;
                break;
            case "new window":
                window.open(url);
                break;
            case "dialog":
                SP.UI.ModalDialog.showModalDialog(options);
                break;
            case "dialog (refresh window after save)":
                options.dialogReturnValueCallback = function(dialogResult)
                {
                    if(dialogResult == SP.UI.DialogResult.OK)
                    {
                        location.href = location.href;
                    }
                };
                SP.UI.ModalDialog.showModalDialog(options);
                break;
            case "dialog (refresh tiles after save)":
                options.dialogReturnValueCallback = function(dialogResult)
                {
                    if(dialogResult == SP.UI.DialogResult.OK)
                    {
                        reload(tile.parentNode.parentNode.id, true);
                    }
                };
                SP.UI.ModalDialog.showModalDialog(options);
                break;
            default:
                alert("I don't know how to handle open a link of type '" + type + "'.");
                break;
        }
    };

    // hover over a tile
    var tileHover = tiles.hover = function(mode, tile, holderID, tileID, isHeading, doZoom)
    {
        // get tile data
        var tilesData = tilesTracker[holderID];
        var tileData = tilesData.tiles[tile.id] = tilesData.tiles[tile.id] || {};

        // if we're hovering then add a hovering class
        if(mode)
        {
            tile.className += " nTileHovering";
        }
        // else we're not hovering so remove the class
        else
        {
            tile.className = tile.className.replace(/\ nTileHovering/, "");
        }

        // if we already have an animation then stop it
        if("animationID" in tileData)
        {
            animate.stop(tileData.animationID);
        }

        // do we want to zoom
        if(doZoom === "Yes" || doZoom === "1")
        {
            // get the content
            var nTileContentWrapper = tile.querySelector(".nTileContentWrapper");
            // find the original margin; set it for access later if it isn't already set
            var originalMargin = tileData.margin = tileData.margin || parseInt(nTileContentWrapper.style.margin.replace("px", ""), 10);
            // find the current margin
            var currentMargin = parseInt(nTileContentWrapper.style.margin.replace("px", ""), 10);
            // figure out what we're going to
            var marginTo = mode ? 0 : originalMargin;
            // the difference we need
            var marginDifference = marginTo - currentMargin;
        }

        // do we have a slider
        if(isHeading !== "Yes" && isHeading !== "1")
        {
            // the slider
            var nTileSliderContent = tile.querySelector(".nTileSliderContent");
            // the original push of the slider; set it for later access if it isn't already set
            var originalTop = tileData.top = tileData.top || parseInt(nTileSliderContent.style.top.replace("px", ""), 10);
            // the current push
            var currentTop = parseInt(nTileSliderContent.style.top.replace("px", ""), 10);
            // figure out where we're going to
            var topTo = mode ? 0 : originalTop;
            // the difference we need to go to
            var topDifference = topTo - currentTop;
        }

        // if we're doing at least one animation then do it
        if(doZoom === "Yes" || doZoom === "1" || isHeading !== "Yes" && isHeading !== "1")
        {
            tileData.animationID = animate.start(mode ? tilesData.animationTime : tilesData.animationTime * 2, function(rate)
            {
                if(nTileContentWrapper)
                {
                    nTileContentWrapper.style.margin = currentMargin + (rate * marginDifference) + "px";
                }
                if(nTileSliderContent)
                {
                    nTileSliderContent.style.top = currentTop + (rate * topDifference) + "px";
                }
            }, mode);
        }
    };

    // save tiles data
    tiles.setup = function(holderID, groupName, gridWidth, gridHeight, animationTime)
    {
        tilesTracker[holderID] = {
            "holderID" : holderID, // the ID of the tils wrapper
            "groupName" : groupName, // the group name of the tiles in this wrapper
            "gridHeight" : gridHeight || 50, // the px width
            "gridWidth" : gridWidth || 50, // the px height
            "animationTime" : animationTime || ANIMATION_TIME, // the animation time
            "tilesWrapper" : document.getElementById(holderID), // the actual DOM wrapper element
            "tiles" : {} // tile specific data cache
        };
    };

    // initialize tiles
    tiles.init = function(holderID, groupName, gridWidth, gridHeight, animationTime)
    {
        // the the wrapper/holder
        var holder = document.getElementById(holderID);
        // if we have a holder then continue
        if(holder)
        {
            // save the tile data
            tiles.setup(holderID, groupName, gridWidth, gridHeight, animationTime);

            // create the container
            holder.className += (holder.className ? " " : "") + "nTilesWrapper";
            holder.innerHTML = '<div class="nTilesContainer">Loading...</div>';

            // get the data and render it
            reload(holderID, false, function(returnCode)
            {
                if(returnCode == 2)
                {
                    // the list doesn't exist so let the user create it
                    holder.innerHTML = "List '" + LIST_NAME + "' does not exist. Click <a href='#'>here</a> to create it.";
                    holder.querySelector("a").onclick = function()
                    {
                        var soapBody = '';
                        soapBody += '<AddList xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
                        soapBody += '<listName>' + LIST_NAME + '</listName>';
                        soapBody += '<description>List used to house tile configuration for nTiles.</description>';
                        soapBody += '<templateID>100</templateID>';
                        soapBody += '</AddList>';

                        SPWebServiceCall("Lists.asmx?op=AddList", "http://schemas.microsoft.com/sharepoint/soap/AddList", soapBody, function(status)
                        {
                            if(!status)
                            {
                                holder.innerHTML = "Unable to create the list.";
                            }
                            else
                            {
                                holder.innerHTML = "List '" + LIST_NAME + "' created. Updating list...";
                                setTimeout(function()
                                {
                                    // figure out the XML for the field we want to create
                                    soapBody = '';
                                    soapBody += '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
                                    soapBody += '<listName>' + LIST_NAME + '</listName>';
                                    soapBody += '<listProperties>';
                                    soapBody += '<List EnableAttachments="FALSE" OnQuickLaunch="TRUE" Description="List used to house tile configuration for nTiles. (v1.0)" />';
                                    soapBody += '</listProperties>';
                                    soapBody += '<newFields>';
                                    soapBody += '<Fields>';

                                    for(var i = 0, num = TABLE_FIELDS.length; i < num; ++i)
                                    {
                                        var fieldSettings = TABLE_FIELDS[i];
                                        fieldSettings.Name = "n" + fieldSettings.DisplayName.replace(/\b\w/g, function(m){return m.toUpperCase();}).replace(/[^a-zA-Z]/g, "");
                                        soapBody += '<Method ID="' + (i+2) + '"' + (fieldSettings.Type != "Calculated" ? ' AddToView=""' : '') + '><Field Type="' + fieldSettings.Type + '" DisplayName="' + fieldSettings.Name + '" ' + ( fieldSettings.Type == "Calculated" ? 'ResultType="' + fieldSettings.ReturnType + '"><Formula>=1</Formula></Field>' : '/>') + '</Method>';
                                    }

                                    soapBody += '</Fields>';
                                    soapBody += '</newFields>';
                                    soapBody += '<updateFields>';
                                    soapBody += '<Fields>';
                                    soapBody += '<Method ID="1">';
                                    soapBody += '<Field Type="Text" Name="Title" DisplayName="group name" Required="TRUE" Description="the name of the group this tile belongs to"/>';
                                    soapBody += '</Method>';

                                    for(var i = 0, num = TABLE_FIELDS.length; i < num; ++i)
                                    {
                                        var fieldSettings = TABLE_FIELDS[i];
                                        soapBody += '<Method ID="' + (TABLE_FIELDS.length + i + 2) + '"><Field Type="' + fieldSettings.Type + '" Name="' + fieldSettings.Name + '"';

                                        for(var attribute in fieldSettings)
                                        {
                                            if(fieldSettings.hasOwnProperty(attribute))
                                            {
                                                if(attribute == "Type" || attribute == "Name" || attribute == "Default" || attribute == "Validation" || attribute == "Choices" || attribute == "Formula")
                                                {
                                                    continue;
                                                }
                                                soapBody += ' ' + attribute + '="' + fieldSettings[attribute] + '"';
                                            }
                                        }

                                        soapBody += '>';

                                        if(fieldSettings.hasOwnProperty("Formula"))
                                        {
                                            soapBody += '<Formula>' + fieldSettings.Formula + '</Formula>';
                                        }

                                        if(fieldSettings.hasOwnProperty("Default"))
                                        {
                                            soapBody += '<Default>' + fieldSettings.Default + '</Default>';
                                        }

                                        if(fieldSettings.hasOwnProperty("Validation"))
                                        {
                                            soapBody += '<Validation Message="' + fieldSettings.Validation.Message + '">' + fieldSettings.Validation.Function + '</Validation>';
                                        }

                                        if(fieldSettings.hasOwnProperty("Choices"))
                                        {
                                            soapBody += '<CHOICES>';
                                            if(typeof(fieldSettings.Choices) === "number")
                                            {
                                                soapBody += '<CHOICE>none</CHOICE>';
                                                for(var j = 0; j <= fieldSettings.Choices; ++j)
                                                {
                                                    soapBody += '<CHOICE>' + j + '</CHOICE>';
                                                }
                                            }
                                            else
                                            {
                                                soapBody += '<CHOICE>' + fieldSettings.Choices.split(",").join('</CHOICE><CHOICE>') + '</CHOICE>';
                                            }
                                            soapBody += '</CHOICES>';
                                        }

                                        soapBody += '</Field></Method>';
                                    }

                                    soapBody += '</Fields>';
                                    soapBody += '</updateFields>';
                                    soapBody += '</UpdateList>';

                                    SPWebServiceCall("Lists.asmx?op=UpdateList", "http://schemas.microsoft.com/sharepoint/soap/UpdateList", soapBody, function(status)
                                    {
                                        if(status)
                                        {
                                            holder.innerHTML = "";
                                            alert("Finished creating and updating the list.\nReloading the page.\nHappy tiling!");
                                            location.reload();
                                        }
                                        else
                                        {
                                            holder.innerHTML = "Unable to add fields to the list.";
                                        }
                                    });

                                }, 1);
                            }
                        });

                        return false;
                    };
                }
                else if(returnCode == 3)
                {
                    // some unknown error
                    alert("unknown error");
                }
                else if(returnCode === 0)
                {
                    // tiles loaded successfully
                    // add admin links if the user has edit access to the list
                    ExecuteOrDelayUntilScriptLoaded(function()
                    {
                        var clientContext = new SP.ClientContext.get_current();
                        this.list = clientContext.get_web().get_lists().getByTitle(LIST_NAME);
                        clientContext.load(list);
                        clientContext.load(list, 'EffectiveBasePermissions');
                        clientContext.executeQueryAsync(Function.createDelegate(this, function()
                        {
                            if(this.list.get_effectiveBasePermissions().has(SP.PermissionKind.editListItems))
                            {
                                //holder.onmouseenter = function(){ tiles.showAdmin(this); };
                                //holder.onmouseleave = function(){ tiles.showAdmin(this, true); };

                                createElement("span", holder, "nTileAdminLinks", {"innerHTML" : '<b>actions</b>:&nbsp;<a href="#" title="add a tile" onclick="nSPTiles.startAddOrMoveTile(this, \'New\', \'' + holderID + '\'); return false;">add</a>&nbsp;|&nbsp;<a href="#" title="move a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, \'Update\', \'' + holderID + '\'); return false;">move</a>&nbsp;|&nbsp;<a href="#" title="edit a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, \'Edit\', \'' + holderID + '\'); return false;">edit</a>&nbsp;|&nbsp;<a href="#" title="delete a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, \'Delete\', \'' + holderID + '\'); return false;">delete</a>&nbsp;|&nbsp;<a target="_blank" href="' + SITE_URL + 'Lists/' + LIST_NAME + '">list</a>'});
                            }
                        }), Function.createDelegate(this, function(){}));

                    }, "sp.js");
                }
            });
        }
        // we don't have a holder and the page is finished loading
        else if(document.readyState == "complete")
        {
            alert("An element with the ID '" + holderID + "' was not found.");
        }
        // we don't have a holder and the page hasn't finished loading so let it load
        else
        {
            // let the page finish loading and retry
            if(document.addEventListener)
            {
                document.addEventListener('DOMContentLoaded', function()
                {
                    tiles.init(holderID, groupName, gridWidth, gridHeight, animationTime);
                });
            }
            else
            {
                document.attachEvent('onreadystatechange', function()
                {
                    if(document.readyState != 'loading')
                    {
                        tiles.init(holderID, groupName, gridWidth, gridHeight, animationTime);
                    }
                });
            }
        }
    };

    // GUI for adding or moving a tile
    tiles.startAddOrMoveTile = function(a, action, holderID, selectedTile, selectedTileID)
    {
        // hide the admin links
        a.parentNode.style.display = "none";

        //tiles.showAdmin = emptyFunction;

        // get some data and create DOM elements
        var tilesData = tilesTracker[holderID];
        var nTilesWrapper = tilesData.tilesWrapper;

        var nTileOverlay = createElement("div", nTilesWrapper, "nTileOverlay");
        var nTileGridBox = createElement("div", nTilesWrapper, "nTileGridBox", { "style" : "width: " + tilesData.gridWidth + "px; height: " + tilesData.gridHeight + "px;"});
        var nTilesHelp = createElement("div", document.body, null, {"id" : "nTilesHelp", "innerHTML" : "<b>Click</b> where you want the <u>top left</u> of the tile to be.<br /><br />Press <u>escape</u> to cancel."});
        var nTilesToolTip = createElement("div", document.body, null, {"id" : "nTilesToolTip", "innerHTML" : 'left&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipLeft"></span><br />top&nbsp;&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipTop"></span><br />--<br />width&nbsp;&nbsp;: <span id="nTilesToolTipWidth"></span><br />height&nbsp;: <span id="nTilesToolTipHeight"></span>'});

        var nTilesToolTipLeft = document.getElementById("nTilesToolTipLeft");
        var nTilesToolTipTop = document.getElementById("nTilesToolTipTop");
        var nTilesToolTipWidth = document.getElementById("nTilesToolTipWidth");
        var nTilesToolTipHeight = document.getElementById("nTilesToolTipHeight");

        var currentHeight = nTilesWrapper.offsetHeight;

        // if we're done or cancelling undo stuff
        var end = function()
        {
            document.onkeyup = null;

            nTileGridBox.onclick = null;
            nTilesWrapper.onmousemove = null;

            deleteElement(nTileOverlay);
            deleteElement(nTileGridBox);
            deleteElement(nTilesHelp);
            deleteElement(nTilesToolTipLeft);
            deleteElement(nTilesToolTipTop);
            deleteElement(nTilesToolTipWidth);
            deleteElement(nTilesToolTipHeight);
            deleteElement(nTilesToolTip);

            addRemoveTileHoverBoxes(nTilesWrapper, false);

            if(selectedTile)
            {
                selectedTile.className = selectedTile.className.replace(/\ nTileFocus/, "");
            }
            nTilesWrapper.style.height = currentHeight;

            a.parentNode.style.display = "";
            //tiles.showAdmin = showAdmin;
        };

        // I should probably use named functions instead of anonymous inner ones to avoid memory leaks but how often is the user gonna be adding/editing tiles?
        nTileGridBox.onclick = function()
        {
            // the user clicked the start of where they want the tile
            nTileGridBox.className += " clicked";
            var tileLeftOffset = nTilesToolTipLeft.innerText;
            var tileTopOffset = nTilesToolTipTop.innerText;

            nTileGridBox.onclick = function()
            {
                // the user clicked the end of where they want the tile so create it
                var tileWidth = nTilesToolTipWidth.innerText;
                var tileHeight = nTilesToolTipHeight.innerText;

                addEditDeleteTile(action, {
                    "ID" : action == "New" ? "New" : selectedTileID,
                    "Title" : tilesData.groupName,
                    "nTileWidthOnGrid" : tileWidth,
                    "nTileHeightOnGrid" : tileHeight,
                    "nTileLeftOffset" : tileLeftOffset,
                    "nTileTopOffset" : tileTopOffset
                }, function(status)
                {
                    end();
                    if(status)
                    {
                        reload(holderID, true, function(returnCode)
                        {
                            if(returnCode !== 0)
                            {
                                alert("There was an error reloading the data which is odd cause it worked on loading.");
                            }
                        });
                    }
                    else
                    {
                        alert("Unable to " + (action == "New" ? "add a new" : "update existing") + " tile.");

                    }
                });
            };

            // user already selected the top left corner so resize the box for the height and width
            nTilesWrapper.onmousemove = function(e)
            {
                var c = getMousePositionProperties(e, nTilesWrapper);
                var width = Math.floor(c.elementX / tilesData.gridWidth) - tileLeftOffset + 1;
                var height = Math.floor(c.elementY / tilesData.gridHeight) - tileTopOffset + 1;

                nTilesToolTip.style.top = c.pageY + 25 + "px";
                nTilesToolTip.style.left = c.pageX + 25 + "px";

                nTilesToolTipWidth.innerText = width;
                nTilesToolTipHeight.innerText = height;

                if(width > 0 && height > 0)
                {
                    nTileGridBox.style.width = width * tilesData.gridWidth + "px";
                    nTileGridBox.style.height = height * tilesData.gridHeight + "px";
                }
            };

            nTilesHelp.innerHTML = "<b>Click</b> where you want the <u>bottom right</u> of the tile to be.<br /><br />Press <u>escape</u> to cancel.";
        };

        // let the user select where the tile should start
        nTilesWrapper.onmousemove = function(e)
        {
            var c = getMousePositionProperties(e, nTilesWrapper);
            var top = Math.floor(c.elementY / tilesData.gridHeight);
            var left = Math.floor(c.elementX / tilesData.gridWidth);

            nTileGridBox.style.top = top * tilesData.gridHeight + "px";
            nTileGridBox.style.left = left * tilesData.gridWidth + "px";

            nTilesToolTip.style.top = c.pageY + 25 + "px";
            nTilesToolTip.style.left= c.pageX + 25 + "px";

            nTilesToolTipLeft.innerText = left;
            nTilesToolTipTop.innerText = top;
        };

        addRemoveTileHoverBoxes(nTilesWrapper, true);

        // if we're moving an existing tile then highlight it so they know where it currently is
        if(action == "Update")
        {
            selectedTile.className += " nTileFocus";
            selectedTile.querySelector(".nTileHoverBox").innerText = "moving";
        }

        // let the user cancel with escape
        document.onkeyup = function(e)
        {
            if((e || window.event).keyCode == 27)
            {
                end();
            }
        };

        // add height to the wrapper so there is room to add tiles
        nTilesWrapper.style.height = currentHeight + 500 + "px";
    };

    // GUI for moving, editing or deleting a tile
    tiles.startTilesMoveEditDelete = function(a, action, holderID)
    {
        a.parentNode.style.display = "none";

        //tiles.showAdmin = tiles.hover = tiles.openLink = emptyFunction;
        tiles.hover = tiles.openLink = emptyFunction;

        var tilesData = tilesTracker[holderID];
        var nTilesWrapper = tilesData.tilesWrapper;

        // create elements
        var nTilesHelp = createElement("div", document.body, null, {"id" : "nTilesHelp", "innerHTML" : "<b>Click</b> on the tile you want to <u>" + action + "</u>.<br /><br />Press <u>escape</u> to cancel."});
        var nTilesToolTip = createElement("div", document.body, null, {"id" : "nTilesToolTip", "style" : "display: none;", "innerHTML" : '<b>action&nbsp;: <span>' + action + '</span><br />ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipID"></span></b><br /><br /><br />left&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipLeft"></span><br />top&nbsp;&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipTop"></span><br />--<br />width&nbsp;&nbsp;: <span id="nTilesToolTipWidth"></span><br />height&nbsp;: <span id="nTilesToolTipHeight"></span>'});

        var nTilesToolTipID = document.getElementById("nTilesToolTipID");
        var nTilesToolTipLeft = document.getElementById("nTilesToolTipLeft");
        var nTilesToolTipTop = document.getElementById("nTilesToolTipTop");
        var nTilesToolTipWidth = document.getElementById("nTilesToolTipWidth");
        var nTilesToolTipHeight = document.getElementById("nTilesToolTipHeight");

        // change the hover function for a tile so we can "highlight" it on hover
        tiles.hover = function(mode, tile, holderID, tileID)
        {
            if(mode)
            {
                tile.className += " nTileFocus";
                nTilesToolTip.style.display = "block";
                nTilesToolTipID.innerText = tileID;
                nTilesToolTipLeft.innerText = tile.style.left.replace("px", "") / tilesData.gridWidth;
                nTilesToolTipTop.innerText = tile.style.top.replace("px", "") / tilesData.gridHeight;
                nTilesToolTipWidth.innerText = tile.style.width.replace("px", "") / tilesData.gridWidth;
                nTilesToolTipHeight.innerText = tile.style.height.replace("px", "") / tilesData.gridHeight;
            }
            else
            {
                nTilesToolTip.style.display = "none";
                tile.className = tile.className.replace(/\ nTileFocus/, "");
            }
        };

        // change the onclick event for a tile so we can "select" it
        tiles.openLink = function(tile)
        {
            var thisTileID = nTilesToolTipID.innerText;
            tile.className = tile.className.replace(/\ nTileFocus/, "");
            end();

            if(action == "Edit")
            {
                tiles.openLink(tile, "dialog (refresh tiles after save)", SITE_URL + "Lists/" + LIST_NAME + "/EditForm.aspx?ID=" + thisTileID);
            }
            else if(action == "Delete")
            {
                if(confirm("Are you sure you want to delete the tile?"))
                {
                    addEditDeleteTile(action, { "ID" : thisTileID }, function(status)
                    {
                        if(status)
                        {
                            reload(holderID, true, function(returnCode)
                            {
                                if(returnCode !== 0)
                                {
                                    alert("There was an error reloading the data which is odd cause it worked on loading.");
                                }
                            });
                        }
                        else
                        {
                            alert("Unable to delete the tile.");
                        }
                    });
                }
            }
            else
            {
                tiles.startAddOrMoveTile(a, action, holderID, tile, thisTileID);
            }
        };

        // when we're done or cancelling
        var end = function()
        {
            document.onkeyup = null;

            deleteElement(nTilesHelp);
            deleteElement(nTilesToolTipID);
            deleteElement(nTilesToolTipLeft);
            deleteElement(nTilesToolTipTop);
            deleteElement(nTilesToolTipWidth);
            deleteElement(nTilesToolTipHeight);
            deleteElement(nTilesToolTip);

            addRemoveTileHoverBoxes(nTilesWrapper, false);

            //tiles.showAdmin = showAdmin;
            tiles.openLink = openLink;
            tiles.hover = tileHover;

            a.parentNode.style.display = "";
        };

        addRemoveTileHoverBoxes(nTilesWrapper, true, action == "Update" ? "move" : "context-menu", function(e)
        {
            var c = getMousePositionProperties(e, nTilesWrapper);
            nTilesToolTip.style.top = c.pageY + 25 + "px";
            nTilesToolTip.style.left= c.pageX + 25 + "px";
        });

        document.onkeyup = function(e)
        {
            if((e || window.event).keyCode == 27)
            {
                end();
            }
        };
    };

    // insert the CSS
    var css = createElement("style", document.head || document.getElementsByTagName('head')[0], {"type" : "text/css"});
    if(css.styleSheet)
    {
        css.styleSheet.cssText = CSS_STYLE;
    }
    else
    {
        css.appendChild(document.createTextNode(CSS_STYLE));
    }
    return tiles;
})();
