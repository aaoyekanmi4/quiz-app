




//Start Quiz by clicking Start button 
function startQuiz(){
    $('.start').click(function () {
    //Change any previously correct answers from true to false
    QUIZ.forEach(question => question.gotRight = false);
    //Hide .start-quiz section or .end-quiz section
    $(this).parent().hide();
   
    //Show the first question
    displayQuestion();
 });
}

//Generate HTML list items out of answers and return the HTML string
function generateAnswersHTML (answers){
    let answersHTMLArr = answers.map(answer => 
    `<li class="answer ">
        <input type="radio" name="answer"  value="${answer}" required>
        <br>
        <p>${answer}</p>
    </li>`);
    let answersHTML = answersHTMLArr.join('');
    return answersHTML;
}

function generateQuestionsHTML(index, currentQ, score, question, arr, answersHTML){
    let questionHTML = `
    <section class="quiz-content" data-question-index="${index}" >
        <button class="next">Next <i class="fas fa-arrow-alt-circle-right"></i>
        </button>
        <p class="current">Current:${currentQ} out of ${QUIZ.length}</p>
        <p class="number-corr" data-score = "${score}" >Number Correct:${score}</p>
        
        <h3 class="question">${question}</h3>
        <p class="arr-box">${arr}</p>
        <p class="end"><button class="end">View Results</button></p>
        <button class="answer-button">Submit</button>
        
    </section><ul class="answers-container">${answersHTML}</ul>`
    return questionHTML;
}

//Render question to the html page
function displayQuestion(index =0, score=0){
    //Turn off click listener for next question
    $(".quiz").off('click', ".next", goToNext );
    //Turn on click listener for submitting an answer
    $("form").on('click', ".answer-button", checkIfDone );
       
    //From QUIZ.js, get question to ask, answers, example array, and current question  
    let answers = QUIZ[index].answers;
    let answersHTML = generateAnswersHTML(answers);
    let arr = QUIZ[index].arr;
    let question = QUIZ[index].question;
    let currentQ = index + 1;
    
    //Use all variables make a question element and append to page
    let questionHTML = generateQuestionsHTML(index, currentQ, score, question, arr, answersHTML);
    $("form").html(questionHTML);
               
 
}



    




function checkIfDone() {
    event.preventDefault();  
    let checkedAnswer = $("input[name='answer']:checked").val();
    if (!checkedAnswer){
            alert("Please select an option");
        }
        else{
    checkAnswer(checkedAnswer);

    //check to see if quiz is over


    let current = $('.quiz-content').data('question-index');
    let score = $(".number-corr").data('score');
    let finalIndex = QUIZ.length -1;

    if (current === finalIndex){
       QUIZ[current].endScore = score;
        $(".answer-button").hide();
         $(".end").show();
        endQuiz();
    }
    else {
        $(".answer-button").hide();
        $(".next").show();

        nextQuestion();
    }
        }
}



//Check to see if an answer is correct or incorrect
function checkAnswer(checkedAnswer){      
    
 
        let index = $('.quiz-content').data('question-index');
        let score = $(".number-corr").data('score');
    
        let correctAnswer = QUIZ[index].correct;

        if (checkedAnswer === correctAnswer){
            QUIZ[index].gotRight = true;
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
    $(".quiz").on('click', ".end", end)
}
function end() {
    let links = "";
   let score =  QUIZ[QUIZ.length-1].endScore;
   let endMessage;
    if (score ===5){
         endMessage = "Great Job! You got them all right!"
    }
    else if (score >=3){
        endMessage = "Good Job. You didn't miss very many:"
    }
    else {
        endMessage = "Here are some topics to review:"
    }
    for (question of QUIZ) {
        if (question.gotRight ===false){
      links += `<li class="review-topic"><a href='${question.documentation}'>${question.topic}</a><li>`;
    }
}
    
    $("form").html(`<section class="end-quiz">
    <h1> Thanks for Taking the Quiz</h1> 
    <br>
    <p class="show-score">Your Score: ${score}/${QUIZ.length}</p>
    <p class="end-message">${endMessage}</p>
    <ul class= "review">${links}</review>
    <br>
    <p>Take the quiz again!</p>
    <p class=".start-align"><button class="start">Start Quiz</button><p>
</section>`);
    };
//Run the quiz 
function handleQuiz() {
 startQuiz();

 
}

$(handleQuiz);

