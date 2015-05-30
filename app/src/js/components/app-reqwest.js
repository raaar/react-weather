/** @jsx React.DOM */
var React = require('react');

//http://www.alexrothenberg.com/2014/01/06/learning-d3-by-building-a-chart.js.html



var Chart = React.createClass({

		convertTimestamp: function(unix_timestamp){
			// create a new javascript Date object based on the timestamp
			// multiplied by 1000 so that the argument is in milliseconds, not seconds
			var date = new Date(unix_timestamp*1000);
			// hours part from the timestamp
			var hours = date.getHours();
			// minutes part from the timestamp
			var minutes = "0" + date.getMinutes();
			// seconds part from the timestamp
			var seconds = "0" + date.getSeconds();

			// will display time in 10:30:23 format
			var formattedTime = hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
			

			return [hours, hours + ":"+ minutes.substr(minutes.length-2)];

		},

		getWeatherData: function(lat, lon){
			console.log(lat)
			console.log(lon)
			var key = '4f59dcd1b79c4aceab6901b0f5443daa';
			var url = 'https://api.forecast.io/forecast/'+key+'/'+lat+','+lon;
			reqwest({
				//url: 'http://filltext.com?rows=10&val={randomNumber}',
				url: url,
				type: 'jsonp',
				success: function(resp){
					document.body.className = 'loaded';
					
					this.setState({
						data: resp
					})
					
					this.renderChart(this.state.data)
					this.setState({
						summary: this.state.data.currently.summary,
						time: this.state.data.currently.time,
						icon: this.state.data.currently.icon,
						license: this.state.data.flags['metno-license']
					})
				}.bind(this)
			})
		},

		getInitialState: function() {
			return { 
				data: [],
				time: 0,
				summary: '',
				license: '',
				icon: ''
			}
		},

		componentWillMount: function(){
			//this.forecastIoJquery();
			var scope = this;
			if (navigator.geolocation) {
        		navigator.geolocation.getCurrentPosition(showPosition, handleError);
    		} else {
        		//x.innerHTML = "Geolocation is not supported by this browser.";
        		scope.getWeatherData(51.5072 , 0.1275)
    		}

    		function showPosition(position) {
    			var lat =  position.coords.latitude;
    			var lon = position.coords.longitude; 
    			scope.getWeatherData(lat, lon);
			}

			function handleError(){
				scope.getWeatherData(51.5072 , 0.1275)
			}
		},


		renderChart: function(dataset){
			//console.log(this.convertTimestamp(1432933200))

			var scope = this;

			var hourly = dataset.hourly.data; 
			var day = _.dropRight(hourly, 24)

			console.log(dataset)
			//console.log(dataset.hourly.summary)
			//http://alignedleft.com/tutorials/d3/making-a-bar-chart

			//Width and height
			var w = 1170;
			var h = 300;
			var barPadding = 1;
			
			//Create SVG element
			var svg = d3.select(".chart")
						.append("svg")
						.attr("width", w)
						.attr("height", h + 40);

				var texts = svg.selectAll("text")
				   .data(day)
				   .enter()

			svg.selectAll("rect")
			   .data(day)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / day.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d.apparentTemperature * 4 );
			   })
			   .attr("width", w / day.length - barPadding)
			   .attr("height", function(d) {
			   		return d.apparentTemperature * 4;
			   })
			   .attr("fill", function(d) {
			   		var calc = Math.round( -(d.apparentTemperature - 50) * 5)
					return "rgb(0, "
						+ (119 - calc) + 
						", " 
						+ (255 - calc) + ")";
			   })
			   

				texts
				   .append("text")
				   .text(function(d) {
				   		return Math.round(d.apparentTemperature);
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
				   		return i * (w / day.length) + (w / day.length - barPadding) / 2;
				   })
				   .attr("y", function(d) {
				   		return h - (d.apparentTemperature * 4) + 20;
				   })
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "11px")
				   .attr("fill", "white")
				   .append("text")

				texts
				   .append('text')
				   .text(function(d){
				   		var theTime = scope.convertTimestamp(d.time)
				   		return theTime[0]
				   })
				   .attr('class','time')
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
				   		return i * (w / day.length) + (w / day.length - barPadding) / 2;
				   })
				   	.attr("y", function(d) {
			   		return h + 20;
			   		})
			   	 	.attr("fill", "rgba(0,0,0,0.6)")


		},

		componentDidMount: function() {
		},

		render:function(){

	  		var skycons = new Skycons({"color": "darkgrey"});
	  		skycons.add("icon1", this.state.icon);
			skycons.play();

			return (
				<div>
					<div className="row">
						<div className="col-lg-12">
							<div className="chart"></div>
						</div>

						<div className="col-lg-3">
							<div className="iconBox">
								<canvas id="icon1" width="128" height="128"></canvas>
							</div>
						</div>

						<div className="col-lg-6">
							<h1>{this.convertTimestamp(this.state.time)[1]}</h1>
							<h1>{this.state.data.timezone}</h1>
							<h2>{this.state.summary}</h2>
						</div>
					</div>
				</div>
				)
		}
	})


module.exports = Chart;