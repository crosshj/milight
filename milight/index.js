var repl = require("repl");
// http://derickbailey.com/2014/07/02/build-your-own-app-specific-repl-for-your-nodejs-app/

//load this wifi box class
var WifiBoxModule = require('./wifibox.js');

var cmd = require('./commands.js');
var rl = require('readline');


var delay = 150;
//create instance with wifi box ip and port
var box = new WifiBoxModule("192.168.1.56", 8899);

function pad(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

var color = 0;
function changeColor(){
	if(color>=255) {
		clearInterval(timer);
		box.client.close();
		return;
		//color = -1;
	}
	color++;
	box.command(cmd.rgb.hue(color),function(err,bytes){ process.stdout.write(pad(color,3)); rl.moveCursor(process.stdout, -3, 0)});
}

function setColor(color){
	box.command(cmd.rgb.hue(color));
}

function off(){
	box.command(cmd.rgb.off());
}

function on(){
	box.command(cmd.rgb.on());
}

function whiteMode(callback){
	var todo = [
		cmd.rgb.effectSpeedDown()
	];

	var todoDelay = 50;
	todo.forEach(function(command, index, all){
		if (index === all.length){
			setTimeout(function(){
				callback();
			}, (index+1)*todoDelay);
		}
		setTimeout(function(){
			box.command(command)
		}, index*todoDelay);
	});
}

function cycleColorsOnce(){
	var timer = setInterval(changeColor,delay);
}

//whiteMode(function(){ box.client.close();})

var replContext = repl.start({ prompt: "milight >" }).context;

replContext.changeColor = setColor;
replContext.whiteMode = whiteMode;
replContext.on = on;
replContext.off = off;
replContext.exit = function(){
	process.exit();
};


