const box_1 = document.getElementById('box-1');
const box_2 = document.getElementById('box-2');
const score_val = document.getElementById('score-val');
const progress = document.getElementsByClassName('progress')[0];
const display = document.getElementsByClassName('display')[0];
const fill = document.getElementsByClassName('fill')[0];
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
	// window.location.href = 'end.html';
	modal.style.display = 'block';
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

newGame();

progress.onclick = updateDisplay;
fill.addEventListener('animationend', markDone);

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
// 	modal.style.display = 'none';
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
