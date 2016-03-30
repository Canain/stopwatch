/// <reference path="../../../typings/main.d.ts" />
'use strict';

import express = require('express');
import http = require('http');
import io = require('socket.io');

const port = 8080;

const app = express();

app
.use(require('connect-livereload')({
	port: 5000
}))
.use(express.static('pub'));

const httpServer = (<any>http).Server(app);

const server = io(httpServer);

let time = 0;

server.on('connection', socket => {
	socket.join('all');
	socket.on('reset', () => {
		time = 0;
	});
});

setInterval(() => {
	time++;
	server.to('all').emit('time', time);
}, 1000);

httpServer.listen(port, () => {
	console.log(`Listening on port ${port}`);
});