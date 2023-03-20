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
        bomb:4,
        seconds:180,
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
    const numberOfCells = level.row*level.column;
    board.style.width = `${Math.sqrt(numberOfCells)*40}px`;
    const cells = `btn,`.repeat(numberOfCells).split(',');
    cells.splice(cells.length - 1);
    const numberArr =[]


    randomBomb (level, numberOfCells, cells);
    getCount (level, cells, numberArr)

    createBlock(cells, numberArr);

    console.log(cells)

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
        if (e.target.classList.contains('flag')) {
            e.target.classList.remove('flag')
        }
            isBomb(e);

        //    console.log(e.target.innerHTML==' ')
        //     console.log(board)
        //    console.log(cellsIndex[index].innerHTML)
        const cellsIndex = [...board.children]
        const index = cellsIndex.indexOf(e.target)

        // const btn = document.querySelectorAll('.btn');
        // const row = Math.sqrt(btn.length)
    
        //         console.log(btn[index].classList.contains('bomb'))

        isEmptyLine (board, index);

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
        setTimeout(()=> {
            alert('You Lose')
            board.style.display = 'none';
        },1000)
        
      setTimeout(()=> {
        location.reload();
    },2000)
    }  
}


function isEmptyLine (board, index) {

    const btn = document.querySelectorAll('.btn');
    const row = Math.sqrt(btn.length)

    if (btn[index].innerHTML==' ' && !btn[index].classList.contains('bomb')) {
    }


    for (let i =1; i<=row; i++) {
        if (btn[index].innerHTML==' ' && !btn[index].classList.contains('bomb')) {
                    if ( btn[index-i] && btn[index-i].innerHTML==' ' && !btn[index-i].classList.contains('bomb') && !btn[index-i].classList.contains('btn_open')) {
                        btn[index-i].classList.add('btn_open')
                        btn[index-i].disabled = true;
                    } else if (btn[index-i] && btn[index-i].innerHTML !==' ') {
                        btn[index-i].classList.add('btn_open')
                        btn[index-i].disabled = true;
                        continue;

                    } 
                    if (btn[index+i] && btn[index+1].innerHTML==' ' && !btn[index+i].classList.contains('bomb') && !btn[index+i].classList.contains('btn_open')) {
                        btn[index+i].classList.add('btn_open')
                        btn[index+i].disabled = true;
                        //isEmptyLine (board, index+1)
                    }  else if (btn[index+i] && btn[index+i].innerHTML !==' ') {
                        btn[index+i].classList.add('btn_open')
                        btn[index+i].disabled = true;
                        continue;
                    }
                    if (btn[index-row-i] && btn[index-row-i].innerHTML==' ' && !btn[index-row-i].classList.contains('bomb') && !btn[index-row-i].classList.contains('btn_open')) {
                        btn[index-row-i].classList.add('btn_open')
                        btn[index-row-i].disabled = true;
            
                    } else if (btn[index-row-i] && btn[index-row-i].innerHTML !==' ') {
                        btn[index-row-i].classList.add('btn_open')
                        btn[index-row-i].disabled = true;
                        continue;
                    }
                    if (btn[index+row+i] && btn[index+row+i].innerHTML==' ' && !btn[index+row+i].classList.contains('bomb') && !btn[index+row+i].classList.contains('btn_open')) {
                        btn[index+row+i].classList.add('btn_open')
                        btn[index+row+i].disabled = true;
                        //isEmptyLine (board, index+row)
                     } else if (btn[index+row+i] && btn[index+row+i].innerHTML !==' ') {
                        btn[index+row+i].classList.add('btn_open')
                        btn[index+row+i].disabled = true;
                        continue;
                    }
        } 
    } 

           console.log(btn[index].innerHTML)

        console.log(e.target.innerHTML==' ')
        console.log(board)
       console.log(cellsIndex[index].innerHTML)

}
