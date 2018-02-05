function countExpOffset(expElem) {
	var expValue = (expElem.value - expElem.getAttribute("min"))/(expElem.getAttribute("max") - expElem.getAttribute("min"));
	
	var expTotalWidth = expElem.offsetWidth;

	if(expValue < 0) {
		expValue = 0;
	} else if(expValue > 1) {
		expValue = expTotalWidth;
	} else {
		expValue = expTotalWidth * expValue;
	}

	return expValue;
}

module.exports = function(message) {
	
	var btnStart = document.getElementById("button-start"),
		expElem1 = document.getElementById("player-exp-1"),
		expBubble1 = document.getElementById("exp-bubble-1"),
		expElem2 = document.getElementById("player-exp-2");

	btnStart.onclick = function() {
		// action;
	}

	expElem1.oninput = function() {
		var expRange1 = countExpOffset(expElem1);
		console.log(expRange1);	

		expBubble1.style.left = expRange1;

		console.log(expBubble1.style);

		// expElem1.next("output");
		// console.log(expElem1.style);
	}

}