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
                    divElem.classList.add('clicked');
                    score++;
                    scoreElem.innerHTML = score;
                }
            }

            if (!gameOver && (score == 84) ) {
                gameOver = true;
                alert('HAI VINTO!!!!');
            }
            //console.log(score);
        });

        // divElem.addEventListener('contextmenu', function (e) {
        //     e.preventDefault();
        //     divElem.classList.toggle('flag');
        // });
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
    console.log(outputBombList);
    return outputBombList;
};
