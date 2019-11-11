 //Indices of wrongly answered questioned. Used to dipslay helpful links at the end
 let questionsWrong = [];

//Start Quiz by clicking Start button 
function startQuiz(){
    
    $('body').on('click', '.start', function () {
   
    //Hide .start-quiz section or .end-quiz section
    $(".start-quiz, .end-quiz").hide();
    //Show question area
    $(".quiz-content").show();
     questionsWrong = [];
   

   
    //Show the first question
    displayQuestion();
 });
}

//Generate HTML list items out of answers and return the HTML string
function generateAnswersHTML (answers){
    let answersHTMLArr = answers.map((answer, index) => 
    `<div class="answer ">
        <div class="answer-content"><input type="radio" name="answer"  id ="${index}" value="${answer}" required>
       
        <label for="${index}"><code>${answer}</code></label></div>
    </div>`);

    //For styling JS code
    $('code').addClass('prettyprint lang-js prettyprinted');
    
    

    let answersHTML = answersHTMLArr.join('');
    return answersHTML;
}

//Generate HTML for a single question at a time
function generateQuestionsHTML(index, currentQ, score, question, codeBox, answersHTML){
    let questionHTML = `
     
    <fieldset class="question-field" data-question-index="${index}" >
        
       <h4 class="current">Question ${currentQ} of ${QUIZ.length}</h4>
        <span class="number-corr" data-score = "${score}" >Score: ${score}</span>
        
        <p class="question">${question}</p>
        <p class="arr-box"><code class="question-content" ></code></p>
        <p class="end"><button class="end">View Results</button></p>
        
        <section class="answers-container"><h2 class="section-title"></h2></section><button class="next">Next</button>
     <input type="submit" class="answer-button"></fieldset>`
    
    return questionHTML;
   
}

//Render question to the html page
function displayQuestion(index =0, score=0){
    //Turn off click listener for next question
    $(".quiz-content").off('click', ".next", goToNext );
    //Turn on click listener for submitting an answer
    $("form").on('submit', handleSubmission );
       
    //From QUIZ.js, get question to ask, answers, example array, and current question  
    let answers = QUIZ[index].answers;
   
    let answersHTML = generateAnswersHTML(answers);
    let codeBox = QUIZ[index].codeBox;
    let question = QUIZ[index].question;
    let currentQ = index + 1;
    //Use all variables make a question element and append to page
    let questionHTML = generateQuestionsHTML(index, currentQ, score, question, codeBox, answersHTML);
    
    $("form").html(questionHTML);
    //Put answers and code-content in styles
    $(".answers-container").html(PR.prettyPrintOne(answersHTML, 'js'));
    $(".question-content").html(PR.prettyPrintOne(codeBox, 'js'));
 
};

//Show user they answered correctly and update score 
function correct(score){
    score++
    
    //Add class correct-answer to highlight answer in green
    $("input[name='answer']:checked").closest('div').addClass('correct-answer');
    $("input[name='answer']:checked").closest('div').css('margin-top', '0');
    $("input[name='answer']:checked").closest('.answer').css('padding', '0');
    //Add text beside input button of answer to show it was correct
    $("input[name='answer']:checked").before("<p class='correct'>Correct!</p>")
    //Update current score and on UI and in 
    $(".number-corr").text(`Score: ${score}`)
    $(".number-corr").data('score', score);
}

//Show user they got answer wrong and show the right answer
function incorrect(){
    //Add text by wrong answer radio button
    $("input[name='answer']:checked").before("<p class='wrong'> Sorry, that was incorrect</p>");
    $("input[name='answer']:checked").closest('div').css('margin-top', '0');
    $("input[name='answer']:checked").closest('.answer').css('padding', '0');
    //Get correct answer
    let index = parseInt($('.question-field').data('question-index'));
    let correctIndex= QUIZ[index].correctIndex;
    let correctAnswer = QUIZ[index].answers[correctIndex];
    //Highlight correct answer
    $(`input[name='answer'][value='${correctAnswer}']`).closest('div').addClass('correct-answer');
    $(`input[name='answer'][value='${correctAnswer}']`).before(" <p class='correct'>This is the answer</p>");
    $(`input[name='answer'][value='${correctAnswer}']`).closest('div').css('margin-top', '0');
    $(`input[name='answer'][value='${correctAnswer}']`).closest('.answer').css('padding', '0');

}



//Check to see if an answer is correct or incorrect
function checkAnswer(checkedAnswer){      
    let index = parseInt($('.question-field').data('question-index'));
    let score = $(".number-corr").data('score'); 
    let correctIndex= QUIZ[index].correctIndex;
    let correctAnswer = QUIZ[index].answers[correctIndex];
    
   console.log(checkedAnswer);
    if (checkedAnswer === correctAnswer){
     
       
           
        correct(score);
    }
    else {
        questionsWrong.push(index);
        incorrect();
    }
  
}

//Check to see if quiz is over
function isItOver(){
    event.preventDefault();
    //Get current index, score, and index of last question
    let index = parseInt($('.question-field').data('question-index'));
    let score = $(".number-corr").data('score');
    let finalIndex = QUIZ.length -1;
    
    //If on last question show "View Results Button" and set final score to current score
    if (index === finalIndex){
  
    //Remove click listener from form
    $("form").off('submit',  handleSubmission);
       $(".end").show();

        $(".answer-button").hide();
        
        endQuiz();
    }
    //Move to next question
    else {
           //Turn click listener off for submitting form
    $("form").off('submit',  handleSubmission);
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
    console.log(checkedAnswer);
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
   
    let index =parseInt($('.question-field').data('question-index'));
    index ++;
    //Get score to display on next screen
    let score = $(".number-corr").data('score');
    //Hide the "Next Button"
    $(".next").hide();
 
    //Display the next question in QUIZ
    displayQuestion(index, score);
}

//Move to next question when "Next" clicked
function nextQuestion(){
    $(".quiz-content").on('click', ".next", goToNext);

}

function generateEndHtml(score, endMessage){
      //Generate list of links for user to view for questions missed
      let links = "";
    questionsWrong.map(index =>
        links += `<li class="review-topic"><a target ="_blank" href='${QUIZ[index].documentation}'>${QUIZ[index].topic}</a><li>`);
    //Ending screen message
    let endHTML = `
        <h1> Thanks for Taking the Quiz</h1> 
        <br>
        <p class="show-score">Your Score: ${score}/${QUIZ.length}</p>
        <p class="end-message">${endMessage}</p>
        <ul class= "review">${links}</review>
        <br>
        <p>Take the quiz again!</p>
        <p class=".start-align"><button class="start">Start Quiz</button><p>
   `;
    return endHTML;

}

//Add data to ending message to display to user. Allow them to start again
function end() {
    event.preventDefault();
    //Show end quiz screen
    $(".end-quiz").show();
    //Hide Start and question area
   
    $(".quiz-content").hide();
   

    //Get score to display
    let score = $(".number-corr").data('score');
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
    
  
   //Generate ending screen HTML using helper function
   let endHTML = generateEndHtml(score, endMessage);
   //Append the HTML to the page
    $(".end-quiz").html(endHTML);
    
   
    };


//End quiz when "View Results" button clicked
function endQuiz(){
    $(".quiz-content").on('click', ".end", end)
}

//Run the quiz 
function handleQuiz() {
 startQuiz();

 nextQuestion();
 
}

$(handleQuiz);

