import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../utils/useApi";
import { useEffect, useState } from "react"
import Chart from "react-apexcharts";
export default function Result({ evaluation }) {

    let names = []
    let data = []
    let nSubmissers = [0,0,0,0,0]
    let colors = []
    var n=0;
    
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    evaluation.submissions.map((submission) => {
        names.push(submission.nameSubmitter)
        data.push(Math.round(submission.result))
        //colors.push("#"+Math.floor(Math.random()*(16777215*2)).toString(16))
        
  
            colors.push(getRandomColor())
    })
    for (let i in data)
    {console.log(data[i])
       nSubmissers[data[i]-1]=nSubmissers[data[i]-1]+1
  }


    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"]
                
            },
     
            
            yaxis: { 
                min: 0, 
                max: 5, 
                tickAmount: 5 
            },
            colors: ["#4AB70E","#7BCA52","#FFBF32","#EC611F","#8B0000"],
            plotOptions: {
                bar: {
                    distributed: true
                }
            }
        },
        series: [
            {
                name: "value",
                data: nSubmissers.reverse(),
            }
        ]

    })
   return (
        <>
            {
                <div className="mixed-chart" style={{marginBottom:"8%"}}>
                    <Chart
                        colors={chart.options.colors}
                        options={chart.options}
                        series={chart.series}
                        type="bar"
                        width="500"    />
                </div>
            }
        </>
    )
}
