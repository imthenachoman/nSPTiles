<!-- nSPTiles | https://github.com/imthenachoman/nSPTiles | Copyright (c) 2015 Anchal Nigam | MIT license (http://opensource.org/licenses/mit) -->
<xsl:stylesheet xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" version="1.0" exclude-result-prefixes="xsl msxsl ddwrt" xmlns:ddwrt="http://schemas.microsoft.com/WebParts/v2/DataView/runtime" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:SharePoint="Microsoft.SharePoint.WebControls" xmlns:ddwrt2="urn:frontpage:internal">
    <xsl:output method="html" indent="no"/>
    <!-- https://msdn.microsoft.com/en-us/library/dd583143%28v=office.11%29.aspx and https://msdn.microsoft.com/en-us/library/office/ff806158%28v=office.14%29.aspx -->
    <xsl:param name="ListUrlDir_FALSE" />
    <!-- all the input settings -->
    <xsl:param name="nSPTilesJSPath">nSPTiles.1.0.js</xsl:param>
    <xsl:param name="FontAwesomeCSSPath">font-awesome.min.css</xsl:param>
    <xsl:param name="GroupName">test 1</xsl:param>
    <xsl:param name="AnimationSpeedInMillisecond">100</xsl:param>
    <xsl:param name="AnimationType">slide</xsl:param>
    <xsl:variable name="TileGroupID" select="concat('nTiles_', translate($GroupName, translate($GroupName, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ''), ''))" />
    
    <xsl:template match="/" xmlns:x="http://www.w3.org/2001/XMLSchema" xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" xmlns:asp="http://schemas.microsoft.com/ASPNET/20" xmlns:__designer="http://schemas.microsoft.com/WebParts/v2/DataView/designer" xmlns:SharePoint="Microsoft.SharePoint.WebControls">
        <xsl:call-template name="tiles" />
    </xsl:template>
    
    <xsl:template name="debug">
        <ul>
            <xsl:for-each select="/dsQueryResponse/Rows/Row">
                <li>
                    <xsl:value-of select="@ID" />: <xsl:value-of select="@Title" />
                    <ul>
                        <xsl:for-each select="@*">
                            <li><xsl:value-of select="name()" />: <xsl:value-of select="." /></li>
                        </xsl:for-each>
                    </ul>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
    
    <!-- function to make position html -->
    <xsl:template name="makePositionHTML">
        <xsl:param name="className" />
        <xsl:param name="row1Style" />
        <xsl:param name="cell1Content" />
        <xsl:param name="row2Style" />
        <xsl:param name="cell2Content" />
        <div class="nTilePositionTable {$className}">
            <div class="nTilePositionRow nTilePositionRow1">
                <div class="nTilePositionCell" style="{$row1Style}">
                    <xsl:copy-of select="$cell1Content" />
                </div>
            </div>
            <xsl:if test="$row2Style != ''">
                <div class="nTilePositionRow nTilePositionRow2">
                    <div class="nTilePositionCell" style="{$row2Style}">
                        <xsl:copy-of select="$cell2Content" />
                    </div>
                </div>
            </xsl:if>
        </div>
    </xsl:template>
    
    <!-- main tiles template for generating the necessary HTML -->
    <xsl:template name="tiles">
        <!-- necessary JS and CSS references -->
        <script type="text/javascript" src="{$nSPTilesJSPath}"></script>
        <link rel="stylesheet" href="{$FontAwesomeCSSPath}" />
        <!-- the root div for the wrapper -->
        <div class="nTilesWrapper" id="{$TileGroupID}">
            <!-- if we have admin access then generate the admin stuff -->
            <xsl:if test="ddwrt:IfHasRights(4)">
                <span class="nTileAdminLinks">
                    <b>actions</b>:&#160;<a href="#" title="add a tile" onclick="nSPTiles.startAddOrMoveTile(this, 'New', '{$TileGroupID}'); return false">add</a>&#160;|&#160;<a href="#" title="move a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, 'Update', '{$TileGroupID}'); return false">move</a>&#160;|&#160;<a href="#" title="edit a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, 'Edit', '{$TileGroupID}'); return false;">edit</a>&#160;|&#160;<a href="#" title="delete a tile" onclick="nSPTiles.startTilesMoveEditDelete(this, 'Delete', '{$TileGroupID}'); return false;">delete</a>&#160;|&#160;<a href="{$ListUrlDir_FALSE}" title="open the list in a new window" target="_blank">list</a>
                </span>
            </xsl:if>
            <!-- render tiles -->
            <xsl:choose>
                <xsl:when test="count(/dsQueryResponse/Rows/Row) > 0">
                    <!-- we have at least one tile to render -->
                    <xsl:variable name="maxRightEdge" select="ddwrt:Max(/dsQueryResponse/Rows/Row/@nCcTileRightEdge)" />
                    <xsl:variable name="maxBottomEdge" select="ddwrt:Max(/dsQueryResponse/Rows/Row/@nCcTileBottomEdge)" />
                    <div class="nTilesContainer" style="height: {$maxBottomEdge}px; width: {$maxRightEdge}px">
                        <xsl:apply-templates select="/dsQueryResponse/Rows" />
                    </div>
                </xsl:when>
                <xsl:otherwise>
                    <!-- no tile -->
                    <div class="nTilesContainer" style="height: 100px; width: 100px"></div>
                </xsl:otherwise>
            </xsl:choose>
        </div>
        <!-- save configuration data for access in the JS -->
        <script type="text/javascript">
            nSPTiles.setup('<xsl:value-of select="$TileGroupID" />', '<xsl:value-of select="$GroupName" />', {animationTime:<xsl:value-of select="$AnimationSpeedInMillisecond" />,animationType:'<xsl:value-of select="$AnimationType" />'});
        </script>
    </xsl:template>
    
    <!-- the template for each tile -->
    <xsl:template match="Row">
        <div id="nTile_{@ID}" style="{@nCcTileStyle}" onmouseenter="nSPTiles.hover(true, this, '{$TileGroupID}', {@ID}, '{@nIsHeading}', '{@nTileZoomOnHover}');" onmouseleave="nSPTiles.hover(false, this, '{$TileGroupID}', {@ID}, '{@nIsHeading}', '{@nTileZoomOnHover}');" onclick="nSPTiles.openLink(this, '{@nTileLinkType}', &#x27;{translate(@nTileLinkURL, '&#xD;&#xA;', '')}&#x27;)">
            <xsl:if test="@nTileCustomID != ''">
                <xsl:attribute name="id"><xsl:value-of select="@nTileCustomID" /></xsl:attribute>
            </xsl:if>
            <xsl:attribute name="class">
                <xsl:value-of select="@nTileCustomClassEs" /> nTile nTile_<xsl:value-of select="@ID" /><xsl:if test="@nTileLinkType != 'none'"> nTileLink</xsl:if><xsl:choose><xsl:when test="@nIsHeading = 'Yes'"> nHeadingTile</xsl:when><xsl:otherwise> nSliderTile</xsl:otherwise></xsl:choose>
            </xsl:attribute>
            <div class="nTileContentWrapper" style="{@nCcTileContentWrapperStyle}">
                <!-- do we have a tile background color -->
                <xsl:if test="@nCcTileBackgroundClass != ''">
                    <div class="{@nCcTileBackgroundClass}" style="{@nCcTileBackgroundStyle}"></div>
                    <xsl:if test="@nCcTileBackgroundClassOnHover != ''">
                        <div class="{@nCcTileBackgroundClassOnHover}" style="{@nCcTileBackgroundStyleOnHover}"></div>
                    </xsl:if>
                </xsl:if>
                <!-- do we have a tile image -->
                <xsl:if test="@nTileImageURL != ''">
                    <xsl:call-template name="makePositionHTML">
                        <xsl:with-param name="className">nTileImagePositionWrapper</xsl:with-param>
                        <xsl:with-param name="row1Style" select="@nCcTileImagePositionStyle" />
                        <xsl:with-param name="cell1Content">
                            <div>
                                <img class="{@nCcTileImageClass}" style="{@nCcTileImageStyle}" src="{@nTileImageURL}" />
                                <xsl:if test="@nTileImageURLOnHover != ''">
                                    <img class="{@nCcTileImageClassOnHover}" style="{@nCcTileImageStyleOnHover}" src="{@nTileImageURLOnHover}" />
                                </xsl:if>
                            </div>
                        </xsl:with-param>
                    </xsl:call-template>
                </xsl:if>
                <!-- do we have a FA icon-->
                <xsl:if test="@nCcTileFAClass != ''">
                    <xsl:call-template name="makePositionHTML">
                        <xsl:with-param name="className">nTileFAPositionWrapper</xsl:with-param>
                        <xsl:with-param name="row1Style" select="@nCcTileFAPositionStyle" />
                        <xsl:with-param name="cell1Content">
                            <span class="{@nCcTileFAClass}" style="{@nCcTileFAStyle}"></span>
                            <xsl:if test="@nCcTileFAClassOnHover != ''">
                                <span class="{@nCcTileFAClassOnHover}" style="{@nCcTileFAStyleOnHover}"></span>
                            </xsl:if>
                        </xsl:with-param>
                    </xsl:call-template>
                </xsl:if>
                <!-- do we have a heading or a slider -->
                <xsl:choose>
                    <xsl:when test="@nIsHeading = 'Yes'">
                        <xsl:call-template name="makePositionHTML">
                            <xsl:with-param name="className">nHeadingTile</xsl:with-param>
                            <xsl:with-param name="row1Style" select="@nCcHeadingPositionStyle" />
                            <xsl:with-param name="cell1Content">
                                <div class="{@nCcHeadingClass}" style="{@nCcHeadingStyle}"><xsl:value-of select="@nHeadingContent" /></div>
                                <xsl:if test="@nHeadingContentOnHover != ''">
                                    <div class="{@nCcHeadingClassOnHover}" style="{@nCcHeadingStyleOnHover}"><xsl:value-of select="@nHeadingContentOnHover" /></div>
                                </xsl:if>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <div class="nTileSliderContent" style="{@nCcSliderContentStyle}">
                             <!-- do we have a slider background color -->
                            <xsl:if test="@nCcSliderBackgroundClass != ''">
                                <div class="{@nCcSliderBackgroundClass}" style="{@nCcSliderBackgroundStyle}"></div>
                                <xsl:if test="@nCcSliderBackgroundClassOnHover != ''">
                                    <div class="{@nCcSliderBackgroundClassOnHover}" style="{@nCcSliderBackgroundStyleOnHover}"></div>
                                </xsl:if>
                            </xsl:if>
                            <xsl:call-template name="makePositionHTML">
                                <xsl:with-param name="className">nTileSliderPositionWrapper</xsl:with-param>
                                <xsl:with-param name="row1Style" select="@nCcHeadingPositionStyle" />
                                <xsl:with-param name="cell1Content">
                                    <div class="{@nCcHeadingClass}" style="{@nCcHeadingStyle}"><xsl:value-of select="@nHeadingContent" /></div>
                                    <xsl:if test="@nHeadingContentOnHover != ''">
                                        <div class="{@nCcHeadingClassOnHover}" style="{@nCcHeadingStyleOnHover}"><xsl:value-of select="@nHeadingContentOnHover" /></div>
                                    </xsl:if>
                                </xsl:with-param>
                                <xsl:with-param name="row2Style" select="@nCcSliderPositionStyle" />
                                <xsl:with-param name="cell2Content">
                                    <div class="{@nCcSliderBodyClass}" style="{@nCcSliderBodyStyle}"><xsl:value-of select="@nSliderBodyContent" /></div>
                                </xsl:with-param>
                            </xsl:call-template>
                        </div>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>
