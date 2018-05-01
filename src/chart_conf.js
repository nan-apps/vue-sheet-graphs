import ChartDataLabels from 'chartjs-plugin-datalabels';
                             
export default {    
    type: '',
    responsive: true,   
    plugins:[ ChartDataLabels ],                
    data:{
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 100, 54, 1)',
                'rgba(255, 159, 4, 1)',
                'rgba(255, 15, 6, 1)',
                'rgba(255, 59, 64, 1)',
                'rgba(255, 99, 24, 1)',
                'rgba(255, 100, 44, 1)',
                'rgba(255, 190, 14, 1)',
                'rgba(12, 167, 34, 1)',
                'rgba(23, 66, 214, 1)',
                'rgba(100, 77, 248, 1)',
                'rgba(101, 19, 102, 1)',
                'rgba(123, 91, 101, 1)',
                'rgba(23, 9, 100, 1)',
                'rgba(28, 199, 244, 1)',
                'rgba(29, 219, 244, 1)',
                'rgba(91, 100, 244, 1)',
                'rgba(32, 98, 244, 1)',
                'rgba(36, 11, 244, 1)',
                'rgba(78, 2, 76, 1)',
                'rgba(45, 3, 1, 1)',
                'rgba(21, 34, 98, 1)',
                'rgba(32, 54, 45, 1)',
                'rgba(54, 15, 21, 1)',
                'rgba(65, 17, 12, 1)',
                'rgba(12, 19, 99, 1)',
                'rgba(67, 20, 23, 1)',
                'rgba(2, 21, 11, 1)',
                'rgba(11, 21, 100, 1)',
            ],
            borderColor: [],
            borderWidth: 1,            
        }]
    },
    options: {
        plugins: {
            datalabels: {
                display: true,
                anchor: 'end',
                borderColor: 'white',
                borderRadius: 25,
                borderWidth: 2,
                color: 'white',
                backgroundColor: 'black'
            }
        },
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        },
        scales: {
            xAxes: [{
                ticks: {                    
                    beginAtZero:true,
                    stepSize:10                 
                }
            }],
            yAxes: [{
                ticks: {                    
                    beginAtZero:true,
                    stepSize:10
                }
            }]
        }
    }

}