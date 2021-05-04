import React, {useState,useEffect,useContext} from 'react';
import axios from "axios";
//import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
//import Message from '../Components/Message';
import Table from 'react-bootstrap/Table';






const MyHistory =()=>{
    const {user} = useContext(AuthContext);
    const pid = user.pid;




    const [data, setData] = useState([]);
    //const [q, setQ] = useState("");

    async function getViewUsers() {
        const viewUserRes = await axios.get('http://localhost:5000/user/viewAll', {
            params: {
              pid: pid
            }
          });
        
        
        setData(viewUserRes.data);
      }
    
      useEffect(() => {
        getViewUsers();
      }, []);

    console.log(user.email);

    const renderUsers = (user, index) =>{
        return(
          <tr key={index}>
            <td>{user.date}</td>
            <td>{user.muscle_strength}</td>
           
            {/* <td><a href={user.pid}>Delete</a></td> */}
          </tr>
        )
    
      }
      
return(
    <div>
        <div className="wrapper"><br /><br /><br /><br />
            
            
            <Table striped bordered hover variant="dark">
            
                <thead>
                <tr><h1>My History</h1></tr>
                    <tr>
                       
                        <th>DATE</th>
                        <th>MUSCLE STRENGTH</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderUsers)}
                </tbody>
            </Table>

        </div>

        
    
    </div>

    )
}

export default MyHistory;