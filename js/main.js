let playerChoices = [];
let compChoices = [];
let playersTurn = true;
let availableMoves = [1,2,3,4,5,6,7,8,9];
let gameOver = false;

let winningChoices = {
    1: [1,2,3],
    2: [4,5,6],
    3: [7,8,9],
    4: [3,5,7],
    5: [1,5,9],
    6: [1,4,7],
    7: [2,5,8],
    8: [3,6,9]
}

function boxClicked(number,boxID){
    if(gameOver) {
        console.log("game over");
        return;
    }
    //this is called from onClick inside html********
    if(!CheckForIfAvail(number)){
        console.log('chosen')
        return;
    }
    if(playersTurn){
        playerChoices.push(+number);
        RemoveFromAvailMoves(+number);
        document.querySelector(`#${boxID}`).style.background = 'red';
        playersTurn = false;
        if(checkForWinner(playerChoices)){
            document.querySelector('h2').innerText = "player one wins"
        }
        
    }
    else{
        computerChoice();
        if(checkForWinner(compChoices)){
            document.querySelector('h2').innerText = "player two wins"
        }
        playersTurn = true;
    }
}
function checkForWinner(choiceArr){
    //winningChoices[key] = first array in the choices.
    for(let key in winningChoices){
        let tempCount = 0;
        for(let i = 0; i < choiceArr.length; i++){
            if(winningChoices[key].includes(choiceArr[i])){
                tempCount++;
                console.log(tempCount);
            }
            if(tempCount === 3){
                console.log(winningChoices[key]);
                gameOver = true;
                return true;
            }
        }
    }
}

function computerChoice(){
    if(compChoices.length === 0){
        computerFirstChoice();
    }
    else{
        let index = getBestChoice();
        console.log(`index is ${index} and best choice is ${getBestChoice()}`)
        if(!CheckForIfAvail(index)){
            index = availableMoves[0];
        }
        
        document.querySelector(`#box${numberToString(index)}`).style.background = 'yellow';
        RemoveFromAvailMoves(index);
        compChoices.push(index);
    }
    
}
function RemoveFromAvailMoves(number){
    availableMoves.splice(availableMoves.indexOf(number),1);
}

function CheckForIfAvail(id){
    return availableMoves.includes(id);
}

function numberToString(number){
    switch(number){
        case 1:
            return 'One'
            break;
        case 2:
            return 'Two'
            break;
        case 3:
            return 'Three'
            break;
        case 4:
            return 'Four'
            break;
        case 5:
            return 'Five'
            break;
        case 6:
            return 'Six'
            break;
        case 7:
            return 'Seven'
            break;
        case 8:
            return 'Eight'
            break;
        case 9:
            return 'Nine'
            break;
    }
}

function getBestChoice(){
    let compareTo = compChoices[0];
    let secondCom = compChoices[1];
    for(let key in winningChoices){
        if(winningChoices[key].includes(compareTo) || winningChoices[key].includes(secondCom)){
            let options = winningChoices[key];
            return CheckForIfAvail(options[1]) ? options[1] : options[2];
        }
        else{
            return blockPlayer();
        }
    }
}
function checkArrayAvail(winningChoices){
    let isEmpty = true;
    winningChoices.forEach((elem) => {
        if(!winningChoices.includes(elem) || playerChoices.includes(elem)){
            isEmpty = false;
        }
    });
    return isEmpty;
}

function computerFirstChoice(){
    if(CheckForIfAvail(5)){
        document.querySelector('#boxFive').style.background = 'yellow';
        RemoveFromAvailMoves(5);
        compChoices.push(5);
    }
    else{
        let index = availableMoves[0];
        document.querySelector(`#box${numberToString(index)}`).style.background = 'yellow';
        RemoveFromAvailMoves(index);
        compChoices.push(index);
    }
}

//if cant win, block player
function blockPlayer(){
    let one = playerChoices[0];
    let two = playerChoices[1];
    let nextChoice = 0;
    for(let key in winningChoices){
        if(winningChoices[key].includes(one) && winningChoices[key].includes(two)){
            nextChoice = GetLastOption(winningChoices[key]);
        }
    }
    return nextChoice;
    
}
function GetLastOption(playerChoices){
    let index =  playerChoices.filter((elem) => CheckForIfAvail(elem));
    return index[0];
}

    






