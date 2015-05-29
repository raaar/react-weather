/** @jsx React.DOM */
var React = require('react');

//http://www.alexrothenberg.com/2014/01/06/learning-d3-by-building-a-chart.js.html



var Chart = React.createClass({
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


			var hourly = dataset.hourly.data; 
			var day = _.dropRight(hourly, 24)

			console.log(dataset)
			//http://alignedleft.com/tutorials/d3/making-a-bar-chart

			//console.log(dataset.hourly.data)

			var svg = d3.select('.chart').selectAll('div')
				.data(day)
				.enter()
				.append('div')
				.attr('class', 'barRaf')
				.style('height', function(d){
					return d.apparentTemperature * 4  + 'px';
				})
				.style('background-color', function(d){
					return "rgb(0, 0, " + (Math.round(d.apparentTemperature * 2)) + ")";
				})
				.append('div')
				.attr('class', 'temperature')
				.append("text")
   				.text(function (d){
   					return Math.round(d.apparentTemperature)
   				})



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