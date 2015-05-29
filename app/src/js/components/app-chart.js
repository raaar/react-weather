/** @jsx React.DOM */
var React = require('react');

//http://www.alexrothenberg.com/2014/01/06/learning-d3-by-building-a-chart.js.html



var Chart = React.createClass({
		getData: function(){

			var xmlhttp = new XMLHttpRequest();

			var key = '?APPID=99216ab3558e281946e4342768aeed9b';
			var url = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139'

			var weatherData;

			var temp; 
			var scope = this;
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			        var weatherData = JSON.parse(xmlhttp.responseText);
			        //myFunction(myArr);
			        //console.log(weatherData.main.temp)
			        temp = weatherData.main.temp - 273.15;
			        console.log(temp)

			        scope.setState({temperature: temp});

			    }
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		},


		forecastIo: function(){

			var xmlhttp = new XMLHttpRequest();

			var key = '4f59dcd1b79c4aceab6901b0f5443daa';
			var url = 'https://api.forecast.io/forecast/'+key+'/37.8267,-122.423';
			var weatherData;

			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			        var weatherData = JSON.parse(xmlhttp.responseText);
			        console.log(weatherData)
			    }
			}
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		},

		forecastIoJquery: function(){
			var key = '4f59dcd1b79c4aceab6901b0f5443daa';
			var url = 'https://api.forecast.io/forecast/'+key+'/37.8267,-122.423';
			
			var scope = this;

		    $.ajax({
		        url: url,
		        dataType: 'JSONP',
		        type: 'GET',
		        success: function (data) {
		            console.log(data)
		            console.log(data.daily.data[0].apparentTemperatureMax)
		            scope.setState({
		            	forecastData: data,
		            	temp: data.daily.data[0].apparentTemperatureMax
		            })

		        }, error: function(e) {
		        	// Handle error
		        }
		    });

		},

		getInitialState: function() {
			return { 
				forecastData: '',
				temp: 0
			}
		},

		componentWillMount: function(){
			this.forecastIoJquery();
		},

		componentDidMount: function() {
		    //console.log(this.state.forecastData)
		},

		render:function(){

			console.log(this.state.temp)


var data = [{"letter":"A","frequency": this.state.temp},
			{"letter":"B","frequency":".01492"}];


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  	x.domain(data.map(function(d){ return d.letter}));
  	y.domain([0, d3.max(data, function(d){return d.frequency})]);




  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });


function type(d) {
  d.frequency = +d.frequency;
  return d;
}

/*  
 
Get Data
----------------------------------------------------------     */



//http://api.openweathermap.org/data/2.5/weather?q=London&mode=json&units=metric








			return (
				<div>
				</div>
				)
		}
	})


module.exports = Chart;