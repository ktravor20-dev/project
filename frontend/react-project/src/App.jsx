
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './login';
import RegisterUser from './RegisterNewUser';
import AppContent from './dashboard';
import StaffRegistration from './StaffRegistration';  
import AdminDashboard from './AdminDashboard';
import DashboardHome from './DashboardHome';
import Weeklogs from './Weeklogs';
import Inputweeklylogs from './Inputweeklylogs';
import CreateInternPlacement from './CreateInternPlacement';
import ViewInternPlacement from './ViewInternPlacement';
import Log from '../searchlog';
import Getstudent from './getstudent';
import Supervisordefaultview from './Supervisordefaultview';
import SupervisorSidebar from './SupervisorSidebar';
import AcademicSupervisorDashboard from './AcademicSupervisorDashboard';


import './App.css';

function App() {
    return (
      <Router>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* STUDENT */}
        <Route path="/studentDashboard" element={<AppContent role="STUDENT" />}>
          <Route index element={<DashboardHome />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="searchlog" element={<Getstudent />} />
        </Route>

        {/*INTERNSHIP SUPERVISOR */}
        <Route path="/supervisorDashboard" element={<AppContent role="INTERN_SUPERVISOR" />}>
          <Route index element={<Supervisordefaultview />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="searchlog" element={<Getstudent />} />

        </Route>


        {/*ACADEMIC SUPERVISOR */}
        <Route path="/academicSupervisorDashboard" element={<AppContent role="ACADEMIC_SUPERVISOR" />}>
          <Route index element={<AcademicSupervisorDashboard />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="searchlog" element={<Getstudent />} />
          <Route path="createinternshipplacements" element={<CreateInternPlacement />} />

        </Route>

        {/* ADMIN */}
        <Route path="/adminDashboard" element={<AppContent role="SYSTEM_ADMINSTRATOR" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="searchlog" element={<Getstudent />} />
        </Route>

        <Route path="/staffRegister" element={<StaffRegistration />} />

       </Routes> 
      </Router>
    );
}

export default App;
