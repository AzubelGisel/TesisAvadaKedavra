
document.getElementById("hogwarts-test").addEventListener("submit", function(e) {
  e.preventDefault();

  const preguntas = document.querySelectorAll(".pregunta");
  const respuestas = document.querySelectorAll("input[type='radio']:checked");

  if (respuestas.length < preguntas.length) {
    alert("🧙‍♀️ Por favor, respondé todas las preguntas antes de descubrir tu casa.");
    return;
  }

  const puntajes = {
    Gryffindor: 0,
    Hufflepuff: 0,
    Ravenclaw: 0,
    Slytherin: 0
  };

  respuestas.forEach(r => {
    puntajes[r.value]++;
  });

  let casaGanadora = Object.keys(puntajes).reduce((a, b) => puntajes[a] > puntajes[b] ? a : b);

  document.getElementById("casa-seleccionada").textContent = casaGanadora;
  document.getElementById("resultado").classList.remove("hidden");

  const cards = {
    Gryffindor: `<div class="card">🦁 <h3>Gryffindor</h3><p>Valor, fuerza y determinación.</p></div>`,
    Hufflepuff: `<div class="card">🦡 <h3>Hufflepuff</h3><p>Lealtad, paciencia y trabajo duro.</p></div>`,
    Ravenclaw: `<div class="card">🦅 <h3>Ravenclaw</h3><p>Inteligencia, creatividad y sabiduría.</p></div>`,
    Slytherin: `<div class="card">🐍 <h3>Slytherin</h3><p>Ambición, astucia y determinación.</p></div>`
  };

  document.getElementById("card-casa").innerHTML = cards[casaGanadora];
});
