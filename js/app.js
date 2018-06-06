

$('#getWeatherBtn').click(function(){
    $('#chart-container').hide();
    $('table').hide();
    console.log('Button clicked');
    const cityName = $('#cityInput').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f2b56e061daddf18ec7dfd22f33dc62e`,
        success: function(data){
            console.log('In success callback');
            console.log(data);
            const currentTemp = Math.round(data.main.temp - 270);
            const currentPressure = data.main.pressure;
            const humidity = data.main.humidity;
            $('#currentTemperature').html(currentTemp);
            $('#currentPressure').html(currentPressure);
            $('#currentHumidity').html(humidity);
            $('table').show();
        },
        error: function(err){
            console.log('In error callback');
            console.log(err);
        }
    });
})

$('#getWeatherBtn').click(function(){
     $('#chart-container').hide();
    //$('#chart-container').hide();
    $('table').hide();
    console.log('Button clicked');
    const cityAName = $('#cityInput1').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityAName}&appid=f2b56e061daddf18ec7dfd22f33dc62e`,
        success: function(data){
            console.log('In success callback');
            console.log(data);
            const currentATemp = Math.round(data.main.temp - 270);
            const currentAPressure = data.main.pressure;
            const Ahumidity = data.main.humidity;
            $('#currentATemperature').html(currentATemp);
            $('#currentAPressure').html(currentAPressure);
            $('#currentAHumidity').html(Ahumidity);
            $('table').show();
        },
        error: function(err){
            console.log('In error callback');
            console.log(err);
        }
    });
})


$('#getForecastBtn').click(function() {
    $('table').hide();
    $('chart-container').hide();
    const cityName = $('#cityInput').val();
    // Hit the API
    // On Success, parse the forecast information from the response
    // and update the options in the chart
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f2b56e061daddf18ec7dfd22f33dc62e`,
        success: function(data) {
            console.log('In success callback');
            console.log(data);

            listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            console.log(listOfDates);
            listOfTemp = data.list.map(ele => Math.round(ele.main.temp - 270));
            console.log(listOfTemp);
            plotChart(listOfTemp, listOfDates);
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    });
})


Highcharts.chart('chart-container', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Next 5 days Temperature'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: '#getWeatherBtn(${cityName})',
      data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
  });