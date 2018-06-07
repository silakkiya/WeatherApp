
var listOfTemp;
var listOfDates;
var cityName;
var cityAName;
$('#getWeatherBtn').click(function(){
    $('#chart-container').hide();
    // $('table').hide();
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
    const cityName = $('#cityInput').val();
    const cityAName = $('#cityInput1').val();
    // Hit the API
    // On Success, parse the forecast information from the response
    // and update the options in the chart
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f2b56e061daddf18ec7dfd22f33dc62e`,
        success: function(res) {
            // console.log('In first callback');
            // console.log(data);

            listOfDates = res.list.map((ele) => ele.dt);
            //console.log(listOfDates);
            listOfTemp = res.list.map((ele) => Math.round(ele.main.temp - 270));
            // console.log(listOfTemp);
        },
        error: (err) => {
            console.log('In error callback');
            console.log(err);
        }
    }),
    $.ajax({
      type: 'GET',
      url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityAName}&appid=f2b56e061daddf18ec7dfd22f33dc62e`,
      success: function(data) {
        // console.log('In second callback');
        // console.log(data);

        listOfTempA = data.list.map((ele) =>Math.round(ele.main.temp - 270));
        // console.log(listOfTempA);
        // console.log(listOfDates);
        plotChart(listOfTemp, listOfDates,listOfTempA); 
    },
     
      error: (err) => {
          console.log('In error callback');
          console.log(err);
      }
  });
  })
  const plotChart = (tempArr, datesArr,tempArrA) => {
    console.log(datesArr,tempArr,tempArrA);
    const city1 = $('#cityInput').val();
    const city2 = $('#cityInput1').val();
    $('#chart-container').show();
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
        categories: datesArr
      },
      yAxis: {
        title: {
          text:'Temperature (°C)'
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
        name: 'city1',
        data: tempArr
      }, {
        name: 'city2',
        data: tempArrA
      }]
    });
  }
  
  