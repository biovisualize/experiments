d3.custom = d3.custom || {};

d3.custom.Axes = function module() {
    var config = {
        facetW: 250,
        facetH: 250,
        gap: 5,
        axisSize: 25,
        dimensionX: null,
        dimensionY: null,
        axisContainerX: null,
        axisContainerY: null
    };
    var scaleX, scaleY;

    function exports(_selection) {
        _selection.each(function(_data) {

            var dataMergedX = d3.merge(d3.merge(_data));
            var dataMergedY = dataMergedX;

            var dataX = dataMergedX.map(function(d, i){ return d[config.dimensionX]; });
            var dataY = dataMergedY.map(function(d, i){ return d[config.dimensionY]; });

            scaleX = d3.scale.ordinal()
                .domain(dataX)
                .rangeRoundBands([0, config.facetW - config.gap], .1);

            scaleY = d3.scale.linear()
                .domain([0, d3.max(dataY)])
                .range([config.facetH - config.gap, 0]);

            var xAxis = d3.svg.axis()
                .scale(scaleX)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(scaleY)
                .orient('left');

            d3.select(this).selectAll(config.axisContainerX)
                .each(function(d, i){
                    d3.select(this).append('g')
                        .attr({transform: 'translate('+ config.axisSize +',0)'})
                        .call(yAxis);
                });

            d3.select(this).selectAll(config.axisContainerY)
                .each(function(d, i){
                    d3.select(this).append('g')
                        .call(xAxis);
                });

        });
    }
    exports.getScaleX = function(){
        return scaleX;
    };
    exports.getScaleY = function(){
        return scaleY;
    };
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    return exports;
};