import './DashboardHome.css';
function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card green">Total Students</div>
        <div className="card orange">Total Supervisors</div>
        <div className="card blue">Placements</div>
      </div>

      <h3>System Overview</h3>
      <p>All systems running</p>
      
    </div>
  );
}
export default AdminDashboard;