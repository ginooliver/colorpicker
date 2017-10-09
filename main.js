var rgb = document.querySelector("#rgb");
var difficulties = document.querySelector("#difficulties");
var selectEasy = document.querySelector("#selecteasy");
var selectModerate = document.querySelector("#selectmoderate");
var selectHard = document.querySelector("#selecthard");
var reset = document.querySelector("#reset");
var howto = document.querySelector("#howto");
var entries = document.querySelector("#entries");
var answer = "";
var e = [];
var gameover = false;

function gameOver(answer) {
	e = document.querySelectorAll(".test");
	for (i=0; i<e.length; i++) {
		e[i].querySelector(".thumbnail").style.backgroundColor = answer;
	}
}

function randomNumber(max) {
	return Math.floor(Math.random() * max);
}

function generateRGB() {
	var red = randomNumber(255);
	var green = randomNumber(255);
	var blue = randomNumber(255);
	var rgb = "RGB(" + red + ", " + green + ", " + blue + ")";
	return rgb  
}

function generateEntries(num) {
	//<div class="col-lg-4 col-sm-6"><div class="thumbnail"><div class="selection"></div></div></div>
	var allEntries = "";
	var color = [];

	if (num == 2) {
		for (i=0; i<num; i++) {
			genColor = generateRGB();
			color.push(genColor);
			allEntries += '<div class="test col-sm-6" style="padding:0px; margin:0px; border: 0px; border-radius:0px;"><div class="thumbnail" ' + 'style="padding:0px; border: 0px; border-radius:0px; margin:0px;background-color: ' + genColor + '"' +'><div class="selection"></div></div></div>'
		}		
	}

	else {
		for (i=0; i<num; i++) {
			genColor = generateRGB();
			color.push(genColor);
			allEntries += '<div class="test col-lg-4 col-sm-6" style="padding:0px; margin:0px; border: 0px; border-radius:0px;"><div class="thumbnail" ' + 'style="padding:0px; border-radius:0px; border: 0px; margin:0px;background-color: ' + genColor + '"' +'><div class="selection"></div></div></div>'
		}			
	}
	answer = color[randomNumber(num)];
	return allEntries;	

}

function getEquivalentNumber(difficulties) {
	
	if (difficulties == "EASY") {
		return 2
	}

	else if (difficulties == "MODERATE") {
		return 3
	}

	else if (difficulties == "HARD") {
		return 6
	}
}

function checkAnswer(uSelect) {
	clicked = uSelect.querySelector(".thumbnail").style.backgroundColor;
	if (clicked.toLowerCase() == answer.toLowerCase()) {
		gameOver(clicked);
		gameover = !gameover;
	}
	else {
		uSelect.querySelector(".thumbnail").style.backgroundColor = "white";
	}
}

function fillE(){
	e = document.querySelectorAll(".test");
	for (i=0; i<e.length; i++) {
		e[i].addEventListener("click", function(){
			checkAnswer(this);
		})
	}
}

selectEasy.addEventListener("click", function(){
	difficulties.textContent = this.textContent;
	selectEasy.classList.add("selected");
	selectModerate.classList.remove("selected");
	selectHard.classList.remove("selected");	

	entries.innerHTML = generateEntries(2);
	rgb.textContent = answer;
	fillE();
})

selectModerate.addEventListener("click", function(){
	difficulties.textContent = this.textContent;
	selectEasy.classList.remove("selected");
	selectModerate.classList.add("selected");
	selectHard.classList.remove("selected");

	entries.innerHTML = generateEntries(3);
	rgb.textContent = answer;
	fillE();
})

selectHard.addEventListener("click", function(){
	difficulties.textContent = this.textContent;
	selectEasy.classList.remove("selected");
	selectModerate.classList.remove("selected");
	selectHard.classList.add("selected");

	entries.innerHTML = generateEntries(6);
	rgb.textContent = answer;
	fillE();
})

reset.addEventListener("click", function(){
	if (difficulties.textContent == "DIFFICULTIES"){
		alert("PLEASE SPECIFY DIFFICULTIES FIRST");
		return
	}

	num = getEquivalentNumber(difficulties.textContent);

	entries.innerHTML = generateEntries(num);
	rgb.textContent = answer;
	fillE();
	gameover = false;

})

howto.addEventListener("click", function(){
	alert("Choose correct color based on RGB in the upper left corner of the screen.");
})