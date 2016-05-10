var repl = require("repl");
var WifiBoxModule = require('./wifibox.js');
var cmd = require('./commands.js');

var box = new WifiBoxModule("192.168.1.56", 8899);

function off() {
    box.command(cmd.rgb.off());
}

function on() {
    box.command(cmd.rgb.on());
}

module.exports = { 
  on: on,
  off: off
}