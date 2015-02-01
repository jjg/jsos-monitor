// mothership
//
// this is experimental mothership code that collects nodes and assigns work
//

var websocket_server = require("ws").Server;
var wss = new websocket_server({port:1313});
var jsos_nodes = {};


wss.on("connection", function connection(ws){

	// add node to the registry
	var jsos_node = {};
	jsos_node.id = ws.jsos_node = wss.clients.length;
	
	// send an initialization message to the node
	var jsos_message = {};
	jsos_message.type = "init";
	jsos_message.jsos_node = jsos_node;
	ws.send(JSON.stringify(jsos_message));
	
	jsos_node.connection = ws;
	jsos_nodes[jsos_node.id] = jsos_node;
	
	// handle incoming messages
	ws.on("message", function incoming(message){
		
		var jsos_monitor_message = JSON.parse(message);
		
		switch(jsos_monitor_message.type){
			case "status":
				
				if(jsos_nodes.hasOwnProperty(jsos_monitor_message.id)){
					console.log("node recognized: " + jsos_monitor_message.id);
				}
				
				jsos_nodes[jsos_monitor_message.id].status_info = jsos_monitor_message.status_info;
				
				console.log(jsos_monitor_message.status_info);
				break;
				
			default:
				console.log("unknown message type");
		}
		
		console.log(jsos_nodes);
	});
});