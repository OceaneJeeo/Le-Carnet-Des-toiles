const stars = document.querySelectorAll('.star');
const carnet = document.getElementById('carnet');
const content = document.getElementById('content');
const closeBtn = document.getElementById('close');
const startBtn = document.getElementById('start-btn');
const introPopup = document.getElementById('intro-popup');

const epilogueChoice = document.getElementById('epilogue-choice');
const epilogueResult = document.getElementById('epilogue-result');
const stayBtn = document.getElementById('stay-btn');
const returnBtn = document.getElementById('return-btn');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const resultClose = document.getElementById('result-close');
const sky = document.getElementById('sky');

// Désactiver les étoiles tant que l’intro est visible
sky.style.pointerEvents = 'none';

startBtn.addEventListener('click', () => {
  introPopup.style.display = 'none';
  sky.style.pointerEvents = 'auto'; // Réactive les étoiles
});

const starData = {
  1: {
    text: "🧠 Énigme : Je suis là avant toi, mais je viens après. Qui suis-je ?",
    answer: "le futur",
    unlocks: [2],
  },
  2: {
    text: "📜 Fragment : Elle s’appelait Lys. Elle avait fait une promesse : ne jamais oublier l’étoile du Nord.",
    answer: null,
    unlocks: [3],
  },
  3: {
    text: "🌌 Souvenir brisé : Quelque chose s’est passé. Une chute. Un oubli volontaire.",
    answer: null,
    unlocks: [4],
  },
  4: {
    text: "🪞 Miroir : Tu n’étais pas seule. Il y avait une autre voyageuse.",
    answer: null,
    unlocks: [5],
  },
  5: {
    text: "🎵 Chant : Le passé est une étoile morte. Mais sa lumière voyage encore.",
    answer: null,
    unlocks: [6],
  },
  6: {
    text: "🧠 Énigme : Je ne suis ni porte ni serrure, mais sans moi, rien ne s’ouvre.",
    answer: "le souvenir",
    unlocks: [7],
  },
  7: {
    text: "🌠 Vérité : Lys avait choisi de s’effacer pour sauver l’autre. Mais le ciel a gardé ses traces.",
    answer: null,
    unlocks: [],
  }
};

stars.forEach(star => {
  star.addEventListener('click', () => {
    const id = star.getAttribute('data-id');
    const data = starData[id];
    content.innerHTML = `<p>${data.text}</p>`;

    if (!data.answer) {
      unlockStars(data.unlocks);
      if (id === "7") {
        setTimeout(() => {
          epilogueChoice.classList.remove('hidden');
        }, 5000);
      }
    }

    if (data.answer) {
      const input = document.createElement('input');
      input.placeholder = "Ta réponse...";
      input.type = "text";

      const submit = document.createElement('button');
      submit.textContent = "Valider";

      submit.onclick = () => {
        const userAnswer = input.value.trim().toLowerCase();

        const oldFeedback = content.querySelectorAll('p.feedback');
        oldFeedback.forEach(el => el.remove());

        const feedback = document.createElement('p');
        feedback.classList.add('feedback');

        if (userAnswer === data.answer) {
          unlockStars(data.unlocks);
          feedback.textContent = "✨ Bonne réponse ! Une nouvelle étoile s’est allumée...";
          input.disabled = true;
          submit.disabled = true;
        } else {
          feedback.textContent = "❌ Essaie encore...";
        }

        content.appendChild(feedback);
      };

      content.appendChild(input);
      content.appendChild(submit);
    }

    carnet.classList.remove('hidden');
  });
});

function unlockStars(ids) {
  ids.forEach(id => {
    const star = document.querySelector(`.star[data-id="${id}"]`);
    star.classList.remove('locked');
  });
}

closeBtn.addEventListener('click', () => {
  carnet.classList.add('hidden');
});

stayBtn.addEventListener('click', () => {
  epilogueChoice.classList.add('hidden');
  resultTitle.textContent = "🌙 Gardienne du ciel";
  resultText.innerHTML = `
    Tu choisis de rester parmi les étoiles.<br />
    À chaque nuit, tu veilleras sur les souvenirs des autres.<br />
    <em>“Ce que nous oublions ne disparaît pas. Il devient étoile.”</em>
  `;
  epilogueResult.classList.remove('hidden');
});

returnBtn.addEventListener('click', () => {
  epilogueChoice.classList.add('hidden');
  resultTitle.textContent = "🌍 Retour sur Terre";
  resultText.innerHTML = `
    Tu redescends avec ta mémoire retrouvée.<br />
    Le monde t’attend, et ton histoire peut recommencer.<br />
    <em>“Ce que nous retrouvons devient lumière.”</em>
  `;
  epilogueResult.classList.remove('hidden');
});

resultClose.addEventListener('click', () => {
  epilogueResult.classList.add('hidden');
});
