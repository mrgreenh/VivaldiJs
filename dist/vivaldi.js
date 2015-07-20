(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vivaldi = (function () {
    /*
    @param {string[]} inputNames - If inputNames are provided, it will only register to those, otherwhise it will register to all inputs available
    */

    function Vivaldi(inputsNames) {
        _classCallCheck(this, Vivaldi);

        this._inputsNames = inputsNames;
        this._busses = [];
        this.callbacks = [];
        this._connect();
    }

    _createClass(Vivaldi, [{
        key: "_connect",
        value: function _connect() {
            var _this = this;

            window.navigator.requestMIDIAccess().then(function (midiAccess) {
                if (midiAccess.inputs && midiAccess.inputs.size > 0) {
                    var inputs = midiAccess.inputs.values();
                    var input = null;
                    while (input = inputs.next()) {
                        if (input.done) break;

                        if (!_this._inputsNames || !_this._inputsNames.length || _this._inputsNames.indexOf(input.name) > -1) {
                            input.value.onmidimessage = function (midiEvent) {
                                _this._onMidiEvent(midiEvent);
                            };
                            _this._busses.push(input);
                        }
                    }
                } else {
                    console.error("No MIDI device detected :/");
                }
            });
        }
    }, {
        key: "onNote",
        value: function onNote(callback) {
            this.callbacks.push(callback);
        }
    }, {
        key: "_onMidiEvent",

        // onControl(callback){

        // }

        value: function _onMidiEvent(midiEvent) {
            var note = {};
            var eventData = midiEvent.data;
            note["command"] = eventData[0] >> 4;
            note["channel"] = eventData[0] & 0xf;
            note["type"] = Vivaldi.MIDI_EVENT_CODES[note["command"]];
            note["note"] = eventData[1];
            note["velocity"] = eventData[2];
            note["bus"] = "default_bus"; //for now. Then: midiEvent.srcElement.name;

            for (var i in this.callbacks) {
                this.callbacks[i](note);
            }
        }
    }]);

    return Vivaldi;
})();

//Static vars
Vivaldi.MIDI_EVENT_CODES = {
    8: "note_off",
    9: "note_on"
};

exports["default"] = Vivaldi;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Vivaldi = require('./Vivaldi');

var _Vivaldi2 = _interopRequireDefault(_Vivaldi);

define(function () {
    return _Vivaldi2['default'];
});

},{"./Vivaldi":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3ZpdmFsZGlqcy9zcmMvVml2YWxkaS5qcyIsIi9Vc2Vycy9jYXJsb2FuZHJlYWNvbnRlL0RldmVsb3BtZW50L3N5bmVzdGhlc2lhL3N0YXRpYy9qcy92ZW5kb3Ivdml2YWxkaWpzL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLE9BQU87Ozs7O0FBSUUsYUFKVCxPQUFPLENBSUcsV0FBVyxFQUFDOzhCQUp0QixPQUFPOztBQUtMLFlBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQ2hDLFlBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7aUJBVEMsT0FBTzs7ZUFXRCxvQkFBRTs7O0FBQ04sa0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFVLEVBQUc7QUFDcEQsb0JBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7QUFDL0Msd0JBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEMsd0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQiwyQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDO0FBQ3hCLDRCQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTTs7QUFFckIsNEJBQUcsQ0FBQyxNQUFLLFlBQVksSUFDbEIsQ0FBQyxNQUFLLFlBQVksQ0FBQyxNQUFNLElBQ3pCLE1BQUssWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDeEMsaUNBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQUMsU0FBUyxFQUFLO0FBQ3ZDLHNDQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFDaEMsQ0FBQTtBQUNELGtDQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzVCO3FCQUNKO2lCQUVKLE1BQUk7QUFDRCwyQkFBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUMvQzthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFFSyxnQkFBQyxRQUFRLEVBQUM7QUFDWixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7Ozs7Ozs7O2VBTVcsc0JBQUMsU0FBUyxFQUFDO0FBQ25CLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxnQkFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUMvQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDOztBQUU1QixpQkFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO0FBQ3hCLG9CQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7OztXQXhEQyxPQUFPOzs7O0FBMkRiLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRztBQUN2QixLQUFDLEVBQUUsVUFBVTtBQUNiLEtBQUMsRUFBRSxTQUFTO0NBQ2YsQ0FBQTs7cUJBRWMsT0FBTzs7Ozs7Ozs7dUJDaEVGLFdBQVc7Ozs7QUFFL0IsTUFBTSxDQUFDLFlBQVU7QUFDYixnQ0FBZTtDQUNsQixDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgVml2YWxkaSB7XG4gICAgLypcbiAgICBAcGFyYW0ge3N0cmluZ1tdfSBpbnB1dE5hbWVzIC0gSWYgaW5wdXROYW1lcyBhcmUgcHJvdmlkZWQsIGl0IHdpbGwgb25seSByZWdpc3RlciB0byB0aG9zZSwgb3RoZXJ3aGlzZSBpdCB3aWxsIHJlZ2lzdGVyIHRvIGFsbCBpbnB1dHMgYXZhaWxhYmxlXG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbnB1dHNOYW1lcyl7XG4gICAgICAgIHRoaXMuX2lucHV0c05hbWVzID0gaW5wdXRzTmFtZXM7XG4gICAgICAgIHRoaXMuX2J1c3NlcyA9IFtdO1xuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLl9jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgX2Nvbm5lY3QoKXtcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcygpLnRoZW4oKG1pZGlBY2Nlc3MpPT57XG4gICAgICAgICAgICBpZihtaWRpQWNjZXNzLmlucHV0cyAmJiBtaWRpQWNjZXNzLmlucHV0cy5zaXplID4gMCl7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0cyA9IG1pZGlBY2Nlc3MuaW5wdXRzLnZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgd2hpbGUoaW5wdXQgPSBpbnB1dHMubmV4dCgpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5wdXQuZG9uZSkgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX2lucHV0c05hbWVzIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICF0aGlzLl9pbnB1dHNOYW1lcy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5wdXRzTmFtZXMuaW5kZXhPZihpbnB1dC5uYW1lKT4tMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZS5vbm1pZGltZXNzYWdlID0gKG1pZGlFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29uTWlkaUV2ZW50KG1pZGlFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXNzZXMucHVzaChpbnB1dCk7ICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBNSURJIGRldmljZSBkZXRlY3RlZCA6L1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ob3RlKGNhbGxiYWNrKXtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgLy8gb25Db250cm9sKGNhbGxiYWNrKXtcblxuICAgIC8vIH1cblxuICAgIF9vbk1pZGlFdmVudChtaWRpRXZlbnQpe1xuICAgICAgICB2YXIgbm90ZSA9IHt9O1xuICAgICAgICB2YXIgZXZlbnREYXRhID0gbWlkaUV2ZW50LmRhdGE7XG4gICAgICAgIG5vdGVbXCJjb21tYW5kXCJdID0gZXZlbnREYXRhWzBdID4+IDQ7XG4gICAgICAgIG5vdGVbXCJjaGFubmVsXCJdID0gZXZlbnREYXRhWzBdICYgMHhmO1xuICAgICAgICBub3RlW1widHlwZVwiXSA9IFZpdmFsZGkuTUlESV9FVkVOVF9DT0RFU1tub3RlW1wiY29tbWFuZFwiXV07XG4gICAgICAgIG5vdGVbXCJub3RlXCJdID0gZXZlbnREYXRhWzFdO1xuICAgICAgICBub3RlW1widmVsb2NpdHlcIl0gPSBldmVudERhdGFbMl07XG4gICAgICAgIG5vdGVbXCJidXNcIl0gPSBcImRlZmF1bHRfYnVzXCI7IC8vZm9yIG5vdy4gVGhlbjogbWlkaUV2ZW50LnNyY0VsZW1lbnQubmFtZTtcblxuICAgICAgICBmb3IodmFyIGkgaW4gdGhpcy5jYWxsYmFja3Mpe1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbaV0obm90ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vL1N0YXRpYyB2YXJzXG5WaXZhbGRpLk1JRElfRVZFTlRfQ09ERVMgPSB7XG4gICAgODogXCJub3RlX29mZlwiLFxuICAgIDk6IFwibm90ZV9vblwiXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpdmFsZGk7IiwiaW1wb3J0IFZpdmFsZGkgZnJvbSAnLi9WaXZhbGRpJ1xuXG5kZWZpbmUoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gVml2YWxkaTtcbn0pIl19
