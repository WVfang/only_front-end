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
	
	var expElem1 = document.getElementById("player-exp-1"),
		expBubble1 = document.getElementById("exp-bubble-1"),
		expElem2 = document.getElementById("player-exp-2");

	
	expElem1.onchange = function() {
		var offset = 0;
		var bubbleOffset;
		
		var expValue = (expElem1.value - expElem1.getAttribute("min"))/(expElem1.getAttribute("max") - expElem1.getAttribute("min"));
	
		//console.log("Value: " + expValue*100 + "%");

		var expTotalWidth = expElem1.offsetWidth;

		if(expValue < 0) {
			expValue = 0;
		} else if(expValue > 1) {
			expValue = expTotalWidth;
		} else {
			expValue = expTotalWidth * expValue;
		}
	
		// bubbleOffset = expRange1; //expBubble1.offsetLeft;

		expBubble1.style.left = expValue + offset + "px";
		// expBubble1.style.marginLeft = offset + "%";
		expBubble1.innerHTML = expElem1.value;

	}

}

// console.log("Offset: " + expRange1);	
// console.log("After: " + expBubble1.style.left);

function setBubbleWithRangeValue() {
	
}