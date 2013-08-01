d3.custom = d3.custom || {};

d3.custom.PlainBarChart = function module() {
    var width = 300,
        height = 300,
        gap = 0;

    var dispatch = d3.dispatch('customHover');
    function exports(_selection) {
        _selection.each(function(_data) {

            var dataY = _data;
            var dataX = ['A', 'B', 'C', 'D', 'E', 'F'];

            var x1 = d3.scale.ordinal()
                .domain(dataX)
                .rangeRoundBands([0, width], .1);

            var y1 = d3.scale.linear()
                .domain([0, d3.max(dataY)])
                .range([height, 0]);

            var barW = width / _data.length;

            var geometryGroup = d3.select(this)
                .selectAll('g.geometry')
                .data([0]);
            geometryGroup.enter()
                .append('g')
                .classed('geometry', true)
                .append('rect')
                .classed('panel', true)
                .attr({width: width, height: height});
            geometryGroup.attr({width: width, height: height})

            var gapSize = x1.rangeBand() / 100 * gap;
            var barW = x1.rangeBand() - gapSize;
            var bars = geometryGroup.selectAll('.bar')
                .data(dataY);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
                    x: width
                })
                .on('mouseover', dispatch.customHover);
            bars.attr({
                    width: barW,
                    x: function(d, i) { return x1(i) + gapSize/2; },
                    y: function(d, i) { return y1(d); },
                    height: function(d, i) { return height - y1(d); }
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