import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuizList({ user }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const mockQuizzes = [
        { id: 1, title: 'Math Quiz', timeLimit: 30, questions: 5 },
        { id: 2, title: 'Science Quiz', timeLimit: 45, questions: 10 },
      ];
      setQuizzes(mockQuizzes);
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p>Time Limit: {quiz.timeLimit} minutes</p>
            <p>Questions: {quiz.questions}</p>
            {user && (
              <Link to={`/quiz/${quiz.id}`} className="mt-2 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Take Quiz
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;