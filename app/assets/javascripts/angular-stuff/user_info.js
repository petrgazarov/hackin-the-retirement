var app = angular.module('myApp', []);
app.controller('financeUser',
  ["$scope", '$http', function($scope, $http, $cacheFactory) {
    $scope.financial_standing = "Healthy";
    $scope.financial_risk = false;
    $scope.risk_end_date = "";
    $scope.finance = {
      financial_standing: "Healthy",
      financial_risk: false,
      financial_recommendations: []
    };
    /*
     * {
     *  type: string,
     *  advice: string,
     * }
     */
    $scope.recommendations = [];
    $scope.update_fin_summary = function() {
      switch ($scope.financial_standing) {
        case ('Healthy'):
          $scope.finance.financial_risk = false;
          break;
        default:
          $scope.finance.financial_risk = true;
          break;
      }
      if ($scope.finance.financial_risk === true) {
        $scope.calculate_end_date();
      }
      $scope.safeApply();
    };
    $scope.get_icon = function(type) {
      var icon = "";
      console.log(type);
      switch (type) {
        case ('mortgage'):
          icon = "fa-fort-awesome";
          break;
        case ('budget'):
          icon = "fa-money";
          break;
        case ('insurance'):
          icon = 'fa-handshake-o';
          break;
      }
      return icon;
    };
    $scope.calculate_end_date = function() {
      $scope.finance.financial_recommendations.push({
        type: 'mortgage',
        advice: 'Real Estate',
        description: 'Mortgage real estate'
      });
      $scope.finance.financial_recommendations.push({
        type: 'budget',
        advice: 'Follow Budget',
        // Make href
        description: 'Follow the recommended budget'
      });
      $scope.finance.financial_recommendations.push({
        type: 'insurance',
        advice: 'Insurance',
        description: 'Get recommended insurance'
      });
      $scope.safeApply();
    };
    $scope.assets = {
      "2016": [
        {
          "label": "house",
          "value": 125000
        },
        {
          "label": "car",
          "value": 250000
        },
        {
          "label": "yacht",
          "value": 2500000
        }
      ],
      "2017": [
        {
          "label": "house",
          "value": 250000
        },
        {
          "label": "car",
          "value": 50000
        },
        {
          "label": "yacht",
          "value": 1234567
        },
        {
          "label": "child",
          "value": 112837
        }
      ]
    };
//     var svg = d3.select("#assetsProfile");
//
// svg.append("g")
// 	.attr("class", "slices");
// svg.append("g")
// 	.attr("class", "labels");
// svg.append("g")
// 	.attr("class", "lines");
//
// var width = 300,
//     height = 150,
// 	radius = Math.min(width, height) / 2;
//
// var pie = d3.layout.pie()
// 	.sort(null)
// 	.value(function(d) {
// 		return d.value;
// 	});
//
// var arc = d3.svg.arc()
// 	.outerRadius(radius * 0.8)
// 	.innerRadius(radius * 0.4);
//
// var outerArc = d3.svg.arc()
// 	.innerRadius(radius * 0.9)
// 	.outerRadius(radius * 0.9);
//
// svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//
// var key = function(d){ return d.data.label; };
//
// var color = d3.scale.category20()
// 	.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"]);
// 	//.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
// function randomData (){
// 	var labels = color.domain();
// 	return labels.map(function(label){
// 		return { label: label, value: Math.random() };
// 	}).filter(function() {
// 		return Math.random() > 0.5;
// 	}).sort(function(a,b) {
// 		return d3.ascending(a.label, b.label);
// 	});
// }
//
// change(randomData());
//
// d3.select(".randomize")
// 	.on("click", function(){
// 		change(randomData());
// 	});
//
// function mergeWithFirstEqualZero(first, second){
// 	var secondSet = d3.set(); second.forEach(function(d) { secondSet.add(d.label); });
//
// 	var onlyFirst = first
// 		.filter(function(d){ return !secondSet.has(d.label); })
// 		.map(function(d) { return {label: d.label, value: 0}; });
// 	return d3.merge([ second, onlyFirst ])
// 		.sort(function(a,b) {
// 			return d3.ascending(a.label, b.label);
// 		});
// }
//
// function change(data) {
// 	var data0 = svg.select(".slices").selectAll("path.slice")
// 		.data().map(function(d) { return d.data; });
// 	if (data0.length === 0) { data0 = data; }
// 	var was = mergeWithFirstEqualZero(data, data0);
// 	var is = mergeWithFirstEqualZero(data0, data);
//
// 	/* ------- SLICE ARCS -------*/
//
// 	var slice = svg.select(".slices").selectAll("path.slice")
// 		.data(pie(was), key);
//
// 	slice.enter()
// 		.insert("path")
// 		.attr("class", "slice")
// 		.style("fill", function(d) { return color(d.data.label); })
// 		.each(function(d) {
// 			this._current = d;
// 		});
//
// 	slice = svg.select(".slices").selectAll("path.slice")
// 		.data(pie(is), key);
//
// 	slice
// 		.transition().duration(1000)
// 		.attrTween("d", function(d) {
// 			var interpolate = d3.interpolate(this._current, d);
// 			var _this = this;
// 			return function(t) {
// 				_this._current = interpolate(t);
// 				return arc(_this._current);
// 			};
// 		});
//
// 	slice = svg.select(".slices").selectAll("path.slice")
// 		.data(pie(data), key);
//
// 	slice
// 		.exit().transition().delay(1000).duration(0)
// 		.remove();
//
// 	/* ------- TEXT LABELS -------*/
//
// 	var text = svg.select(".labels").selectAll("text")
// 		.data(pie(was), key);
//
// 	text.enter()
// 		.append("text")
// 		.attr("dy", ".35em")
// 		.style("opacity", 0)
// 		.text(function(d) {
// 			return d.data.label;
// 		})
// 		.each(function(d) {
// 			this._current = d;
// 		});
//
// 	function midAngle(d){
// 		return d.startAngle + (d.endAngle - d.startAngle)/2;
// 	}
//
// 	text = svg.select(".labels").selectAll("text")
// 		.data(pie(is), key);
//
// 	text.transition().duration(1000)
// 		.style("opacity", function(d) {
// 			return (d.data.value == 0) ? 0 : 1;
// 		})
// 		.attrTween("transform", function(d) {
// 			var interpolate = d3.interpolate(this._current, d);
// 			var _this = this;
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				_this._current = d2;
// 				var pos = outerArc.centroid(d2);
// 				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
// 				return "translate("+ pos +")";
// 			};
// 		})
// 		.styleTween("text-anchor", function(d){
// 			var interpolate = d3.interpolate(this._current, d);
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				return midAngle(d2) < Math.PI ? "start":"end";
// 			};
// 		});
//
// 	text = svg.select(".labels").selectAll("text")
// 		.data(pie(data), key);
//
// 	text
// 		.exit().transition().delay(1000)
// 		.remove();
//
// 	/* ------- SLICE TO TEXT POLYLINES -------*/
//
// 	var polyline = svg.select(".lines").selectAll("polyline")
// 		.data(pie(was), key);
//
// 	polyline.enter()
// 		.append("polyline")
// 		.style("opacity", 0)
// 		.each(function(d) {
// 			this._current = d;
// 		});
//
// 	polyline = svg.select(".lines").selectAll("polyline")
// 		.data(pie(is), key);
//
// 	polyline.transition().duration(1000)
// 		.style("opacity", function(d) {
// 			return (d.data.value == 0) ? 0 : 0.5;
// 		})
// 		.attrTween("points", function(d){
// 			this._current = this._current;
// 			var interpolate = d3.interpolate(this._current, d);
// 			var _this = this;
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				_this._current = d2;
// 				var pos = outerArc.centroid(d2);
// 				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
// 				return [arc.centroid(d2), outerArc.centroid(d2), pos];
// 			};
// 		});
//     polyline = svg.select(".lines").selectAll("polyline")
//     .data(pie(data), key);
//
//     polyline
//     .exit().transition().delay(1000)
//     .remove();
//   }
//   var curr_date = new Date();
//   var label = svg.append("text")
//       .attr("class", "year label")
//       .attr("text-anchor", "end")
//       .attr("y", height - 24)
//       .attr("x", width)
//       .text(parseInt(curr_date.getFullYear()));
//
//       // Add an overlay for the year label.
//     var box = label.node().getBBox();
//
//     var overlay = svg.append("rect")
//           .attr("class", "overlay")
//           .attr("x", box.x)
//           .attr("y", box.y)
//           .attr("width", box.width)
//           .attr("height", box.height)
//           .on("mouseover", enableInteraction);
//
//           // Start a transition that interpolates the data based on year.
//          svg.transition()
//              .duration(30000)
//              .ease("linear")
//              .tween("year", tweenYear)
//              .each("end", enableInteraction);
//
//              // After the transition finishes, you can mouseover to change the year.
//              function enableInteraction() {
//                var yearScale = d3.scale.linear()
//                    .domain([1800, 2009])
//                    .range([box.x + 10, box.x + box.width - 10])
//                    .clamp(true);
//
//                // Cancel the current transition, if any.
//                svg.transition().duration(0);
//
//                overlay
//                    .on("mouseover", mouseover)
//                    .on("mouseout", mouseout)
//                    .on("mousemove", mousemove)
//                    .on("touchmove", mousemove);
//
//                function mouseover() {
//                  label.classed("active", true);
//                }
//
//                function mouseout() {
//                  label.classed("active", false);
//                }
//
//                function mousemove() {
//                  displayYear(yearScale.invert(d3.mouse(this)[0]));
//                }
//              }
//              function tweenYear() {
//                var curr_year = curr_date.getFullYear();
//   var year = d3.interpolateNumber(curr_year, curr_year + 20);
//   return function(t) { displayYear(year(t)); };
//   // Updates the display to show the specified year.
// }
// function displayYear(year) {
//   svg.data(interpolateData(year), key).call(position).sort(order);
//   label.text(Math.round(year));
// }
//
// // Interpolates the dataset for the given (fractional) year.
// function interpolateData(year) {
//   var labels = color.domain();
//   return labels.map(function(d) {
//     return {
//       label: label,
//       value: Math.random()
//     };
//   });
// }
//
var curr_year = new Date();
curr_year = curr_year.getFullYear();
var width = 800,
    height = 250,
    radius = Math.min(width, height) / 2;
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });


var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "pieChart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
    .data(pie($scope.assets[curr_year]))
    .enter()
    .append("path");

path.transition()
    .duration(500)
    .attr("fill", function(d, i) {
        return color(d.data.label);
    })
    .attr("d", arc)
    .each(function(d) {
        this._current = d;
    }); // store the initial angles

$scope.change = function change(year=0) {
    year = parseInt(curr_year) + parseInt(year);
    console.log($scope.assets);
    console.log(year);
    var data = $scope.assets[year.toString()];
    console.log(data);
    if (data != null) {
      path.data(pie(data));
      path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
    }
};

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}

// function drawAnimatedRingChart() {
//     var pie = d3.layout.pie().value(function (d) {
//         return d.count;
//     });
// }
// var color = d3.scale.category10();
// var arc = d3.svg.arc();
// var outerRadius = radius * 0.8;
// var innerRadius = radius * 0.4;
// arc.outerRadius(radius * 0.8)
// 	.innerRadius(radius * 0.4);
//
// // d3.select('#assetsProfile').selectAll('g').remove();
// var svg = d3.select('#assetsProfile')
//     .attr({
//         width : width,
//         height: height
//     });
//
// // Add the groups that will hold the arcs
// var groups = svg.selectAll('g')
//     .data(pie($scope.assets)) // Data binding
//     .enter()
//     .append('g')
//     .attr({
//         'class': 'arc',
//         'transform': 'translate(' + outerRadius + ', ' + outerRadius + ')'
//     });
//
// // Create the actual slices of the pie
// groups.append('path')
//     .attr({
//         'fill': function (d, i) {
//             return color(i);
//         },
//         'd': arc
//     });
//
// function tweenPie(finish) {
//   var start = {
//       startAngle: 0,
//       endAngle: 0
//   };
//   var interpolator = d3.interpolate(start, finish);
//   return function(d) { return arc(interpolator(d)); };
// }
// groups.append('path')
//     .attr({
//         'fill': function (d, i) {
//             return color(i);
//         }
//     })
//     .transition()
//     .duration(duration || 1000)
//     .attrTween('d', tweenPie);
//
// groups.append('text')
//     .attr({
//         'text-anchor': 'middle',
//         'transform': function (d) {
//             return 'translate(' + arc.centroid(d) + ')';
//         }
//     })
//     .text(function (d) {
//         // Notice the usage of d.data to access the raw data item
//         return d.data.label;
//     });
//
// // This function helps you figure out when all
// // the elements have finished transitioning
// // Reference: https://groups.google.com/d/msg/d3-js/WC_7Xi6VV50/j1HK0vIWI-EJ
// function checkEndAll(transition, callback) {
//     var n = 0;
//     transition
//     .each(function() { ++n; })
//     .each("end", function() {
//         if (!--n) callback.apply(this, arguments);
//     });
// }
//
// function drawAnimatedRingChart() {
//     groups.append('path')
//     .attr({
//         'fill': function (d, i) {
//             return color(i);
//         }
//     })
//     .transition()
//     .duration(1000)
//     .attrTween('d', tweenPie)
//     .call(checkEndAll, function () {
//         // Finally append the title of the text to the node
//         groups.append('text')
//         .attr({
//             'text-anchor': 'middle',
//             'transform': function (d) {
//                 return 'translate(' + arc.centroid(d) + ')';
//             }
//         })
//         .text(function (d) {
//             // Notice the usage of d.data to access the raw data item
//             return d.data.label;
//         });
//     });
//     }

//     var pie = d3.layout.pie()
//     .sort(null)
//     .value(function(d) {
//       return d.value;
//     });
//     var svg = d3.select('#assetsProfile').append('g');
//     svg.append("g")
//     	.attr("class", "slices");
//     svg.append("g")
//     	.attr("class", "labels");
//     svg.append("g")
//     	.attr("class", "lines");
//     var width = 300,
//         height = 150,
// 	      radius = Math.min(width, height) / 2;
//
//     var arc = d3.svg.arc()
//     	.outerRadius(radius * 0.8)
//     	.innerRadius(radius * 0.4);
//
//     var outerArc = d3.svg.arc()
//     	.innerRadius(radius * 0.9)
//     	.outerRadius(radius * 0.9);
//
//     svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//     var key = function(d){ return d.label; };
//
//     var color = d3.scale.ordinal()
//     	.domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
//     	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
//       function mergeWithFirstEqualZero(first, second){
//       	var secondSet = d3.set(); second.forEach(function(d) { secondSet.add(d.label); });
//
//       	var onlyFirst = first
//       		.filter(function(d){ return !secondSet.has(d.label); })
//       		.map(function(d) { return {label: d.label, value: 0}; });
//       	return d3.merge([ second, onlyFirst ])
//       		.sort(function(a,b) {
//       			return d3.ascending(a.label, b.label);
//       		});
//       }
// function change() {
//   var labels = color.domain();
// 	return labels.map(function(label){
// 		return { label: label, value: Math.random() }
// 	}).filter(function() {
// 		return Math.random() > .5;
// 	}).sort(function(a,b) {
// 		return d3.ascending(a.label, b.label);
// 	});
//   /* ------- PIE SLICES -------*/
//   var slice = svg.select(".slices").selectAll("path.slice")
//   .data(pie($scope.assets), key);
//
//   var duration = +document.getElementById("duration").value;
// 	var data0 = svg.select(".slices").selectAll("path.slice")
// 		.data().map(function(d) { return d.data });
// 	if (data0.length == 0) data0 = data;
// 	var was = mergeWithFirstEqualZero(data, data0);
// 	var is = mergeWithFirstEqualZero(data0, data);
//
//   slice.enter()
//   	.insert("path")
//   	.style("fill", function(d) { return color(d.label); })
//   	.attr("class", "slice");
//
//   slice
//   	.transition().duration(1000)
//   	.attrTween("d", function(d) {
//   		this._current = this._current || d;
//   		var interpolate = d3.interpolate(this._current, d);
//   		this._current = interpolate(0);
//   		return function(t) {
//   			return arc(interpolate(t));
//   	   };
//   });
//   slice.exit()
// 		.remove();
//
// 	/* ------- TEXT LABELS -------*/
//
// 	var text = svg.select(".labels").selectAll("text")
// 		.data(pie($scope.assets), key);
//
// 	text.enter()
// 		.append("text")
// 		.attr("dy", ".35em")
// 		.text(function(d) {
// 			return d.label;
// 		});
//
// 	function midAngle(d){
// 		return d.startAngle + (d.endAngle - d.startAngle)/2;
// 	}
//
// 	text.transition().duration(1000)
// 		.attrTween("transform", function(d) {
// 			this._current = this._current || d;
// 			var interpolate = d3.interpolate(this._current, d);
// 			this._current = interpolate(0);
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				var pos = outerArc.centroid(d2);
// 				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
// 				return "translate("+ pos +")";
// 			};
// 		})
// 		.styleTween("text-anchor", function(d){
// 			this._current = this._current || d;
// 			var interpolate = d3.interpolate(this._current, d);
// 			this._current = interpolate(0);
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				return midAngle(d2) < Math.PI ? "start":"end";
// 			};
// 		});
//
// 	text.exit()
// 		.remove();
//
// 	/* ------- SLICE TO TEXT POLYLINES -------*/
//
// 	var polyline = svg.select(".lines").selectAll("polyline")
// 		.data(pie($scope.assets), key);
//
// 	polyline.enter()
// 		.append("polyline");
//
// 	polyline.transition().duration(1000)
// 		.attrTween("points", function(d){
// 			this._current = this._current || d;
// 			var interpolate = d3.interpolate(this._current, d);
// 			this._current = interpolate(0);
// 			return function(t) {
// 				var d2 = interpolate(t);
// 				var pos = outerArc.centroid(d2);
// 				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
// 				return [arc.centroid(d2), outerArc.centroid(d2), pos];
// 			};
// 		});
//
// 	polyline.exit()
// 		.remove();
// }
// // Add the year label; the value is set on transition.
// var label = svg.append("text")
//     .attr("class", "year label")
//     .attr("text-anchor", "end")
//     .attr("y", height - 24)
//     .attr("x", width)
//     .text(2016);
//     function x(d) { return d.income; }
// function y(d) { return d.lifeExpectancy; }
// function radius(d) { return d.population; }
// function color(d) { return d.region; }
// function key(d) { return d.name; }
//
// // Chart dimensions.
// var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
//     width = 960 - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// // Various scales. These domains make assumptions of data, naturally.
// var xScale = d3.scale.log().domain([300, 1e5]).range([0, width]),
//     yScale = d3.scale.linear().domain([10, 85]).range([height, 0]),
//     radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
//     colorScale = d3.scale.category10();
//
// xScale(0);
//
// // The x & y axes.
// var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d")),
//     yAxis = d3.svg.axis().scale(yScale).orient("left");
//
// // Create the SVG container and set the origin.
// var svg = d3.select("#chart").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // Add the x-axis.
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xAxis);
//
// // Add the y-axis.
// svg.append("g")
//     .attr("class", "y axis")
//     .call(yAxis);
//
// // Add an x-axis label.
// svg.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width)
//     .attr("y", height - 6)
//     .text("income per capita, inflation-adjusted (dollars)");
//
// // Add a y-axis label.
// svg.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", 6)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .text("life expectancy (years)");
//
// // Add the year label; the value is set on transition.
// var label = svg.append("text")
//     .attr("class", "year label")
//     .attr("text-anchor", "end")
//     .attr("y", height - 24)
//     .attr("x", width)
//     .text(1800);
//
// // Load the data.
// d3.json("nations.json", function(nations) {
//
//   // A bisector since many nation's data is sparsely-defined.
//   var bisect = d3.bisector(function(d) { return d[0]; });
//
//   // Add a dot per nation. Initialize the data at 1800, and set the colors.
//   var dot = svg.append("g")
//       .attr("class", "dots")
//     .selectAll(".dot")
//       .data(interpolateData(1800))
//     .enter().append("circle")
//       .attr("class", "dot")
//       .style("fill", function(d) { return colorScale(color(d)); })
//       .call(position)
//       .sort(order);
//
//   // Add a title.
//   dot.append("title")
//       .text(function(d) { return d.name; });
//
//   // Add an overlay for the year label.
//   var box = label.node().getBBox();
//
//   var overlay = svg.append("rect")
//         .attr("class", "overlay")
//         .attr("x", box.x)
//         .attr("y", box.y)
//         .attr("width", box.width)
//         .attr("height", box.height)
//         .on("mouseover", enableInteraction);
//
//     // Start a transition that interpolates the data based on year.
//     svg.transition()
//         .duration(30000)
//         .ease("linear")
//         .tween("year", tweenYear)
//         .each("end", enableInteraction);
//
//     // Positions the dots based on data.
//     function position(dot) {
//       dot .attr("cx", function(d) { return xScale(x(d)); })
//           .attr("cy", function(d) { return yScale(y(d)); })
//           .attr("r", function(d) { return radiusScale(radius(d)); });
//     }
//
//     // Defines a sort order so that the smallest dots are drawn on top.
//     function order(a, b) {
//       return radius(b) - radius(a);
//     }
//
//     // After the transition finishes, you can mouseover to change the year.
//     function enableInteraction() {
//       var yearScale = d3.scale.linear()
//           .domain([1800, 2009])
//           .range([box.x + 10, box.x + box.width - 10])
//           .clamp(true);
//
//       // Cancel the current transition, if any.
//       svg.transition().duration(0);
//
//       overlay
//           .on("mouseover", mouseover)
//           .on("mouseout", mouseout)
//           .on("mousemove", mousemove)
//           .on("touchmove", mousemove);
//
//       function mouseover() {
//         label.classed("active", true);
//       }
//
//       function mouseout() {
//         label.classed("active", false);
//       }
//
//       function mousemove() {
//         displayYear(yearScale.invert(d3.mouse(this)[0]));
//       }
//     }
//
//     // Tweens the entire chart by first tweening the year, and then the data.
//     // For the interpolated data, the dots and label are redrawn.
//     var currDate = new Date();
//     var currYear = parseInt(currDate.getFullYear());
//
//     function tweenYear() {
//       var year = d3.interpolateNumber(currYear, currYear + 20);
//       return function(t) { displayYear(year(currYear)); };
//     }
//
//     // Updates the display to show the specified year.
//     function displayYear(year) {
//       dot.data(interpolateData(year), key).call(position).sort(order);
//       label.text(Math.round(year));
//     }
//
//     // Interpolates the dataset for the given (fractional) year.
//     function interpolateData(year) {
//       return nations.map(function(d) {
//         return {
//           name: d.name,
//           region: d.region,
//           income: interpolateValues(d.income, year),
//           population: interpolateValues(d.population, year),
//           lifeExpectancy: interpolateValues(d.lifeExpectancy, year)
//         };
//       });
//     }
//
//     // Finds (and possibly interpolates) the value for the specified year.
//     function interpolateValues(values, year) {
//       var i = bisect.left(values, year, 0, values.length - 1),
//           a = values[i];
//       if (i > 0) {
//         var b = values[i - 1],
//             t = (year - a[0]) / (b[0] - a[0]);
//         return a[1] * (1 - t) + b[1] * t;
//       }
//       return a[1];
//     }
//   });
    $scope.get_user_info = function() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json_resp = JSON.parse(xhr.responseText); 
            // $scope.assets =
          }
        }
      };
      xhr.send();
    };

    $scope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    $scope.update_fin_summary();
    $scope.calculate_end_date();
    // change();
  }]
);
 function alter_data() {
   var year_bar = document.getElementById('volume_bar').value;
   console.log(year_bar);
   angular.element(document.getElementById('page-top')).scope().change(year_bar);
 }

