import React from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Custom Heatmap Component
const Heatmap = ({ data, teams, periods }) => {
  const maxWorkload = Math.max(...data.flat()); // Find max workload for scaling colors

  return (
    <div className="heatmap">
      <div className="heatmap-grid">
        {/* Header Row (Periods) */}
        <div className="heatmap-cell heatmap-header"></div>
        {periods.map((period, idx) => (
          <div key={idx} className="heatmap-cell heatmap-header">
            {period}
          </div>
        ))}
        {/* Data Rows (Teams) */}
        {data.map((row, rowIdx) => (
          <React.Fragment key={rowIdx}>
            <div className="heatmap-cell heatmap-header">{teams[rowIdx]}</div>
            {row.map((value, colIdx) => (
              <div
                key={colIdx}
                className="heatmap-cell"
                style={{
                  backgroundColor: `rgba(169, 183, 165, ${value / maxWorkload})`, // Sage green with opacity
                }}
                title={`Workload: ${value}`}
              >
                {value}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Dashboards = () => {
  // Original Charts Data
  const pendingData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{ data: [10, 20, 30], backgroundColor: ['#d4a5a5', '#e5d9b6', '#a9b7a5'] }],
  };

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{ label: 'Tasks Completed', data: [5, 10, 15, 20], borderColor: '#a9b7a5', fill: false }],
  };

  const completedData = {
    labels: ['Week 1', 'Week 2', 'Week 3'],
    datasets: [
      { label: 'Bugs', data: [5, 10, 15], backgroundColor: '#d4a5a5' },
      { label: 'Features', data: [10, 15, 20], backgroundColor: '#a9b7a5' },
    ],
  };

  const notificationsData = {
    labels: ['Mentions', 'Reminders', 'Deadlines', 'Updates'],
    datasets: [{ data: [15, 10, 5, 20], backgroundColor: ['#a9b7a5', '#e5d9b6', '#d4a5a5', '#d1d5db'] }],
  };

  // Workload Distribution Data (Teams vs. Weeks)
  const workloadData = [
    [10, 20, 15, 30], // Team Alpha
    [5, 15, 25, 10],  // Team Beta
    [20, 10, 5, 15],  // Team Gamma
  ];
  const teams = ['Team Alpha', 'Team Beta', 'Team Gamma'];
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Project Success/Failure Data
  const projectData = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'Success Rate (%)',
        data: [80, 60, 90, 50],
        backgroundColor: '#a9b7a5', // Sage green
      },
      {
        label: 'Failure Rate (%)',
        data: [20, 40, 10, 50],
        backgroundColor: '#d4a5a5', // Light brown
      },
    ],
  };

  // Root Cause Analysis Insights (Static for now)
  const rootCauseInsights = [
    { project: 'Project A', cause: 'Effective planning and resource allocation.' },
    { project: 'Project B', cause: 'Lack of communication between teams.' },
    { project: 'Project C', cause: 'Strong leadership and timely execution.' },
    { project: 'Project D', cause: 'Insufficient testing and rushed deadlines.' },
  ];

  return (
    <div className="dashboards">
      <h2>Dashboards</h2>
      <div className="chart-grid">
        {/* Original Charts */}
        <div className="chart">
          <h3>Pending Work</h3>
          <Pie data={pendingData} />
        </div>
        <div className="chart">
          <h3>Performance</h3>
          <Line data={performanceData} />
        </div>
        <div className="chart">
          <h3>Completed Work</h3>
          <Bar data={completedData} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />
        </div>
        <div className="chart">
          <h3>Notifications</h3>
          <Doughnut data={notificationsData} />
        </div>
        {/* New Charts */}
        <div className="chart">
          <h3>Workload Distribution</h3>
          <Heatmap data={workloadData} teams={teams} periods={periods} />
        </div>
        <div className="chart">
          <h3>Project Success/Failure Rates</h3>
          <Bar
            data={projectData}
            options={{
              scales: {
                x: { stacked: true },
                y: { stacked: true, max: 100 },
              },
            }}
          />
          <div className="root-cause-analysis">
            <h4>Root Cause Analysis</h4>
            <ul>
              {rootCauseInsights.map((insight, idx) => (
                <li key={idx}>
                  <strong>{insight.project}:</strong> {insight.cause}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;