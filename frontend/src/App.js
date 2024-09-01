import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from "./component/Home"
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import Profile from "./component/userDetails"

const App = () => (
  <BrowserRouter>
    <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path='/register' element={<RegisterForm/>} />
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/profile' element = {<Profile/>}/>
        <Route to="/not-found" />
    </Routes>
  </BrowserRouter>
)

export default App;
