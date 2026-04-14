import './DashboardHome.css';
function AcademicSupervisorDashboard() {
  return (
    <div>
      <h1>Academic Supervisor Dashboard</h1>

      <div className="cards">
        <div className="card green">Total Students</div>
        <div className="card orange">Total Supervisors</div>
        <div className="card blue">Placements</div>
      </div>

      <h3>Recent Placements</h3>
      <p>Supervisor X was assigned to student Y</p>
      
    </div>
  );
}
export default AcademicSupervisorDashboard;