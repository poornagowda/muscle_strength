import React, {useState,useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import {Link} from 'react-router-dom';

const ResetPass = props=>{
    const [user,setUser] = useState({pid: "", email: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    

   

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.resetpass(user).then(data=>{
            const { message } = data;
            setMessage(message);
            
            
        });
    }



    return(
        <div className="wrapper"><br /><br /><br /><br /><br />
            <form onSubmit={onSubmit} className="form-signin">
            
                <h3 className="form-signin-heading text-center">Reset your password</h3>
                <label htmlFor="pid" className="sr-only">PID: </label>
                <input type="text" 
                       name="pid" 
                       value={user.pid}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Your PID"
                       required="required"
                       />
                <br></br>

                <label htmlFor="email" className="sr-only">Email: </label>
                <input type="text" 
                       name="email" 
                       value={user.email}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Your Email"
                       required="required"
                       />
                <br></br>
                <label htmlFor="password" className="sr-only">New Password: </label>
                <input type="password" 
                       name="password" 
                       value={user.password}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter New Password"
                       required="required"
                       />
                <br></br>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Update </button>
                <Link to="/">
                    <li className="nav-item nav-link">
                        Back
                    </li>
                </Link>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default ResetPass;