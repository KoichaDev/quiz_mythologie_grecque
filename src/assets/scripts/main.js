const h3 = document.querySelector("h3");
const form = document.querySelector("form");
let imageRadio = document.querySelectorAll(".image-radio");

/* let labels = document.querySelectorAll("label"); */
let myImages = document.querySelectorAll("img");

let checkbox = document.querySelectorAll("input[type=radio]");

let fieldsetLegend = document.querySelectorAll("legend");

const btnPlay = document.querySelector("#play");
const btnCheck = document.querySelector("#check");
const btnNext = document.querySelector("#next");


/* ---------- launch the quiz by clicking on the "Play" button ----------*/
btnPlay.addEventListener("click", startGame);

function startGame(e) {
  e.preventDefault();
  // make disappear the "Play" button
  btnPlay.style.display = "none";
  // reveal the "label and input" groups
  for (let element of imageRadio) {
    element.style.display = "flex";
  }
  // launch the first question
  question2.announceQuestion();

  // reveal the button "check"
  btnCheck.style.display = "block";
}

// ------------ constructor of questions with all lignes codes ----------
class Question {
  constructor(question, choiceOne, choiceTwo, reponse) {
    this.question = question;
    this.choiceOne = choiceOne;
    this.choiceTwo = choiceTwo;
    /* Soon : Make the question random */
    this.reponse = reponse;
    /* announce question */
    this.announceQuestion = () => {
      /* get the info in the question each time */
      h3.innerHTML = this.question.formulation;
      /* First choice */
      let displayChoiceOne = () => {
        /* get the first image */
        let imageOne = myImages[0];
        /* Add the path to the corresponding image */
        imageOne.setAttribute("src", this.choiceOne.img);
        /* Modify the 'legend' of the 'fieldset' element with the value of 'legend' */
        let legendOne = fieldsetLegend[0];
        legendOne.textContent = this.choiceOne.legend;
        /* Get the first radio checkbox and assign it a 'name' value */
        let checkboxOne = checkbox[0];
        checkboxOne.value = this.choiceOne.name;
      };
      /* second choice : like the first one */
      displayChoiceOne();
      let displayChoiceTwo = () => {
        let imageTwo = myImages[1];
        let legendTwo = fieldsetLegend[1];
        legendTwo.textContent = this.choiceTwo.legend;
        imageTwo.setAttribute("src", this.choiceTwo.img);

        let checkboxTwo = checkbox[1];
        checkboxTwo.value = this.choiceTwo.name;
      };
      displayChoiceTwo();
    };
    this.announceChoiceOne = () => {
      h3.innerHTML = `Well done, <span>${this.choiceOne.name}</span> is the correct answer!`;
    };
    this.announceChoiceTwo = () => {
      h3.innerHTML = `Too bad, <span>${this.choiceTwo.name}</span> is not the correct answer.`;
    };
    this.validation = () => {};
  }
}

/* --------------- My second question ------------------- */
let question2 = new Question(
  {
    formulation: `Which of these two men is <span>Pericles</span>?`,
  },
  {
    legend: "First choice",
    img: "Pericles.jpg",
    name: "Pericles",
  },
  {
    legend: "Second choice",
    img: "Cleisthene.jpg",
    name: "Cleisthenes",
  }
);

/* ------------ Ma first question ----------------*/
let question1 = new Question(
  {
    formulation:
      "Who succeeded in delaying the advance of the Persian Empire in Greece?",
  },
  {
    legend: "Leonidas",
    img: "Leonidas.jpg",
    name: "Leonidas",
  },
  {
    legend: "Alexander The Great",
    img: "AlexandreLeGrand.jpg",
    name: "Alexander The Great",
  }
);



// ------------ Send the form by clicking on "check" --------------
form.addEventListener("submit", confirmChoice);

function confirmChoice(e) {
  console.log(e);
  // Form data
  let data = new FormData(form);
  for (const entries of data) {
    /* If the value of the choice matches 'name', then good answer */
    if (entries[1] === question2.choiceOne.name) {
      question2.announceChoiceOne();
    } else {
      question2.announceChoiceTwo();
    }
    console.log(entries);
  }
  e.preventDefault();
}

/* ----------- lauch the next question. It works but not good at all --------*/
btnNext.addEventListener("click", newQuestion);

function newQuestion() {
  question1.announceQuestion();
 
}


/* To do: avoid that question one is always the right answer */

// How to move from one question to another by clicking on next

// Can I have comments on my codes ? 
