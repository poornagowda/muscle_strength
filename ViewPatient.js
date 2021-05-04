import React, {useState,useEffect,useContext} from 'react';
import axios from "axios";
//import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
//import Message from '../Components/Message';
import Table from 'react-bootstrap/Table';




const ViewPatient =()=>{
    const {user} = useContext(AuthContext);
    const [data, setData] = useState([]);
    //const [q, setQ] = useState("");

    async function getViewUsers() {
        const viewUserRes = await axios.get("http://localhost:5000/user/viewAllUser");
        
        
        setData(viewUserRes.data);
      }
    
      useEffect(() => {
        getViewUsers();
      }, []);

    console.log(user.email);

    const renderUsers = (user, index) =>{
        return(
          <tr key={index}>
            <td>{user.pid}</td>
            <td>{user.name}</td>
            <td>{user.gender}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.address}</td>
            {/* <td><a href={user.pid}>Delete</a></td> */}
          </tr>
        )
    
      }
      
return(
        <div className="wrapper"><br /><br /><br /><br />
            
            
            <Table striped bordered hover variant="dark">
            
                <thead>
                <tr><h1>Patient Details</h1></tr>
                    <tr>
                       
                        <th>PID</th>
                        <th>NAME</th>
                        <th>GENDER</th>
                        <th>AGE</th>
                        <th>EMAIL ID</th>
                        <th>PHONE</th>
                        <th>ADDRESS</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderUsers)}
                </tbody>
            </Table>

        </div>

    )
}

export default ViewPatient;