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
			

			return hours;

		},

		getInitialState: function() {
			return { 
				data: []
			}
		},

		componentWillMount: function(){
			//this.forecastIoJquery();
			var key = '4f59dcd1b79c4aceab6901b0f5443daa';
			var url = 'https://api.forecast.io/forecast/'+key+'/51.5072,0.1275';
			reqwest({
				//url: 'http://filltext.com?rows=10&val={randomNumber}',
				url: url,
				type: 'jsonp',
				success: function(resp){
					this.setState({
						data: resp
					})
					this.renderChart(this.state.data)
				}.bind(this)
			})
		},

		renderChart: function(dataset){
			//console.log(this.convertTimestamp(1432933200))
			var scope = this;

			var hourly = dataset.hourly.data; 
			var day = _.dropRight(hourly, 24)

			//console.log(dataset)
			//http://alignedleft.com/tutorials/d3/making-a-bar-chart

			//Width and height
			var w = 1170;
			var h = 300;
			var barPadding = 1;
			
			//var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
			//				11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
			

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
					return "rgb(0, 0, " + (Math.round(d.apparentTemperature * 2)) + ")";
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
				   		return scope.convertTimestamp(d.time)
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
				   		return i * (w / day.length) + (w / day.length - barPadding) / 2;
				   })
				   	.attr("y", function(d) {
			   		return h + 20;
			   		})
			   	 	.attr("fill", "red")





		},

		componentDidMount: function() {
		},

		render:function(){
			return (
				<div>
					<div className="chart"></div>
				</div>
				)
		}
	})


module.exports = Chart;