
//I take the elements of the DOM
const gridElem = document.getElementById('grid');
const playBtn = document.getElementById('btn-play');


// fanction for creation div.square with inside p
function createSquareElem (index) {
    //creation the p element with inside number of cell
    const pElem = document.createElement('p');
    pElem.innerText = index+1;
    //creation the div.square element and inserting the p element
    const divElem = document.createElement('div');
    divElem.classList.add('square');
    divElem.appendChild(pElem);
    //add behavior to the cell
    divElem.addEventListener('click', function () {
        console.log(index+1);
        divElem.classList.toggle('clicked');
        });
    //return the div.squared element
    return divElem;
};



//function for fill the 10x10 grid with div.squere
function fillGrid(gridElem) {
    gridElem.innerHTML = '';
    for (let i=0; i<100; i++) {
        squareElem = createSquareElem(i);
        gridElem.appendChild(squareElem);
    }
};



//When play bustton clicked 
playBtn.addEventListener('click', function(){
    fillGrid(gridElem);
});