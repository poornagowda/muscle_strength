import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
//import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import { LineChart, Line, BarChart, Bar,AreaChart, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import cimage from './cimage.jpg';




  export default function AdminDashboard() {

    const {user} = useContext(AuthContext);
    const pid = user.pid;

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
   
    let one = "http://localhost:5000/user/malefemale"
    let two = "http://localhost:5000/user/age"
    let three = "http://localhost:5000/user/month"

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);


    async function getViewUsers() {
      
    
      axios.all([requestOne, requestTwo, requestThree]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responseThree = responses[2]

        console.log(responseOne, responseTwo, responseThree);
        setData(responseOne.data);
        setData1(responseTwo.data);
        setData2(responseThree.data);
        
        // use/access the results 
      })).catch(errors => {
        // react on errors.
      })

      }

    
      useEffect(() => {
        getViewUsers();
               
      }, []);


      console.log(data);
      console.log(data1);
      //var fdata=[data[0]];
      //console.log(fdata);
  
    return (
<div className="container-fluid" style={{backgroundColor:''}}>


<br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <div className="row">
    
  <div className="col-md-1"></div>    
  <div className="col-sm-9 col-md-5" style={{
        backgroundColor: 'lavender',
        
        
      }}>
      
      <ResponsiveContainer height={500}>
      
        <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid opacity={0.1} strokeDasharray="3 3" />
            <XAxis dataKey="value" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Bar dataKey="gender" fill="#8884d8" />
            <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>

      </ResponsiveContainer>
      <p>Male and Female Data</p>

      </div>

      <div className="col-md-1"></div>
      <div className="col-sm-9 col-md-5"  style={{backgroundColor: 'pink',  
        
      }}>
      <ResponsiveContainer height={500}>
      
         <AreaChart
            width={500}
            height={200}
            data={data1}
            syncId="anyId"
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
            }}
        >
            <CartesianGrid opacity={0.1} strokeDasharray="3 3" />
            <XAxis dataKey="age_grp" />
            <YAxis dataKey="value" type="number"   />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="age_grp" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>

      </ResponsiveContainer>
    
      <p>Age Group Data</p>
       
    </div>

   
  </div>


  <br/><br/><br/><br/><br/><br/><br/><br/><br/>
  <div className="row">
    
      <div className="col-md-1"></div>
    <div className="col-sm-9 col-md-5" style={{
        backgroundColor: 'lavender',
        
        
      }}>
      <ResponsiveContainer height={500}>
        <AreaChart
            width={500}
            height={200}
            data={data2}
            syncId="anyId"
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
            }}
        >
            <CartesianGrid opacity={0.1} strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis dataKey="value" type="number"  />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            <Area dataKey="Month" fill="#82ca9d" />
        </AreaChart>

      </ResponsiveContainer>
      <p>Monthly Data</p>
      </div>

      
      

   
  </div>






</div> 
    );
  }