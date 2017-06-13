Check http://nsptiles.js.org/ for the most up to date information.

Change Log
==========
1.0
 - initial release

1.1	
 - fixed a bug where when cloning a tile the info tile still said "New"
 - for the admin menu, hovering over the tiles now shows "..." until the mouse is over the "..."

1.2	
 - added a handler for mailto links
 - fixed an issue where commas are used for decimal in certain regions but CSS expects a period for the opacity value

1.3	
 - fixed an issue where commas are used for decimal in certain regions but CSS expects a period for the opacity value (for real this time)

1.4	
 - fixed issue 2 - mailto links (https://github.com/imthenachoman/nSPTiles/issues/2)
 - fixed issue 3 - spaces in links (https://github.com/imthenachoman/nSPTiles/issues/3)

1.5	
 - issue 4 - run javascript on tile click
 - added a tile HTML override option
 - added a tile FA HTML override option
 - added a tile view permissions
 - added ability to add/move/clone tiles in bulk

1.5.1	
 - pure javascript update; does not create a new list
 - fixed issue #5 - fixed bug with IE 11 not reading XPATH
 - fixed issue #6 - fixed bug where SITE_URL would not take the websites port into account
 - added issue #7 - load tiles based on URL paramater
 - added issue #11 - added two links two new/edit form
 - added issue #12 - added `oninit` and `oncomplete` functions
 - included a modified version of randPrttyClrs, a JavaScript library to generate random, pretty colors (https://github.com/dsmagic12/randPrttyClrs) by Daniel Schauer, for the new tile background colors
