import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import './Navbar.css';





const Navbar = props =>{
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);
    

    async function onClickLogoutHandler(){
        
        await AuthService.logout().then(data=>{
            
            if(data.success){
                
                setUser(data.user);
                setIsAuthenticated(false);
                
                 
            }

            

        });
    }

    const unauthenticatedNavBar = ()=>{
        return (
            <>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>  
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>

                <Link to="/aboutus">
                    <li className="nav-item nav-link">
                        About Us
                    </li>
                </Link> 

                <Link to="/contactus">
                    <li className="nav-item nav-link">
                        Contact Us
                    </li>
                </Link>   
                
            </>
        )
    }

    const authenticatedNavBar = ()=>{
        return(
            <>
                

                {
                    user.role === "admin" ? 
                    <Link to="/admindashboard">
                        <li className="nav-item nav-link">
                            Dashboard
                        </li>
                    </Link> : null
                }
                
                {
                    user.role === "admin" ? 
                    <Link to="/admin">
                        <li className="nav-item nav-link">
                            Add Patient
                        </li>
                    </Link> : null
                }

                {
                    user.role === "admin" ? 
                    <Link to="/ViewPatient">
                        <li className="nav-item nav-link">
                            View Patient
                        </li>
                    </Link> : null
                }



                {
                    user.role === "user" ? 
                    <Link to="/dashboard">
                        <li class="nav-item nav-link">
                            Dashboard
                        </li>
                    </Link>  : null
                } 

                
                {
                    user.role === "user" ? 
                    <Link to="/MyProfile">
                        <li className="nav-item nav-link">
                            My Profile
                        </li>
                    </Link> : null
                }

                {
                    user.role === "user" ? 
                    <Link to="/MyVitals">
                        <li className="nav-item nav-link">
                            My Vitals
                        </li>
                    </Link> : null
                }

                {
                    user.role === "user" ? 
                    <Link to="/MyHistory">
                        <li className="nav-item nav-link">
                            My History
                        </li>
                    </Link> : null
                }   

               
                <button type="button" 
                        className="btn btn-link nav-item nav-link" 
                        onClick={onClickLogoutHandler}>Logout</button>
                
            </>
        )
    }
    return(
    <nav className="navbar navbar-expand-md bg-success navbar-dark fixed-top">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
        <Link to="/">
            <div className="navbar-brand">Health Care</div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
            
                { !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
            
            </ul>
        </div>
    </nav>
    
    )
}

export default Navbar;