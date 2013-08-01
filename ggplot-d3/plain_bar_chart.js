d3.custom = d3.custom || {};

d3.custom.PlainBarChart = function module() {
    varwidth = 300,
        height = 300,
        gap = 0,
        ease = 'cubic-in-out';
    var svg, duration = 0;

    var dispatch = d3.dispatch('customHover');
    function exports(_selection) {
        _selection.each(function(_data) {

            var dataY = [1, 2, 3, 4, 5, 6];
            var dataX = ['A', 'B', 'C', 'D', 'E', 'F'];

            var chartW = width,
                chartH = height;

            var x1 = d3.scale.ordinal()
                .domain(dataX)
                .rangeRoundBands([0, chartW], .1);

            var y1 = d3.scale.linear()
                .domain([0, d3.max(dataY)])
                .range([chartH, 0]);

            var barW = chartW / _data.length;

            var svg = d3.select(this)
                .selectAll('g.geometry')
                .data([0])
                .enter()
                .append('g')
                .classed('geometry', true);
            svg.attr({width: width, height: height})

            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = svg.selectAll('.bar')
                .data(dataY);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
                    x: chartW
                })
                .on('mouseover', dispatch.customHover);
            bars.attr({
                    width: barW,
                    x: function(d, i) { return x1(i) + gapSize/2; },
                    y: function(d, i) { return y1(d); },
                    height: function(d, i) { return chartH - y1(d); }
                });
            bars.exit().style({opacity: 0}).remove();

        });
    }
    exports.width = function(_x) {
        if (!arguments.length) return width;
        width = _x;
        return this;
    };
    exports.height = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        duration = 0;
        return this;
    };
    exports.gap = function(_x) {
        if (!arguments.length) return gap;
        gap = _x;
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};