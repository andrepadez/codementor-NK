var $ = require('jquery')

var dataURL = 'http://espn.go.com/users/recruiting/fantasy-sample-data.json'
$.getJSON(dataURL, function(json){
	
	var players = json.players
	console.log(players)
	for (var i = 0; i <= players.length; i++) {
		var player = players[i].player
		console.log('player', i, player)

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

		console.log(statsKeys)



		document.body.appendChild(playerElement)
	}
})