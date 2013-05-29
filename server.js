var serverIp = "192.168.100.51";
var gcm = require('node-gcm'); 
var io  = require('socket.io-client');
var socket = io.connect("http://"+serverIp+":2403");
var sender = new gcm.Sender('AIzaSyAi1llJIOArYy7ednCzyenfRcnxPJR9SjY');
var registrationIds = [];
registrationIds.push("APA91bHTLFSN4vuoT89MdgI6IoEh7oaewTsAUokSYVsC87a4gtaKeNZB2-rYkfQaaTTo4MG0p9bpVD_NEC6ERScnSZt1OjA20oOwfNDqM4xJ7qwDHEvuNdNsjtInU3UYCcELerHPntfkvzUXNrS_I-Q4jpMZ2irTTKKYRHJfV2Btro6LPwqM-Dk");

socket.on('connect', function(){
	console.log("Listening to messages");
});

socket.on('commands:new', function(command) {
	var entityId = command.data.id;
	var content = "La mission #"+entityId+" a été modifiée";
	var url = "http://"+serverIp+":3000/#/mission/"+entityId+"?page=mission";
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
			console.log("Could not send the message : "+err);
		else if(result)
			console.log("Message successfully sent : "+result);
	});
});
