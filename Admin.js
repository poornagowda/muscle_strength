import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';


const Register = props=>{
    const [user,setUser] = useState({pid: "",name: "",gender: "",age: "",mobile: "",address: "", email: "", password : "", role : "user"});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({pid: "",name : "",gender : "",age : "",mobile: "",address : "",email : "", password : "",role : "user"});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
        <div className="wrapper"><br /><br /><br /><br />
            <form onSubmit={onSubmit} className="form-signin">
                <h3 className="form-signin-heading text-center">Add Patient</h3><br/>

                <label htmlFor="pid" className="sr-only">Patient ID: </label>
                <input type="text" 
                       name="pid" 
                       value={user.pid}
                       onChange={onChange} 
                       className="form-control"
                       pattern="(?=.*\d).{4}" 
                       title="Patient Id should be 4 digit"
                       placeholder="Enter patient id"/>
                <br></br>

                <label htmlFor="name" className="sr-only">Name: </label>
                <input type="text" 
                       name="name" 
                       value={user.name}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter name"/>
                <br></br>

                {/* <label htmlFor="gender" className="sr-only">Gender: </label>
                <input type="text" 
                       name="gender" 
                       value={user.gender}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Gender"/>
                <br></br> */}

                <label htmlFor="gender" className="sr-only">Gender: </label>
                <select name="gender" onChange={onChange} className="form-control">
                    <option>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <br></br>


                <label htmlFor="age" className="sr-only">Age: </label>
                <input type="text" 
                       name="age" 
                       value={user.age}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Age"/>
                <br></br>

                
                <label htmlFor="mobile" className="sr-only">Mobile: </label>
                <input type="text" 
                       name="mobile" 
                       value={user.mobile}
                       onChange={onChange} 
                       className="form-control" 
                       pattern="(?=.*\d).{10}" 
                       title="Mobile no should be 10 digit"
                       placeholder="Enter mobile number"/>
                <br></br>

                <label htmlFor="address" className="sr-only">Address: </label>
                <input type="text" 
                       name="address" 
                       value={user.address}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter address"/>
                <br></br>

                <label htmlFor="email" className="sr-only">Email Id: </label>
                <input type="email" 
                       name="email" 
                       value={user.email}
                       onChange={onChange} 
                       className="form-control"
                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" 
                       title="Insert valid email id" 
                       placeholder="Enter Email"/>
                <br></br>
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <br></br>
                {/* <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/> */}
                <button className="btn btn-primary btn-lg btn-block" 
                        type="submit">Save</button>
            </form>
            {message ? <Message message={message}/> : null}

        </div>

    )
}

export default Register;