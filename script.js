const QUIZ = [{
              question: "Which iterative method returns an array with values of arr greater than 6?", 
              arr: "const arr = [5,6,7,8,9, 10]",
              answers: ["arr.filter(num => num > 6);", "arr.find(num => num > 6);", "arr.reduce(num => num > 6);", "arr.map(num => num > 6);"], 
              correct: "arr.filter(num => num > 6);", 
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
              topic: "Array.prototype.filter",
              gotRight: false},
              
              {question: "Which method will NOT mutate arr?", 
              arr: "let arr = [11,12,13,14,15]",
              answers: ["arr.pop();", "arr.shift();", "arr.push(16);", "arr.concat(16);"], 
              correct: "arr.concat(16);",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
              topic: "Array.prototype.concat()",
              gotRight: false},
            
              {question: "Which method can I use to add an element from the front of the array?", 
              
              arr: "let arr = ['triplets','quadruplets','quintuplets','sextuplets']",
              answers: ["arr.push('twins');", "arr.shift('twins');", "arr.pop('twins');", "arr.unshift('twins');"], 
              correct: "arr.unshift('twins');",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
              topic: "Array.prototype.unshift()",
              gotRight: false},

              {question: "Find the expression where bool = true.", 
              
              arr: "const arr = [1,2,3,4,5]",
              answers: [
                  "let bool = arr.filter(num => num < 6);", 
                  "let bool = arr.forEach(num => num === 5);", 
                  "let bool = arr.some(num => num > 2);", 
                  "let bool = arr.every(num => num > 2);"
                ], 
              correct: "let bool = arr.some(num => num > 2);",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
              topic: "Array.prototype.some()",
              gotRight: false},

              {question: "How can I console.log() the name of each cow?", 
              
              arr: "const milkcows = ['Daisy','Mary','Bertha','Sue']",
              answers: [
                  "for (cow in milkcows){console.log(cow)}", 
                  "for (cow in array){console.log(cow)}", 
                  "for (milkcow of farm){console.log(cow)}", 
                  "for (cow of milkcows){console.log(cow)}", 
                ], 
              correct: "for (cow of milkcows){console.log(cow)}",
              documentation:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
              topic: "Array.prototype.some()", 
              gotRight: false},
              

            
            
            
            ];






//Start Quiz by clicking Start button 
function startQuiz(){
    $(".quiz").on('click', '.start', function() {
        $(this).parent().hide();
        displayQuestion();
    });
   
}



//Render question to the html page
function displayQuestion(index =0, score=0){
    let question = QUIZ[index].question;
    let answers = QUIZ[index].answers;
    $(".quiz").off('click', ".next", goToNext );
    $("form").on('click', ".answer-button", checkIfDone );
console.log(index)
    let currentQ = index + 1;
    
    let answersHTMLArr = answers.map(answer => 
        `<div class="answer ">
                <input type="radio" name="answer"  value="${answer}">
                <br>
                <p>${answer}</p>
        </div>`);
    let answersHTML = answersHTMLArr.join('');



    let questionHTML = `
                            <section class="quiz-content" data-question-index="${index}" >
                                <p class="current">Current:${currentQ} out of ${QUIZ.length}</p>
                                <p class="number-corr" data-score = "${score}" >Number Correct:${score}</p>
                                <button class="next">Next</button>
                                <h3 class="question">${question}</h3>
                                <input type="submit" class="submit answer-button">
                            </section><section class="answers-container">${answersHTML}</section>`
    
               
 $("form").html(questionHTML);
}



    




function checkIfDone() {
    event.preventDefault();  

    checkAnswer();

    //check to see if quiz is over


    let current = $('.quiz-content').data('question-index');
    let finalIndex = QUIZ.length -1;

    if (current === finalIndex){
        $(".answer-button").hide();

        endQuiz();
    }
    else {
        $(".answer-button").hide();
        $(".next").show();

        nextQuestion();
    }

}



//Check to see if an answer is correct or incorrect
function checkAnswer(){      
        let checkedAnswer = $("input[name='answer']:checked").val();
        let index = $('.quiz-content').data('question-index');
        let score = $(".number-corr").data('score');
    
        let correctAnswer = QUIZ[index].correct;
        if (checkedAnswer === correctAnswer){
            correct(score);
        }
        else {
            incorrect();
        }
  
    

}

//Code to perform if the answer was correct 
function correct(score){
    //Add class correct-answer to highlight answer in green
    $("input[name='answer']:checked").closest('div').addClass('correct-answer');
    //Add text beside input button of answer to show it was correct
    $("input[name='answer']:checked").after("<span class='correct'>Correct!</span>")
    score++
$(".number-corr").text(`Number Correct: ${score}`)
$(".number-corr").data('score', score);
}


//Code to perform if the answer was incorrect
function incorrect(){
    //Add text by wrong answer radio button
    $("input[name='answer']:checked").after("<span class='wrong'> Sorry, that was incorrect</span>");
    //Get correct answer
    let index = $('.quiz-content').data('question-index');
    let correctAnswer = QUIZ[index].correct;
    //Highlight correct answer
    $(`input[name='answer'][value='${correctAnswer}']`).closest('div').addClass('correct-answer');
    $(`input[name='answer'][value='${correctAnswer}']`).after(" <span class='correct'>This is the answer</span>");

}

//Move to next question
function nextQuestion(){
    $(".quiz").on('click', ".next", goToNext );

}

function goToNext() {
    let index = $('.quiz-content').data('question-index');
    index ++;
    let score = $(".number-corr").data('score');
    $(".next").hide();
    $("form").off('click', ".answer-button", checkIfDone);
    displayQuestion(index, score);
   
    console.log("nextQuestion ran");
    }

//End quiz if last question
function endQuiz(){
    $(".quiz").on('click', ".end", function(event) {
    $(".quiz").html(`<section class="end-quiz">
    <h1> Thanks for Taking the Quiz</h1> 
    <br>
    <p class="end-message"> Better luck next time!</p>
    <br>
    <p>Take the quiz again!</p>
    <button class="start">Start Quiz</button>
</section>`);
    });
}

//Run the quiz 
function handleQuiz() {
 startQuiz();

 
}

$(handleQuiz);

