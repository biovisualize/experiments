d3.custom = {};

d3.custom.Container = function module() {
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 300,
        height = 300;
    function exports(_selection) {
        _selection.each(function(_data) {

            var chartW = width - margin.left - margin.right,
                chartH = height - margin.top - margin.bottom;

            var svg = d3.select(this)
                .selectAll('svg')
                .data([0]);
            var svgEnter = svg.enter()
                .append('svg')
                .classed('chart', true);
            var container = svgEnter.append('g').classed('container-group', true);
            container.append('g').classed('chart-group', true).append('rect')
                .attr({width: chartW, height: chartH});
            container.append('g').classed('x-axis-group axis', true);
            container.append('g').classed('y-axis-group axis', true);

            svg.attr({width: width, height: height})
            svg.select('.container-group')
                .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'})
            svg.select('.chart-group').select('rect').transition().attr({fill: _data});

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
        return this;
    };
    exports.margin = function(_x) {
        if (!arguments.length) return height;
        height = _x;
        return this;
    };
    return exports;
};