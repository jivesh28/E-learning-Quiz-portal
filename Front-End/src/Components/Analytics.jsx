import { useState, useEffect } from 'react';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const mockAnalytics = [
        { quizId: 1, title: 'Math Quiz', averageScore: 85, mostMissed: 'Question 3' },
        { quizId: 2, title: 'Science Quiz', averageScore: 78, mostMissed: 'Question 5' },
      ];
      setAnalytics(mockAnalytics);
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Quiz Analytics</h1>
      <div className="space-y-4">
        {analytics.map((data) => (
          <div key={data.quizId} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p>Average Score: {data.averageScore}%</p>
            <p>Most Missed Question: {data.mostMissed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;