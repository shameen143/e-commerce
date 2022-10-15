import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hotels' element={<List/>}/> 
        <Route path='/hotels/:id' element={<Hotel/>}/>
        <Route path='/signup' element={<Signup/>}/> 
        <Route path='/login' element={<Login/>}/> 
        
        
         
        
      
      </Routes>
      
      </BrowserRouter>
       
        
     
    </div>
  );
};

export default App;
