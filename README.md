# VivaldiJs
A thin wrapper around the web MIDI API.
For now it only supports midi notes. Controls will come.

''
import Vivaldi from "./Vivaldi" //Actually you can also use AMD if you prefer
var midiInput = new Vivaldi(["bus_name_1","bus_name_2"])
midiInput.onNote(() => {
  console.log(note.channel);
  console.log(note.note)
  console.log(note.type)
  console.log(note.velocity)
  //And some (not too much) more stuff
  });
''
