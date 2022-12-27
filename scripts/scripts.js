const box_1 = document.getElementById('box-1');
const box_2 = document.getElementById('box-2');
const score_val = document.getElementById('score-val');
const progress = document.getElementsByClassName('progress')[0];
const display = document.getElementsByClassName('display')[0];
const fill = document.getElementsByClassName('fill')[0];
const yourScore = document.getElementById('your-score-val');
const highestScoreVal = document.getElementById('highest-score-val');
const shareTextBox = document.getElementById('share-modal-text');

const endGameModal = document.getElementById('end-game-modal');
const instructionModal = document.getElementById('instruction-modal');
const shareModal = document.getElementById('share-modal');

const hamburger = document.getElementById('hamburger');
const menuOptions = document.getElementById('menu-options');
let done = false;
let score = 0;
let firstMove = true;

const hostedUrl = 'https://one-sec.netlify.app';
let sharedText;

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	menuOptions.classList.toggle('active');
});

document.querySelectorAll('.menu-options-items').forEach((n) =>
	n.addEventListener('click', () => {
		hamburger.classList.remove('active');
		menuOptions.classList.remove('active');
	})
);

function updateDisplay() {
	if (done && !firstMove) {
		done = false;
		fill.classList.remove('fill');
		setTimeout(() => fill.classList.add('fill'), 1);
	}
}

function markDone() {
	done = true;
	if (!firstMove) endGame();
}

const randomNumberGenarator = () => {
	return Math.floor(Math.random() * 100);
};

const newGame = () => {
	box_1.innerText = randomNumberGenarator();
	box_2.innerText = randomNumberGenarator();
	score_val.innerHTML = score;
	done = true;
	if (!firstMove) updateDisplay();
};

const endGame = () => {
	let highScore = localStorage.getItem('highScore');
	if (highScore == null || (highScore != null && score > highScore))
		localStorage.setItem('highScore', score);

	highScore = localStorage.getItem('highScore');

	yourScore.innerHTML = score;
	highestScoreVal.innerHTML = highScore;

	if (score == highScore) {
		let gif = document.getElementById('gif');
		gif.src = './resources/party_fox.gif';
	}
	showModal(endGameModal);
};

const check = (click_box) => {
	firstMove = false;
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
	if (event.target == shareModal) {
		event.target.style.display = 'none';
	}
};

const showModal = (modal) => {
	modal.style.display = 'block';
	if (modal == shareModal) {
		sharedText = window.localStorage.getItem('shareText');
		let highScore = localStorage.getItem('highScore');
		if (highScore == null) {
			highScore = 0;
			localStorage.setItem('highScore', highScore);
		}
		if (sharedText == null || sharedText == '') {
			let shareText = `Hi there, lets have a reflex check on 1sec. \nMy current high score: ${highScore}. \n\nURL : ${hostedUrl}`;
			window.localStorage.setItem('shareText', shareText);
			sharedText = window.localStorage.getItem('shareText');
		}
		shareTextBox.value = sharedText;
	}
};

const hideModal = (modal) => {
	modal.style.display = 'none';
};

const startGame = (modal) => {
	hideModal(modal);
	score = 0;
	firstMove = true;
	newGame();
};

const mobileCheck = () => {
	let check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

const feedbackRedirection = () => {
	window.open('https://forms.gle/Eaejj4CNWEfCwx7c9');
};

const share = (socialMedia) => {
	sharedText = shareTextBox.value;
	window.localStorage.setItem('shareText', sharedText);

	navigator.clipboard.writeText(sharedText);

	if (socialMedia == 'facebook') {
		window.open(`http://www.facebook.com/sharer/sharer.php?u=${hostedUrl}`);
	} else if (socialMedia == 'twitter') {
		window.open(
			`https://twitter.com/intent/tweet?url=${hostedUrl}&text=${sharedText}`
		);
	} else if (socialMedia == 'whatsapp') {
		let check = mobileCheck();
		if (check) {
			window.open(`whatsapp://send?text=${sharedText}`);
		} else {
			window.open(`https://web.whatsapp.com://send?text=${sharedText}`);
		}
	} else if (socialMedia == 'clipboard') {
		var tooltip = document.getElementById('myTooltip');
		tooltip.innerHTML = 'Text copied!';
	}
};

const outFunc = () => {
	var tooltip = document.getElementById('myTooltip');
	tooltip.innerHTML = 'Copy to clipboard';
};

showModal(instructionModal);
// newGame();

// progress.onclick = updateDisplay;
fill.addEventListener('animationend', markDone);
