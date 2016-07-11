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

function on(zone) {
  if (zone || zone === 0) {
    masterBox.command(cmd.rgbw.on(zone));
  } else {
    box.command(cmd.rgb.on());
  }
}

module.exports = {
  on: on,
  off: off
}
