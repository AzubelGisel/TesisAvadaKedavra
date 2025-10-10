// 🧠 Datos de la trivia mágica
const quizData = [
  {
    question: "¿Cuál es el nombre completo del protagonista de la saga de Harry Potter?",
    options: ["Harry Remus Potter", "Harry Sirius Potter", "Harry Albus Potter", "Harry James Potter"],
    answer: 3
  },
  {
    question: "¿Qué criatura mágica protege la cámara secreta?",
    options: ["Un dementor", "Un dragón", "Un basilisco", "Un hipogrifo"],
    answer: 2
  },
  {
    question: "¿Quién es el guardián de las llaves y terrenos de Hogwarts?",
    options: ["Albus Dumbledore", "Minerva McGonagall", "Severus Snape", "Rubeus Hagrid"],
    answer: 3
  },
  {
    question: "¿Qué objeto mágico permite viajar en el tiempo?",
    options: ["La Piedra Filosofal", "El Espejo de Oesed", "La Capa de Invisibilidad", "El Giratiempos"],
    answer: 3
  },
  {
    question: "¿Cuál es el nombre del elfo doméstico que sirve a los Malfoy?",
    options: ["Dobby", "Winky", "Hokey", "Kreacher"],
    answer: 0
  },
  {
    question: "¿En qué película aparece por primera vez Luna Lovegood?",
    options: ["La Cámara Secreta", "El Prisionero de Azkaban", "La Orden del Fénix", "El Misterio del Príncipe"],
    answer: 2
  },
  {
    question: "¿Qué poción permite adoptar la apariencia de otra persona?",
    options: ["Poción de Sangre de Dragón", "Poción de la Verdad", "Poción Multijugos", "Poción de Amor"],
    answer: 2
  },
  {
    question: "¿Qué criatura mágica aparece en el baño de chicas en 'La Cámara Secreta'?",
    options: ["Un boggart", "Un troll", "Un centauro", "Un basilisco"],
    answer: 3
  },
  {
    question: "¿Quién fue el campeón de Hogwarts en el Torneo de los Tres Magos?",
    options: ["Fleur Delacour", "Viktor Krum", "Cedric Diggory", "Harry Potter"],
    answer: 2
  },
  {
    question: "¿Qué objeto es uno de los Horrocruxes de Voldemort?",
    options: ["La escoba Nimbus 2000", "La varita de Saúco", "El diario de Tom Riddle", "El giratiempos"],
    answer: 2
  }
];
let currentQuestion = 0;
let score = 0;

function renderQuestion(index) {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  const q = quizData[index];
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("quiz-question");
  questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("quiz-options");

  q.options.forEach((opt, i) => {
    const optionBtn = document.createElement("button");
    optionBtn.textContent = opt;
    optionBtn.classList.add("option-btn");
    optionBtn.addEventListener("click", () => handleAnswer(i));
    optionsDiv.appendChild(optionBtn);
  });

  questionDiv.appendChild(optionsDiv);
  quizContainer.appendChild(questionDiv);
}

function handleAnswer(selectedIndex) {
  const correct = quizData[currentQuestion].answer;
  if (selectedIndex === correct) score++;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    renderQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function showResult() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <p>¡Obtuviste ${score} de ${quizData.length} puntos! 🎉</p>
    ${score >= 7 ? "<p>✨ ¡Ganaste un descuento mágico! Usalo en tu próxima compra.</p>" : ""}
    <button id="restart-btn" class="restart-btn">🔄 Jugar de nuevo</button>
  `;

  localStorage.setItem("quizScore", score);

  document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion(currentQuestion);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestion(currentQuestion);
});