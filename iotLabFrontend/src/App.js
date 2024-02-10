import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Pages/Home/Home/Home';
import Register from './Pages/Login/Register/Register';
import Login from './Pages/Login/Login/Login';
import CustomeParam from './Pages/CustomeParam/CustomeParam';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Documentation from './Pages/Documentation/Documentation';
import GetRoomDetails from './Pages/GetRoomDetails/GetRoomDetails';
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Router>  
      <Switch>
          

         
           <Route exact path="/home">
            <Home />
            </Route>

             <Route path="/login">
              <Login />
              </Route>
              
          <Route path="/register">
              <Register />
          </Route>

          <Route path="/admin">
              <Admin />
          </Route>

          <Route path="/rooms/:roomId">
              <GetRoomDetails></GetRoomDetails>
            </Route>

          <Route path="/documentation">
              <Documentation />
          </Route>

          <PrivateRoute path="/custome">
              <CustomeParam />
          </PrivateRoute>


          <Route exact path="/">
            <Home />
            </Route>

      </Switch>
      </Router>
    </div>
  );
}

export default App;
