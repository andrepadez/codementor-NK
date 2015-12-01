var $ = require('jquery')
require('./style.less')

var dataURL = 'http://espn.go.com/users/recruiting/fantasy-sample-data.json'
$.getJSON(dataURL, function(json){
	
	var players = json.players
	console.log(json)
	
	for (var i = 0; i < players.length; i++) {
		var player = players[i].player
		player['player-stats'].score = calculateScores(player)
		players[i] = player
	}
	players = orderPlayers(players)
	renderPlayers(players)
})

function orderPlayers(players){
	return players.sort(function(a, b){
		var aScore = a['player-stats'].score
		var bScore = b['player-stats'].score
		return aScore < bScore ? 1 : -1
	})
}

function calculateScores(player){
	var stats = player['player-stats']
	var score = 0
	score += stats['passing-touchdowns'] * 4
	score += Math.floor(stats['passing-yards'] / 25)
	score += stats['rushing-touchdowns'] * 6
	score += Math.floor(stats['rushing-yards'] / 10)
	score += stats['receiving-touchdowns'] * 6
	score += Math.floor(stats['receiving-yards'] / 10)
	return score
}

function renderPlayers(players){
	for (var i = 0; i < players.length; i++) {
		renderPlayer(players[i])
	}
}

function renderPlayer(player){
	var playerElement = document.createElement('div')
	var h3 = document.createElement('h3')
	h3.innerText = player['player-name']
	playerElement.appendChild(h3)

	var stats = player['player-stats']
	var statsKeys = Object.keys(stats)

	for(var j = 0; j < statsKeys.length; j++){
		var key = statsKeys[j]
		playerElement.innerHTML += key + ': ' + stats[key] + '<br>'
	}

	document.body.appendChild(playerElement)
}