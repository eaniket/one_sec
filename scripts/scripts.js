const box_1 = document.getElementById('box-1');
const box_2 = document.getElementById('box-2');
const score_val = document.getElementById('score-val');
const progress = document.getElementsByClassName('progress')[0];
const display = document.getElementsByClassName('display')[0];
const fill = document.getElementsByClassName('fill')[0];
const yourScore = document.getElementById('your-score-val');
const highestScoreVal = document.getElementById('highest-score-val');

const endGameModal = document.getElementById('end-game-modal');
const instructionModal = document.getElementById('instruction-modal');

let done = false;
let score = 0;

function updateDisplay() {
	if (done) {
		done = false;
		fill.classList.remove('fill');
		setTimeout(() => fill.classList.add('fill'), 1);
	}
}

function markDone() {
	done = true;
	// endGame();
}

const randomNumberGenarator = () => {
	return Math.floor(Math.random() * 100);
};

const newGame = () => {
	box_1.innerText = randomNumberGenarator();
	box_2.innerText = randomNumberGenarator();
	score_val.innerHTML = score;
	// progress_bar.style.width = '10%';
	done = true;
	updateDisplay();
};

const endGame = () => {
	let highScore = localStorage.getItem('highScore');
	if (highScore == null || (highScore != null && score > highScore))
		localStorage.setItem('highScore', score);

	highScore = localStorage.getItem('highScore');

	yourScore.innerHTML = score;
	highestScoreVal.innerHTML = highScore;
	showModal(endGameModal);
};

const check = (click_box) => {
	let box_1_val = parseInt(box_1.innerHTML);
	let box_2_val = parseInt(box_2.innerHTML);
	if (
		(box_1_val >= box_2_val && click_box == 1) ||
		(box_1_val <= box_2_val && click_box == 2)
	) {
		score = score + 1;
		newGame();
	} else {
		endGame();
	}
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == instructionModal) {
		event.target.style.display = 'none';
	}
};

const showModal = (modal) => {
	modal.style.display = 'block';
};

const hideModal = (modal) => {
	modal.style.display = 'none';
};

showModal(instructionModal);
newGame();

progress.onclick = updateDisplay;
fill.addEventListener('animationend', markDone);

const startGame = (modal) => {
	hideModal(modal);
	score = 0;
	timerFunction();
	newGame();
};

// const timerFunction = () => {
// 	var counter = 3;

// 	var timer = setInterval(function () {
// 		// $('#countdown').remove();

// 		var countdown = $(
// 			'<span id="countdown">' +
// 				(counter == 0 ? 'SMILE!!' : counter) +
// 				'</span>'
// 		);
// 		countdown.appendTo($('.container'));
// 		setTimeout(() => {
// 			if (counter > -1) {
// 				$('#countdown').css({ 'font-size': '40vw', opacity: 0 });
// 			} else {
// 				$('#countdown').css({ 'font-size': '10vw', opacity: 50 });
// 			}
// 		}, 20);
// 		counter--;
// 		if (counter == -1) clearInterval(timer);
// 	}, 1000);
// };
