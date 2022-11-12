import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import {  useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext'
// import abc1 from "./abc.jpg";
// const { parse } = require();
import { parse }  from 'json2csv'




import './Home.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Last 30 days Requests',
    },
  },
};




const fetchTasks = async () => {
  let url = `/api/past30daysRequests`;
  const res = await fetch(url);
  const data = await res.json();

  console.log("hahaha",data);

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labels1 = data.map((a)=>a._id)
const labels = labels1.sort()
 
  const data2 = {
    labels,
    datasets: [
      {
        label: 'Number of students',
        data: data.map((a)=>a.count),
        backgroundColor: 'rgba(151, 205, 255)',
      }
    ],
  };


  return data2;
};




// *** dougnut chart - no. of students per course
const optionsDoughnut = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'No. of Students per Course',
    },
  },
};

const fetchDoughnut = async () => {
  let url = `/api/studentsInEachProgram`;
  const res = await fetch(url);
  const dataDoughnut = await res.json();

  


const labelsDoughnut1 = dataDoughnut.map((a)=>a._id)
const labels = labelsDoughnut1.sort()
 
  const dataDoughnut2 = {
    labels,
    datasets: [
      {
        label: 'Number of students',
        data: dataDoughnut.map((a)=>a.count),
        backgroundColor: ['rgba(0, 40, 78)',
        'rgba(151, 205, 255)',
        'rgba(254, 195, 38)'],
      }
    ],
  };


  return dataDoughnut2;
};
// end of doughnut chart


// *** pie chart - Travel Order Status
const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Travel Order Status',
    },
  },
};

const fetchPie = async () => {
  let url = `/api/todaysDecisions`;
  const res = await fetch(url);
  const dataPie = await res.json();
  console.log(dataPie);

// const labelsPie1 = dataPie.map((a)=>a._id)
// const labelsPie = labelsPie1.sort()
 
  const dataPie2 = {
    labels: ['Approved Requests', 'Pending Requests'],
    datasets: [
      {
        label: 'Number of students',
        data: [dataPie[0].isApproved, dataPie[0].isRejected],
        backgroundColor: ['rgba(0, 40, 78)',
        'rgba(254, 195, 38)'],
      }
    ],
  };
console.log("dataPie2",dataPie2);

  return dataPie2;
};
// end of doughnut pie




const Home = () => {

  const {pageTitle, setPageTitle} = useContext(UserContext)

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
}

useEffect(() => {
  setPageTitle("Dashboard")
  // let isLoggedIn  = true
  
  // if (!isLoggedIn){
  //   handleClick();
  // }
    if(!JSON.parse(localStorage.getItem("loginCredentials")).isLoggedIn){
    handleClick();
    }

}, []);


  const [data, setData] = useState(false);
  const [fileName1, setfileName1] = useState("chart1.xls");
  const [fileName2, setfileName2] = useState("chart2.xls");
  const [fileName3, setfileName3] = useState("chart3.xls");



  useEffect(() => {
    
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setData(tfs);
    };
    getTasks();
  }, []);


  //*** doughnut
  const [dataDoughnut, setDataDoughnut] = useState(false);

  useEffect(() => {
    
    const getDoughnut = async () => {
      const tfs = await fetchDoughnut();
      setDataDoughnut(tfs);
    };
    getDoughnut();
  }, []);

  //*** pie
  const [dataPie, setDataPie] = useState(false);

  useEffect(() => {
    
    const getPie = async () => {
      const tfs = await fetchPie();
      setDataPie(tfs);
    };
    getPie();
  }, []);


  function downloadAnyFile(json1, filename) {
   const report1 =  json2Report(json1)


    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report1));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

  function json2Report(json1) {
    console.log("gaaaaaaaaaaaaaaaaaaa", json1  );
    // const fields = ['datasets', 'labels'    ];
    // const opts = { fields };

    // try {
    //   const csv = parse(json1, opts);
    //   console.log(csv);
    // return   csv ;

    // } catch (err) {
    //   console.error(err);
    // return   null ;

    // }
    let report1 = ""
    for ( let i = 0 ; i< json1.labels.length; i++){
      report1+=`${json1.labels[i]}, `
    }
    report1+=`\n`

    for ( let i = 0 ; i< json1.labels.length; i++){
      report1+=`${json1.datasets[0].data[i]}, `
    }

    return report1
  }

  return ( <>
  <div className='fullpage'>
      <SideMenuAdmin/>
      <div className='division'>

        <div className='graphGrid'>

          <div className="pieChart">
          {
            dataPie && <Pie options={optionsPie} data={dataPie} />
          } 
          <button className='dBlueBtn' onClick={()=>{ downloadAnyFile(data, fileName1) }}   >
          Download Chart Report
          </button>
          </div>

          <div className="doughutChart">
          {
            dataDoughnut && <Doughnut options={optionsDoughnut} data={dataDoughnut} />
          } 
          <button className='dBlueBtn' onClick={()=>{ downloadAnyFile(dataDoughnut, fileName2) }} >
          Download Chart Report
          </button>
          </div>

          <div className="barGraph">
          {
            data && <Bar options={options} data={data} />
          } 
          <button className='dBlueBtn' onClick={()=>{ downloadAnyFile(dataPie, fileName3) }} >
          Download Chart Report
          </button>
          </div>

        </div>
          <div>
          {/* <a href="../yoke-logo.png" download>eeeee</a><br /> */}

  {/* <a href={abc1} download={fileName1}>Download chart1 report</a> <br />
  <a href={abc1} download={fileName2}>Download chart2 report</a> <br />
  <a href={abc1} download={fileName3}>Download chart3 report</a> */}
  
    
    
      
      


          </div>
      </div>
  </div>

  </>)

}

export default Home