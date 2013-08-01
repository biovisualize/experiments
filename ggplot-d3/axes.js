d3.custom = d3.custom || {};

d3.custom.Axes = function module() {
    var config = {
        facetW: 250,
        facetH: 250,
        gap: 5,
        dataX: ['A', 'B', 'C', 'D', 'E', 'F'],
        dataY: [1, 2, 3, 4, 5, 6],
        axisSize: 25
    };

    function exports(_selection) {
        _selection.each(function(_data) {

            var x1 = d3.scale.ordinal()
                .domain(config.dataX)
                .rangeRoundBands([0, config.facetW - config.gap], .1);

            var y1 = d3.scale.linear()
                .domain([0, d3.max(config.dataY)])
                .range([config.facetH - config.gap, 0]);

            var xAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y1)
                .orient('left');

            d3.select(this).selectAll('.axis-group-y')
                .each(function(d, i){
                    d3.select(this).append('g')
                        .attr({transform: 'translate('+ config.axisSize +',0)'})
                        .call(yAxis);
                });

            d3.select(this).selectAll('.axis-group-x')
                .each(function(d, i){
                    d3.select(this).append('g')
                        .call(xAxis);
                });

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    return exports;
};