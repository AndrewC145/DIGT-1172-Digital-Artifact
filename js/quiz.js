const collectionQuestions = [
  {
    question: "What Kind of Information is Personal Data?",
    answers: [
      {text: "Any information that can be used to identify an individual", correct: true},
      {text: "Any information that can be used to identify a company", correct: false},
      {text: "Any information that can be used to identify your behavior", correct: false},
      {text: "Any information that can be used to identify consumer satisfaction", correct: false}
  ]
  },
  {
    question: "What is the most obvious way companies collect your data?",
    answers: [
      {text: "Through your social media accounts", correct: false},
      {text: "Through your online shopping habits", correct: false},
      {text: "Collecting Cookies", correct: true},
      {text: "From Location Based Advertising", correct: false},
    ]
  },
  {
    question: "What is Attitudinal Data?",
    answers: [
      {text: "Data that is collected from your social media accounts", correct: false},
      {text: "Data that is collected from your online shopping habits", correct: false},
      {text: "Data that is collected from your behavior", correct: false},
      {text: "Data that is collected from your opinions (consumer satisfaction)", correct: true},
    ]
  }
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  let currentQuestion = collectionQuestions[currentQuestionIndex];
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
  questionElement.textContent = `You scored ${score} out of ${collectionQuestions.length}`;
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
    if (currentQuestionIndex < collectionQuestions.length) {
      setNextQuestion();
    } else {
      showScore();
    }
  }
});



startGame();