import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function QuizTaker({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const mockQuiz = {
        id,
        title: 'Sample Quiz',
        timeLimit: 30,
        questions: [
          { id: 1, question: 'What is 2+2?', type: 'multiple', options: ['2', '3', '4', '5'], correctAnswer: '4' },
          { id: 2, question: 'Capital of France?', type: 'text', correctAnswer: 'Paris' },
        ],
      };
      setQuiz(mockQuiz);
      setTimeLeft(mockQuiz.timeLimit * 60);
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null || score !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, score]);

  const handleAnswerChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id]?.toString().toLowerCase() === q.correctAnswer.toLowerCase()) {
        correct++;
      }
    });
    const finalScore = (correct / quiz.questions.length) * 100;
    setScore(finalScore);
    console.log('Score:', finalScore);
  };

  if (!quiz) return <div>Loading...</div>;

  if (score !== null) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
        <p className="text-xl">Your score: {score}%</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-lg mb-4">Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      {quiz.questions.map((q) => (
        <div key={q.id} className="mb-4 p-4 bg-white rounded shadow">
          <p className="text-lg font-medium">{q.question}</p>
          {q.type === 'multiple' ? (
            <div className="space-y-2">
              {q.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(q.id, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter answer"
            />
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizTaker;