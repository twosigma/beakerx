/*! ColResize 0.0.10
 */

/**
 * @summary     ColResize
 * @description Provide the ability to resize columns in a DataTable
 * @version     0.0.10
 * @file        dataTables.colResize.js
 * @author      Silvacom Ltd.
 *
 * For details please refer to: http://www.datatables.net
 *
 * Special thank to everyone who has contributed to this plug in
 * - dykstrad
 * - tdillan (for 0.0.3 and 0.0.5 bug fixes)
 * - kylealonius (for 0.0.8 bug fix)
 * - the86freak (for 0.0.9 bug fix)
 */

(function (window, document, undefined) {

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables plug-in API functions test
     *
     * This are required by ColResize in order to perform the tasks required, and also keep this
     * code portable, to be used for other column resize projects with DataTables, if needed.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    var factory = function ($, DataTable) {
        "use strict";

        /**
         * Plug-in for DataTables which will resize the columns depending on the handle clicked
         *  @method  $.fn.dataTableExt.oApi.fnColResize
         *  @param   object oSettings DataTables settings object - automatically added by DataTables!
         *  @param   int iCol Take the column to be resized
         *  @returns void
         */
        $.fn.dataTableExt.oApi.fnColResize = function (oSettings, iCol) {
            var v110 = $.fn.dataTable.Api ? true : false;

            /*
             * Update DataTables' event handlers
             */

            /* Fire an event so other plug-ins can update */
            $(oSettings.oInstance).trigger('column-resize', [ oSettings, {
                "iCol": iCol
            } ]);
        };

        /**
         * ColResize provides column resize control for DataTables
         * @class ColResize
         * @constructor
         * @param {object} dt DataTables settings object
         * @param {object} opts ColResize options
         */
        var ColResize = function (dt, opts) {
            var oDTSettings;

            if ($.fn.dataTable.Api) {
                oDTSettings = new $.fn.dataTable.Api(dt).settings()[0];
            }
            // 1.9 compatibility
            else if (dt.fnSettings) {
                // DataTables object, convert to the settings object
                oDTSettings = dt.fnSettings();
            }
            else if (typeof dt === 'string') {
                // jQuery selector
                if ($.fn.dataTable.fnIsDataTable($(dt)[0])) {
                    oDTSettings = $(dt).eq(0).dataTable().fnSettings();
                }
            }
            else if (dt.nodeName && dt.nodeName.toLowerCase() === 'table') {
                // Table node
                if ($.fn.dataTable.fnIsDataTable(dt.nodeName)) {
                    oDTSettings = $(dt.nodeName).dataTable().fnSettings();
                }
            }
            else if (dt instanceof jQuery) {
                // jQuery object
                if ($.fn.dataTable.fnIsDataTable(dt[0])) {
                    oDTSettings = dt.eq(0).dataTable().fnSettings();
                }
            }
            else {
                // DataTables settings object
                oDTSettings = dt;
            }

            // Convert from camelCase to Hungarian, just as DataTables does
            if ($.fn.dataTable.camelToHungarian) {
                $.fn.dataTable.camelToHungarian(ColResize.defaults, opts || {});
            }


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             * Public class variables
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

            /**
             * @namespace Settings object which contains customizable information for ColResize instance
             */
            this.s = {
                /**
                 * DataTables settings object
                 *  @property dt
                 *  @type     Object
                 *  @default  null
                 */
                "dt": null,

                /**
                 * Initialisation object used for this instance
                 *  @property init
                 *  @type     object
                 *  @default  {}
                 */
                "init": $.extend(true, {}, ColResize.defaults, opts),

                /**
                 * @namespace Information used for the mouse drag
                 */
                "mouse": {
                    "startX": -1,
                    "startY": -1,
                    "targetIndex": -1,
                    "targetColumn": -1,
                    "neighbourIndex": -1,
                    "neighbourColumn": -1
                },

                /**
                 * Status variable keeping track of mouse down status
                 *  @property isMousedown
                 *  @type     boolean
                 *  @default  false
                 */
                "isMousedown": false
            };


            /**
             * @namespace Common and useful DOM elements for the class instance
             */
            this.dom = {
                /**
                 * Resizing element (the one the mouse is resizing)
                 *  @property resize
                 *  @type     element
                 *  @default  null
                 */
                "resizeCol": null,

                /**
                 * Resizing element neighbour (the column next to the one the mouse is resizing)
                 * This is for fixed table resizing.
                 *  @property resize
                 *  @type     element
                 *  @default  null
                 */
                "resizeColNeighbour": null,

                /**
                 *  Array of events to be restored, used for overriding existing events from other plugins for a time.
                 *  @property restoreEvents
                 *  @type     array
                 *  @default  []
                 */
                "restoreEvents": []
            };


            /* Constructor logic */
            this.s.dt = oDTSettings.oInstance.fnSettings();
            this.s.dt._colResize = this;
            this._fnConstruct();

            /* Add destroy callback */
            oDTSettings.oApi._fnCallbackReg(oDTSettings, 'aoDestroyCallback', $.proxy(this._fnDestroy, this), 'ColResize');

            return this;
        };


        ColResize.prototype = {
            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             * Public methods
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

            /**
             * Reset the column widths to the original widths that was detected on
             * start up.
             *  @return {this} Returns `this` for chaining.
             *
             *  @example
             *    // DataTables initialisation with ColResize
             *    var table = $('#example').dataTable( {
             *        "sDom": 'Zlfrtip'
             *    } );
             *
             *    // Add click event to a button to reset the ordering
             *    $('#resetOrdering').click( function (e) {
             *        e.preventDefault();
             *        $.fn.dataTable.ColResize( table ).fnReset();
             *    } );
             */
            "fnReset": function () {
                var a = [];
                for (var i = 0, iLen = this.s.dt.aoColumns.length; i < iLen; i++) {
                    this.s.dt.aoColumns[i].width = this.s.dt.aoColumns[i]._ColResize_iOrigWidth;
                }

                this.s.dt.adjust().draw();

                return this;
            },


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             * Private methods (they are of course public in JS, but recommended as private)
             * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

            /**
             * Constructor logic
             *  @method  _fnConstruct
             *  @returns void
             *  @private
             */
            "_fnConstruct": function () {
                var that = this;
                var iLen = that.s.dt.aoColumns.length;
                var i;

                that._fnSetupMouseListeners();

                /* Add event handlers for the resize handles */
                for (i = 0; i < iLen; i++) {
                    /* Mark the original column width for later reference */
                    this.s.dt.aoColumns[i]._ColResize_iOrigWidth = this.s.dt.aoColumns[i].width;
                }

                this._fnSetColumnIndexes();

                /* State saving */
                this.s.dt.oApi._fnCallbackReg( this.s.dt, 'aoStateSaveParams', function (oS, oData) {
                    that._fnStateSave.call(that, oData);
                }, "ColResize_State" );

                // State loading
                this._fnStateLoad();
            },

            /**
             * @method  _fnStateSave
             * @param   object oState DataTables state
             * @private
             */
            "_fnStateSave": function (oState) {
                this.s.dt.aoColumns.forEach(function(col, index) {
                    oState.columns[index].width = col.sWidthOrig;
                });
            },

            /**
             * If state has been loaded, apply the saved widths to the columns
             * @method  _fnStateLoad
             * @private
             */
            "_fnStateLoad": function() {
                var that = this,
                    loadedState = this.s.dt.oLoadedState;
                if (loadedState && loadedState.columns) {
                    var colStates = loadedState.columns,
                        currCols = this.s.dt.aoColumns;
                    // Only apply the saved widths if the number of columns is the same.
                    // Otherwise, we don't know if we're applying the width to the correct column.
                    if (colStates.length > 0 && colStates.length === currCols.length) {
                        colStates.forEach(function(state, index) {
                            var col = that.s.dt.aoColumns[index];
                            if (state.width) {
                                col.sWidthOrig = col.sWidth = state.width;
                            }
                        });
                    }
                }
            },

            /**
             * Remove events of type from obj add it to restoreEvents array to be restored at a later time
             * @param until string flag when to restore the event
             * @param obj Object to remove events from
             * @param type type of event to remove
             * @param namespace namespace of the event being removed
             */
            "_fnDelayEvents": function (until, obj, type, namespace) {
                var that = this;
                //Get the events for the object
                var events = $._data($(obj).get(0), 'events');
                $.each(events, function (i, o) {
                    //If the event type matches
                    if (i == type) {
                        //Loop through the possible many events with that type
                        $.each(o, function (k, v) {
                            //Somehow it is possible for the event to be undefined make sure it is defined first
                            if (v) {
                                if (namespace) {
                                    //Add the event to the array of events to be restored later
                                    that.dom.restoreEvents.push({"until": until, "obj": obj, "type": v.type, "namespace": v.namespace, "handler": v.handler});
                                    //If the namespace matches
                                    if (v.namespace == namespace) {
                                        //Turn off/unbind the event
                                        $(obj).off(type + "." + namespace);
                                    }
                                } else {
                                    //Add the event to the array of events to be restored later
                                    that.dom.restoreEvents.push({"until": until, "obj": obj, "type": v.type, "namespace": null, "handler": v.handler});
                                    //Turn off/unbind the event
                                    $(obj).off(type);
                                }
                            }
                        });
                    }
                });
            },

            /**
             * Loop through restoreEvents array and restore the events on the elements provided
             */
            "_fnRestoreEvents": function (until) {
                var that = this;
                //Loop through the events to be restored
                var i;
                for (i = that.dom.restoreEvents.length; i--;) {
                    if (that.dom.restoreEvents[i].until == undefined || that.dom.restoreEvents[i].until == null || that.dom.restoreEvents[i].until == until) {
                        if (that.dom.restoreEvents[i].namespace) {
                            //Turn on the event for the object provided
                            $(that.dom.restoreEvents[i].obj).off(that.dom.restoreEvents[i].type + "." + that.dom.restoreEvents[i].namespace).on(that.dom.restoreEvents[i].type + "." + that.dom.restoreEvents[i].namespace, that.dom.restoreEvents[i].handler);
                            that.dom.restoreEvents.splice(i, 1);
                        } else {
                            //Turn on the event for the object provided
                            $(that.dom.restoreEvents[i].obj).off(that.dom.restoreEvents[i].type).on(that.dom.restoreEvents[i].type, that.dom.restoreEvents[i].handler);
                            that.dom.restoreEvents.splice(i, 1);
                        }
                    }
                }
            },

            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
             * Mouse drop and drag
             */

            "_fnSetupMouseListeners":function() {
                var that = this;
                $(that.s.dt.nTableWrapper).off("mouseenter.ColResize").on("mouseenter.ColResize","th",function(e) {
                    e.preventDefault();
                    that._fnMouseEnter.call(that, e, this);
                });
                $(that.s.dt.nTableWrapper).off("mouseleave.ColResize").on("mouseleave.ColResize","th",function(e) {
                    e.preventDefault();
                    that._fnMouseLeave.call(that, e, this);
                });
            },

            /**
             * Add mouse listeners to the resize handle on TH element
             *  @method  _fnMouseListener
             *  @param   i Column index
             *  @param   nTh TH resize handle element clicked on
             *  @returns void
             *  @private
             */
            "_fnMouseListener": function (i, nTh) {
                var that = this;
                $(nTh).off('mouseenter.ColResize').on('mouseenter.ColResize', function (e) {
                    e.preventDefault();
                    that._fnMouseEnter.call(that, e, nTh);
                });
                $(nTh).off('mouseleave.ColResize').on('mouseleave.ColResize', function (e) {
                    e.preventDefault();
                    that._fnMouseLeave.call(that, e, nTh);
                });
            },

            /**
             *
             * @param e Mouse event
             * @param nTh TH element that the mouse is over
             */
            "_fnMouseEnter": function (e, nTh) {
                var that = this;
                if(!that.s.isMousedown) {
                    //Once the mouse has entered the cell add mouse move event to see if the mouse is over resize handle
                    $(nTh).off('mousemove.ColResizeHandle').on('mousemove.ColResizeHandle', function (e) {
                        e.preventDefault();
                        that._fnResizeHandleCheck.call(that, e, nTh);
                    });
                }
            },

            /**
             * Clear mouse events when the mouse has left the th
             * @param e Mouse event
             * @param nTh TH element that the mouse has just left
             */
            "_fnMouseLeave": function (e, nTh) {
                //Once the mouse has left the TH make suure to remove the mouse move listener
                $(nTh).off('mousemove.ColResizeHandle');
            },

            /**
             * Mouse down on a TH element in the table header
             *  @method  _fnMouseDown
             *  @param   event e Mouse event
             *  @param   element nTh TH element to be resized
             *  @returns void
             *  @private
             */
            "_fnMouseDown": function (e, nTh) {
                var that = this;

                that.s.isMousedown = true;

                /* Store information about the mouse position */
                var target = $(e.target).closest('th, td');
                var offset = target.offset();

                /* Store information about the mouse position for resize calculations in mouse move function */
                this.s.mouse.startX = e.pageX;
                this.s.mouse.startY = e.pageY;

                //Store the indexes of the columns the mouse is down on
                var idx = that.dom.resizeCol[0].cellIndex;
                
                // the last column has no 'right-side' neighbour
                // with fixed this can make the table smaller
               if (that.dom.resizeColNeighbour[0] === undefined){
                    var idxNeighbour = 0;
                } else {
                    var idxNeighbour = that.dom.resizeColNeighbour[0].cellIndex;
                }
                
               

                if (idx === undefined) {
                    return;
                }

                this.s.mouse.targetIndex = idx;
                this.s.mouse.targetColumn = this.s.dt.aoColumns[ idx ];

                this.s.mouse.neighbourIndex = idxNeighbour;
                this.s.mouse.neighbourColumn = this.s.dt.aoColumns[ idxNeighbour ];

                /* Add event handlers to the document */
                $(document)
                    .off('mousemove.ColResize').on('mousemove.ColResize', function (e) {
                        that._fnMouseMove.call(that, e);
                    })
                    .off('mouseup.ColResize').on('mouseup.ColResize', function (e) {
                        that._fnMouseUp.call(that, e);
                    });
            },

            /**
             * Deal with a mouse move event while dragging to resize a column
             *  @method  _fnMouseMove
             *  @param   e Mouse event
             *  @returns void
             *  @private
             */
            "_fnMouseMove": function (e) {
                var that = this;

                var offset = $(that.s.mouse.targetColumn.nTh).offset();
                var relativeX = (e.pageX - offset.left);
                var distFromLeft = relativeX;
                var distFromRight = $(that.s.mouse.targetColumn.nTh).outerWidth() - relativeX - 1;

                //Change in mouse x position
                var dx = e.pageX - that.s.mouse.startX;
                //Get the minimum width of the column (default minimum 10px)
                var minColumnWidth = Math.max(parseInt($(that.s.mouse.targetColumn.nTh).css('min-width')), 10);
                //Store the previous width of the column
                var prevWidth = $(that.s.mouse.targetColumn.nTh).width();
                //As long as the cursor is past the handle, resize the columns
                if ((dx > 0 && distFromRight <= 0) || (dx < 0 && distFromRight >= 0)) {
                    if (!that.s.init.tableWidthFixed) {
                        //As long as the width is larger than the minimum
                        var newColWidth = Math.max(minColumnWidth, prevWidth + dx);
                        //Get the width difference (take into account the columns minimum width)
                        var widthDiff = newColWidth - prevWidth;
                        var colResizeIdx = parseInt(that.dom.resizeCol.attr("data-column-index"));
                        //Set datatable column widths
                        that.s.mouse.targetColumn.sWidthOrig = that.s.mouse.targetColumn.sWidth = that.s.mouse.targetColumn.width = newColWidth + "px";
                        var domCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='"+colResizeIdx+"']");
                        //For each table expand the width by the same amount as the column
                        //This accounts for other datatable plugins like FixedColumns
                        domCols.parents("table").each(function() {
                            if(!$(this).parent().hasClass("DTFC_LeftBodyLiner")) {
                                var newWidth = $(this).width() + widthDiff;
                                $(this).width(newWidth);
                            } else {
                                var newWidth =$(that.s.dt.nTableWrapper).find(".DTFC_LeftHeadWrapper").children("table").width();
                                $(this).parents(".DTFC_LeftWrapper").width(newWidth);
                                $(this).parent().width(newWidth+15);
                                $(this).width(newWidth);
                            }
                        });
                        //Apply the new width to the columns after the table has been resized
                        domCols.width(that.s.mouse.targetColumn.width);
                    } else {
                        //A neighbour column must exist in order to resize a column in a table with a fixed width
                        if (that.s.mouse.neighbourColumn) {
                            //Get the minimum width of the neighbor column (default minimum 10px)
                            var minColumnNeighbourWidth = Math.max(parseInt($(that.s.mouse.neighbourColumn.nTh).css('min-width')), 10);
                            //Store the previous width of the neighbour column
                            var prevNeighbourWidth = $(that.s.mouse.neighbourColumn.nTh).width();
                            //As long as the width is larger than the minimum
                            var newColWidth = Math.max(minColumnWidth, prevWidth + dx);
                            var newColNeighbourWidth = Math.max(minColumnNeighbourWidth, prevNeighbourWidth - dx);
                            //Get the width difference (take into account the columns minimum width)
                            var widthDiff = newColWidth - prevWidth;
                            var widthDiffNeighbour = newColNeighbourWidth - prevNeighbourWidth;
                            //Get the column index for the column being changed
                            var colResizeIdx = parseInt(that.dom.resizeCol.attr("data-column-index"));
                            var neighbourColResizeIdx = parseInt(that.dom.resizeColNeighbour.attr("data-column-index"));
                            //Set datatable column widths
                            that.s.mouse.neighbourColumn.sWidthOrig = that.s.mouse.neighbourColumn.sWidth = that.s.mouse.neighbourColumn.width = newColNeighbourWidth + "px";
                            that.s.mouse.targetColumn.sWidthOrig = that.s.mouse.targetColumn.sWidth = that.s.mouse.targetColumn.width = newColWidth + "px";
                            //Get list of columns based on column index in all affected tables tables. This accounts for other plugins like FixedColumns
                            var domNeighbourCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='" + neighbourColResizeIdx + "']");
                            var domCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='" + colResizeIdx + "']");
                            //If dx if positive (the width is getting larger) shrink the neighbour columns first
                            if(dx>0) {
                                domNeighbourCols.width(that.s.mouse.neighbourColumn.width);
                                domCols.width(that.s.mouse.targetColumn.width);
                            } else {
                                //Apply the new width to the columns then to the neighbour columns
                                domCols.width(that.s.mouse.targetColumn.width);
                                domNeighbourCols.width(that.s.mouse.neighbourColumn.width);
                            }
                        }
                    }
                }
                that.s.mouse.startX = e.pageX;
            },

            /**
             * Check to see if the mouse is over the resize handle area
             * @param e
             * @param nTh
             */
            "_fnResizeHandleCheck": function (e, nTh) {
                var that = this;

                var offset = $(nTh).offset();
                var relativeX = (e.pageX - offset.left);
                var relativeY = (e.pageY - offset.top);
                var distFromLeft = relativeX;
                var distFromRight = $(nTh).outerWidth() - relativeX - 1;

                var handleBuffer = this.s.init.handleWidth / 2;
                var leftHandleOn = distFromLeft < handleBuffer;
                var rightHandleOn = distFromRight < handleBuffer;

                //If this is the first table cell
                if ($(nTh).prev("th").length == 0) {
                    if(this.s.init.rtl)
                        rightHandleOn = false;
                    else
                        leftHandleOn = false;
                }
                //If this is the last cell and the table is fixed width don't let them expand the last cell directly
                if ($(nTh).next("th").length == 0 && this.s.init.tableWidthFixed) {
                    if(this.s.init.rtl)
                        leftHandleOn = false;
                    else
                        rightHandleOn = false;
                }

                var resizeAvailable = leftHandleOn||rightHandleOn;

                //If table is in right to left mode flip which TH is being resized
                if (that.s.init.rtl) {
                    //Handle is to the left
                    if (leftHandleOn) {
                        that.dom.resizeCol = $(nTh);
                        that.dom.resizeColNeighbour = $(nTh).next();
                    } else if (rightHandleOn) {
                        that.dom.resizeCol = $(nTh).prev();
                        that.dom.resizeColNeighbour = $(nTh);
                    }
                } else {
                    //Handle is to the right
                    if (rightHandleOn) {
                        that.dom.resizeCol = $(nTh);
                        that.dom.resizeColNeighbour = $(nTh).next();
                    } else if (leftHandleOn) {
                        that.dom.resizeCol = $(nTh).prev();
                        that.dom.resizeColNeighbour = $(nTh);
                    }
                }

                //If table width is fixed make sure both columns are resizable else just check the one.
                if(this.s.init.tableWidthFixed)
                    resizeAvailable &= this.s.init.exclude.indexOf(parseInt($(that.dom.resizeCol).attr("data-column-index"))) == -1 && this.s.init.exclude.indexOf(parseInt($(that.dom.resizeColNeighbour).attr("data-column-index"))) == -1;
                else
                    resizeAvailable &= this.s.init.exclude.indexOf(parseInt($(that.dom.resizeCol).attr("data-column-index"))) == -1;

                $(nTh).off('mousedown.ColResize');
                if (resizeAvailable) {
                    $(nTh).css("cursor", "ew-resize");

                    //Delay other mousedown events from the Reorder plugin
                    that._fnDelayEvents(null, nTh, "mousedown", "ColReorder");
                    that._fnDelayEvents("click", nTh, "click", "DT");

                    $(nTh).off('mousedown.ColResize').on('mousedown.ColResize', function (e) {
                        e.preventDefault();
                        that._fnMouseDown.call(that, e, nTh);
                    })
                        .off('click.ColResize').on('click.ColResize', function (e) {
                            that._fnClick.call(that, e);
                        });
                } else {
                    $(nTh).css("cursor", "pointer");
                    $(nTh).off('mousedown.ColResize click.ColResize');
                    //Restore any events that were removed
                    that._fnRestoreEvents();
                    //This is to restore column sorting on click functionality
                    if (!that.s.isMousedown)
                    //Restore click event if mouse is not down
                        this._fnRestoreEvents("click");
                }
            },

            "_fnClick": function (e) {
                var that = this;
                that.s.isMousedown = false;
                e.stopImmediatePropagation();
            },

            /**
             * Finish off the mouse drag
             *  @method  _fnMouseUp
             *  @param   e Mouse event
             *  @returns void
             *  @private
             */
            "_fnMouseUp": function (e) {
                var that = this;
                that.s.isMousedown = false;

                //Fix width of column to be the size the dom is limited to (for when user sets min-width on a column)
                that.s.mouse.targetColumn.width = that.dom.resizeCol.width();

                $(document).off('mousemove.ColResize mouseup.ColResize');
                this.s.dt.oInstance.fnAdjustColumnSizing();
                //Table width fix, prevents extra gaps between tables
                var LeftWrapper = $(that.s.dt.nTableWrapper).find(".DTFC_LeftWrapper");
                var DTFC_LeftWidth = LeftWrapper.width();
                LeftWrapper.children(".DTFC_LeftHeadWrapper").children("table").width(DTFC_LeftWidth);

                if (that.s.init.resizeCallback) {
                    that.s.init.resizeCallback.call(that, that.s.mouse.targetColumn);
                }
            },

            /**
             * Clean up ColResize memory references and event handlers
             *  @method  _fnDestroy
             *  @returns void
             *  @private
             */
            "_fnDestroy": function () {
                var i, iLen;

                for (i = 0, iLen = this.s.dt.aoDrawCallback.length; i < iLen; i++) {
                    if (this.s.dt.aoDrawCallback[i].sName === 'ColResize_Pre') {
                        this.s.dt.aoDrawCallback.splice(i, 1);
                        break;
                    }
                }

                $(this.s.dt.nTHead).find('*').off('.ColResize');

                $.each(this.s.dt.aoColumns, function (i, column) {
                    $(column.nTh).removeAttr('data-column-index');
                });

                this.s.dt._colResize = null;
                this.s = null;
            },


            /**
             * Add a data attribute to the column headers, so we know the index of
             * the row to be reordered. This allows fast detection of the index, and
             * for this plug-in to work with FixedHeader which clones the nodes.
             *  @private
             */
            "_fnSetColumnIndexes": function () {
                $.each(this.s.dt.aoColumns, function (i, column) {
                    $(column.nTh).attr('data-column-index', i);
                });
            }
        };


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Static parameters
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


        /**
         * ColResize default settings for initialisation
         *  @namespace
         *  @static
         */
        ColResize.defaults = {
            /**
             * Callback function that is fired when columns are resized
             *  @type function():void
             *  @default null
             *  @static
             */
            "resizeCallback": null,

            /**
             * Exclude array for columns that are not resizable
             *  @property exclude
             *  @type     array of indexes that are excluded from resizing
             *  @default  []
             */
            "exclude": [],

            /**
             * Check to see if user is using a fixed table width or dynamic
             * if true:
             *      -Columns will resize themselves and their neighbour
             *      -If neighbour is excluded resize will not occur
             * if false:
             *      -Columns will resize themselves and increase or decrease the width of the table accordingly
             */
            "tableWidthFixed": true,

            /**
             * Width of the resize handle in pixels
             *  @property handleWidth
             *  @type     int (pixels)
             *  @default  10
             */
            "handleWidth": 10,

            /**
             * Right to left support, when true flips which column they are resizing on mouse down
             *  @property rtl
             *  @type     bool
             *  @default  false
             */
            "rtl": false
        };


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Constants
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        /**
         * ColResize version
         *  @constant  version
         *  @type      String
         *  @default   As code
         */
        ColResize.version = "0.0.10";


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * DataTables interfaces
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

        // Expose
        $.fn.dataTable.ColResize = ColResize;
        $.fn.DataTable.ColResize = ColResize;


        // Register a new feature with DataTables
        if (typeof $.fn.dataTable == "function" &&
            typeof $.fn.dataTableExt.fnVersionCheck == "function" &&
            $.fn.dataTableExt.fnVersionCheck('1.9.3')) {
            $.fn.dataTableExt.aoFeatures.push({
                "fnInit": function (settings) {
                    var table = settings.oInstance;

                    if (!settings._colResize) {
                        var dtInit = settings.oInit;
                        var opts = dtInit.colResize || dtInit.oColResize || {};

                        new ColResize(settings, opts);
                    }
                    else {
                        table.oApi._fnLog(settings, 1, "ColResize attempted to initialise twice. Ignoring second");
                    }

                    return null;
                    /* No node for DataTables to insert */
                },
                "cFeature": "Z",
                "sFeature": "ColResize"
            });
        } else {
            alert("Warning: ColResize requires DataTables 1.9.3 or greater - www.datatables.net/download");
        }


// API augmentation
        if ($.fn.dataTable.Api) {
            $.fn.dataTable.Api.register('colResize.reset()', function () {
                return this.iterator('table', function (ctx) {
                    ctx._colResize.fnReset();
                });
            });
        }

        return ColResize;
    }; // /factory


// Define as an AMD module if possible
if ( typeof define === 'function' && define.amd ) {
    define( ['jquery', 'datatables'], factory );
}
else if ( typeof exports === 'object' ) {
    // Node/CommonJS
    factory( require('jquery'), require('datatables') );
}
else if (jQuery && !jQuery.fn.dataTable.ColResize) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
}


})(window, document);
