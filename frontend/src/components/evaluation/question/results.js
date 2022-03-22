import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../utils/useApi";
import { useState } from "react"
import Chart from "react-apexcharts";
export default function Results({ evaluations }) {
    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: []
            },
        },
        series: [
            {
                name: "series-1",
                data:[]
            }
        ]
    })
    function setChartData(evaluation)
    { let names=[]
        let data=[]
        evaluation.submissions.map((submission, indexSub) => {
          names.push( submission.nameSubmitter)
          data.push( submission.result)
    })
    setChart.options.xaxis.categories(names)
    setChart.series.data(data)
    
    }

  
                           
                            
                    


    console.log(chart);

    return (
        <>
            <div className="container mt-5">
                <center>
                    <div className="row">
                    {evaluations &&
                evaluations.map((evaluation, indexEvs) => ( 
                            
                 
                        <div class="col-lg-6">
                 {setChartData(evaluation)} 
                  {chart.options.xaxis.categories &&  
                            <div className="mixed-chart">
                                <Chart
                                    options={chart.options}
                                    series={chart.series}
                                    type="bar"
                                    width="500"
                                />
                            </div>
                            }
                        </div>
                     ))
                             }
                    
                    </div>
                </center>
            </div>

             
       </> 
    )
}
