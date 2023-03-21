const startBtn = document.querySelector("#start"),
	screens = document.querySelectorAll(".screen"),
	timeList = document.querySelector("#time-list"),
	timeEl = document.querySelector("#time"),
	board = document.querySelector("#board");

let time = 0;

const dataLevel = {
	lvl1: {
		row: 8,
		column: 8,
		bomb: 10,
		seconds: 180,
	},
	lvl2: {
		row: 10,
		column: 10,
		bomb: 15,
		seconds: 160,
	},
	lvl3: {
		row: 12,
		column: 12,
		bomb: 18,
		seconds: 140,
	},
	lvl4: {
		row: 15,
		column: 15,
		bomb: 20,
		seconds: 120,
	},
};

startBtn.addEventListener("click", (event) => {
	event.preventDefault();
	screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
	if (event.target.classList.contains("lvl-btn")) {
		let level = dataLevel[event.target.getAttribute("data-lvl")];
		screens[1].classList.add("up");
		time = level.seconds;
		startGame(level);
	}
});

function startGame(level) {
	clear = setInterval(decreaseTime, 1000);
	const numberOfCells = level.row * level.column;
	board.innerHTML = `<button class = 'btn'></button>`.repeat(numberOfCells);
	board.style.width = `${Math.sqrt(numberOfCells) * 40}px`;
	const cells = [...board.children];
    const bombs = []

	let countCells = 0;

    
    function randomBomb () {
        for (let i=0; i<level.bomb; i++) {
            let bomb= Math.floor(Math.random() * numberOfCells)
            bombs.includes(bomb)?i--:bombs.push(bomb)
        }
        return bombs
    }

    randomBomb ();

	function decreaseTime() {
		timeEl.innerHTML = `Time ${time}s`;
		if (time === 0) {
			timeOver();
		} else {
			let current = --time;
			timeEl.innerHTML = `Time ${current}s`;
		}
	}

	function timeOver() {
		board.style.display = "none";
		timeEl.innerHTML = `YOU LOSE`;
		clearInterval(clear);
		setTimeout(() => {
			location.reload();
		}, 3000);
	}

	function detectBomb() {
		board.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			if (e.target.disabled !== true) {
				e.target.classList.toggle("flag");
			}
		});
	}

	detectBomb();

	board.addEventListener("click", (e) => {
		if (e.target.tagName !== "BUTTON" && e.which === 1) return;
		if (e.target.classList.contains("flag")) {
			e.target.classList.remove("flag");
		}
		e.target.classList.add("btn_open");

		const index = cells.indexOf(e.target);

		console.log(index);

		const column = index % level.column;
		const row = Math.floor(index / level.row);

		openCell(row, column);
	});

	function isValid(row, column) {
		return row >= 0 && row < level.row && column >= 0 && column < level.column;
	}

	function getCount(row, column) {
		let count = 0;
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				if (isBomb(row + x, column + y)) {
					count++;
				}
			}
		}
		return count;
	}

	function openCell(row, column) {
		if (!isValid(row, column)) return;
		const index = row * level.row + column;

		const cell = cells[index];
		cell.classList.add("btn_open");
		if (cell.disabled === true) return;
		cell.disabled = true;

		if (isBomb(row, column)) {
			cell.classList.add("bomb");
			alert("You Lose");
			setTimeout(() => {
				location.reload();
			}, 3000);
			return;
		}

		finishGame();


		const count = getCount(row, column);
        console.log(count)
		if (count !== 0 && !isBomb(row, column)) {
			cell.innerHTML = count;
			return;
		}

		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				openCell(row + x, column + y);
			}
		}
	}

	function isBomb(row, column) {
		if (!isValid(row, column)) return;
		const index = row * level.row + column;

		return bombs.includes(index);
	}

	function finishGame() {
		countCells++;
		if (countCells === numberOfCells - level.bomb) {
			alert("YOU WIN!!!!");
			setTimeout(() => {
				location.reload();
			}, 3000);
		}
	}
}


