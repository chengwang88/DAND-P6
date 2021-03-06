//

var fs = 15; // font size
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function plot1() {

    var svg1 = dimple.newSvg(".cancelBar", 600, 400);

    d3.csv("data/CancellationByMonth.csv", function (data) {
        var myChart = new dimple.chart(svg1, data);
      
        // Set a variety of default colors
        myChart.defaultColors = [
            new dimple.color("#7fc97f"),
            new dimple.color("#beaed4"),
            new dimple.color("#fdc086"),
            new dimple.color("#386cb0")
        ];

        myChart.setBounds(60, 40, 510, 305);
        var x = myChart.addCategoryAxis("x", "Month");
        x.addOrderRule(month);
        x.fontSize = fs;
        x.title = '';

        var y = myChart.addMeasureAxis("y", "Percent");
        y.fontSize = fs;
        y.title = 'Percentage (%)';

        myChart.addSeries("CancellationCode", dimple.plot.bar);

        var myLegend = myChart.addLegend(120, 10, 510, 20, "left");
        myLegend.fontSize = fs;
        myChart.draw();
    });
}



//
function plot2() {

    var width = 960,
        height = 136,
        cellSize = 17; // cell size

    var percent = d3.format(""),
        format = d3.time.format("%Y-%m-%d");

    var color = d3.scale.quantize()
        .domain([0, 2400])
        .range(d3.range(6).map(function (d) { return "q" + d + "-6"; }));

    var svg = d3.select(".cancelCalendar").selectAll("svg")
        .data(d3.range(2008, 2009))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text(function (d) { return d; });

    var rect = svg.selectAll(".day")
        .data(function (d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function (d) { return d3.time.weekOfYear(d) * cellSize; })
        .attr("y", function (d) { return d.getDay() * cellSize; })
        .datum(format);

    rect.append("title")
        .text(function (d) { return d; });

    var legend = svg.selectAll(".legend")
        .data(month)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(" + (((i) * 74) + 60) + ",0)"; });

    legend.append("text")
        .attr("class", function (d, i) { return month[i] })
        .style("text-anchor", "end")
        .attr("dy", "-.25em")
        .text(function (d, i) { return month[i] });

    svg.selectAll(".month")
        .data(function (d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("path")
        .attr("class", "month")
        .attr("d", monthPath);

    //  Tooltip Object
    var tooltip = d3.select("body")
        .append("div").attr("id", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");


    d3.csv("data/CancellationByDay.csv", function (error, csv) {
        if (error) throw error;

        var data = d3.nest()
            .key(function (d) { return d.Date; })
            .rollup(function (d) { return d[0].TotalCancelled; })
            .map(csv);

        rect.filter(function (d) { return d in data; })
            .attr("class", function (d) { return "day " + color(data[d]); })
            .select("title")
            .text(function (d) { return d + ": " + percent(data[d]); });
      
      
        //  Tooltip
        rect.on("mouseover", mouseover);
        rect.on("mouseout", mouseout);
        function mouseover(d) {
            tooltip.style("visibility", "visible");
            var percent_data = (data[d] !== undefined) ? percent(data[d]) : percent(0);
            var purchase_text = d + ": " + percent_data;

            tooltip.transition()
                .duration(200)
                .style("opacity", .9);

            tooltip.html(purchase_text)
                .style('background-color', 'white')
                .style("left", (d3.event.pageX) + 30 + "px")
                .style("top", (d3.event.pageY) + "px");
        }
        function mouseout(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            var $tooltip = $("#tooltip");
            $tooltip.empty();
        }
    });

    function monthPath(t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
            d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
        return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
            + "H" + w0 * cellSize + "V" + 7 * cellSize
            + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
            + "H" + (w1 + 1) * cellSize + "V" + 0
            + "H" + (w0 + 1) * cellSize + "Z";
    }

    d3.select(self.frameElement).style("height", "2910px");
}







function plot3() {

    var svg2 = dimple.newSvg(".delayBar", 800, 400);
    var hour = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];

    d3.csv("data/DelayByHour.csv", function (data) {
        var myChart = new dimple.chart(svg2, data);
      
        // Set a variety of default colors
        myChart.defaultColors = [
            /* new dimple.color("#7fc97f"),*/
            new dimple.color("#beaed4"),
            new dimple.color("#fdc086"),
            new dimple.color("#386cb0")
        ];

        myChart.setBounds(60, 40, 720, 305);
        var x = myChart.addCategoryAxis("x", "Hour");
        x.addOrderRule(hour);
        x.fontSize = fs;
        x.title = '';

        var y = myChart.addMeasureAxis("y", "Avg");
        y.fontSize = fs;
        y.title = 'Average Delay Time (minute)';
        y.showGridlines = false;

        myChart.addSeries(null, dimple.plot.bar);

        myChart.draw();
    });
}



//

function plot4() {
    var margin = { top: 50, right: 0, bottom: 100, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 430 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 24),
        legendElementWidth = gridSize * 2,
        buckets = 9,
        colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
        days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        times = ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"];
    datasets = ["data/DelayByWeekHour.csv"];

    var svg = d3.select(".delayHeatmap").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

    var timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

    var heatmapChart = function (csvFile) {
        d3.csv(csvFile,
            function (d) {
                return {
                    day: +d.Week,
                    hour: +d.Hour,
                    value: +d.Avg
                };
            },
            function (error, data) {
                var colorScale = d3.scale.quantile()
                    .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                    .range(colors);

                var cards = svg.selectAll(".hour")
                    .data(data, function (d) { return d.day + ':' + d.hour; });

                cards.append("title");

                cards.enter().append("rect")
                    .attr("x", function (d) { return (d.hour - 1) * gridSize; })
                    .attr("y", function (d) { return (d.day - 1) * gridSize; })
                    .attr("rx", 4)
                    .attr("ry", 4)
                    .attr("class", "hour bordered")
                    .attr("width", gridSize)
                    .attr("height", gridSize)
                    .style("fill", colors[0]);

                cards.transition().duration(1000)
                    .style("fill", function (d) { return colorScale(d.value); });

                cards.select("title").text(function (d) { return d.value; });

                cards.exit().remove();

                var legend = svg.selectAll(".legend")
                    .data([0].concat(colorScale.quantiles()), function (d) { return d; });

                legend.enter().append("g")
                    .attr("class", "legend");

                legend.append("rect")
                    .attr("x", function (d, i) { return legendElementWidth * i; })
                    .attr("y", height)
                    .attr("width", legendElementWidth)
                    .attr("height", gridSize)
                    .style("fill", function (d, i) { return colors[i]; });

                legend.append("text")
                    .attr("class", "mono")
                    .text(function (d) { return "≥ " + Math.round(d); })
                    .attr("x", function (d, i) { return legendElementWidth * i + .5 * gridSize; })
                    .attr("y", height + 1.5 * gridSize);

                legend.exit().remove();

            });
    };

    heatmapChart(datasets[0]);
      
    /*
    var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      .data(datasets);

    datasetpicker.enter()
      .append("input")
      .attr("value", function(d){ return "Dataset " + d })
      .attr("type", "button")
      .attr("class", "dataset-button")
      .on("click", function(d) {
        heatmapChart(d);
    
      }); */
}


