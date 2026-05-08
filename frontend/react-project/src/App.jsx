
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
import ProtectedRoute from './ProtectedRoute';
import CreateStudentLog from './CreateStudentlog';
import ViewStudentLog from './ViewStudentLog'
import Messages from './pages/Messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendMessage from './SendMessage';
import ViewMessage from './VeiwMessage';




import './App.css';

function App() {
    return (
      <Router>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* STUDENT */}
        <Route path="/studentDashboard" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <AppContent />
          </ProtectedRoute>
          }
           >
          <Route index element={<DashboardHome />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="createstudentlog" element={<CreateStudentLog/>}/>
          <Route path ='viewstudentlog' element={<ViewStudentLog/>}/>
          <Route path='sendmessage' element={<SendMessage/>}/>
          <Route path='viewmessage' element={<ViewMessage/>}/>
        </Route>

        {/*INTERNSHIP SUPERVISOR */}
        <Route path="/supervisorDashboard" element={
          <ProtectedRoute allowedRoles={["INTERN_SUPERVISOR"]}>
            <AppContent />
          </ProtectedRoute>
        }>
          <Route index element={<Supervisordefaultview />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="searchlog" element={<Getstudent />} />
          <Route path ='viewstudentlog' element={<ViewStudentLog/>}/>
          <Route path="messages" element={<Messages />} />
          <Route path='sendmessage' element={<SendMessage/>}/>
          <Route path='viewmessage' element={<ViewMessage/>}/>

        </Route>


        {/*ACADEMIC SUPERVISOR */}
        <Route path="/academicSupervisorDashboard" element={
          <ProtectedRoute allowedRoles={["ACADEMIC_SUPERVISOR"]}>
            <AppContent />
          </ProtectedRoute>
        }>
          <Route index element={<AcademicSupervisorDashboard />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="inputweeklylogs" element={<Inputweeklylogs />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="searchlog" element={<Getstudent />} />
          <Route path="createinternshipplacements" element={<CreateInternPlacement />} />
          <Route path="messages" element={<Messages />} />
          <Route path='sendmessage' element={<SendMessage/>}/>
          <Route path='viewmessage' element={<ViewMessage/>}/>

        </Route>

        {/* ADMIN */}
        <Route path="/adminDashboard" element={
          <ProtectedRoute allowedRoles={["SYSTEM_ADMINSTRATOR"]}>
            <AppContent />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="viewinternshipplacements" element={<ViewInternPlacement />} />
          <Route path="studentlog" element={<Log />} />
          <Route path="weeklylogs" element={<Weeklogs />} />
          <Route path="searchlog" element={<Getstudent />} />
        </Route>

        <Route path="/staffRegister" element={<StaffRegistration />} />

       </Routes> 
      </Router>
    );
}

export default App;










