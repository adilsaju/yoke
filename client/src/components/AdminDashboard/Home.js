import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 1000 })
      ),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 1000 })
      ),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

//doughnut - students per course
export const optionsDougnut = {
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

export const dataDougnut = {
  labels: [
    'Private Pilot, Commercial Pilot, Instrument Rating',
  ],
  datasets: [
    {
      label: 'Private Pilot',
      data: labels.map(() =>
        faker.datatype.number({ min: 0, max: 1000 })
      ),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const Home = () => {
  // return (
  //   <>
  //   <div>Charts Display Here</div>

  //   <Doughnut data={...} />
  //   </>
  // )

  return (
    <>
      <Bar options={options} data={data} />;
      <Doughnut
        options={optionsDougnut}
        data={dataDougnut}
      />
    </>
  );
};

export default Home;
