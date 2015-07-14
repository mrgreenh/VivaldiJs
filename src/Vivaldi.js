class Vivaldi {
    /*
    @param {string[]} inputNames - If inputNames are provided, it will only register to those, otherwhise it will register to all inputs available
    */
    constructor(inputsNames){
        this._inputsNames = inputsNames;
        this.busses = [];
        this.callbacks = [];
        this._connect();
    }

    _connect(){
        window.navigator.requestMIDIAccess().then((midiAccess)=>{
            if(midiAccess.inputs && midiAccess.inputs.size > 0){
                var inputs = midiAccess.inputs.values();
                var input = null;
                while(input = inputs.next()){
                    if(input.done) break;

                    if(!this._inputsNames ||
                       !this._inputsNames.length ||
                       this._inputsNames.indexOf(input.name)>-1){
                        input.value.onmidimessage = (midiEvent) => {
                            this._onMidiEvent(midiEvent);
                        }
                        this._busses.push(input);               
                    }
                }

            }else{
                console.error("No MIDI device detected :/");
            }
        });
    }

    onNote(callback){
        this.callbacks.push(callback);
    }

    // onControl(callback){

    // }

    _onMidiEvent(midiEvent){
        var note = {};
        var eventData = midiEvent.data;
        note["command"] = eventData[0] >> 4;
        note["channel"] = eventData[0] & 0xf;
        note["type"] = Vivaldi.MIDI_EVENT_CODES[note["command"]];
        note["note"] = eventData[1];
        note["velocity"] = eventData[2];
        note["bus"] = "default_bus"; //for now. Then: midiEvent.srcElement.name;

        for(var i in this.callbacks){
            this.callbacks[i](note);
        }
    }
}
//Static vars
Vivaldi.MIDI_EVENT_CODES = {
    8: "note_off",
    9: "note_on"
}

export default Vivaldi;

define(function(){
    return Vivaldi;
})