import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import ResetPass from './Components/ResetPass';


import Admin  from './Components/Admin';
import AdminDashboard  from './Components/AdminDashboard';
import ViewPatient  from './Components/ViewPatient';
import MyProfile from "./Components/MyProfile";
import MyVitals from "./Components/MyVitals";
import MyHistory from "./Components/MyHistory";
import Dashboard from "./Components/Dashboard";




import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home}/>
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/aboutus" component={AboutUs}/>
      <UnPrivateRoute path="/contactus" component={ContactUs}/>
      <UnPrivateRoute path="/resetpass" component={ResetPass}/>
      
      
      <PrivateRoute path="/admindashboard" roles={["admin"]} component={AdminDashboard}/>
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin}/>
      <PrivateRoute path="/ViewPatient" roles={["admin"]} component={ViewPatient}/>
      

      <PrivateRoute path="/MyProfile" roles={["user"]} component={MyProfile}/>
      <PrivateRoute path="/MyVitals" roles={["user"]} component={MyVitals}/>
      <PrivateRoute path="/MyHistory" roles={["user"]} component={MyHistory}/>
      <PrivateRoute path="/dashboard" roles={["user"]} component={Dashboard}/>
      
    </Router>
  );
}

export default App;
