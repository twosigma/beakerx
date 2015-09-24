/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
    strict:false, undef:true, unused:true, browser:true, jquery:true, maxerr:50,
    curly:false, multistr:true */
/*global Shiny, ggvis, vg*/
$(function(){ //DOM Ready

  var _ = window.lodash;

  // This custom message binding is needed for shiny to keep track of the
  // hidden state of the ggvis output. It isn't actually used for receiving
  // regular output values from the server.
  var ggvisOutputBinding = new Shiny.OutputBinding();
  $.extend(ggvisOutputBinding, {
    find: function(scope) {
      return $(scope).find('.ggvis-output');
    }
  });
  Shiny.outputBindings.register(ggvisOutputBinding, 'shiny.ggvisOutput');

  // A customized version of Shiny's htmlOutputBinding which can call a plot's
  // onControlOutput function when outputs are updated drawn.
  var ggvisControlOutputBinding = new Shiny.OutputBinding();
  $.extend(ggvisControlOutputBinding, {
    find: function(scope) {
      return $(scope).find('.ggvis-control-output');
    },
    onValueError: function(el, err) {
      Shiny.unbindAll(el);
      this.renderError(el, err);
    },
    renderValue: function(el, data) {
      Shiny.unbindAll(el);

      var html;
      var dependencies = [];
      if (data === null) {
        html = '';
      } else if (typeof(data) === 'string') {
        html = data;
      } else if (typeof(data) === 'object') {
        html = data.html;
        dependencies = data.deps;
      }

      // Make sure the wrapping div actually contains the floated divs inside
      html = html + '\n<div style="clear:both;"></div>';

      Shiny.renderHtml(html, el, dependencies);
      Shiny.initializeInputs(el);
      Shiny.bindAll(el);

      // Run onControlOutput for each plot listed in data-plot-id
      var plotId = $(el).data('plot-id');
      if (plotId !== undefined) {
        var ids = plotId.split(/ +/);

        for (var i = 0; i < ids.length; i++) {
          var plot = ggvis.plots[ids[i]];
          if (plot && plot.onControlOutput) {
            plot.onControlOutput();
          }
        }
      }
    }
  });
  Shiny.outputBindings.register(ggvisControlOutputBinding, 'shiny.ggvisControlOutput');


  // Receive data object and dispatch to appropriate vega object
  Shiny.addCustomMessageHandler("ggvis_data", function(message) {
    var plotId = message.plotId;
    var name = message.value[0].name;
    var data = message.value[0].values;
    var format = message.value[0].format;

    var plot = ggvis.getPlot(plotId);

    if (plot.chart) {
      // If the plot exists already, feed it the data
      var dataset = {};

      dataset[name] = vg.data.read(data, format);
      plot.chart.data(dataset);

    } else {
      // The plot doesn't exist, save the data for when the plot arrives
      if (!plot.pendingData) plot.pendingData = {};

      plot.pendingData[name] = data;
    }
  });


  // Receive a vega spec and parse it
  Shiny.addCustomMessageHandler("ggvis_vega_spec", function(message) {
    var plotId = message.plotId;
    var spec = message.spec;
    var plot = ggvis.getPlot(plotId);

    plot.parseSpec(spec);
  });


  // Receive command and dispatch to appropriate vega object
  Shiny.addCustomMessageHandler("ggvis_command", function(message) {
    var plotId = message.plotId;
    var command = message.command;
    var plot = ggvis.getPlot(plotId);

    if (plot.chart) {
      if (command === "update") {
        // When a plot already is present, and a ggvis_vega_spec plus an update
        // ggvis_command arrive very close together, we need to make sure that
        // the update happens _after_ the spec is parsed. There's a setTimeout
        // when Vega processes the spec, so we need one here also. (#700)
        setTimeout(function() {
          // If all data objects have been received, update
          if (plot.dataReady()) {
            if (!plot.initialized) {
              plot.initialUpdate();
            } else {
              plot.chart.update({ duration: plot.opts.duration });
            }
          }
        }, 1);
      } else {
        console.log("Received unknown ggvis_command.");
      }
    }
  });


  // ---------------------------------------------------------------------------
  // Interaction event handlers
  // These are defined here instead of ggvis.js because at present all of the
  // event handlers use shiny.
  // ---------------------------------------------------------------------------
  // Keyboard handler
  // Sends ggvis_xxxx_key_press events
  ggvis.handlers.keyboard = (function() {
    var keyboard = function(plot, h_spec) {
      this.plot = plot;
      this.h_spec = h_spec;

      // Used for keeping track of number of key events. Needed so that Shiny
      // will send info when same key is pressed multiple times in a row.
      this._counter = 0;

      var self = this;

      // keypress handler works for regular character keys
      $(document).on("keypress." + this.plot.plotId, function(e) {
        var str = String.fromCharCode(e.which);
        self._sendValue(str);
      });

      // keydown handler for special keys that aren't caught by keypress,
      // like arrows
      $(document).on("keydown." + this.plot.plotId, function(e) {
        var str = keycodes[e.which];
        if (str) {
          self._sendValue(str);
        }
      });
    };

    // Mappings for keycodes of special characters
    var keycodes = {
      8: "backspace",
      9: "tab",
      27: "esc",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
      46: "delete"
    };

    var prototype = keyboard.prototype;

    prototype.remove = function() {
      $(document).off("keypress." + this.plot.plotId);
      $(document).off("keydown." + this.plot.plotId);
    };

    prototype._sendValue = function(str) {
      this._counter++;
      Shiny.onInputChange(this.plot.plotId + "_key_press", {
        value: str,
        _nonce: this._counter
      });
    };

    return keyboard;
  })(); // ggvis.handlers.keyboard


  // ---------------------------------------------------------------------------
  // Hover handler
  // Sends ggvis_xxxx_mouse_over and ggvis_xxxx_mouse_out events
  ggvis.handlers.hover = (function() {
    var hover = function(plot, h_spec) {
      this.plot = plot;
      this.h_spec = h_spec;

      // Used for keeping track of number of events. Needed so that Shiny
      // will send info when mouse_out event happens multiple times.
      this._nonce_counter = 0;

      var policy = h_spec.policy || "debounce";
      var policy_fun = _[policy];
      var delay = h_spec.delay || 75;

      var mouseOverHandler = policy_fun(this._createMouseOverHandler(), delay);
      var mouseOutHandler = policy_fun(this._createMouseOutHandler(), delay);

      plot.chart.on("mouseover." + this.plot.plotId, mouseOverHandler);
      plot.chart.on("mouseout."  + this.plot.plotId, mouseOutHandler);
    };

    var prototype = hover.prototype;

    prototype.remove = function() {
      this.plot.chart.off("mouseover." + this.plot.plotId);
      this.plot.chart.off("mouseout."  + this.plot.plotId);
    };

    prototype._createMouseOverHandler = function() {
      var self = this;
      return function(event, item) {
        Shiny.onInputChange(self.plot.plotId + "_mouse_over",
          {
            plot_id: self.plot.plotId,
            data: item.datum.data,
            pagex: event.pageX,
            pagey: event.pageY,
            _nonce: self._nonce_counter
          }
        );
        self._nonce_counter++;
      };
    };

    prototype._createMouseOutHandler = function() {
      var self = this;
      return function(event, item) {
        /* jshint unused: false */
        Shiny.onInputChange(self.plot.plotId + "_mouse_out",
          {
            plot_id: self.plot.plotId,
            _nonce: self._nonce_counter
          }
        );
        self._nonce_counter++;
      };
    };

    return hover;
  })(); // ggvis.handlers.hover

  // ---------------------------------------------------------------------------
  // Click handler
  // Sends ggvis_xxxx_mouse_click
  ggvis.handlers.click = (function() {
    var click = function(plot, h_spec) {
      this.plot = plot;
      this.h_spec = h_spec;

      // Used for keeping track of number of events. Needed so that Shiny
      // will send info when mouse_out event happens multiple times.
      this._nonce_counter = 0;

      plot.chart.on("click." + this.plot.plotId, this._createMouseClickHandler());
    };

    var prototype = click.prototype;

    prototype.remove = function() {
      this.plot.chart.off("click."  + this.plot.plotId);
    };

    prototype._createMouseClickHandler = function() {
      var self = this;
      return function(event, item) {
        Shiny.onInputChange(self.plot.plotId + "_mouse_click",
          {
            plot_id: self.plot.plotId,
            data: item.datum.data,
            pagex: event.pageX,
            pagey: event.pageY,
            _nonce: self._nonce_counter
          }
        );
        self._nonce_counter++;
      };
    };

    return click;
  })(); // ggvis.handlers.click


  // ---------------------------------------------------------------------------
  // Brush handler
  // Sends ggvis_xxxx_mouse_brush
  ggvis.handlers.brush = (function() {
    var brush = function(plot, h_spec) {
      this.plot = plot;
      this.h_spec = h_spec;

      var policy = h_spec.policy || "debounce";
      var policy_fun = _[policy];
      var delay = h_spec.delay || 100;

      var brushHandler = policy_fun(this._createBrushHandler(), delay);

      plot.brush.on("updateItems." + this.plot.plotId, brushHandler);
    };

    var prototype = brush.prototype;

    prototype.remove = function() {
      this.plot.brush.off("updateItems." + this.plot.plotId);
    };

    // Send information about the current brush
    prototype._createBrushHandler = function() {
      var self = this;
      return function(info) {
        info.items = info.items.map(function(item) {
          var newitem = $.extend({}, item.datum.data);
          newitem.key__ = item.key;
          return newitem;
        });

        // Get x and y coordinates relative to the page
        var offset = self.plot.getVegaDiv().offset();
        var padding = self.plot.chart.padding();
        info.pagex1 = info.x1 + offset.left + padding.left;
        info.pagex2 = info.x2 + offset.left + padding.left;
        info.pagey1 = info.y1 + offset.top  + padding.top;
        info.pagey2 = info.y2 + offset.top  + padding.top;

        Shiny.onInputChange(self.plot.plotId + "_brush_move", info);
      };
    };

    return brush;
  })(); // ggvis.handlers.brush


  // ---------------------------------------------------------------------------
  // Resize handler
  // Sends ggvis_xxxx_resize
  ggvis.handlers.resize = (function() {
    var resize = function(plot, h_spec) {
      this.plot = plot;
      this.h_spec = h_spec;

      this.plot.on("resize." + this.plot.plotId, this._createResizeHandler());
    };

    var prototype = resize.prototype;

    prototype.remove = function() {
      this.plot.off("resize." + this.plot.plotId);
    };

    // Returns a function which takes an event
    prototype._createResizeHandler = function() {
      var self = this;
      return function(event) {
        Shiny.onInputChange(self.plot.plotId + "_resize",
          {
            plot_id: self.plot.plotId,
            width: event.width,
            height: event.height,
            padding: event.padding
          }
        );
      };
    };

    return resize;
  })(); // ggvis.handlers.resize


  // ---------------------------------------------------------------------------
  // Handlers for messages sent from Shiny server to client
  ggvis.messages = (function() {
    var messages = {
      _handlers: {}   // Registry of ggvis message handlers
    };

    // Register a handler function for messages of a given type
    // handler should have signature function(data, id)
    messages.addHandler = function(type, handler) {
      messages._handlers[type] = handler;
    };

    // Remove handler function for messages of a given type
    messages.removeHandler = function(type) {
      delete messages._handlers[type];
    };

    // Handle custom messages with this format:
    // {
    //   "custom": {
    //     "ggvis_message": {
    //       "type": "show_tooltip",
    //       "id": null,
    //       "data": {
    //         "pagex":    -63,
    //         "pagey":    196,
    //         "html": "text here"
    //       }
    //     }
    //   }
    // }
    Shiny.addCustomMessageHandler('ggvis_message', function(msg) {
      var type = msg.type;
      if (!type) return;

      // Grab the appropriate handler function for this type of message
      var handler = messages._handlers[type];
      if (!handler) return;

      handler(msg.data, msg.id);
    });

    return messages;
  })(); // ggvis.messages


  // ---------------------------------------------------------------------------
  // Message handlers

  // Tooltip message handlers
  ggvis.messages.addHandler("show_tooltip", function(data, id) {
    /* jshint unused: false */
    // Remove any existing tooltips
    $('.ggvis-tooltip').remove();

    // Add the tooltip div
    var $el = $('<div id="ggvis-tooltip" class="ggvis-tooltip"></div>')
      .appendTo('body');

    $el.html(data.html);
    $el.css({
      left:  data.pagex,
      top:   data.pagey
    });
  });

  ggvis.messages.addHandler("hide_tooltip", function(data, id) {
    /* jshint unused: false */
    $('.ggvis-tooltip').remove();
  });

});
