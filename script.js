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
                                <p class="number-corr">Number Correct:${score}</p>
                                <h3 class="question">${question}</h3>
                                <input type="submit" class="submit">
                            </section><section class="answers-container">${answersHTML}</section></form>`
    
               
 $(".quiz").html(questionHTML);
}

//Check to see if an answer is correct or incorrect with submit button pressed.
function checkAnswer(){
    //When submit button is clicked, get value of checked item and compare to correct answer.
    $(".quiz").on('click', ".submit", function(event) {
        event.preventDefault();
        let checkedAnswer = $("input[name='answer']:checked").val();
        let index = $('.quiz-content').data('question-index');
        let correctAnswer = QUIZ[index].correct;
        if (checkedAnswer === correctAnswer){
            alert("You are correct!");
        }
        else {
            alert("Sorry, that's incorrect");
        }
    });
    

}

//Code to perform if the answer was correct 
function correct() {
    console.log("correct ran");
}

//Code to perform if the answer was incorrect
function incorrect(){
    console.log("incorrect ran");

}

//Move to next question
function changeQuestion(){
    console.log("changeQuestion ran");

}

//End quiz if last question
function endQuiz(){
    console.log("endQuiz ran");
}

//Run the quiz 
function handleQuiz() {
 startQuiz();
 checkAnswer();
 
}

$(handleQuiz);
