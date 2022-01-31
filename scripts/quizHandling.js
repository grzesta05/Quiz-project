var points = 0;
var timeTotal = 0;
var timeForQuestion = 0;
var QuestionsCounter = 0;
var answeredCorrectly = 0;
questionHandler();


for(let i = 0; i < questions.length; i++)
{
    document.getElementById("progress-bar").innerHTML += `<div class="block" id="block${i}"></div>`;
}
//Function for more clean code - injecting li with answers 
function answerInjector(answer, number)
{
    document.getElementById("answersSpace").innerHTML+=` <li class="answer" onclick="isCorrect(${number})">${answer}</li>`
}

function clearContainers()
{
    document.getElementById("time").innerHTML = "0:10";
    document.getElementById("answersSpace").innerHTML = "";
    document.getElementById("question").innerHTML = "";
}

function questionInjector(question)
{
    document.getElementById("question").innerHTML = question;
}

function theEndOfTheGame()
{
    console.log(points);
    finished = true;
    document.getElementById("time").innerHTML = "";
    document.getElementById("question").innerHTML = 
`Finished!  
<div class="results">
<div>
<div class="left">Done correctly: </div>
 <div class="left">Points:</div>
<div class= "left">Time:</div>
</div>
<div>
<div class="right">${answeredCorrectly} - ${Math.floor(100*answeredCorrectly/questions.length)}% </div>  
<div class="right">${Math.floor(points)} </div>
<div class="right"> ${Math.floor(timeTotal/1000)} seconds </div>
</div>
</div>
`
}

function isCorrect(answerNumber)
{
    if (QuestionsCounter != questions.length - 1)
    {document.querySelector("#time-bar > div").style.animationName = "none";
    document.querySelector("#time-bar > div").offsetHeight;
    document.querySelector("#time-bar > div").style.animationName = "timer";}
    else {
        document.querySelector("#time-bar > div").style.animationName = "none";
    }
    if(answerNumber == questions[QuestionsCounter].correct_answer_id)
    {
        points += 500;
        points += 500 - (500 * timeForQuestion/10000); // max 800 points for time
        answeredCorrectly++;
        document.getElementById(`block${QuestionsCounter}`).style= `background-color: rgb(${255 * timeForQuestion/10000},255,0);`;
    }else{
        document.getElementById(`block${QuestionsCounter}`).style= `background-color: rgb(255,0,0);`;  
    }
    QuestionsCounter++;
    questionHandler();
} 
function questionHandler()
{
    const questionAsked = QuestionsCounter;
    clearContainers();
    if(QuestionsCounter == questions.length)
    {
        theEndOfTheGame();
    }else{
    const questionObj = questions[QuestionsCounter];
    document.getElementsByClassName("main-activity")[0].style = `background-image: url(${questionObj.question_background_url});`;
    questionInjector(questionObj.question);
    for(let i = 0; i < questionObj.answers.length; i++)
    {
        answerInjector(questionObj.answers[i], i)
    }
    var time = Date.now();
    var interval = window.setInterval(()=>{
        if(QuestionsCounter != questionAsked){
            window.clearInterval(interval);
            timeTotal += Date.now() - time;
        }else{
        const minutes = Math.floor((Date.now()-time)/60000);
        const seconds = Math.floor((Date.now()-time)/1000) - 60*Math.floor((Date.now()-time)/60000);
        document.getElementById("time").innerHTML = `${minutes}:` + (seconds < 10? "0" : "") + `${10 - seconds}`;
        if (seconds == 10) {
            document.querySelector("#time-bar > div").style.animationName = "none";
            document.querySelector("#time-bar > div").offsetHeight;
            document.querySelector("#time-bar > div").style.animationName = "timer";
            document.getElementById(`block${QuestionsCounter}`).style= `background-color: rgb(255,0,0);`;  
            isCorrect();
        }
        timeForQuestion = Date.now() - time;
        }
    }, 1000);
    }
}

