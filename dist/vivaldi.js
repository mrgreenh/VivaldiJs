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
        this.busses = [];
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

define(function () {
    return Vivaldi;
});
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Vivaldi = require('./Vivaldi');

var _Vivaldi2 = _interopRequireDefault(_Vivaldi);

},{"./Vivaldi":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2FybG9hbmRyZWFjb250ZS9EZXZlbG9wbWVudC9zeW5lc3RoZXNpYS9zdGF0aWMvanMvdmVuZG9yL3ZpdmFsZGlqcy9zcmMvVml2YWxkaS5qcyIsIi9Vc2Vycy9jYXJsb2FuZHJlYWNvbnRlL0RldmVsb3BtZW50L3N5bmVzdGhlc2lhL3N0YXRpYy9qcy92ZW5kb3Ivdml2YWxkaWpzL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FNLE9BQU87Ozs7O0FBSUUsYUFKVCxPQUFPLENBSUcsV0FBVyxFQUFDOzhCQUp0QixPQUFPOztBQUtMLFlBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQ2hDLFlBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNuQjs7aUJBVEMsT0FBTzs7ZUFXRCxvQkFBRTs7O0FBQ04sa0JBQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFVLEVBQUc7QUFDcEQsb0JBQUcsVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7QUFDL0Msd0JBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDeEMsd0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNqQiwyQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDO0FBQ3hCLDRCQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTTs7QUFFckIsNEJBQUcsQ0FBQyxNQUFLLFlBQVksSUFDbEIsQ0FBQyxNQUFLLFlBQVksQ0FBQyxNQUFNLElBQ3pCLE1BQUssWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDeEMsaUNBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFVBQUMsU0FBUyxFQUFLO0FBQ3ZDLHNDQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFDaEMsQ0FBQTtBQUNELGtDQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzVCO3FCQUNKO2lCQUVKLE1BQUk7QUFDRCwyQkFBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUMvQzthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFFSyxnQkFBQyxRQUFRLEVBQUM7QUFDWixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7Ozs7Ozs7O2VBTVcsc0JBQUMsU0FBUyxFQUFDO0FBQ25CLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxnQkFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztBQUMvQixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDOztBQUU1QixpQkFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFDO0FBQ3hCLG9CQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7OztXQXhEQyxPQUFPOzs7O0FBMkRiLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRztBQUN2QixLQUFDLEVBQUUsVUFBVTtBQUNiLEtBQUMsRUFBRSxTQUFTO0NBQ2YsQ0FBQTs7cUJBRWMsT0FBTzs7QUFFdEIsTUFBTSxDQUFDLFlBQVU7QUFDYixXQUFPLE9BQU8sQ0FBQztDQUNsQixDQUFDLENBQUE7Ozs7Ozs7O3VCQ3BFb0IsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBWaXZhbGRpIHtcbiAgICAvKlxuICAgIEBwYXJhbSB7c3RyaW5nW119IGlucHV0TmFtZXMgLSBJZiBpbnB1dE5hbWVzIGFyZSBwcm92aWRlZCwgaXQgd2lsbCBvbmx5IHJlZ2lzdGVyIHRvIHRob3NlLCBvdGhlcndoaXNlIGl0IHdpbGwgcmVnaXN0ZXIgdG8gYWxsIGlucHV0cyBhdmFpbGFibGVcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlucHV0c05hbWVzKXtcbiAgICAgICAgdGhpcy5faW5wdXRzTmFtZXMgPSBpbnB1dHNOYW1lcztcbiAgICAgICAgdGhpcy5idXNzZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5fY29ubmVjdCgpO1xuICAgIH1cblxuICAgIF9jb25uZWN0KCl7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MoKS50aGVuKChtaWRpQWNjZXNzKT0+e1xuICAgICAgICAgICAgaWYobWlkaUFjY2Vzcy5pbnB1dHMgJiYgbWlkaUFjY2Vzcy5pbnB1dHMuc2l6ZSA+IDApe1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dHMgPSBtaWRpQWNjZXNzLmlucHV0cy52YWx1ZXMoKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHdoaWxlKGlucHV0ID0gaW5wdXRzLm5leHQoKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlucHV0LmRvbmUpIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9pbnB1dHNOYW1lcyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5faW5wdXRzTmFtZXMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0c05hbWVzLmluZGV4T2YoaW5wdXQubmFtZSk+LTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUub25taWRpbWVzc2FnZSA9IChtaWRpRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbk1pZGlFdmVudChtaWRpRXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVzc2VzLnB1c2goaW5wdXQpOyAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gTUlESSBkZXZpY2UgZGV0ZWN0ZWQgOi9cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTm90ZShjYWxsYmFjayl7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vIG9uQ29udHJvbChjYWxsYmFjayl7XG5cbiAgICAvLyB9XG5cbiAgICBfb25NaWRpRXZlbnQobWlkaUV2ZW50KXtcbiAgICAgICAgdmFyIG5vdGUgPSB7fTtcbiAgICAgICAgdmFyIGV2ZW50RGF0YSA9IG1pZGlFdmVudC5kYXRhO1xuICAgICAgICBub3RlW1wiY29tbWFuZFwiXSA9IGV2ZW50RGF0YVswXSA+PiA0O1xuICAgICAgICBub3RlW1wiY2hhbm5lbFwiXSA9IGV2ZW50RGF0YVswXSAmIDB4ZjtcbiAgICAgICAgbm90ZVtcInR5cGVcIl0gPSBWaXZhbGRpLk1JRElfRVZFTlRfQ09ERVNbbm90ZVtcImNvbW1hbmRcIl1dO1xuICAgICAgICBub3RlW1wibm90ZVwiXSA9IGV2ZW50RGF0YVsxXTtcbiAgICAgICAgbm90ZVtcInZlbG9jaXR5XCJdID0gZXZlbnREYXRhWzJdO1xuICAgICAgICBub3RlW1wiYnVzXCJdID0gXCJkZWZhdWx0X2J1c1wiOyAvL2ZvciBub3cuIFRoZW46IG1pZGlFdmVudC5zcmNFbGVtZW50Lm5hbWU7XG5cbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMuY2FsbGJhY2tzKXtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW2ldKG5vdGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9TdGF0aWMgdmFyc1xuVml2YWxkaS5NSURJX0VWRU5UX0NPREVTID0ge1xuICAgIDg6IFwibm90ZV9vZmZcIixcbiAgICA5OiBcIm5vdGVfb25cIlxufVxuXG5leHBvcnQgZGVmYXVsdCBWaXZhbGRpO1xuXG5kZWZpbmUoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gVml2YWxkaTtcbn0pIiwiaW1wb3J0IFZpdmFsZGlqcyBmcm9tICcuL1ZpdmFsZGknIl19
