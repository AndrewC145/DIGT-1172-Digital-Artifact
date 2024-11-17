const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;


const dataQuestions = [
  {
    question: "What is Retargeting?",
    answers: [
      {text: "A tactic to entice people to finish what they were doing", correct: true},
      {text: "Targeting entirely new customers based on demographic data only", correct: false},
      {text: "Displaying ads to users who completed a purchase on your site", correct: false},
      {text: "Using location data to advertise to people nearby your store", correct: false}
  ]
  },
  {
    question: "What are Data Brokers?",
    answers: [
      {text: "An organization that manages online banking transactions securely.", correct: false},
      {text: "A company or individual that collects, buys, and sells personal data about individuals, often without their direct knowledge.", correct: true},
      {text: "A platform that allows users to trade cryptocurrency like Bitcoin.", correct: false},
      {text: "A person who negotiates the sale of houses and other real estate properties.", correct: false}
    ]
  },
  {
    question: "How Might a Company Use Your Data to Improve Customer Experience?",
    answers: [
      {text: "By limiting access to certain features unless users provide more personal data.", correct: false},
      {text: "By automatically raising prices for frequent customers based on their buying habits.", correct: false},
      {text: "By analyzing customer feedback to improve product quality and usability", correct: true},
      {text: "By using user data to target them with clickbait ads.", correct: false}
    ]
  }
];

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  let currentQuestion = dataQuestions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNum}: ${currentQuestion.question}`;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    answersElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    } 
    button.addEventListener('click', selectAnswer);
  });
};

function resetState() {
  nextButton.style.display = 'none';
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('wrong');
  }
  Array.from(answersElement.children).forEach(button => {
    if (button.dataset.correct) {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${dataQuestions.length}`;
  nextButton.textContent = 'Restart';
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  if (nextButton.textContent === 'Restart') {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = 'Next';
    startGame();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < dataQuestions.length) {
      setNextQuestion();
    } else {
      showScore();
    }
  }
});



startGame();