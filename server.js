// jsos-monitor

var websocket = require("ws");

// jsos_node contains the state of this node which is
// shared with the mothership
var jsos_node = null;

// todo: enumerate local resources (disc drives, storage, binaries, etc.)

// todo: attempt to connect to mothership
var ws = new websocket("ws://localhost:1313/");

ws.on("open", function open(){
	console.log("connected to mothership");
});

ws.on("message", function(data, flags){

	// debug
	console.log("message:" + data);
	
	var jsos_message = JSON.parse(data);
	
	switch(jsos_message.type){
		
		case "init":
			// initialize this node
			console.log("initializing this node");
			jsos_node = jsos_message.jsos_node;
			console.log("node id is: " + jsos_node.id);
			
			break;
		default:
			console.log("unknown message type");
	}
	
});

// todo: send status update to mothership

// todo: wait for program run command