// Array with hardcoded questions and answers
import QUIZ_QUESTIONS from '../constants/questionsQuiz'

// Utility helper functions for general DOM manipulating
import { toggleClassName, replaceClassName } from '../helpers/domClassUtils'
import { setNodeTextContent } from '../helpers/domUtils'

// QuizCard that will act as a "component"
import setQuizCard from './quizCard'

document.addEventListener('DOMContentLoaded', () => {
    const quizTitle = document.getElementById('quiz-title')
    const totalQuestionTitle = document.getElementById('total-question')
    const startGameBtn = document.getElementById('start-game');

    const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length;
    let currentQuestion = 0;
    let hasGameStart = false;

    const nextQuestion = () => {
        currentQuestion++
        document.getElementById('quiz-container-form').textContent = ''
        setQuizCard(QUIZ_QUESTIONS, currentQuestion)
    }

    startGameBtn.addEventListener('click', () => {
        hasGameStart = true
        toggleClassName(startGameBtn, 'hidden');

        if (!hasGameStart) return;

        replaceClassName(quizTitle, 'hidden', 'block');
        setNodeTextContent(totalQuestionTitle, `${currentQuestion + 1} / ${TOTAL_QUESTIONS}`)

        setQuizCard(QUIZ_QUESTIONS, currentQuestion);
    })
})



