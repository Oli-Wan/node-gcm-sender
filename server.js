var backend = "backend-url";
var ui = "mobile-angular-url";

var gcm = require('node-gcm'); 
var io  = require('socket.io-client');
var socket = io.connect(backend);

var sender = new gcm.Sender('API-Access-Key');
var registrationIds = [];
registrationIds.push("GCM-Registration-ID");

socket.on('connect', function(){
	console.log("Listening to messages");
});

socket.on('commands:new', function(command) {
	var entityId = command.data.id;
	var content = "La mission #"+entityId+" a été modifiée";
	var url = ui+"/#/mission/"+entityId+"?page=mission";
	var message = new gcm.Message({
		collapseKey: 'demo',
		delayWhileIdle: true,
		timeToLive: 3,
		data: {
			content: content,
			url: url
		}
	});

	sender.sendNoRetry(message, registrationIds, function (err, result) {
		if(err)
			console.log("Could not send the message : "+JSON.stringify(err));
		else if(result)
			console.log("Message successfully sent : "+JSON.stringify(result));
	});
});