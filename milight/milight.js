var repl = require("repl");
var WifiBoxModule = require('./wifibox.js');
var cmd = require('./commands.js');

var box = new WifiBoxModule("192.168.1.56", 8899);
var masterBox = new WifiBoxModule("192.168.1.4", 8899);

function off(zone) {
  if (zone || zone === 0) {
    masterBox.command(cmd.rgbw.off(zone));
  } else {
    box.command(cmd.rgb.off());
  }
}

function on(zone, brightness) {
  if (zone || zone === 0) {
    masterBox.command(cmd.rgbw.on(zone));
    if (brightness > 0){
      console.log('-------------this happened: ', Math.floor(100*brightness/255));
      setTimeout(function(){
        masterBox.command(
          cmd.rgbw.brightness(Math.floor(100*brightness/255))
        );
      }, 500);
    }
  } else {
    box.command(cmd.rgb.on());
    // setting brightness to value not possible with this controller
  }
}

function brightness(zone, level){
  on(zone, level);
}

module.exports = {
  on: on,
  off: off,
  brightness: brightness
}
