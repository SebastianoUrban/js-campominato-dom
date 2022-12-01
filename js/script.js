//default var
const numCell = 100;
const numBomb = 16;



//I take the elements of the DOM
const gridElem = document.getElementById('grid');
const scoreElem = document.getElementById('score');
const playBtn = document.getElementById('btn-play');



//When play bustton clicked 
playBtn.addEventListener('click', function(){
    
    const bombList = genBombList(numBomb, 0, numCell-1);

    fillGrid(gridElem, scoreElem, bombList);
});








  //======================================================================= //
 //============================== fUNCTIONS  ============================= //
//======================================================================= //


//function for fill the 10x10 grid with div.squere
function fillGrid(gridElem, scoreElem, bombList) {

    gridElem.innerHTML = '';
    let gameOver = false;
    let score = 0;
    scoreElem.innerHTML = score;
    


    for (let i=0; i<100; i++) {
        //creation the p element with inside number of cell
        const pElem = document.createElement('p');
        //pElem.innerText = i+1;

        //creation the div.square element and inserting the p element
        const divElem = document.createElement('div');
        divElem.classList.add('square');
        divElem.appendChild(pElem);

        //add behavior to the cell
        let clicked = false;

        divElem.addEventListener('click', function () {
            if (!gameOver && !clicked) {
                clicked = true;
                if (bombList.includes(i)) {
                    divElem.classList.add('red-bomb');
                    gameOver = true;
                } else {
                    const nearBomb = nearCell(i, bombList);
                    const nearBombString = classByNearBomb(nearBomb);
                    divElem.classList.add(nearBombString);
                    score++;
                    scoreElem.innerHTML = score;
                }
            }

            if (!gameOver && (score == 84) ) {
                gameOver = true;
                alert('HAI VINTO!!!!');
            } else if (gameOver) {
                const cellList = gridElem.querySelectorAll('div.square');
                for(let j = 0; j<16; j++){
                    cellList[bombList[j]].classList.add('bomb');
                }

            }
            //console.log(score);
        });

        divElem.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            if (!clicked) {
                divElem.classList.toggle('flag');
            }  
            
        });
        gridElem.appendChild(divElem);
    }
};


//function random number in range
function randomNumberRange(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}


//generation 'nBomb' list from 'min' index and 'max index
function genBombList (nBomb, min, max) {
    const outputBombList = [];
    while (outputBombList.length < nBomb) {
        const randomNumber = randomNumberRange(min, max);
        if ( !(outputBombList.includes(randomNumber))  ) {
            outputBombList.push(randomNumber);
        }
    }
    console.log(outputBombList.sort((a, b) => a - b));
    return outputBombList;
};



function nearCell(index, bombList) {
    const sideTop = [0,1,2,3,4,5,6,7,8,9];
    const sideRight = [9,19,29,39,49,59,69,79,89,99];
    const sideBot = [90,91,92,93,94,95,96,97,98,99];
    const sideLeft = [0,10,20,30,40,50,60,70,80,90];

    const nearPosition = [];

    if( !(sideTop.includes(index)) ){
        nearPosition.push(index-10);
        if( !(sideRight.includes(index)) ){
            nearPosition.push(index-10+1);
        }
    }
    if( !(sideRight.includes(index)) ){
        nearPosition.push(index+1);
        if( !(sideBot.includes(index)) ){
            nearPosition.push(index+10+1);
        }
    }
    if( !(sideBot.includes(index)) ){
        nearPosition.push(index+10);
        if( !(sideLeft.includes(index)) ){
            nearPosition.push(index+10-1);
        }
    }
    if( !(sideLeft.includes(index)) ){
        nearPosition.push(index-1);
        if( !(sideTop.includes(index)) ){
            nearPosition.push(index-10-1);
        }
    }

    const numNearBomb = nearPosition.filter(value => bombList.includes(value));

    return numNearBomb.length;

}



function classByNearBomb(numNearBomb){
    outputString = '';
    if (numNearBomb == 1){
        outputString = 'num1';
    } else if (numNearBomb == 2){
        outputString = 'num2';
    }else if (numNearBomb == 3){
        outputString = 'num3';
    }else if (numNearBomb == 4){
        outputString = 'num4';
    }else if (numNearBomb == 5){
        outputString = 'num5';
    }else if (numNearBomb == 6){
        outputString = 'num6';
    }else if (numNearBomb == 7){
        outputString = 'num7';
    }else if (numNearBomb == 8){
        outputString = 'num8';
    } else {
        outputString = 'clicked';
    }
    return outputString;
}