import React, { Component } from 'react'
import Chart from "chart.js"; 

class LineGraph extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: { 
                labels: this.props.labels,
                datasets: [
                    {
                        label: "Valores",
                        data: this.props.data,
                    }
                ]
            }
        });
    }
    render() {
        return (
            <div className="graphContainer">
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default LineGraph;