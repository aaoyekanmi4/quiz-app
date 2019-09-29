const QUIZ = [{question: "What was the name of Tony's yacht?", 
              answers: ["Fugazi", "Stugots", "Stunad", "WiseGuys"], 
              correct: "Stugots"}, 
              
              {question: "What is the name of the final episode?", 
              answers: ["The Diner", "Calling All Cars", "Pine Barrens", "Made in America"], 
              correct: "Made in America"} 
              ]






//Start Quiz by clicking Start button 
function startQuiz(){
    $(".start").click(function() {
        $(this).parent().hide();
        displayQuestion();
    });
   
}



//Render question to the html page
function displayQuestion(index =0, score=0){
    let question = QUIZ[index].question;
    let answers = QUIZ[index].answers;
    let id = index;

    let currentQ = index + 1;
    
    let answersHTMLArr = answers.map(answer => 
        `<div class="answer ">
                <input type="radio" name="answer"  value="${answer}">
                <br>
                <p>${answer}</p>
        </div>`);
    let answersHTML = answersHTMLArr.join('');



    let questionHTML = `<form action="">
                            <section class="quiz-content" data-question-index="${index}" >
                                <p class="current">Current:${currentQ} out of ${QUIZ.length}</p>
                                <p class="number-corr" data-score = "${score}" >Number Correct:${score}</p>
                                <h3 class="question">${question}</h3>
                                <input type="submit" class="submit answer-button">
                            </section><section class="answers-container">${answersHTML}</section></form>`
    
               
 $(".quiz").html(questionHTML);
}


//Function handleSubmission. Handles submission of an answer to the question.
function handleSubmission(){
    $(".quiz").on('click', ".submit", function(event) {
        event.preventDefault();  

        checkAnswer();

        //check to see if quiz is over


        let current = $('.quiz-content').data('question-index');
        let finalIndex = QUIZ.length -1;

        if (current === finalIndex){
            $(".answer-button").attr('value', "Results").addClass("end").removeClass("submit");
            endQuiz();
        }
        else {
            $(".answer-button").attr('value', "Next").addClass("next").removeClass("submit");

            nextQuestion();
        }




    });
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
    $("input[name='answer']:checked").after("<span class='correct'> That's Correct!</span>")
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
    $(".quiz").on('click', ".next", function(event) {
    let index = $('.quiz-content').data('question-index');
    index++;
    let score = $(".number-corr").data('score');
    displayQuestion(index, score);
    console.log("nextQuestion ran");
    });

}

//End quiz if last question
function endQuiz(){

    console.log("endQuiz ran");
}

//Run the quiz 
function handleQuiz() {
 startQuiz();
 handleSubmission();
 
}

$(handleQuiz);
