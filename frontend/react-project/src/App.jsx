import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './RegisterNewUser';
import Login from './login';
import Weeklogs from './Weeklogs';

function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/register' element={<RegisterUser/>}/>
                
                <Route path='/weeklylogs' element={<Weeklogs/>}/>
            </Routes>
        </Router>
    );
}
export default App;