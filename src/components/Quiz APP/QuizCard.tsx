import { useEffect, useState } from "react";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizApp = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Fetch questions with retry logic
  const getQuestions = async (attempt = 0) => {
    setIsLoading(true);
    setError("");

    // Abort any ongoing fetch request
    if (abortController) abortController.abort();

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch(API_URL, { signal: controller.signal });

      // Handle rate limiting (429 error)
      if (response.status === 429) {
        if (attempt < 3) {
          setTimeout(() => getQuestions(attempt + 1), 2000 * (attempt + 1));
          return;
        }
        throw new Error("Server busy. Please try again later.");
      }

      const data = await response.json();

      if (!data.results?.length) {
        setError("No questions available right now");
      } else {
        setQuestions(data.results);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError("Failed to load questions");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
    return () => abortController?.abort(); // Cleanup on unmount
  }, []);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestionIndex]?.correct_answer) {
      setScore((prev) => prev + 1);
    }

    // Move to next question or show results
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    if (questions.length === 0) getQuestions();
  };

  // Loading screen
  if (isLoading)
    return (
      <AppLayout>
        <MainContainer heading="Trivia Quiz App">
          <div className="flex items-center justify-center h-40 text-lg font-bold">
            Loading...
          </div>
        </MainContainer>
      </AppLayout>
    );

  // Error screen
  if (error)
    return (
      <AppLayout>
        <MainContainer heading="Oops!">
          <div className="flex flex-col items-center gap-4 p-4">
            <p className="text-red-500 font-bold">{error}</p>
            <button
              onClick={() => getQuestions()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </MainContainer>
      </AppLayout>
    );

  // Result screen
  if (currentQuestionIndex >= questions.length)
    return (
      <AppLayout>
        <MainContainer heading="Trivia Quiz App">
          <div className="flex flex-col items-center justify-center gap-4 bg-black text-white p-4  rounded-2xl">
            <h2 className="text-2xl font-bold">Quiz Complete! 🎯</h2>
            <p className="text-lg">
              {score}/{questions.length} Correct Answers
            </p>
            <ul className="text-left space-y-4">
              {questions.map((question, index) => (
                <li key={index} className="border p-3 rounded-md">
                  <p className="font-semibold">{question.question}</p>
                  <p className="text-green-600">
                    ✅ Correct Answer: {question.correct_answer}
                  </p>
                  
                </li>
              ))}
            </ul>
            <button
              onClick={restartQuiz}
              className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-500 hover:text-white"
            >
              Play Again
            </button>
          </div>
        </MainContainer>
      </AppLayout>
    );

  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <AppLayout>
      <MainContainer heading="Trivia Quiz App">
        <div className="bg-black text-white p-2 rounded-xl size-min ">
          <div className="font-bold">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <h2 className="font-bold mt-2">{currentQuestion.question}</h2>

          <ul className="mt-4 flex flex-col items-center gap-4">
            {allAnswers.map((answer) => (
              <li
                key={answer}
                onClick={() => handleAnswer(answer)}
                className="bg-white text-black px-4 py-2 text-lg w-72 text-center rounded-2xl cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                {answer}
              </li>
            ))}
          </ul>
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default QuizApp;
