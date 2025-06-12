import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizCreator from './components/QuizCreator';
import QuizTaker from './components/QuizTaker';
import Analytics from './components/Analytics';
import Login from './components/Login';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">E-Learning Quiz</Link>
            <div>
              {user ? (
                <>
                  <span className="mr-4">Welcome, {user.role}!</span>
                  {user.role === 'instructor' && (
                    <>
                      <Link to="/create" className="mr-4 hover:underline">Create Quiz</Link>
                      <Link to="/analytics" className="mr-4 hover:underline">Analytics</Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="hover:underline">Logout</button>
                </>
              ) : (
                <Link to="/login" className="hover:underline">Login</Link>
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<QuizList user={user} />} />
            <Route path="/create" element={user?.role === 'instructor' ? <QuizCreator /> : <Login handleLogin={handleLogin} />} />
            <Route path="/quiz/:id" element={<QuizTaker user={user} />} />
            <Route path="/analytics" element={user?.role === 'instructor' ? <Analytics /> : <Login handleLogin={handleLogin} />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;