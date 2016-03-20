/* nSPTiles
 * ----------------------------------------------------------------------------
 * a JavaScript library for Window 8 style live tiles
 *
 * version : 1.4
 * url     : https://github.com/imthenachoman/nSPTiles
 * author  : Anchal Nigam
 * e-mail  : imthenachoman@gmail.com
 *
 * Copyright (c) 2015 Anchal Nigam (imthenachoman@gmail.com)
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
    var ANIMATION_TIME = 150;
    var LIST_NAME = "nSPTiles1_4";

    // CSS
    var CSS_STYLE = ".nTilesWrapper,.nTilesContainer,.nTile,.nTileContentWrapper,.nTileBackground,.nTileHTMLContent{margin:0;padding:0;overflow:hidden}.nTilesWrapper{position:relative}.nTilesContainer{position:relative;display:inline-block}.nTile,.nTileContentWrapper,.nTileBackground,.nTileHTMLContent{position:absolute;top:0;left:0;bottom:0;right:0}.nTilePositionTable{position:absolute;display:table;width:100%;height:100%}.nTilePositionRow{display:table-row}.nTilePositionCell{display:table-cell;width:100%;height:100%}.nHoverOption1,.nTileHovering .nHoverOption2{display:inline-block!important}.nHoverOption2,.nTileHovering .nHoverOption1{display:none!important}.nTileSliderContent{position:absolute;height:100%;width:100%}.nTileLink{cursor:pointer}.nTileAdminLinks{position:absolute;top:0;right:0;padding:5px;display:none;z-index:50;background-color:#ff9;border:1px solid #000;filter:alpha(opacity=30);opacity:.3}.nTilesWrapper:hover .nTileAdminLinks{display:inline-block}.nTileAdminLinks:hover{filter:(alpha=100);opacity:1}.nTileAdminLinks:hover .nTileAdminLinksOff{display:none}.nTileAdminLinks:hover .nTileAdminLinksOn{display:inline-block}.nTileAdminLinks .nTileAdminLinksOn{display:none}.nTileGridBox{position:absolute;filter:alpha(opacity=30);opacity:.3;background-color:#f00;z-index:100;top:0;left:0}.nTileGridBox.nTileGridBoxClicked{background-color:blue}.nTileOverlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#0f0;filter:alpha(opacity=10);opacity:.1;z-index:95}#nTilesHelp{position:fixed;top:10px;left:10px;padding:5px;z-index:999999;background-color:#ffb;border:1px solid #000}#nTilesToolTip{font-family:'Lucida Console';position:fixed;top:0;left:0;padding:5px;z-index:999999;background-color:#ffb;border:1px solid #000}.nTileHoverBox{position:absolute;top:0;left:0;width:100%;height:100%;z-index:50;background-color:#ff0;filter:alpha(opacity=50);opacity:.5}.nTileFocus .nTileHoverBox{background-color:#0ff;font-weight:700;text-decoration:underline}#nTilesHelp table{border-collapse:collapse}#nTilesHelp th, #nTilesHelp td{padding:5px}#nTilesHelp th{text-align:right}";

    // table settings
    var TABLE_FIELDS = [ { DisplayName: "active",                                         Type: "Boolean",             Description: "can be used hide a tile without having to remove this entry",                                                                                                        Default: "1"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "tile width",                                     Type: "Number",              Description: "the width of the tile in px",                                                                                                                                        Default: "100",                     Required: "TRUE",                                       Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile height",                                    Type: "Number",              Description: "the height of the tile in px",                                                                                                                                       Default: "100",                     Required: "TRUE",                                       Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile left offset",                               Type: "Number",              Description: "the left offset of the tile in px",                                                                                                                                  Default: "0",                       Required: "TRUE",                                       Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile top offset",                                Type: "Number",              Description: "the top offset of the tile in px",                                                                                                                                   Default: "0",                       Required: "TRUE",                                       Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "tile border width",                              Type: "Number",              Description: "the empty space around the tile in px",                                                                                                                              Default: "2",                       Required: "TRUE",                                       Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile zoom on hover",                             Type: "Boolean",             Description: "zoom effect for the tile by making the tile border width 0 when the mouse is over the tile",                                                                         Default: "1",                       Required: "FALSE"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                        
                        ,{ DisplayName: "tile link type",                                 Type: "Choice",              Description: "the type of link to make",                                                                                                                                           Default: "none",                    Required: "TRUE",                                                                                  Format: "Dropdown",          FillInChoice: "FALSE",          Choices: "none,current window,new window,mailto,dialog,dialog (refresh window after save),dialog (refresh tiles after save)"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
                        ,{ DisplayName: "tile link URL",                                  Type: "Note",                Description: "the URL for the link",                                                                                                                                                                                   Required: "FALSE",                                                                                                                                                                                                                                                                               NumLines: "3",          RichText: "FALSE"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }
                        
                        ,{ DisplayName: "is heading",                                     Type: "Boolean",             Description: "heading tiles have no slider",                                                                                                                                       Default: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "tile background color",                          Type: "Text",                Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",                                                                                Default: "rgb(0,114,198)",          Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile background opacity",                        Type: "Choice",              Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",                                                                                Default: "none",                    Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        ,{ DisplayName: "tile background color on hover",                 Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile background opacity on hover",               Type: "Choice",                                                                                                                                                                                                                                     Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        
                        ,{ DisplayName: "tile image URL",                                 Type: "Text",                Description: "URL of image to use in tile (must be less then 255 characters)",                                                                                                                                         Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile image width",                               Type: "Text",                Description: "width of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)&#xD;&#xA;&#xD;&#xA;helpful if the image is larger then the icon",                                               Required: "FALSE",           MaxLength: "255",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Validation: { Message: "Please enter a whole number or a percent.",          Function: '=OR([tile image width]="",AND(ISNUMBER([tile image width]+0),ROUND([tile image width]+0,0)=([tile image width]+0)),AND(RIGHT([tile image width],1)="%",ISNUMBER(LEFT([tile image width],LEN([tile image width])-1)+0)))' }            }
                        ,{ DisplayName: "tile image height",                              Type: "Text",                Description: "height of tile image. use just a number to specify in px or end with a % (e.g. 50 or 75%)&#xD;&#xA;&#xD;&#xA;helpful if the image is larger then the icon",                                              Required: "FALSE",           MaxLength: "255",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Validation: { Message: "Please enter a whole number or a percent.",          Function: '=OR([tile image height]="",AND(ISNUMBER([tile image height]+0),ROUND([tile image height]+0,0)=([tile image height]+0)),AND(RIGHT([tile image height],1)="%",ISNUMBER(LEFT([tile image height],LEN([tile image height])-1)+0)))' }     }
                        ,{ DisplayName: "tile image opacity",                             Type: "Choice",              Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",                                                                                                                    Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        ,{ DisplayName: "tile image padding",                             Type: "Number",              Description: "how far from the edge of the tile should the image be in px",                                                                                                        Default: "5",                       Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile image style",                               Type: "Text",                Description: "css style to apply to the tile image (overrides above tile image options)",                                                                                                                              Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile image position",                            Type: "Choice",              Description: "position of the image in the tile",                                                                                                                                  Default: "top left",                Required: "TRUE",                                                                                  Format: "Dropdown",          FillInChoice: "FALSE",          Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                        ,{ DisplayName: "tile image URL on hover",                        Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile image style on hover",                      Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        
                        ,{ DisplayName: "tile FA class",                                  Type: "Text",                Description: "Font Awesome icon class name",                                                                                                                                                                           Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile FA color",                                  Type: "Text",                Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",                                                                                                                    Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile FA opacity",                                Type: "Choice",              Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",                                                                                                                    Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        ,{ DisplayName: "tile FA padding",                                Type: "Number",              Description: "how far from the edge of the tile should the icon be in px",                                                                                                         Default: "5",                       Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "tile FA style",                                  Type: "Text",                Description: "css style to apply to the FA icon (overrides above tile FA options)",                                                                                                                                    Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile FA position",                               Type: "Choice",              Description: "position of the icon in the tile",                                                                                                                                   Default: "top left",                Required: "TRUE",                                                                                  Format: "Dropdown",          FillInChoice: "FALSE",          Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                        ,{ DisplayName: "tile FA class on hover",                         Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile FA style on hover",                         Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        
                        ,{ DisplayName: "heading content",                                Type: "Text",                Description: "can use HTML",                                                                                                                                                       Default: "heading",                 Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        //,{ DisplayName: "heading content",                                Type: "Note",                Description: "can use HTML",                                                                                                                                                       Default: "heading",                 Required: "FALSE",                                                                                                                                                                                                                                                                               NumLines: "5",          RichText: "FALSE"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }
                        ,{ DisplayName: "heading bolded",                                 Type: "Boolean",             Description: "should the heading text be bold",                                                                                                                                    Default: "1"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "heading font color",                             Type: "Text",                Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",                                                                                Default: "white",                   Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "heading font size",                              Type: "Number",              Description: "font size for the heading in px",                                                                                                                                    Default: "10",                      Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "heading padding",                                Type: "Number",              Description: "padding for the heading in px",                                                                                                                                      Default: "5",                       Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "heading style",                                  Type: "Text",                Description: "css style to apply to heading (overrides above heading options)",                                                                                                                                        Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "heading position",                               Type: "Choice",              Description: "position of the heading in the tile or slider heading",                                                                                                              Default: "bottom left",             Required: "TRUE",                                                                                  Format: "Dropdown",          FillInChoice: "FALSE",          Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                        ,{ DisplayName: "heading content on hover",                       Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "heading style on hover",                         Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        
                        ,{ DisplayName: "slider heading height",                          Type: "Number",              Description: "height of the header for the slider in px",                                                                                                                          Default: "25",                      Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "slider body content",                            Type: "Note",                Description: "can use HTML",                                                                                                                                                       Default: "body",                    Required: "FALSE",                                                                                                                                                                                                                                                                               NumLines: "5",          RichText: "FALSE"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }
                        ,{ DisplayName: "slider body font color",                         Type: "Text",                Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",                                                                                Default: "white",                   Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "slider body font size",                          Type: "Number",              Description: "font size for the slider body in px",                                                                                                                                Default: "10",                      Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "slider body padding",                            Type: "Number",              Description: "padding of the slider body in px",                                                                                                                                   Default: "5",                       Required: "FALSE",                                      Min: "0",          Decimals: "0"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "slider body style",                              Type: "Text",                Description: "css style to apply to slider body (overrides above slider body options)",                                                                                                                                Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "slider body position",                           Type: "Choice",              Description: "position of the slider body in the slider",                                                                                                                          Default: "top left",                Required: "TRUE",                                                                                  Format: "Dropdown",          FillInChoice: "FALSE",          Choices: "top left,top center,top right,middle left,middle center,middle right,bottom left,bottom center,bottom right"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                        
                        ,{ DisplayName: "slider background color",                        Type: "Text",                Description: "HTML/CSS friendly color or .className (e.g.: red, #0099ff, rgb(0,150,255), .color1)",                                                                                Default: "black",                   Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "slider background opacity",                      Type: "Choice",              Description: "opacity from 0 (transparent) to 100 (solid)&#xD;&#xA;&#xD;&#xA;leave blank for none",                                                                                Default: "50",                      Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        ,{ DisplayName: "slider background color on hover",               Type: "Text",                                                                                                                                                                                                                                       Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "slider background opacity on hover",             Type: "Choice",                                                                                                                                                                                                                                     Required: "FALSE",                                                                                 Format: "Dropdown",          FillInChoice: "FALSE",          Choices: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        
                        ,{ DisplayName: "tile image and FA slider heading push",          Type: "Boolean",             Description: "if the tile image and/or FA are positioned on the bottom then push them on top of the slider heading",                                                               Default: "1"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "tile custom ID",                                 Type: "Text",                Description: "custom ID to use for the tile &#xD;&#xA;&#xD;&#xA;default is nTile_[ID] where ID is the ID of the entry in the list",                                                                                    Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "tile custom class(es)",                          Type: "Text",                Description: "custom class(s) to add to the tile",                                                                                                                                                                     Required: "FALSE",           MaxLength: "255"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        
                        ,{ DisplayName: "cc tile style",                                  Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=CONCATENATE("width: ",[tile width],"px; height: ",[tile height],"px; top: ",[tile top offset],"px; left: ",[tile left offset],"px;")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
                        ,{ DisplayName: "cc tile content wrapper style",                  Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=CONCATENATE("margin: ",[tile border width],"px;")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                        ,{ DisplayName: "cc tile right edge",                             Type: "Calculated",                                                                                                                                                                                                                                                                                                            Decimals: "0",                                                                                                                                                                                                                                                            ResultType: "Number",          Formula: '=[tile left offset]+[tile width]'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        ,{ DisplayName: "cc tile bottom edge",                            Type: "Calculated",                                                                                                                                                                                                                                                                                                            Decimals: "0",                                                                                                                                                                                                                                                            ResultType: "Number",          Formula: '=[tile top offset]+[tile height]'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        
                        ,{ DisplayName: "cc tile background class",                       Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile background color]<>"","nTileBackground"&IF([tile background color on hover]<>""," nHoverOption1","")&IF(LEFT([tile background color],1)="."," "&REPLACE([tile background color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        ,{ DisplayName: "cc tile background style",                       Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile background color]<>"",IF(AND([tile background opacity]<>"",[tile background opacity]<>"none"),"filter: alpha(opacity="&[tile background opacity]&"); opacity: "&"0."&right("0"&[tile background opacity],2)&"; ","")&IF(AND([tile background color]<>"",LEFT([tile background color],1)<>"."),"background-color: "&[tile background color]&"; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        ,{ DisplayName: "cc tile background class on hover",              Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile background color]<>"",[tile background color on hover]<>""),"nTileBackground nHoverOption2"&IF(LEFT([tile background color on hover],1)="."," "&REPLACE([tile background color on hover],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
                        ,{ DisplayName: "cc tile background style on hover",              Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile background color]<>"",[tile background color on hover]<>""),IF(AND([tile background opacity on hover]<>"",[tile background opacity on hover]<>"none"),"filter: alpha(opacity="&[tile background opacity on hover]&"); opacity: "&"0."&right("0"&[tile background opacity on hover],2)&"; ","")&IF(AND([tile background color on hover]<>"",LEFT([tile background color on hover],1)<>"."),"background-color: "&[tile background color on hover]&"; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           }
                        
                        ,{ DisplayName: "cc tile image and fa table style",               Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile image and FA slider heading push],NOT([is heading]),OR([tile image URL]<>"",[tile FA class]<>"")),"height: 0;","")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        
                        ,{ DisplayName: "cc tile image position style",                   Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile image URL]<>"","vertical-align: "&LEFT([tile image position],SEARCH(" ",[tile image position])-1)&"; text-align: "&RIGHT([tile image position],LEN([tile image position])-SEARCH(" ",[tile image position]))&"; "&IF(AND([tile image and FA slider heading push],NOT([is heading])),"height: "&[tile height]-[tile border width]-[tile border width]-[slider heading height]&"px",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }
                        ,{ DisplayName: "cc tile image class",                            Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile image URL]<>"","nTileImage"&IF([tile image URL on hover]<>""," nHoverOption1",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }
                        ,{ DisplayName: "cc tile image style",                            Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile image URL]<>"",IF([tile image width]<>"","width: "&IF(RIGHT([tile image width],1)="%",[tile image width],[tile image width]&"px")&"; ","")&IF([tile image height]<>"","height: "&IF(RIGHT([tile image height],1)="%",[tile image height],[tile image height]&"px")&"; ","")&IF([tile image padding]<>"","padding: "&[tile image padding]&"px; ","")&IF(AND([tile image opacity]<>"",[tile image opacity]<>"none"),"filter: alpha(opacity="&[tile image opacity]&"); opacity: "&"0."&right("0"&[tile image opacity],2)&"; ","")&[tile image style],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "cc tile image class on hover",                   Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile image URL]<>"",[tile image URL on hover]<>""),"nTileImage nHoverOption2","")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                        ,{ DisplayName: "cc tile image style on hover",                   Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile image URL]<>"",[tile image URL on hover]<>""),IF([tile image width]<>"","width: "&IF(RIGHT([tile image width],1)="%",[tile image width],[tile image width]&"px")&"; ","")&IF([tile image height]<>"","height: "&IF(RIGHT([tile image height],1)="%",[tile image height],[tile image height]&"px")&"; ","")&IF([tile image padding]<>"","padding: "&[tile image padding]&"px; ","")&IF(AND([tile image opacity]<>"",[tile image opacity]<>"none"),"filter: alpha(opacity="&[tile image opacity]&"); opacity: "&"0."&right("0"&[tile image opacity],2)&"; ","")&[tile image style on hover],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                        
                        ,{ DisplayName: "cc tile FA position style",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile FA class]<>"","vertical-align: "&LEFT([tile FA position],SEARCH(" ",[tile FA position])-1)&"; text-align: "&RIGHT([tile FA position],LEN([tile FA position])-SEARCH(" ",[tile FA position]))&"; "&IF(AND([tile image and FA slider heading push],NOT([is heading])),"height: "&[tile height]-[tile border width]-[tile border width]-[slider heading height]&"px",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }
                        ,{ DisplayName: "cc tile FA class",                               Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile FA class]<>"","nTileFA fa "&[tile FA class]&IF([tile FA class on hover]<>""," nHoverOption1","")&IF(AND([tile FA color]<>"",LEFT([tile FA color],1)=".")," "&REPLACE([tile FA color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
                        ,{ DisplayName: "cc tile FA style",                               Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([tile FA class]<>"",IF(AND([tile FA opacity]<>"",[tile FA opacity]<>"none"),"filter: alpha(opacity="&[tile FA opacity]&"); opacity: "&"0."&right("0"&[tile FA opacity],2)&"; ","")&IF([tile FA padding]<>"","padding: "&[tile FA padding]&"px; ","")&IF(AND([tile FA color]<>"",LEFT([tile FA color],1)<>"."),"color: "&[tile FA color]&";","")&[tile FA style],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
                        ,{ DisplayName: "cc tile FA class on hover",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile FA class]<>"",[tile FA class on hover]<>""),"nTileFA fa "&[tile FA class on hover]&" nHoverOption2"&IF(AND([tile FA color]<>"",LEFT([tile FA color],1)=".")," "&REPLACE([tile FA color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
                        ,{ DisplayName: "cc tile FA style on hover",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([tile FA class]<>"",[tile FA class on hover]<>""),IF(AND([tile FA opacity]<>"",[tile FA opacity]<>"none"),"filter: alpha(opacity="&[tile FA opacity]&"); opacity: "&"0."&right("0"&[tile FA opacity],2)&"; ","")&IF([tile FA padding]<>"","padding: "&[tile FA padding]&"px; ","")&IF(AND([tile FA color]<>"",LEFT([tile FA color],1)<>"."),"color: "&[tile FA color]&"; ","")&[tile FA style on hover],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                        
                        ,{ DisplayName: "cc heading position style",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([heading content]<>"","vertical-align: "&LEFT([heading position],SEARCH(" ",[heading position])-1)&"; text-align: "&RIGHT([heading position],LEN([heading position])-SEARCH(" ",[heading position]))&"; "&IF(NOT([is heading]),"height: "&[slider heading height]&"px; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                        ,{ DisplayName: "cc heading class",                               Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([heading content]<>"","nTileHeading"&IF([heading content on hover]<>""," nHoverOption1","")&IF(LEFT([heading font color])="."," "&REPLACE([heading font color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                        ,{ DisplayName: "cc heading style",                               Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF([heading content]<>"",IF([heading bolded],"font-weight: bold; ","")&IF([heading padding]<>"","padding: "&[heading padding]&"px; ","")&IF([heading font size]<>"","font-size: "&[heading font size]&"px; ","")&IF(AND([heading font color]<>"",LEFT([heading font color],1)<>"."),"color: "&[heading font color]&"; ","")&[heading style],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        ,{ DisplayName: "cc heading class on hover",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([heading content]<>"",[heading content on hover]<>""),"nTileHeading nHoverOption2"&IF(LEFT([heading font color])="."," "&REPLACE([heading font color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        ,{ DisplayName: "cc heading style on hover",                      Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND([heading content]<>"",[heading content on hover]<>""),IF([heading bolded],"font-weight: bold; ","")&IF([heading padding]<>"","padding: "&[heading padding]&"px; ","")&IF([heading font size]<>"","font-size: "&[heading font size]&"px; ","")&IF(AND([heading font color]<>"",LEFT([heading font color],1)<>"."),"color: "&[heading font color]&"; ","")&[heading style on hover],"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                        
                        ,{ DisplayName: "cc slider content style",                        Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(NOT([is heading]),CONCATENATE("top: ",[tile height]-[tile border width]-[tile border width]-[slider heading height],"px;"),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                        ,{ DisplayName: "cc slider position style",                       Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(NOT([is heading]),"vertical-align: "&LEFT([slider body position],SEARCH(" ",[slider body position])-1)&"; text-align: "&RIGHT([slider body position],LEN([slider body position])-SEARCH(" ",[slider body position]))&"; ","")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   }
                        ,{ DisplayName: "cc slider body class",                           Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(NOT([is heading]),"nTileSlider"&IF(LEFT([slider body font color],1)="."," "&REPLACE([slider body font color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        ,{ DisplayName: "cc slider body style",                           Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(NOT([is heading]),[slider body style]&"; "&IF([slider body padding]<>"","padding: "&[slider body padding]&"px; ","")&IF([slider body font size]<>"","font-size: "&[slider body font size]&"px; ","")&IF(AND([slider body font color]<>"",LEFT([slider body font color],1)<>"."),"color: "&[slider body font color]&"; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }
                        ,{ DisplayName: "cc slider background class",                     Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND(NOT([is heading]),[slider background color]<>""),"nTileBackground"&IF([slider background color on hover]<>""," nHoverOption1","")&IF(LEFT([slider background color],1)="."," "&REPLACE([slider background color],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                        ,{ DisplayName: "cc slider background style",                     Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND(NOT([is heading]),[slider background color]<>""),IF(AND([slider background opacity]<>"",[slider background opacity]<>"none"),"filter: alpha(opacity="&[slider background opacity]&"); opacity: "&"0."&right("0"&[slider background opacity],2)&"; ","")&IF(AND([slider background color]<>"",LEFT([slider background color],1)<>"."),"background-color: "&[slider background color]&"; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             }
                        ,{ DisplayName: "cc slider background class on hover",            Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND(NOT([is heading]),[slider background color]<>"",[slider background color on hover]<>""),"nTileBackground nHoverOption2"&IF(LEFT([slider background color on hover],1)="."," "&REPLACE([slider background color on hover],1,1,""),""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                        ,{ DisplayName: "cc slider background style on hover",            Type: "Calculated",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ResultType: "Text",            Formula: '=IF(AND(NOT([is heading]),[slider background color]<>"",[slider background color on hover]<>""),IF(AND([slider background opacity on hover]<>"",[slider background opacity on hover]<>"none"),"filter: alpha(opacity="&[slider background opacity on hover]&"); opacity: "&"0."&right("0"&[slider background opacity on hover],2)&"; ","")&IF(AND([slider background color on hover]<>"",LEFT([slider background color on hover],1)<>"."),"background-color: "&[slider background color on hover]&"; ",""),"")'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
    ];
    
    // the object to hold the main nSPTiles functions
    var tiles = {};

    // keep track of all the tiles and data for each tile
    var tilesTracker = {};

    // delete an element from the DOM
    var deleteElement = function(element) { element.parentNode.removeChild(element); };

    // animation helper
    // http://www.sitepoint.com/simple-animations-using-requestanimationframe/
    // https://gist.github.com/paulirish/1579671
    // https://gist.github.com/gre/1650294
    var animate = (function()
    {
        // animationCounter = counter for each animation
        // animationIDTracker = cache of each animation
        var animationCounter = 0, animationIDTracker = {}, lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'];
        
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
        
        return {
            stop: function(id)
            {
                cancelAnimationFrame(animationIDTracker[id]);
                delete animationIDTracker[id];
            },
            start: function(duration, action, animationType)
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
                        action(animationTypes[animationType](elapsed, 0, 1, duration));
                        animationIDTracker[currentAnimationID] = requestAnimationFrame(step);
                    }
                };
                step();
                return currentAnimationID;
            }
        };
    })();

    // animation easing functions
    var animationTypes = {
        slide: function(t, b, c, d)
        {
            return -c * (t /= d) * (t - 2) + b;
        },
        bounce: function(t, b, c, d)
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
        },
        elastic: function(t, b, c, d)
        {
            var s = 1.70158;
            var p = 0;
            var a = c;
            if (t === 0) return b;
            if ((t /= d) == 1) return b + c;
            if (!p) p = d * 0.3;
            if (a < Math.abs(c))
            {
                a = c;
                var s = p / 4;
            }
            else var s = p / (2 * Math.PI) * Math.asin(c / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        }
    };

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
    var SPWebServiceCall = function(siteURL, service, serviceSOAPAction, soapBody, completeFunc, async)
    {
        // open an xhr
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open("post", siteURL + "/_vti_bin/" + service, typeof(async) !== "undefined" && async !== null ? async : false);
        xhr.setRequestHeader("SOAPAction", serviceSOAPAction);
        xhr.setRequestHeader("Content-Type", "text/xml; charset=\"utf-8\"");

        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4) // DONE
            {
                window.xhr = xhr;
                completeFunc(xhr.status == 200, xhr);
            }
        };

        // create the data and send it
        xhr.send('<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' + soapBody + '</soap:Body></soap:Envelope>');
    };

    // get nodes of an xml document by tag name using a namespace if needed
    var getXMLNodesByTagName = function(xml, tagName, ns)
    {
        // if getElementsByTagNameNS then we're in chrome so use that
        return xml.getElementsByTagNameNS ? xml.getElementsByTagNameNS("*", tagName) :  xml.getElementsByTagName(ns + ":" + tagName);
    };
    
    // get mouse position with respect to the document AND with respecto an element
    var getMousePositionProperties = function(e, element)
    {
        var e = e || window.event;
        var ret = {pageX: 0, pageY: 0, elementX: 0, elementY: 0};

        if(e.pageX || e.pageY)
        {
            ret.pageX = e.pageX;
            ret.pageY = e.pageY;
        }
        else if(e.clientX || e.clientY)
        {
            ret.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            ret.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
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
    // this is done by making a holder div that is display:table and children divs that have display:table-cell so we can use text-align and vertical-align
    var makePositionHTML = function(className, tableStyle, row1Style, cell1Content, row2Style, cell2Content)
    {
        // the holder div
        var returnHTML = '<div class="nTilePositionTable ' + className + '" style="' + tableStyle + '">';
        // add the first cell/row
        returnHTML += '<div class="nTilePositionRow nTilePositionRow1"><div class="nTilePositionCell" style="width: 100%; height: 100%;' + row1Style + ';">' + cell1Content + '</div></div>';
        // if there is a second row
        if(row2Style)
        {
            returnHTML += '<div class="nTilePositionRow nTilePositionRow2"><div class="nTilePositionCell" style="width: 100%; height: 100%;' + row2Style + '">' + cell2Content + '</div></div>';
        }

        return returnHTML + '</div>';
    };

    // get FieldRef XML for the nSPTiles list
    var getFieldRefXML = function()
    {
        var fieldRefXML = "";
        fieldRefXML = '<FieldRef Name="ID" />';
        for(var i = 0, num = TABLE_FIELDS.length; i < num; ++i)
        {
            // convert the display name to a static name by removing spaces and camel casing
            fieldRefXML += '<FieldRef Name="' + "n" + TABLE_FIELDS[i].DisplayName.replace(/\b\w/g, function(m){return m.toUpperCase();}).replace(/[^a-zA-Z]/g, "") + '" />';
        }
        return fieldRefXML;
    };

    // reloads tile data
    // runs completeFunc on completion with a paramater that is:
    //  0 = done successfully
    //  2 = list does not exist
    //  3 = there is no web at the URl provided
    //  4 = unknown
    var reload = function(holderID, async, completeFunc)
    {
        // get the tile data and the container
        var tilesData = tilesTracker[holderID];
        var tilesWrapper = tilesData.tilesWrapper;
        var nTilesContainer = tilesWrapper.querySelector(".nTilesContainer");

        // reset cached tile specific data
        tilesData.tiles = {};

        // find all the tiles in this container and remove any events to avoid memory leaks
        var nTiles = nTilesContainer.querySelectorAll(".nTile");

        for(var i = 0, num = nTiles.length; i < num; ++i)
        {
            nTiles[i].onclick = nTiles[i].onmouseenter = nTiles[i].onmouseleave = null;
        }

        // let the user know we're loading
        nTilesContainer.innerText = "Please wait while I reload the data...";

        // get the list items
        // the soap body to get the list items for the tile group we want
        var soapBody = '';
        soapBody += '<GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
        soapBody += '<listName>' + LIST_NAME + '</listName>';
        soapBody += '<query><Query><Where><And><Eq><FieldRef Name="Title"/><Value Type="Text">' + tilesData.groupName + '</Value></Eq><Eq><FieldRef Name="nActive"/><Value Type="Boolean">1</Value></Eq></And></Where></Query></query>';
        soapBody += '<viewFields><ViewFields>' + getFieldRefXML() + '</ViewFields></viewFields>';
        soapBody += '<rowLimit>0</rowLimit>';
        soapBody += '</GetListItems>';

        // execute the call
        SPWebServiceCall(tilesData.siteURL, "Lists.asmx?op=GetListItems", "http://schemas.microsoft.com/sharepoint/soap/GetListItems", soapBody, function(status, xhr)
        {
            // if there was an error
            if(!status)
            {
                if(completeFunc)
                {
                    // errorcode 0x82000006 means no list
                    if(/<errorcode.*?>0x82000006<\/errorcode>/i.test(xhr.responseText))
                    {
                        completeFunc(2);
                    }
                    // no web at webURL provided
                    else if(/there is no web named/i.test(xhr.responseText))
                    {
                        completeFunc(3);
                    }
                    // something else went wrong
                    else
                    {
                        completeFunc(4);
                    }
                }
                return;
            }

            // get all the rows from the XML and create the HTML
            var rows = getXMLNodesByTagName(xhr.responseXML, "row", "z");

            // the master HTML of tiles
            var tilesHTML = "";

            // default height and width
            var width = 100;
            var height = 100;

            // are there rows
            if(rows.length)
            {
                // we need to know the max right and bottom so we know how big the container is
                var maxRightEdge = -1;
                var maxBottomEdge = -1;

                // loop through each tile
                for(var i = 0, num = rows.length; i < num; ++i)
                {
                    var row = rows[i];
                    
                    // get the data for the tile and create it's HTML
                    var thisTileHTML = "";
                    
                    // various tile data that needs processing before we can use it
                    var nCcTileRightEdge = parseInt(row.getAttribute("ows_nCcTileRightEdge").replace(/^[a-z]*?;#/i, ""), 10);
                    var nCcTileBottomEdge = parseInt(row.getAttribute("ows_nCcTileBottomEdge").replace(/^[a-z]*?;#/i, ""), 10);

                    var nCcTileBackgroundClass = row.getAttribute("ows_nCcTileBackgroundClass").replace(/^[a-z]*?;#/i, "");
                    var nCcTileBackgroundClassOnHover = row.getAttribute("ows_nCcTileBackgroundClassOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcTileFAClass = row.getAttribute("ows_nCcTileFAClass").replace(/^[a-z]*?;#/i, "");
                    var nCcTileFAClassOnHover = row.getAttribute("ows_nCcTileFAClassOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcHeadingPositionStyle = row.getAttribute("ows_nCcHeadingPositionStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingClass = row.getAttribute("ows_nCcHeadingClass").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingStyle = row.getAttribute("ows_nCcHeadingStyle").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingClassOnHover = row.getAttribute("ows_nCcHeadingClassOnHover").replace(/^[a-z]*?;#/i, "");
                    var nCcHeadingStyleOnHover = row.getAttribute("ows_nCcHeadingStyleOnHover").replace(/^[a-z]*?;#/i, "");

                    var nCcSliderBackgroundClass = row.getAttribute("ows_nCcSliderBackgroundClass").replace(/^[a-z]*?;#/i, "");
                    var nCcSliderBackgroundClassOnHover = row.getAttribute("ows_nCcSliderBackgroundClassOnHover").replace(/^[a-z]*?;#/i, "");

                    var tileClass = (row.getAttribute("ows_nTileCustomClassEs") || "") + " nTile nTile_" + row.getAttribute("ows_ID");

                    // the on mouse over function for the tile
                    var tileOnMouseEnter = "nSPTiles.hover(true, this, '" + row.getAttribute("ows_nIsHeading") + "', '" + row.getAttribute("ows_nTileZoomOnHover") + "')";
                    var tileOnMouseLeave = "nSPTiles.hover(false, this, '" + row.getAttribute("ows_nIsHeading") + "', '" + row.getAttribute("ows_nTileZoomOnHover") + "')";

                    if(row.getAttribute("ows_nTileLinkType") != "none")
                    {
                        tileClass += " nTileLink";
                    }
                    var tileOnClick = "nSPTiles.openLink(this, '" + row.getAttribute("ows_nTileLinkType") + "', '" + (row.getAttribute("ows_nTileLinkURL") ? row.getAttribute("ows_nTileLinkURL").replace(/\r|\n/g, "") : row.getAttribute("ows_nTileLinkURL")) + "')";

                    // find the max bottom and right edge so we know the size of the tiles wrapper/container
                    if(maxRightEdge < nCcTileRightEdge)
                    {
                        maxRightEdge = nCcTileRightEdge;
                    }
                    if(maxBottomEdge < nCcTileBottomEdge)
                    {
                        maxBottomEdge = nCcTileBottomEdge;
                    }

                    // start the HTML for the tile
                    thisTileHTML += '<div class="nTileContentWrapper" style="' + row.getAttribute("ows_nCcTileContentWrapperStyle").replace(/^[a-z]*?;#/i, "") + '">';

                    // if we have a background color for the tile
                    if(nCcTileBackgroundClass)
                    {
                        thisTileHTML += '<div class="' + nCcTileBackgroundClass + '" style="' + (row.getAttribute("ows_nCcTileBackgroundStyle").replace(/^[a-z]*?;#/i, "")) + '"></div>';
                        if(nCcTileBackgroundClassOnHover)
                        {
                            thisTileHTML += '<div class="' + nCcTileBackgroundClassOnHover + '" style="' + (row.getAttribute("ows_nCcTileBackgroundStyleOnHover").replace(/^[a-z]*?;#/i, "")) + '"></div>';
                        }
                    }

                    // if we have a tile image
                    if(row.getAttribute("ows_nTileImageURL"))
                    {
                        var thisTilePositionContent = '<img class="' + (row.getAttribute("ows_nCcTileImageClass").replace(/^[a-z]*?;#/i, "")) + '" style="' + (row.getAttribute("ows_nCcTileImageStyle").replace(/^[a-z]*?;#/i, "")) +'" src="' + row.getAttribute("ows_nTileImageURL") + '" />';
                        if(row.getAttribute("ows_nTileImageURLOnHover"))
                        {
                            thisTilePositionContent += '<img class="' + (row.getAttribute("ows_nCcTileImageClassOnHover").replace(/^[a-z]*?;#/i, "")) + '" style="' + (row.getAttribute("ows_nCcTileImageStyleOnHover").replace(/^[a-z]*?;#/i, "")) +'" src="' + row.getAttribute("ows_nTileImageURLOnHover") + '" />';
                        }
                        thisTileHTML += makePositionHTML("nTileImagePositionWrapper", (row.getAttribute("ows_nCcTileImageAndFaTableStyle").replace(/^[a-z]*?;#/i, "")), (row.getAttribute("ows_nCcTileImagePositionStyle").replace(/^[a-z]*?;#/i, "")), '<div style="line-height: 0;">' + thisTilePositionContent + '</div>');
                    }

                    // if we have a tile FA
                    if(nCcTileFAClass)
                    {
                        var thisTilePositionContent = '<span class="' + nCcTileFAClass  + '" style="' + (row.getAttribute("ows_nCcTileFAStyle").replace(/^[a-z]*?;#/i, "")) +'"></span>';
                        if(nCcTileFAClassOnHover)
                        {
                            thisTilePositionContent += '<span class="' + nCcTileFAClassOnHover  + '" style="' + (row.getAttribute("ows_nCcTileFAStyleOnHover").replace(/^[a-z]*?;#/i, "")) +'"></span>';
                        }
                        thisTileHTML += makePositionHTML("nTileFAPositionWrapper", (row.getAttribute("ows_nCcTileImageAndFaTableStyle").replace(/^[a-z]*?;#/i, "")), (row.getAttribute("ows_nCcTileFAPositionStyle").replace(/^[a-z]*?;#/i, "")), thisTilePositionContent);
                    }

                    // is this a heading tile
                    if(row.getAttribute("ows_nIsHeading") == "1")
                    {
                        tileClass += " nHeadingTile";
                        var thisTilePositionContent = '<div class="' + nCcHeadingClass + '" style="' + nCcHeadingStyle + '">' + (row.getAttribute("ows_nHeadingContent") || "") + '</div>';
                        if(row.getAttribute("ows_nHeadingContentOnHover"))
                        {
                            thisTilePositionContent += '<div class="' + nCcHeadingClassOnHover + '" style="' + nCcHeadingStyleOnHover + '">' + (row.getAttribute("ows_nHeadingContentOnHover") || "") + '</div>';
                        }
                        thisTileHTML += makePositionHTML("nTileHeadingPositionWrapper", "", nCcHeadingPositionStyle, thisTilePositionContent);
                    }
                    // slider tile
                    else
                    {
                        tileClass += " nSliderTile";
                        thisTileHTML += '<div class="nTileSliderContent" style="' + (row.getAttribute("ows_nCcSliderContentStyle").replace(/^[a-z]*?;#/i, "")) + '">';

                        // does the slider have a background
                        if(nCcSliderBackgroundClass)
                        {
                            thisTileHTML += '<div class="' + nCcSliderBackgroundClass + '" style="' + (row.getAttribute("ows_nCcSliderBackgroundStyle").replace(/^[a-z]*?;#/i, "")) + '"></div>';
                            if(nCcSliderBackgroundClassOnHover)
                            {
                                thisTileHTML += '<div class="' + nCcSliderBackgroundClassOnHover + '" style="' + (row.getAttribute("ows_nCcSliderBackgroundStyleOnHover").replace(/^[a-z]*?;#/i, "")) + '"></div>';
                            }
                        }

                        var thisTilePositionContent1 = '<div class="' + nCcHeadingClass + '" style="' + nCcHeadingStyle + '">' + (row.getAttribute("ows_nHeadingContent") || "") + '</div>';
                        if(row.getAttribute("ows_nHeadingContentOnHover"))
                        {
                            thisTilePositionContent1 += '<div class="' + nCcHeadingClassOnHover + '" style="' + nCcHeadingStyleOnHover + '">' + (row.getAttribute("ows_nHeadingContentOnHover") || "") + '</div>';
                        }
                        var thisTilePositionContent2 = '<div class="' + (row.getAttribute("ows_nCcSliderBodyClass").replace(/^[a-z]*?;#/i, "")) + '" style="' + (row.getAttribute("ows_nCcSliderBodyStyle").replace(/^[a-z]*?;#/i, "")) + '">' + ((row.getAttribute("ows_nSliderBodyContent") || "").replace(/\n/g, '<br />')) + '</div>';

                        thisTileHTML += makePositionHTML("nTileSliderPositionWrapper", "", nCcHeadingPositionStyle, thisTilePositionContent1, (row.getAttribute("ows_nCcSliderPositionStyle").replace(/^[a-z]*?;#/i, "")), thisTilePositionContent2);

                        thisTileHTML += '</div>';
                    }
                    thisTileHTML += '</div>';

                    // add this tile's HTML to the master HTML
                    tilesHTML += '<div id="' + (row.getAttribute("ows_nTileCustomID") || "nTile_" + row.getAttribute("ows_ID")) +'" class="' + tileClass + '" style="' + row.getAttribute("ows_nCcTileStyle").replace(/^[a-z]*?;#/i, "") + '" onmouseenter="' + tileOnMouseEnter + '" onmouseleave="' + tileOnMouseLeave + '" onclick="' + tileOnClick + '">' + thisTileHTML + '</div>';
                }
                
                // if we have a max bottom and right
                width = maxRightEdge;
                height = maxBottomEdge;

                // add the HTML
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

            // return if we're done
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
    var addEditDeleteTile = function(siteURL, action, fields, completeFunc)
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
        
        SPWebServiceCall(siteURL, "Lists.asmx?op=UpdateListItems", "http://schemas.microsoft.com/sharepoint/soap/UpdateListItems", soapBody, completeFunc, true);
    };
    
    // opens a tile link
    var openLink = tiles.openLink = function(tile, type, url)
    {
        if(type === "none") return;
        var holderID = tile.parentNode.parentNode.id;
        if(/^mailto:.*?@.*$/.test(url))
        {
        	window.location = url;
        }
        else
        {
	        var options = {"url" : url};
	        switch(type)
	        {
	        	case "mailto":
	        		location.href = "mailto:" + url;
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
	    }
	    if(tilesTracker[holderID].onclick) tilesTracker[holderID].onclick(url, type);
    };

    // hover over a tile
    var tileHover = tiles.hover = function(mode, tile, isHeading, doZoom)
    {
        // get tile data
        var holderID = tile.parentNode.parentNode.id;
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
            tileData.animationID = animate.start(mode ? tilesData.animationTime : (tilesData.animationTime < 500 ? tilesData.animationTime * 2 : 1000), function(rate)
            {
                if(nTileContentWrapper)
                {
                    nTileContentWrapper.style.margin = currentMargin + (rate * marginDifference) + "px";
                }
                if(nTileSliderContent)
                {
                    nTileSliderContent.style.top = currentTop + (rate * topDifference) + "px";
                }
            }, mode ? tilesData.animationTypeOn : tilesData.animationTypeOff);
        }
    };

    // save tiles data
    tiles.setup = function(holderID, groupName, configOptions)
    {
        configOptions = configOptions || {};
        tilesTracker[holderID] = {
            // web URL to use
            webURL: configOptions.webURL || _spPageContextInfo.webServerRelativeUrl,
            // the ID of the tils wrapper
            holderID: holderID,
            // the group name of the tiles in this wrapper
            groupName: groupName,
            // the animation time for this group
            animationTime: parseInt(configOptions.animationTime, 10) || ANIMATION_TIME,
            // the animation to use for mouse on
            animationTypeOn: configOptions.animationTypeOn && configOptions.animationTypeOn in animationTypes && configOptions.animationTypeOn || "slide",
            // the animation to use for mouse off
            animationTypeOff: configOptions.animationTypeOff && configOptions.animationTypeOff in animationTypes && configOptions.animationTypeOff || "bounce",
            // the actual DOM wrapper element
            tilesWrapper: document.getElementById(holderID),
            // default grid box dimensions
            gridBoxDimensions: {width: 25, height: 25},
            tiles: {} // tile specific data cache
        };
        // the site URL
        tilesTracker[holderID].siteURL = (location.protocol + "//" + location.hostname + tilesTracker[holderID].webURL).replace(/\/$/, "");
        
        // if we have a onclick function then save it
        if(configOptions.onclick)
        {
            // if a string was passed
            if(typeof(configOptions.onclick) === "string") 
            {
                // if the string is a function that exists
                if({}.toString.call(window[configOptions.onclick]) === "[object Function]")
                {
                    tilesTracker[holderID].onclick = window[configOptions.onclick];
                }
            }
            // a function was passed
            else if({}.toString.call(configOptions.onclick) === '[object Function]')
            {
                tilesTracker[holderID].onclick = configOptions.onclick;
            }
        }
    };

    // initialize tiles
    tiles.init = function(holderID, groupName, configOptions)
    {
        // the the wrapper/holder
        var holder = document.getElementById(holderID);
        // if we have a holder then continue
        if(holder)
        {
            // save the tile data
            tiles.setup(holderID, groupName, configOptions);
            var tilesData = tilesTracker[holderID];

            // create the container
            holder.className += (holder.className ? " " : "") + "nTilesWrapper";
            holder.innerHTML = '<div class="nTilesContainer">Loading...</div>';

            // get the data and render it
            reload(holderID, false, function(returnCode)
            {
                if(returnCode == 2)
                {
                    // return code 2 means the list doesn't exist so let the user create it
                    holder.innerHTML = "";
                    createElement("input", holder, null, {value: "List '" + LIST_NAME + "' does not exist at '" + tilesData.siteURL + "'. Click here to create it.", type: "button", onclick: function()
                    {
                        // the soap request to create the list
                        var soapBody = '';
                        soapBody += '<AddList xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
                        soapBody += '<listName>' + LIST_NAME + '</listName>';
                        soapBody += '<description>List used to house tile configuration for nTiles.</description>';
                        soapBody += '<templateID>100</templateID>';
                        soapBody += '</AddList>';

                        // submit the call to create the request
                        SPWebServiceCall(tilesData.siteURL, "Lists.asmx?op=AddList", "http://schemas.microsoft.com/sharepoint/soap/AddList", soapBody, function(status)
                        {
                            if(!status)
                            {
                                holder.innerHTML = "Unable to create the list.";
                            }
                            else
                            {
                                // list created
                                // add the fields
                                holder.innerHTML = "List '" + LIST_NAME + "' created. Updating list...";
                                setTimeout(function()
                                {
                                    // figure out the XML for the field we want to create
                                    soapBody = '';
                                    soapBody += '<UpdateList xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
                                    soapBody += '<listName>' + LIST_NAME + '</listName>';
                                    soapBody += '<listProperties>';
                                    soapBody += '<List EnableAttachments="FALSE" OnQuickLaunch="TRUE" Description="List used to house tile configuration for nTiles. (v1.4)" />';
                                    soapBody += '</listProperties>';
                                    soapBody += '<newFields>';
                                    soapBody += '<Fields>';
                                    
                                    // go through the fields we want and create them with an internal name and minimal options
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
                                    
                                    // this time we want to update the fields using the internal name with the field settings
                                    for(var i = 0, num = TABLE_FIELDS.length; i < num; ++i)
                                    {
                                        var fieldSettings = TABLE_FIELDS[i];
                                        soapBody += '<Method ID="' + (TABLE_FIELDS.length + i + 2) + '"><Field Type="' + fieldSettings.Type + '" Name="' + fieldSettings.Name + '"';

                                        // iterate through each field setting
                                        for(var attribute in fieldSettings)
                                        {
                                            if(fieldSettings.hasOwnProperty(attribute))
                                            {
                                                // these settings require additional work
                                                if(attribute == "Type" || attribute == "Name" || attribute == "Default" || attribute == "Validation" || attribute == "Choices" || attribute == "Formula")
                                                {
                                                    continue;
                                                }
                                                soapBody += ' ' + attribute + '="' + fieldSettings[attribute] + '"';
                                            }
                                        }

                                        soapBody += '>';

                                        // process the settings that require additional work
                                        if(fieldSettings.hasOwnProperty("Formula"))
                                        {
                                            soapBody += '<Formula>' + fieldSettings.Formula.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</Formula>';
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

                                    // submit the request to add/update fields
                                    SPWebServiceCall(tilesData.siteURL, "Lists.asmx?op=UpdateList", "http://schemas.microsoft.com/sharepoint/soap/UpdateList", soapBody, function(status, data)
                                    {
                                        if(status)
                                        {
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
                    }});
                }
                else if(returnCode == 3)
                {
                    alert("The webURL provided does not exist.\n\n" + tilesData.webURL);
                }
                else if(returnCode == 4)
                {
                    alert("There has been an unknown error. Please report it.");
                }
                else if(returnCode === 0)
                {
                    // tiles loaded successfully
                    // add admin links if the user has edit access to the list
                    ExecuteOrDelayUntilScriptLoaded(function()
                    {
                        var clientContext = new SP.ClientContext(tilesData.webURL);
                        var list = clientContext.get_web().get_lists().getByTitle(LIST_NAME);
                        clientContext.load(list);
                        clientContext.load(list, 'EffectiveBasePermissions');
                        clientContext.executeQueryAsync(Function.createDelegate(this, function()
                        {
                            if(list.get_effectiveBasePermissions().has(SP.PermissionKind.editListItems))
                            {
                                createElement("span", holder, "nTileAdminLinks", {"innerHTML" : '<span class="nTileAdminLinksOff">...</span><span class="nTileAdminLinksOn"><b>actions</b>:&nbsp;<a href="#" title="add a tile" onclick="nSPTiles.addOrMoveTile(this, \'New\', \'' + holderID + '\'); return false;">add</a>&nbsp;|&nbsp;<a href="#" title="move a tile" onclick="nSPTiles.moveCloneEditOrDeleteTile(this, \'Update\', \'' + holderID + '\'); return false;">move</a>&nbsp;|&nbsp;<a href="#" title="clone a tile" onclick="nSPTiles.moveCloneEditOrDeleteTile(this, \'Clone\', \'' + holderID + '\'); return false;">clone</a>&nbsp;|&nbsp;<a href="#" title="edit a tile" onclick="nSPTiles.moveCloneEditOrDeleteTile(this, \'Edit\', \'' + holderID + '\'); return false;">edit</a>&nbsp;|&nbsp;<a href="#" title="delete a tile" onclick="nSPTiles.moveCloneEditOrDeleteTile(this, \'Delete\', \'' + holderID + '\'); return false;">delete</a>&nbsp;|&nbsp;<a target="_blank" href="' + tilesData.siteURL + '/Lists/' + LIST_NAME + '?FilterField1=LinkTitle&FilterValue1=' + tilesData.groupName + '">list</a></span>'});
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
                    tiles.init(holderID, groupName, configOptions);
                });
            }
            else
            {
                document.attachEvent('onreadystatechange', function()
                {
                    if(document.readyState != 'loading')
                    {
                        tiles.init(holderID, groupName, configOptions);
                    }
                });
            }
        }
    };

    // GUI for adding or moving a tile
    tiles.addOrMoveTile = function(a, action, holderID, selectedTile, selectedTileID)
    {
        // hide the admin links
        a.parentNode.style.display = "none";

        //tiles.showAdmin = function(){};

        // get some data and create DOM elements
        var tilesData = tilesTracker[holderID];
        var nTilesWrapper = tilesData.tilesWrapper;

        var nTileOverlay = createElement("div", nTilesWrapper, "nTileOverlay");
        var nTileGridBox = createElement("div", nTilesWrapper, "nTileGridBox", { "style" : "width: " + tilesData.gridBoxDimensions.width + "px; height: " + tilesData.gridBoxDimensions.height + "px;"}); // here
        var nTilesHelp = createElement("div", document.body, null, {"id" : "nTilesHelp", "innerHTML" : "<b>Click</b> where you want the <u>top left</u> of the tile to be.<br /><br /><table><tr><td colspan='2'>box dimensions:</td></tr><tr><th>width</th><td><a href='#'>" + tilesData.gridBoxDimensions.width + "</a></td></tr><tr><th>height</th><td><a href='#'>" + tilesData.gridBoxDimensions.height + "</a></td></tr><tr><td colspan='2'>click on the # to change</td></tr></table><br />Press <u>escape</u> to cancel."});
        var nTilesToolTip = createElement("div", document.body, null, {"id" : "nTilesToolTip", "innerHTML" : 'left&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipLeft"></span><br />top&nbsp;&nbsp;&nbsp;&nbsp;: <span id="nTilesToolTipTop"></span><br />--<br />width&nbsp;&nbsp;: <span id="nTilesToolTipWidth"></span><br />height&nbsp;: <span id="nTilesToolTipHeight"></span>'});

        var nTilesToolTipLeft = document.getElementById("nTilesToolTipLeft");
        var nTilesToolTipTop = document.getElementById("nTilesToolTipTop");
        var nTilesToolTipWidth = document.getElementById("nTilesToolTipWidth");
        var nTilesToolTipHeight = document.getElementById("nTilesToolTipHeight");

        var currentHeight = nTilesWrapper.offsetHeight;

        // change the dimensions of the grid
        var changeDimensions = function(a, which)
        {
            var newDimension = prompt("Please enter a new " + which + ":", tilesData.gridBoxDimensions[which]);
            if(newDimension === null) return;
            if(isNaN(newDimension))
            {
                alert("Please enter a valid number.");
                changeDimensions(a, which);
            }
            else
            {
                tilesData.gridBoxDimensions[which] = parseInt(newDimension, 10);
                a.innerText = tilesData.gridBoxDimensions[which];
                nTileGridBox.style[which] = tilesData.gridBoxDimensions[which] + "px";
            }
            return false;
        };

        // set the link function so the user can change the dimensions
        var nTilesHelpA = nTilesHelp.querySelectorAll("a");
        nTilesHelpA[0].onclick = function(){ changeDimensions(this, "width"); return false; };
        nTilesHelpA[1].onclick = function(){ changeDimensions(this, "height"); return false; };

        // if we're done or cancelling undo stuff
        var end = function()
        {
            document.onkeyup = nTilesHelpA[0].onclick = nTilesHelpA[1].onclick = nTileGridBox.onclick = nTilesWrapper.onmousemove = null;

            deleteElement(nTilesHelpA[0]);
            deleteElement(nTilesHelpA[1]);
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
        };

        // I should probably use named functions instead of anonymous inner ones to avoid memory leaks but how often is the user gonna be adding/editing tiles?
        nTileGridBox.onclick = function()
        {
            // the user clicked the start of where they want the tile
            nTileGridBox.className += " nTileGridBoxClicked";
            var tileLeftOffset = nTilesToolTipLeft.innerText;
            var tileTopOffset = nTilesToolTipTop.innerText;

            nTileGridBox.onclick = function()
            {
                // the user clicked the end of where they want the tile so create it
                var tileWidth = nTilesToolTipWidth.innerText;
                var tileHeight = nTilesToolTipHeight.innerText;

                var tileObject = {
                    "ID" : (action == "New" || action == "Clone") ? "New" : selectedTileID,
                    "Title" : tilesData.groupName
                };

                // if action is new and we have a selected tile ID then we're cloning so find the existing tile's data and add it to list for the new tile
                if(action == "Clone")
                {
                    // lists.asmx doesn't return fields that have no value so the list default ones get used for fields the user emptied
                    // so let's make sure they are included in the list and are empty
                    tileObject.nTileBackgroundColor = tileObject.nTileImagePadding = tileObject.nTileFAPadding = tileObject.nHeadingContent = tileObject.nHeadingFontColor = tileObject.nHeadingFontSize = tileObject.nHeadingPadding = tileObject.nSliderHeadingHeight = tileObject.nSliderBodyContent = tileObject.nSliderBodyFontColor = tileObject.nSliderBodyFontSize = tileObject.nSliderBodyPadding = tileObject.nSliderBackgroundColor = tileObject.nSliderBackgroundColor = "";
                    
                    // get the selected tile IDs data
                    var soapBody = '';
                    soapBody += '<GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/">';
                    soapBody += '<listName>' + LIST_NAME + '</listName>';
                    soapBody += '<query><Query><Where><And><And><Eq><FieldRef Name="Title" /><Value Type="Text">' + tilesData.groupName + '</Value></Eq><Eq><FieldRef Name="nActive" /><Value Type="Boolean">1</Value></Eq></And><Eq><FieldRef Name="ID" /><Value Type="Counter">' + selectedTileID + '</Value></Eq></And></Where></Query></query>';
                    soapBody += '<viewFields><ViewFields>' + getFieldRefXML() + '</ViewFields></viewFields>';
                    soapBody += '<rowLimit>0</rowLimit>';
                    soapBody += '</GetListItems>';

                    // execute the call
                    SPWebServiceCall(tilesData.siteURL, "Lists.asmx?op=GetListItems", "http://schemas.microsoft.com/sharepoint/soap/GetListItems", soapBody, function(status, xhr)
                    {
                        // find all the attributes for the found row
                        var attributes = getXMLNodesByTagName(xhr.responseXML, "row", "z")[0].attributes;
                        var fieldName;
                        // go through each attribute
                        for(var i = 0, num = attributes.length; i < num; ++i)
                        {
                            // if it is a tile data then add it to the list for the new tile
                            if(fieldName = attributes[i].name.match(/ows_(n(?!Cc).*)/))
                            {
                                tileObject[fieldName[1]] = attributes[i].value;
                            }
                        }
                        
                        // the heading content and slider content can have HTML so we need to encode any HTML characters
                        tileObject.nHeadingContent = tileObject.nHeadingContent.replace(/[\x26\x0A\<>'"]/g,function(r){return"&#"+r.charCodeAt(0)+";"});
                        tileObject.nSliderBodyContent = tileObject.nSliderBodyContent.replace(/[\x26\x0A\<>'"]/g,function(r){return"&#"+r.charCodeAt(0)+";"});
                    });
                    
                    action = "New";
                }

                // the size the user wanted for the new tile
                tileObject.nTileWidth = tileWidth;
                tileObject.nTileHeight = tileHeight;
                tileObject.nTileLeftOffset = tileLeftOffset;
                tileObject.nTileTopOffset = tileTopOffset;
                
                // do what needs to be done
                addEditDeleteTile(tilesData.siteURL, action, tileObject, function(status, xhr)
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
                var width = (Math.floor((c.elementX - tileLeftOffset) / tilesData.gridBoxDimensions.width) + 1) * tilesData.gridBoxDimensions.width;
                var height = (Math.floor((c.elementY - tileTopOffset) / tilesData.gridBoxDimensions.height) + 1) * tilesData.gridBoxDimensions.height;

                if(width > 0)
                {
                    nTilesToolTip.style.left = c.pageX + 25 + "px";
                    nTilesToolTipWidth.innerText = width;
                    nTileGridBox.style.width = width + "px";
                }
                if(height > 0)
                {
                    nTilesToolTip.style.top = c.pageY + 25 + "px";
                    nTilesToolTipHeight.innerText = height;
                    nTileGridBox.style.height = height + "px";
                }
            };

            // update the help
            nTilesHelp.querySelector("u").innerText = "bottom right";
            
            // once the user has selected the top left corner they shouldn't be able to change the grid size so remove the ability
            deleteElement(nTilesHelp.querySelector("table").rows[3]);
            nTilesHelpA[0].removeAttribute("href");
            nTilesHelpA[1].removeAttribute("href");
            nTilesHelpA[0].onclick = nTilesHelpA[1].onclick = null;

        };

        // let the user select where the tile should start
        nTilesWrapper.onmousemove = function(e)
        {
            var c = getMousePositionProperties(e, nTilesWrapper);
            var top = Math.floor(c.elementY / tilesData.gridBoxDimensions.height) * tilesData.gridBoxDimensions.height;
            var left = Math.floor(c.elementX / tilesData.gridBoxDimensions.width) * tilesData.gridBoxDimensions.width;

            nTileGridBox.style.top = top  + "px";
            nTileGridBox.style.left = left + "px";

            nTilesToolTip.style.top = c.pageY + 25 + "px";
            nTilesToolTip.style.left= c.pageX + 25 + "px";

            nTilesToolTipLeft.innerText = left;
            nTilesToolTipTop.innerText = top;
        };

        // add hover boxes for each tile so the user can see where they are
        addRemoveTileHoverBoxes(nTilesWrapper, true);

        // if we're moving an existing tile then highlight it so they know where it currently is
        if(action == "Update")
        {
            selectedTile.className += " nTileFocus";
            selectedTile.querySelector(".nTileHoverBox").innerText = "moving";
        }
        else if(action == "Clone")
        {
            selectedTile.className += " nTileFocus";
            selectedTile.querySelector(".nTileHoverBox").innerText = "cloning";
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
    tiles.moveCloneEditOrDeleteTile = function(a, action, holderID)
    {
        // hide the admin links
        a.parentNode.style.display = "none";

        // disable hover and open link while we're in admin
        tiles.hover = tiles.openLink = function(){};

        // get tile data and wrapper
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
        tiles.hover = function(mode, tile)
        {
            if(mode)
            {
                tile.className += " nTileFocus";
                nTilesToolTip.style.display = "block";
                nTilesToolTipID.innerText = tile.className.match(/nTile_(\d+)/)[1];
                nTilesToolTipLeft.innerText = tile.style.left.replace("px", "");
                nTilesToolTipTop.innerText = tile.style.top.replace("px", "");
                nTilesToolTipWidth.innerText = tile.style.width.replace("px", "");
                nTilesToolTipHeight.innerText = tile.style.height.replace("px", "");
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
        	// get the ID of the selected tile
            var thisTileID = nTilesToolTipID.innerText;
            // remove it's focus
            tile.className = tile.className.replace(/\ nTileFocus/, "");
            // undo all the changes we did to show the admin stuff
            end();

            // the user wanted to edit a tile so open the edit page for the tile
            if(action == "Edit")
            {
                tiles.openLink(tile, "dialog (refresh tiles after save)", tilesData.siteURL + "/Lists/" + LIST_NAME + "/EditForm.aspx?ID=" + thisTileID);
            }
            // the user wanted to delete a tile so delete it
            else if(action == "Delete")
            {
                if(confirm("Are you sure you want to delete the tile?"))
                {
                    addEditDeleteTile(tilesData.siteURL, action, { "ID" : thisTileID }, function(status)
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
            // else we're cloning or moving a tile
            else
            {
                tiles.addOrMoveTile(a, action, holderID, tile, thisTileID);
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

            tiles.openLink = openLink;
            tiles.hover = tileHover;

            a.parentNode.style.display = "";
        };

        // add hover boxes so the user knows where all the tiles are and let them select it
        addRemoveTileHoverBoxes(nTilesWrapper, true, "cell", function(e)
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

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
