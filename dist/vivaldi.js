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
            note["channel"] = (eventData[0] & 0xf) + 1;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3ZpdmFsZGlqcy9zcmMvVml2YWxkaS5qcyIsIi9Vc2Vycy9jYXJsb2FuZHJlYWNvbnRlL0RldmVsb3BtZW50L3N5bmVzdGhlc2lhL3N0YXRpYy9qcy92ZW5kb3Ivdml2YWxkaWpzL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLE9BQU87Ozs7O0FBSUUsYUFKVCxPQUFPLENBSUcsV0FBVyxFQUFDOzhCQUp0QixPQUFPOztBQUtMLFlBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQ2hDLFlBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7aUJBVEMsT0FBTzs7ZUFXRCxvQkFBRTs7O0FBQ04sa0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFVLEVBQUc7QUFDcEQsb0JBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7QUFDL0Msd0JBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEMsd0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQiwyQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDO0FBQ3hCLDRCQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTTs7QUFFckIsNEJBQUcsQ0FBQyxNQUFLLFlBQVksSUFDbEIsQ0FBQyxNQUFLLFlBQVksQ0FBQyxNQUFNLElBQ3pCLE1BQUssWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDeEMsaUNBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQUMsU0FBUyxFQUFLO0FBQ3ZDLHNDQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFDaEMsQ0FBQTtBQUNELGtDQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzVCO3FCQUNKO2lCQUVKLE1BQUk7QUFDRCwyQkFBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUMvQzthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFFSyxnQkFBQyxRQUFRLEVBQUM7QUFDWixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7Ozs7Ozs7O2VBTVcsc0JBQUMsU0FBUyxFQUFDO0FBQ25CLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxnQkFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUMvQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUEsR0FBSSxDQUFDLENBQUM7QUFDM0MsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDekQsZ0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsZ0JBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUM7O0FBRTVCLGlCQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUM7QUFDeEIsb0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7U0FDSjs7O1dBeERDLE9BQU87Ozs7QUEyRGIsT0FBTyxDQUFDLGdCQUFnQixHQUFHO0FBQ3ZCLEtBQUMsRUFBRSxVQUFVO0FBQ2IsS0FBQyxFQUFFLFNBQVM7Q0FDZixDQUFBOztxQkFFYyxPQUFPOzs7Ozs7Ozt1QkNoRUYsV0FBVzs7OztBQUUvQixNQUFNLENBQUMsWUFBVTtBQUNiLGdDQUFlO0NBQ2xCLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBWaXZhbGRpIHtcbiAgICAvKlxuICAgIEBwYXJhbSB7c3RyaW5nW119IGlucHV0TmFtZXMgLSBJZiBpbnB1dE5hbWVzIGFyZSBwcm92aWRlZCwgaXQgd2lsbCBvbmx5IHJlZ2lzdGVyIHRvIHRob3NlLCBvdGhlcndoaXNlIGl0IHdpbGwgcmVnaXN0ZXIgdG8gYWxsIGlucHV0cyBhdmFpbGFibGVcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucHV0c05hbWVzKXtcbiAgICAgICAgdGhpcy5faW5wdXRzTmFtZXMgPSBpbnB1dHNOYW1lcztcbiAgICAgICAgdGhpcy5fYnVzc2VzID0gW107XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgICAgIHRoaXMuX2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBfY29ubmVjdCgpe1xuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnJlcXVlc3RNSURJQWNjZXNzKCkudGhlbigobWlkaUFjY2Vzcyk9PntcbiAgICAgICAgICAgIGlmKG1pZGlBY2Nlc3MuaW5wdXRzICYmIG1pZGlBY2Nlc3MuaW5wdXRzLnNpemUgPiAwKXtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRzID0gbWlkaUFjY2Vzcy5pbnB1dHMudmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB3aGlsZShpbnB1dCA9IGlucHV0cy5uZXh0KCkpe1xuICAgICAgICAgICAgICAgICAgICBpZihpbnB1dC5kb25lKSBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5faW5wdXRzTmFtZXMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuX2lucHV0c05hbWVzLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnB1dHNOYW1lcy5pbmRleE9mKGlucHV0Lm5hbWUpPi0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlLm9ubWlkaW1lc3NhZ2UgPSAobWlkaUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25NaWRpRXZlbnQobWlkaUV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1c3Nlcy5wdXNoKGlucHV0KTsgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIE1JREkgZGV2aWNlIGRldGVjdGVkIDovXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk5vdGUoY2FsbGJhY2spe1xuICAgICAgICB0aGlzLmNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyBvbkNvbnRyb2woY2FsbGJhY2spe1xuXG4gICAgLy8gfVxuXG4gICAgX29uTWlkaUV2ZW50KG1pZGlFdmVudCl7XG4gICAgICAgIHZhciBub3RlID0ge307XG4gICAgICAgIHZhciBldmVudERhdGEgPSBtaWRpRXZlbnQuZGF0YTtcbiAgICAgICAgbm90ZVtcImNvbW1hbmRcIl0gPSBldmVudERhdGFbMF0gPj4gNDtcbiAgICAgICAgbm90ZVtcImNoYW5uZWxcIl0gPSAoZXZlbnREYXRhWzBdICYgMHhmKSArIDE7XG4gICAgICAgIG5vdGVbXCJ0eXBlXCJdID0gVml2YWxkaS5NSURJX0VWRU5UX0NPREVTW25vdGVbXCJjb21tYW5kXCJdXTtcbiAgICAgICAgbm90ZVtcIm5vdGVcIl0gPSBldmVudERhdGFbMV07XG4gICAgICAgIG5vdGVbXCJ2ZWxvY2l0eVwiXSA9IGV2ZW50RGF0YVsyXTtcbiAgICAgICAgbm90ZVtcImJ1c1wiXSA9IFwiZGVmYXVsdF9idXNcIjsgLy9mb3Igbm93LiBUaGVuOiBtaWRpRXZlbnQuc3JjRWxlbWVudC5uYW1lO1xuXG4gICAgICAgIGZvcih2YXIgaSBpbiB0aGlzLmNhbGxiYWNrcyl7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tpXShub3RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vU3RhdGljIHZhcnNcblZpdmFsZGkuTUlESV9FVkVOVF9DT0RFUyA9IHtcbiAgICA4OiBcIm5vdGVfb2ZmXCIsXG4gICAgOTogXCJub3RlX29uXCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgVml2YWxkaTsiLCJpbXBvcnQgVml2YWxkaSBmcm9tICcuL1ZpdmFsZGknXG5cbmRlZmluZShmdW5jdGlvbigpe1xuICAgIHJldHVybiBWaXZhbGRpO1xufSkiXX0=
