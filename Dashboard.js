import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
//import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { LineChart, Line, AreaChart, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



  
  export default function Dashboard() {

    const {user} = useContext(AuthContext);
    const pid = user.pid;

    const [data, setData] = useState([]);

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


      console.log(data);
      var fdata=[data[0]];
      console.log(fdata);
  
    return (
    <div>
    
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div style={{
        backgroundColor: 'white'
        
        
      }}>
      <ResponsiveContainer width="100%" height={500}>
      {/* <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0, 600]} />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="muscle_strength" stroke="#82ca9d" />
      </LineChart> */}

      
        <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis type="number" domain={[0, 600]}  />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="muscle_strength" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>

      </ResponsiveContainer>

       
      </div>
              
      </div>   
    );
  }