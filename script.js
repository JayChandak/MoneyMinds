const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');

// Making an array of objects, which stores the questions & answers with their choices.
const quiz = [
    // Objects
    {
        question: "Which of the following is not a CSS box Model Property?",
        // Array of choices
        choices: ["margin","padding","border-radius","border-collapse"],
        // String
        answer: "border-collapse"
    },
    {
        question: "What is not a access specifier",        
        choices: ["public", "new","protected","private"],
        answer: "new"
    },
    {
        question: "How many types of Polymorphism",    
        choices: ["1","2","3","4"],
        answer: "2"
    },
    {
        question: "Which of the following is not OOP concept",
        choices: ["Polymorphism","Abstraction","TypeCasting","Inheritance"],
        answer: "TypeCasting"
    },
];


let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;


// Arrow functions to show the questions
const showQuestions = () => {    
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i = 0; i < questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click',() =>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }           
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        displayAlert("Correct Answer");
        score++;
    }
    else{
        // Template Literal
        displayAlert(`Wrong Answer! Correct Answer: ${quiz[currentQuestionIndex].answer}`);        
    }    

    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        quizOver = true;
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    nextBtn.textContent = "Play Again";
    displayAlert("You have completed this quiz!");
    // nextBtn.addEventListener('click',() => {
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = "Next";
    //     scoreCard.textContent = "";
    // });
}

// Function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    
    setTimeout(() => {
        alert.style.display = "none";
    },2000);
}


showQuestions();
nextBtn.addEventListener('click',() =>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){                
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";        
        currentQuestionIndex = 0;
        showQuestions();
        quizOver = false;
        score = 0;
    }
    else{
        checkAnswer();    
    }
});