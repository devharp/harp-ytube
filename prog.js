const express = require('express');
const app = express();
const http = require('http').Server(app);
const { Server } = require('socket.io');
const HTTP_PORT = 8000;

app.use(express.static(__dirname + '/public'));

const io = new Server(http)
io.on('connection', socket =>{
	
	console.log('client connected');

	socket.on('request-video-info', data => {
		console.log('client request video info for: ', data);

		const ytdl = require('ytdl-core');
		ytdl.getInfo(/(https:\/\/www.youtube.com\/watch\?v=)(.*)/.exec(data)[2]).then(vidinfo => {

			socket.emit('video-info', vidinfo);
		});

		// const vidinfo = require('./vid-test2.json');
	});
})

http.listen(8000, function(){
	console.log('Server started, listening on port: ', HTTP_PORT);
});