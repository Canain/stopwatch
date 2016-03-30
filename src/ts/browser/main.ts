/// <reference path="../../../typings/browser.d.ts" />
'use strict';

require("!style!css!sass!../../sass/style.scss");

document.addEventListener("DOMContentLoaded", () => {
	const button = <HTMLButtonElement>document.getElementById('sw-reset');
	const h1 = document.getElementById('sw-time');
	
	const socket = io('/');
	socket.on('time', (time: number) => {
		h1.textContent = Math.floor(time / 60) + ':' + Math.floor(time % 60);
	});
	
	button.onclick = () => {
		socket.emit('reset');
	};
});