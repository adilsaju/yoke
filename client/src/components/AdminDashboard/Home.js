import React from 'react'
import { useState,useEffect } from 'react';
import SideMenuAdmin from '../Navbar/SideMenuAdmin';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
  let url = `/past30daysRequests`;
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
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };


  return data2;
};


const Home = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setData(tfs);
    };
    getTasks();
  }, []);

  return ( <>
  <SideMenuAdmin/>
  {
    
 data && <Bar options={options} data={data} />
  } 
  </>)

}

export default Home