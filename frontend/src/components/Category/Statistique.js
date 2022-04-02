import { Component, useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const Statistique = ({category})=> {
    const options1 = [];
    const series1= [];
    useEffect(() => {
       
        category.map((e)=>{
            options1.push(e.label)
            series1.push(e.modules.length)
           
        })
        console.log(options1)
        console.log(series1)
       
        },[]);
    const [options, setOptions] = useState(
        {
            chart: {
              id: 'apexchart-example'
            },
            xaxis: {
            //  categories:[options1]
            categories:['informatique', 'marketing', 'langue', 'Design']
            }
          }
    );
    const [series, setSeries] = useState(
        [{
            name: 'Nb° modules ',
            data:[3, 2, 2, 1]
            //data:[series1]
          }]
    );
    
      return (
        <div className="col-12 col-lg-4 mt-4">
        <Chart options={options} series={series} type="bar" width={350} height={250} />
        </div>
      )
    
  }
  export default Statistique;