/** @jsx React.DOM */
var React = require('react');

//var Chart = require('../components/app-chart.js');

var Chart = require('../components/app-reqwest.js');


var APP = React.createClass({
		render:function(){
			return (
				<div>
					<Chart />
				</div>
			)
		}
	})


module.exports = APP;