let score=JSON.parse(localStorage.getItem('score'));//JSON.parse is used to convert string back to the object.-->was changed from cont to let here.

/*
    let score=JSON.parse(localStorage.getItem('score')) || {
        wins:0,
        losses:0,
        ties:0
    } ;
*/

if(score===null)//setting default score.can also use !score.
{
    score={
        wins:0,
        losses:0,
        ties:0
    };
}

function resetScore() //reset the score back to 0.
{
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');//It showed error here before adding the if conditin to check whether the score is null.
    updateScoreElement();//important to call this function here.it displays the reset score in the page.
}

updateScoreElement();

function playGame(playerMove)//computes the result according to the player's move.
{
    const computerMove=pickComputerMove();
    let result ='';
    if(playerMove==='Rock')
    {
        if(computerMove==='Rock')
        {
            result='Tie';
        }
        else if(computerMove==='Paper')
        {
            result='You Lose';
        }
        if(computerMove==='Scissors')
        {
            result='You Win';
        }
    }
    else if(playerMove==='Scissors')
    {
        if(computerMove==='Rock')
        {
            result='You Lose';
        }
        else if(computerMove==='Paper')
        {
            result='You Win';
        }
        else if(computerMove==='Scissors')
        {
            result='Tie';
        }
    }
    else if(playerMove==='Paper')
    {
        if(computerMove==='Rock')
        {
            result='You Win';
        }
        else if(computerMove==='Paper')
        {
            result='Tie';
        }
        if(computerMove==='Scissors')
        {
            result='You Lose';
        }
    }

    if(result==='You Win')
    {
        score.wins++;
    }
    else if(result==='You Lose')
    {
        score.losses++;
    }
    else if(result==='Tie')
    {
        score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score));//stores the score in the local storage,and it shows the scores even after the page is refreshed..until the score is reset back to 0.Here the LS can store items only in strings hence JSON.stringify is used.

    updateScoreElement();

    document.querySelector('.js-result')
    .innerHTML= result;

    document.querySelector('.js-moves')
    .innerHTML=`\u00A0\ You \u00A0\u00A0\ <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon"> computer`;

}

function updateScoreElement()
{
    document.querySelector('.js-score')
    .innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`; 
}

function pickComputerMove()//picks a random move to be palyed  by the computer.
{
    const randomNumber=Math.random();
    let computerMove='';
    if(randomNumber>=0 && randomNumber<1/3)
    {
        computerMove='Rock';
    }
    else if(randomNumber>=1/3 && randomNumber<2/3)
    {
        computerMove='Paper';
    } 
    else if(randomNumber>=2/3 && randomNumber<1)
    {
        computerMove='Scissors';
    }
    return computerMove;
}

/*destructing:easy way to get properties out of an object.
Eg: const obj = {messg:"hello",name:"Rajii"};
now,
    const {mssg,name}=obj2;
    console.log(mssg);-->console output-hello
    console.log(name);-->console output-Rajii
*/
