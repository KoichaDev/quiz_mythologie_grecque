import { createElement, setNodeTextContent, setNodeAttribute, setParentAppendChild } from '../helpers/domUtils'

const setQuizCard = (QUIZ_QUESTIONS, currentQuestion, callback) => {
    const quizTitle = document.getElementById('quiz-title')
    const quizContainer = document.getElementById('quiz-container')

    // The value is coming from the array objects that contains general properties
    const questionTitle = QUIZ_QUESTIONS[currentQuestion].question;
    const correctAnswer = QUIZ_QUESTIONS[currentQuestion].correctAnswer;
    const questionsArray = QUIZ_QUESTIONS[currentQuestion].answers;
    const imageArray = QUIZ_QUESTIONS[currentQuestion].img;

    setNodeTextContent(quizTitle, questionTitle)

    // We can improve this code by using the Mutation Observer of JavaScript, since it will guarantee to check
    // if a DOM element has been updating/changing something. I used the setTimeout just to make it simpler. 
    // It's not entirely corrected solution to do it, but just works for now
    setTimeout(() => {
        const quizContainerForm = document.getElementById('quiz-container-form')

        quizContainerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answered = e.target.querySelector('input[name="quiz-answer"]:checked').value;

            const isCorrectAnswer = answered === correctAnswer;
            currentQuestion = currentQuestion + 1

            // There is a bug on this here. The JavaScript logic is not managing to running to check if it's true, but rather running checking
            // false and then true. 
            if (!isCorrectAnswer) alert('Wrong answer!')

            if (isCorrectAnswer) {
                quizContainerForm.textContent = ''
                setQuizCard(QUIZ_QUESTIONS, currentQuestion)
            }

            if (currentQuestion === QUIZ_QUESTIONS.length) {
                alert('finish!')
            }
        })
    }, 250)

    createFormQuiz(quizContainer)
    createImageQuiz(imageArray)
    createRadioButton(questionsArray)
    createNextButton()

    function createFormQuiz(quizContainer) {
        const quizContinerForm = createElement('form')
        setNodeAttribute(quizContinerForm, 'class', '[ quiz-container__form ]')
        setNodeAttribute(quizContinerForm, 'id', 'quiz-container-form')
        setParentAppendChild(quizContainer, quizContinerForm)
    }

    function createImageQuiz(array) {
        const quizContainerForm = document.getElementById('quiz-container-form')
        const quizImageContainer = createElement('div')
        setNodeAttribute(quizImageContainer, 'class', '[ quiz-container__image ]')
        setNodeAttribute(quizImageContainer, 'id', 'quiz-container-image')
        setParentAppendChild(quizContainerForm, quizImageContainer)


        Array.from(array).map(({ src, altText }) => {
            const imgElement = createElement('img');
            setNodeAttribute(imgElement, 'src', src)
            setNodeAttribute(imgElement, 'alt', altText)
            setNodeAttribute(imgElement, 'data-question', currentQuestion)

            setParentAppendChild(quizImageContainer, imgElement);
        })
    }

    function createRadioButton(array) {
        const quizContainerForm = document.getElementById('quiz-container-form')

        Array.from(array).map(question => {
            const radioDivContainer = createElement('div');
            const radioLabel = createElement('label');
            const radioButton = createElement('input')

            setNodeAttribute(radioDivContainer, 'class', '[ quiz-container__radio ]')
            setParentAppendChild(quizContainerForm, radioDivContainer)

            setNodeAttribute(radioLabel, 'for', question)
            setNodeTextContent(radioLabel, question)
            setParentAppendChild(radioDivContainer, radioLabel)

            setNodeAttribute(radioButton, 'type', 'radio')
            setNodeAttribute(radioButton, 'value', question)
            setNodeAttribute(radioButton, 'name', 'quiz-answer')
            setParentAppendChild(radioDivContainer, radioButton)
        })
    }

    function createNextButton() {
        const quizContainerForm = document.getElementById('quiz-container-form')

        const nextButton = createElement('button');
        setNodeAttribute(nextButton, 'id', 'next-question');
        setNodeTextContent(nextButton, 'Next Question');
        setNodeAttribute(nextButton, 'type', 'submit');
        setParentAppendChild(quizContainerForm, nextButton);
    }
}

export default setQuizCard;