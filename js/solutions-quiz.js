const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;


const solutionsQuestions = [
  {
    question: "What is the easiest way to reduce data collection?",
    answers: [
      {text: "Delete Browsing Data", correct: false},
      {text: "Opt out of Cookies", correct: true},
      {text: "Use an Ad Blocker", correct: false},
      {text: "Use a VPN", correct: false}
  ]
  },
  {
    question: "What is a VPN?",
    answers: [
      {text: "A platform for storing your private files securely online.", correct: false},
      {text: "A browser extension that allows you to browse incognito.", correct: false},
      {text: "A Virtual Private Network that encrypts your internet connection and hides your IP address to enhance privacy and security online.", correct: true},
      {text: "A device that blocks malware and viruses on your computer.", correct: false}
    ]
  },
  {
    question: "What happens when you delete your browsing data?",
    answers: [
      {text: "It completely prevents websites from collecting your data in the future.", correct: false},
      {text: "It blocks all ads permanently.", correct: false},
      {text: "It makes your browser completely anonymous to websites.", correct: false},
      {text: "It removes your browsing history, cookies, and cached data, but does not directly protect you from data collection.", correct: true}
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
  let currentQuestion = solutionsQuestions[currentQuestionIndex];
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
  questionElement.textContent = `You scored ${score} out of ${solutionsQuestions.length}`;
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
    if (currentQuestionIndex < solutionsQuestions.length) {
      setNextQuestion();
    } else {
      showScore();
    }
  }
});



startGame();