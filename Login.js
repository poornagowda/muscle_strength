import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import {Link} from 'react-router-dom';

const Login = props=>{
    const [user,setUser] = useState({username: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    

   

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                setMessage(message);
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push('/');
            }
            else
                setMessage(message);
                
                

                
        });
    }



    return(
        <div className="wrapper"><br /><br /><br /><br /><br />
            <form onSubmit={onSubmit} className="form-signin">
            
                <h3 className="form-signin-heading text-center">Admin/Patient Login</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Email"
                       required="required"
                       />
                <br></br>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password" 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"
                       required="required"
                       />
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Log in </button>
                <Link to="/resetPass">
                    <li className="nav-item nav-link">
                        Reset Password
                    </li>
                </Link>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Login;