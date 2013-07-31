d3.custom = d3.custom || {};

d3.custom.Grid = function module() {
    var width = 200,
        height = 200,
        columnNumber = 1;
    function exports(_selection) {
        _selection.each(function(_data, _index) {

            var svg = d3.select(this)
                .selectAll('g.facet')
                .data([0]);
            var svgEnter = svg.enter()
                .append('g')
                .classed('facet', true);
            svgEnter.append('g').classed('geometry-group', true).append('rect')
                .attr({width: width, height: height, fill: _data});
            svgEnter.append('g').classed('x-axis-group axis', true);
            svgEnter.append('g').classed('y-axis-group axis', true);

            svg.attr({width: width, height: height})
            svg.attr({transform: 'translate(' + width * (_index%columnNumber) + ',' + ~~(_index/columnNumber) * height + ')'})
            svg.select('.geometry-group').select('rect').transition().attr({fill: _data});

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
    exports.columnNumber = function(_x) {
        if (!arguments.length) return columnNumber;
        columnNumber = _x;
        return this;
    };
    return exports;
};