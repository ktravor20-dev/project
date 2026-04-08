import Weeklogs from './Weeklogs.jsx';
import './App.css';

function App() {
  return (
    <div className="app">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>InternSys</h2>
        <p>Dashboard</p>
        <p>Weekly Logs</p>
        <p>Students</p>
        <p>Supervisors</p>
      </div>

      {/* Main content */}
      <div className="main">
        <Weeklogs />
      </div>

    </div>
  );
}

export default App;