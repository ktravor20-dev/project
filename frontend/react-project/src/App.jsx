
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './RegisterNewUser';
import Login from './login';
import Weeklogs from './Weeklogs';
import AppContent from './dashboard';
function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/register' element={<RegisterUser/>}/>
                <Route path='/login' element={<Login/>}/>
                
                <Route path='/weeklylogs' element={<Weeklogs/>}/>
            </Routes>
        </Router>
    );
}
export default App;
