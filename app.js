const startBtn = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeEl = document.querySelector('#time'),
    board= document.querySelector('#board');

let time = 0;

const dataLevel = {
    lvl1: {
        row: 8,
        column:8,
        bomb:15,
        seconds:999,
    },
    lvl2: {
        row: 10,
        column:10,
        bomb:18,
        seconds:160,
    },
    lvl3: {
        row: 12,
        column:12,
        bomb:20,
        seconds:140,
    },
    lvl4: {
        row: 15,
        column:15,
        bomb:25,
        seconds:120,
    },
}

startBtn.addEventListener('click',(event)=> {
    event.preventDefault();
    screens[0].classList.add('up')

})

timeList.addEventListener('click',(event)=> {
   if (event.target.classList.contains('lvl-btn')) {
    let level= dataLevel[event.target.getAttribute('data-lvl')];
    screens[1].classList.add('up')
    time = level.seconds
    startGame(level);
   }
})


function startGame (level) {  
    clear = setInterval(decreaseTime, 1000)
    board.innerHTML = ' ';
    const numberOfCells = level.row*level.column;
    board.style.width = `${Math.sqrt(numberOfCells)*40}px`;
    const cells = `btn,`.repeat(numberOfCells).split(',');
    cells.splice(cells.length - 1);
    const numberArr =[]

    randomBomb (level, numberOfCells, cells);
    getCount (level, cells, numberArr)


    createBlock(cells, numberArr);

    openCell()
    detectBomb () 
}

function decreaseTime() {
    timeEl.innerHTML = `Time ${time}s`
    if(time ===0) {
        timeOver ();
        timeEl.innerHTML = `YOU LOSE` 
    } else {
    let current = --time
    timeEl.innerHTML = `Time ${current}s`   
    }
}

function timeOver () {
    board.style.display = 'none';
    timeEl.innerHTML = `YOU LOSE` 
    clearInterval(clear);
    setTimeout(()=> {
        location.reload();
    },3000)
    
}

function createBlock(cells, numberArr) {
    cells.forEach((item, index)=> {
        board.innerHTML += `<button class="${item}">${numberArr[index]}</button>`
     })
}

function randomBomb (level, numberOfCells, cells) {
    for (let i=0; i<level.bomb; i++) {
        let randomCell= Math.floor(Math.random() * numberOfCells)
        if (cells[randomCell].includes('bomb')) {
            i--;
        } else {
        cells[randomCell] += ' bomb' 
        }  
    }
    return cells
}

function getCount (level, cells, numberArr) {
    for(let i=0; i<cells.length; i++) {
        let count = 0;
        if(!cells[i].includes('bomb') && i%level.row===0) {
            cells[i+1]&&cells[i+1].includes('bomb')?count++:count;
            cells[i-level.row]&&cells[i-level.row].includes('bomb')?count++:count;
            cells[i-level.row+1]&&cells[i-level.row+1].includes('bomb')?count++:count;
            cells[i+level.row]&&cells[i+level.row].includes('bomb')?count++:count;
            cells[i+level.row+1]&&cells[i+level.row+1].includes('bomb')?count++:count; 
        }

        if(!cells[i].includes('bomb') && i%level.row===level.row-1) {
            cells[i-1]&&cells[i-1].includes('bomb')?count++:count;
            cells[i-level.row]&&cells[i-level.row].includes('bomb')?count++:count;
            cells[i-level.row-1]&&cells[i-level.row-1].includes('bomb')?count++:count;
            cells[i+level.row-1]&&cells[i+level.row-1].includes('bomb')?count++:count;
            cells[i+level.row]&&cells[i+level.row].includes('bomb')?count++:count;

        }
        if(!cells[i].includes('bomb') && i%level.row!==0 && i%level.row!==level.row-1) {
            cells[i+1]&&cells[i+1].includes('bomb')?count++:count;
            cells[i+level.row-1]&&cells[i+level.row-1].includes('bomb')?count++:count;
            cells[i+level.row]&&cells[i+level.row].includes('bomb')?count++:count;
            cells[i+level.row+1]&&cells[i+level.row+1].includes('bomb')?count++:count; 
            cells[i-1]&&cells[i-1].includes('bomb')?count++:count;
            cells[i-level.row]&&cells[i-level.row].includes('bomb')?count++:count;
            cells[i-level.row-1]&&cells[i-level.row-1].includes('bomb')?count++:count;
            cells[i-level.row+1]&&cells[i-level.row+1].includes('bomb')?count++:count;
        }
        count===0?numberArr.push(' '):numberArr.push(count)
    }
   return numberArr

}


function openCell() {
       board.addEventListener('click', (e)=> {
        if (e.target.tagName === 'BUTTON' && e.which=== 1) {
                e.target.classList.add('btn_open')
                e.target.disabled = true;
            }  
            isBomb(e)
           const cellsIndex = [...board.children]
           const index = cellsIndex.indexOf(e.target)



        })

}

function detectBomb () {
    board.addEventListener('contextmenu', (e) => { 
        e.preventDefault();
        if (!e.target.classList.contains('btn_open')) {
            e.target.classList.toggle('flag')
        }  
    });
}

function isBomb(e) {
    if (e.target.classList.contains('bomb')) {
        board.style.display = 'none';
        alert('You Lose')
      setTimeout(()=> {
        location.reload();
    },1000)
    }  
}


function isEmptyLine (cellsIndex, index) {
    

}











// function finishGame (e) {
//     if (time === 0)    {
//         console.log('Time is up and you lost')
//     } else if (e.target.classList.contains('bomb')) {
//         console.log('BOMB you lost')
//     }
// }

// function getCount (cells) {
//     let count = 0;
//     for(let x=-1; x<=1;x++) {
//         for(let y=-1; y<=1;y++) {
//             if(cells[level.row+x + level.column+y]){
//                 console.log(cells[(level.row+x)*+ level.column+y])
//                 count++
//             }
//         }
//     }

// }
