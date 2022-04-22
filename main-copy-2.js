const h3 = document.querySelector("h3");
const form = document.querySelector("form");
let groupeImageCheckbox = document.querySelectorAll(".image-checkbox");

/* let labels = document.querySelectorAll("label"); */
let mesImages = document.querySelectorAll("img");

let checkbox = document.querySelectorAll("input[type=radio]");

let fieldsetLegend = document.querySelectorAll("legend");


const btnCommencer = document.querySelector("#commencer");
const btnVerifier = document.querySelector(".verifier");


/* Lancer le quiz en cliquant sur bouton "Jouer" */
btnCommencer.addEventListener("click", lancerJeux);

function lancerJeux(e) {
  e.preventDefault();
  // Faire disparaître le bouton "Jouer"
  btnCommencer.style.display = "none";
  // Faire apparaître les groupes "label et input"
  for (let element of groupeImageCheckbox) {
    element.style.display = "flex";
  }
  // Lancer la première question
  question3.annonceQuestion();
  // Faire apparaître le bouton "Vérifier"
  btnVerifier.style.display = "block";
}

// Class d'une Question
class Question {
  constructor(question, choix1, choix2, reponse) {
    this.question = question;
    this.choix1 = choix1;
    this.choix2 = choix2;
    /* Faire en sorte que la question soit aléatoire */
    this.reponse = reponse;
    /* Annoncer la question */
    this.annonceQuestion = () => {
      /* Récupérer l'info dans la question à chaque fois */
      h3.innerHTML = this.question.question;
      /* Premier choix */
      let displayChoix1 = () => {
        /* Récupérer la première image */
        let image1 = mesImages[0];
        /* Ajouter le chemin vers l'image correspondante */
        image1.setAttribute("src", this.choix1.img);
        /* Modifier la 'legend' de l'élément 'fieldset' avec la valeur de 'legend' */
        let legend1 = fieldsetLegend[0];
        legend1.textContent = this.choix1.legend;
        /* Récupérer le premier checkbox radio et lui assigner une valeur 'name */
        let checkbox1 = checkbox[0];
        checkbox1.value = this.choix1.name;
      };
       /* Deuxième choix */
      displayChoix1();
      let displayChoix2 = () => {
        let image2 = mesImages[1];
        let legend2 = fieldsetLegend[1];
        legend2.textContent = this.choix2.legend;
        image2.setAttribute("src", this.choix2.img);

        let checkbox2 = checkbox[1];
        checkbox2.value = this.choix2.name;
      };
      displayChoix2();
    };
    this.annonceChoix1 = () => {
      h3.innerHTML = `Bravo, <span>${this.choix1.name}</span> est la bonne réponse !`;
    };
    this.annonceChoix2 = () => {
      h3.innerHTML = `Dommage, <span>${this.choix2.name}</span> n'est pas la bonne réponse.`;
    };
    this.validation = () => {
      
    };
  }
}


/* Ma troisième question */
let question3 = new Question({
    question: `Lequel de ces deux hommes est <span>Périclès</span> ?`,
  }, {
    legend: "Premier choix",
    img: "images/Pericles.jpg",
    name: "Périclès",
  }, {
    legend: "Deuxième choix",
    img: "images/Cleisthene.jpg",
    name: "Cleisthène",
  },

);


/* Ma première question */
let question1 = new Question({
    question: "Qui a réussi à retarder l'avancée de l'empire perse en Grèce ?",
  }, {
    legend: "Léonidas",
    img: "images/Leonidas.jpg",
    name: "Léonidas",
  }, {
    legend: "Alexandre le Grand",
    img: "images/AlexandreLeGrand.jpg",
    name: "Alexandre le Grand",
  },

);

/* Tableau qui recupère mes questions */

/* let mesQuestions = [
  question1,
  question3
] */

/* for (const objects of mesQuestions) {
  console.log(objects.question);
} */


// Envoyer le formulaire en cliquant sur "Vérifier"
form.addEventListener("submit", confirmerChoix);

function confirmerChoix(e) {
  console.log(e);
  // Données du formulaire
  let donnees = new FormData(form);
  for (const entrees of donnees) {
    /* Si la valeur du choix correspond à 'name', alors bonne réponse */
    if (entrees[1] === question3.choix1.name) {
      question3.annonceChoix1();
    } else {
      question3.annonceChoix2();
    }
    console.log(entrees);
  }
  e.preventDefault();
}

/* A faire : éviter que la question une soit toujours la bonne réponse */