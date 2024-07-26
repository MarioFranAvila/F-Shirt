document.addEventListener('DOMContentLoaded', function() {

    var chartDom = document.getElementById('grafico-MasVendidas');
    var myChart = echarts.init(chartDom);

    fetch('https://mariofranavila.github.io/JsonFShirt/productosMasVendidos.json') //Solicitar archivo JSON 

        .then(response => response.json())  //Convierte la respuesta de fetch en un JSON
        
        .then(data => { 

            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: data.equipos
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: data.ventas,
                    type: 'bar',
                    itemStyle: {
                        color: 'rgb(15,120,100)'
                        }
                        
                    }
    
                ]
            };

            myChart.setOption(option);

             // Función para hacer que el gráfico sea responsivo
            window.addEventListener('resize', function () {
            myChart.resize();
            });
            
        });//.the(data)
});//document.addEvent    