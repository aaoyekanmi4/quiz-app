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

//Generate HTML for a single question at a time
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
    $("form").on('click', ".answer-button", handleSubmission );
       
    //From QUIZ.js, get question to ask, answers, example array, and current question  
    let answers = QUIZ[index].answers;
    let answersHTML = generateAnswersHTML(answers);
    let arr = QUIZ[index].arr;
    let question = QUIZ[index].question;
    let currentQ = index + 1;
    //Use all variables make a question element and append to page
    let questionHTML = generateQuestionsHTML(index, currentQ, score, question, arr, answersHTML);
    $("form").html(questionHTML);
               
 
};

//Show user they answered correctly and update score 
function correct(score){
    score++
    
    //Add class correct-answer to highlight answer in green
    $("input[name='answer']:checked").closest('div').addClass('correct-answer');
    //Add text beside input button of answer to show it was correct
    $("input[name='answer']:checked").after("<span class='correct'>Correct!</span>")
    //Update current score and on UI and in 
    $(".number-corr").text(`Number Correct: ${score}`)
    $(".number-corr").data('score', score);
}

//Show user they got answer wrong and show the right answer
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

//Check to see if an answer is correct or incorrect
function checkAnswer(checkedAnswer){      
    let index = $('.quiz-content').data('question-index');
    let score = $(".number-corr").data('score'); 
    let correctAnswer = QUIZ[index].correct;

    if (checkedAnswer === correctAnswer){
        //Set gotRight attribute to true in QUIZ.
        QUIZ[index].gotRight = true;
           
        correct(score);
    }
    else {
            
        incorrect();
    }
  
}

//Check to see if quiz is over
function isItOver(){
    //Get current index, score, and index of last question
    let index = $('.quiz-content').data('question-index');
    let score = $(".number-corr").data('score');
    let finalIndex = QUIZ.length -1;
    
    //If on last question show "View Results Button" and set final score to current score
    if (index === finalIndex){
       QUIZ[index].endScore = score;
        $(".answer-button").hide();
        $(".end").show();
        endQuiz();
    }
    //Move to next question
    else {
        $(".answer-button").hide();
        $(".next").show();
        nextQuestion();
    }
};




function handleSubmission() {
    //prevent default form submission (refreshing the page)
    event.preventDefault();  

    //check if user entered an answer
    let checkedAnswer = $("input[name='answer']:checked").val();
    if (!checkedAnswer) {
            alert("Please select an option");
        }
    else {
        //Check whether answer was correct and show appropriate HTML
        checkAnswer(checkedAnswer);

        //check to see if quiz is over
        isItOver();

 
    }
};

//Display next question in QUIZ
function goToNext () {
    //Increment index of QUIZ
    let index = $('.quiz-content').data('question-index');
    index ++;
    //Get score to display on next screen
    let score = $(".number-corr").data('score');
    //Hide the "Next Button"
    $(".next").hide();
    //Turn click listener off for submitting form
    $("form").off('click', ".answer-button", handleSubmission);
    //Display the next question in QUIZ
    displayQuestion(index, score);
}

//Move to next question when "Next" clicked
function nextQuestion(){
    $(".quiz").on('click', ".next", goToNext);

}

function generateEndHtml(score, endMessage, links){
    let endHTML = `<section class="end-quiz">
        <h1> Thanks for Taking the Quiz</h1> 
        <br>
        <p class="show-score">Your Score: ${score}/${QUIZ.length}</p>
        <p class="end-message">${endMessage}</p>
        <ul class= "review">${links}</review>
        <br>
        <p>Take the quiz again!</p>
        <p class=".start-align"><button class="start">Start Quiz</button><p>
    </section>`;
    return endHTML;

}

function end() {
    //Get score to display
   let score =  QUIZ[QUIZ.length-1].endScore;

   //Determine ending message based on performance on quiz
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
    
    //Generate list of links to look over for questions missed
    let links = "";
    for (question of QUIZ) {
        if (question.gotRight ===false){
      links += `<li class="review-topic"><a href='${question.documentation}'>${question.topic}</a><li>`;
    }
   }
   //Generate ending screen HTML using helper function
   let endHTML = generateEndHtml(score, endMessage, links);
   //Append the HTML to the page
    $("form").html(endHTML);
    
   
    };


//End quiz when "View Results" button clicked
function endQuiz(){
    $(".quiz").on('click', ".end", end)
}

//Run the quiz 
function handleQuiz() {
 startQuiz();

 
}

$(handleQuiz);

