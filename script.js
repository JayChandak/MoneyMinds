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
        question: "What is the term for an investment in India that aims to generate high returns by leveraging borrowed funds, potentially leading to significant gains or losses?",
        choices: ["Arbitrage", "Liquidity Management", "Hedging", "Leveraging"],
        answer: "Leveraging"
    },
    {
        question: "In the context of Indian taxation, what is the difference between 'Direct Tax' and 'Indirect Tax'?",
        choices: ["Direct tax is levied on income, while indirect tax is levied on consumption", "Direct tax is levied on consumption, while indirect tax is levied on income", "Both are the same", "Direct tax is levied on exports, while indirect tax is levied on imports"],
        answer: "Direct tax is levied on income, while indirect tax is levied on consumption"
    },
    {
        question: "What is the term for a derivative contract in India that allows investors to speculate on the future price of an underlying asset?",
        choices: ["Options", "Equity Shares", "Bonds", "Mutual Funds"],
        answer: "Options"
    },
    {
        question: "In India, what is the maximum limit for tax exemption under Section 10(14) of the Income Tax Act for House Rent Allowance (HRA)?",
        choices: ["50% of the basic salary", "100% of the rent paid", "Actual HRA received", "Rs. 2,50,000 per year"],
        answer: "Actual HRA received"
    },
    {
        question: "What is the term for a financial statement in India that shows a company's financial performance and position at a specific point in time?",
        choices: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Audit Report"],
        answer: "Balance Sheet"
    },
    {
        question: "In India, what is the maximum tenure for a fixed deposit (FD) that qualifies for a tax benefit under Section 80C of the Income Tax Act?",
        choices: ["1 year", "3 years", "5 years", "10 years"],
        answer: "5 years"
    },
    {
        question: "What is the term for the process of converting black money into white money by manipulating financial transactions, often illegal in India?",
        choices: ["Money Laundering", "Tax Evasion", "Asset Allocation", "Capital Gains"],
        answer: "Money Laundering"
    },
    {
        question: "In the Indian context, what does 'Demat Account' stand for?",
        choices: ["Distributed Mutual Fund Account", "Dematerialized Account", "Derivative Management Account", "Direct Equity Market Account"],
        answer: "Dematerialized Account"
    },
    {
        question: "What is the term for the maximum interest rate that a Non-Banking Financial Company (NBFC) can charge for personal loans in India?",
        choices: ["18% per annum", "24% per annum", "36% per annum", "48% per annum"],
        answer: "36% per annum"
    },
    {
        question: "In India, what is the term for a mutual fund that primarily invests in equities and aims to provide tax benefits under Section 80C?",
        choices: ["Debt Fund", "Balanced Fund", "Equity-Linked Savings Scheme (ELSS)", "Liquid Fund"],
        answer: "Equity-Linked Savings Scheme (ELSS)"
    },
    {
        question: "What is the term for a financial plan in India that involves investing in multiple asset classes to spread risk and maximize returns?",
        choices: ["Diversification", "Portfolio Management", "Investment Banking", "Equity Analysis"],
        answer: "Diversification"
    },
    {
        question: "In India, what is the tax implication on long-term capital gains from the sale of listed equity shares?",
        choices: ["Exempt from tax", "Taxed at 10%", "Taxed at 20%", "Taxed at the individual's applicable income tax rate"],
        answer: "Exempt from tax"
    },
    {
        question: "What is the term for a financial plan in India that involves investing a lump sum amount in various assets and then holding those investments for a long period?",
        choices: ["Active Investing", "Value Investing", "Buy and Hold Strategy", "Day Trading"],
        answer: "Buy and Hold Strategy"
    },
    {
        question: "In India, what is the maximum limit for tax deduction under Section 80D for health insurance premiums paid for senior citizens?",
        choices: ["Rs. 15,000", "Rs. 20,000", "Rs. 25,000", "Rs. 30,000"],
        answer: "Rs. 30,000"
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
