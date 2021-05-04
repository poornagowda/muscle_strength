import React, {useState,useEffect,useContext, Button} from 'react';
import axios from "axios";
//import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
//import Message from '../Components/Message';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';




const MyVitals =()=>{
    const {user} = useContext(AuthContext);
    //const email = user.email;
    const pid = user.pid;
    
    

    const [data, setData] = useState([]);
    
    //const [q, setQ] = useState("");
     const [show, setShow] = useState(true);
   
    
    

    async function getViewUsers() {
        const viewUserRes = await axios.get('http://localhost:5000/user/viewOneUserVitals', {
            params: {
              pid: pid
            }
          });
        
        
        setData(viewUserRes.data);
        
        
      }
    
    
      useEffect(() => {
        getViewUsers();

      },[] );

    
    
      
             
    const renderUsers = (user,index) =>{
        return(

        
         <tr key={index}>
            <td>{user.pid}</td>
            <td>{user.name}</td>
            <td>{user.muscle_strength}</td>
            <td>{user.date}</td>
            <td>

            {user.muscle_strength > 200 &&
              <h5 style={{color:'green'}}>
                NORMAL
              </h5>
              
            }

            {user.muscle_strength < 200 &&
              
              <h5 style={{color:'red'}}>
                LOW
              </h5>
            }

            </td>
            
            {/* <td><a href={user.pid}>Delete</a></td> */}
          </tr>

        )
    
      }




      const renderUsers1 = (user,index) =>{

        if(show){

          return(

            <div>
              
              {user.muscle_strength > 200 &&
                  <Alert variant="success" onClose={() => setShow(false)} dismissible>
                  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                      <p>
                        your muscle strength is good and your healthy
                      </p>
                      <hr />
                      <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice
                        and tidy.
                      </p>
                  
                  </Alert>
                  
                }
    
                {user.muscle_strength < 200 &&
                  
                  <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                  <Alert.Heading> fermentum.Oh snap! You got an error!</Alert.Heading>
                      <p>
                        your muscle strength is low,please have a balanced diet and some physical activities
                      </p>
                      <hr />
                      <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice
                        and tidy.
                      </p>
                  
                  </Alert>
                }              
            </div>
  
          )

        }
        
    
      }



      
      
return(

  <div>

       
        <div className="wrapper"><br /><br /><br /><br />
            

           
                
              
                    {data.map(renderUsers1)}
           


        
            <Table striped bordered hover variant="dark">
                <thead>
                <tr><h1>My Vitals(Latest)</h1></tr>
                    <tr>
                       
                        <th>PID</th>
                        <th>NAME</th>
                        <th>Muscle Strength</th>
                        <th>Date</th>
                        <th>Status</th>
                        
                        
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

export default MyVitals;