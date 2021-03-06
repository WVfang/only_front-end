function consoleData(data) {
	var playersData = "Name: " + data[0].name 		 + " - " + data[1].name + "\n" +
					  "Mat: "  + data[0].materialize + " - " + data[1].materialize + "\n" +
					  "Exp: "  + data[0].exp 		 + " - " + data[1].exp;

	console.log(playersData);
}

module.exports = function() {
	var btnStart = document.getElementById("button-start"),
		winnerBoard = document.getElementById("winner-board"),
		winnerField = document.getElementById("winner-name"),
		data = {},
		winner,
		index = 0;
	btnStart.onclick = function() {
		console.log(index);
		var matTypes = ["Fire", "Earth", "Electricity", "Water"];
		winnerBoard.setAttribute("src", "img/" + matTypes[index] + ".jpg");

		if(index < 3) {
			index++
			console.log("Hello1");
		} else { 
			index = 0;
			console.log("Hello2"); 
		}
		return;	

		for(var i = 0; i < 2; i++) {
			data[i] = {};
			var props = ["name",
						 "materialize",
						 "exp"]
			for(var x = 0; props[x]; x++) {
				var request = "player-" + props[x] + "-" + (parseInt(i)+1).toString();
				data[i][props[x]] = document.getElementById(request).value;
			}
		}

		consoleData(data);

		winner = statsComparsion(data);
		console.log(winner.name);

		winnerBoard.setAttribute("src", "img/" + winner.materialize + ".jpg");
		var winnerName = document.createTextNode(winner.name);
		while(winnerField.lastChild) {
			winnerField.removeChild(winnerField.lastChild);
		}
		winnerField.appendChild(winnerName);
	}
}

function statsComparsion(data) {
	var winner;
	winner = materializesComparsion(data[0].materialize, data[1].materialize);
	if(!winner) {
		winner = experienceComprasion(data[0].exp, data[1].exp);
	}

	winner = data[winner];

	// if(winner == 0) {
	// 	winner = data[0].name;
	// } else if (winner == 1) {
	// 	winner = data[1].name;
	// }

	return winner;
}

function materializesComparsion(materialize1, materialize2) {
	// mat from materializes
	var matTypes = ["Fire", "Earth", "Electricity", "Water"]; 
	var mats = [materialize1, materialize2];

	// Transform mat names into array indexes
	for(var i = 0; mats[i]; i++) { 
		var identification = false;
		for(var x = 0; matTypes[x]; x++) {
			if(mats[i] == matTypes[x]) {
				mats[i] = x;
				identification = true;
			}
		}
		if(!identification) {
			console.log("Invalid materialize value");
			return;
		}
	}

	// Find winner (0 - first, 1 - second) or return nothing
	var k = Math.abs(mats[0] - mats[1]);
	if(k == 1) {
		if(mats[0] < mats[1]) {
			return 0;
		}
		return 1;
	} else if (k == 3) {
		if(mats[0] == 0) { // 0: water wins fire
			return 1;
		}
		return 0;
	}

	return;
}

function experienceComprasion(experience1, experience2) {

	if(!(typeof +experience1 == "number" && typeof +experience2 == "number")) {
		return;
	}

	if(Math.abs(experience1-experience2) > 1000) {
		if(experience1 > experience2) {
			return 0;
		}
		return 1;
	}

	return rand([0, 1]);
}

function rand(options) { // options - array
	var randValue = Math.random();
	var section = 1/options.length;
	for(var i = 0; i < options.length; i++) {
		randValue -= section;
		if(randValue <= 0) {
			return options[i];
		}
	}

	console.log("Some weird problems");
	return;
}

