import { Component, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Statistique = ({category})=> {
  let names = []
  let data = []
  let colors = []
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  category.map((e) => {
    names.push(e.label)
    data.push(e.modules.length)
    //colors.push("#"+Math.floor(Math.random()*(16777215*2)).toString(16))
        colors.push(getRandomColor())
})
const [chart, setChart] = useState({
  
  series:data,
  options: {
    chart: {
      width: 350,
      height:250,
      type: 'pie',
    },
    labels: names,
    responsive: [{
      breakpoint: 350,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },




})
    
      return (
      
        <div id="chart">
        <ReactApexChart options={chart.options} series={chart.series} type="pie"  width={450} height={250}/>
      </div>
      )
    
  }
  export default Statistique;